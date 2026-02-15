import type { PubMedArticle, Citation } from '../types';

const EUTILS_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

/**
 * Search PubMed for articles matching a query.
 * Returns up to `maxResults` PMIDs.
 */
export async function searchPubMed(
  query: string,
  maxResults = 5
): Promise<string[]> {
  if (!query) return [];
  const url = `${EUTILS_BASE}/esearch.fcgi?db=pubmed&retmode=json&retmax=${maxResults}&sort=relevance&term=${encodeURIComponent(query)}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`PubMed search failed: ${resp.status}`);
    const data = await resp.json();
    return data?.esearchresult?.idlist ?? [];
  } catch (err) {
    console.warn('[PubMed] Search error:', err);
    return [];
  }
}

/**
 * Fetch article summaries from PubMed by PMIDs.
 */
export async function fetchPubMedSummaries(
  pmids: string[]
): Promise<PubMedArticle[]> {
  if (!pmids.length) return [];
  const ids = pmids.join(',');
  const url = `${EUTILS_BASE}/esummary.fcgi?db=pubmed&retmode=json&id=${ids}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`PubMed fetch failed: ${resp.status}`);
    const data = await resp.json();
    const result = data?.result;
    if (!result) return [];

    return pmids
      .filter((id) => result[id])
      .map((id) => {
        const article = result[id];
        const authors =
          article.authors
            ?.slice(0, 3)
            .map((a: { name: string }) => a.name)
            .join(', ') + (article.authors?.length > 3 ? ' et al.' : '');
        return {
          pmid: id,
          title: article.title ?? '',
          authors: authors ?? '',
          journal: article.source ?? '',
          year: article.pubdate?.split(' ')?.[0] ?? '',
          doi: article.elocationid?.replace('doi: ', '') ?? '',
        };
      });
  } catch (err) {
    console.warn('[PubMed] Fetch error:', err);
    return [];
  }
}

/**
 * Search CrossRef for a DOI-based citation.
 */
export async function searchCrossRef(
  query: string,
  maxResults = 3
): Promise<Citation[]> {
  if (!query) return [];
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=${maxResults}&sort=relevance`;
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'DFUPresentation/1.0 (mailto:dfu@unth.edu.ng)' },
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data?.message?.items ?? []).map(
      (item: {
        DOI: string;
        title?: string[];
        author?: { family: string; given?: string }[];
        'container-title'?: string[];
        published?: { 'date-parts': number[][] };
      }) => ({
        id: item.DOI,
        type: 'doi' as const,
        title: item.title?.[0] ?? '',
        authors:
          item.author
            ?.slice(0, 3)
            .map((a) => `${a.family} ${a.given?.[0] ?? ''}`.trim())
            .join(', ') + (item.author && item.author.length > 3 ? ' et al.' : ''),
        journal: item['container-title']?.[0] ?? '',
        year: item.published?.['date-parts']?.[0]?.[0] ?? '',
        url: `https://doi.org/${item.DOI}`,
      })
    );
  } catch (err) {
    console.warn('[CrossRef] Search error:', err);
    return [];
  }
}

/**
 * Fetch live citations for a slide's citations_query.
 * Merges with existing curated citations, deduplicating by ID.
 */
export async function fetchCitationsForSlide(
  citationsQuery: string,
  existingCitations: Citation[]
): Promise<Citation[]> {
  if (!citationsQuery) return existingCitations;

  const pmids = await searchPubMed(citationsQuery, 5);
  const articles = await fetchPubMedSummaries(pmids);

  const liveCitations: Citation[] = articles.map((a) => ({
    id: a.pmid,
    type: 'pmid',
    title: a.title,
    authors: a.authors,
    journal: a.journal,
    year: a.year,
    url: `https://pubmed.ncbi.nlm.nih.gov/${a.pmid}/`,
  }));

  // Merge and deduplicate
  const seen = new Set(existingCitations.map((c) => c.id));
  const merged = [...existingCitations];
  for (const cite of liveCitations) {
    if (!seen.has(cite.id)) {
      seen.add(cite.id);
      merged.push(cite);
    }
  }

  return merged.slice(0, 10); // Cap at 10
}
