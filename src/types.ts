// ──────────────────────────────────────────────
// Types used across the DFU Presentation PWA
// ──────────────────────────────────────────────

export type EvidenceConfidence = 'high' | 'medium' | 'low';

export type LayoutHint = 'image-left' | 'image-right';

export interface Citation {
  id: string;           // PMID or DOI
  type: 'pmid' | 'doi';
  title: string;
  authors: string;
  journal: string;
  year: number | string;
  url: string;
}

export interface SlideData {
  slide_id: string;
  title: string;
  layout_hint: LayoutHint;
  image_queries: string[];
  bullets: string[];
  speaker_notes: string;
  citations_query: string;
  citations: Citation[];
  evidence_confidence: EvidenceConfidence;
  exportable_graphics: boolean;
  image_alt: string;
  link?: string;
  last_updated?: string;
  reviewed_by?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  empathetic_response?: string;
}

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  abstract?: string;
}

export interface AppState {
  currentSlide: number;
  showSpeakerNotes: boolean;
  showJumpPanel: boolean;
  showCitationModal: boolean;
  autoplay: boolean;
  autoplayInterval: number;  // ms
  isOffline: boolean;
  lastUpdated: string | null;
}
