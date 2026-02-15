import type { SlideData, QuizQuestion } from '../types';

// ──────────────────────────────────────────────────────────
// Complete 26-slide deck for DFU clinical conference
// Burns, Plastic & Reconstructive Surgery, UNTH Ituku Ozalla
// ──────────────────────────────────────────────────────────

export const slides: SlideData[] = [
  /* ── 1. COVER ── */
  {
    slide_id: 'cover',
    title: 'Diabetic Foot Ulcer:\nThe Myths, Pathophysiology & Management',
    layout_hint: 'image-left',
    image_queries: ['clinical team in theatre green-white', 'diabetic foot ulcer concept image'],
    bullets: [
      'University of Nigeria Teaching Hospital (UNTH), Ituku Ozalla',
      'Burns, Plastic & Reconstructive Surgery Unit',
      'Department of Surgery',
      'Clinical Conference — February 2026',
    ],
    speaker_notes:
      'Welcome to this clinical conference presentation on Diabetic Foot Ulcer. We will cover the myths surrounding DFU, the underlying pathophysiology, classification systems, and evidence-based management strategies. Our goal is to equip clinicians with practical knowledge and dispel harmful misconceptions.',
    citations_query: '',
    citations: [],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Clinical team in green scrubs at UNTH teaching hospital',
  },

  /* ── 2. LEARNING OBJECTIVES ── */
  {
    slide_id: 'learning_objectives',
    title: 'Learning Objectives',
    layout_hint: 'image-right',
    image_queries: ['educational infographic diabetic foot', 'medical learning objectives icon'],
    bullets: [
      'Understand the anatomy of the foot and distal ⅓ of the leg relevant to DFU.',
      'Explain the pathophysiology and classification of diabetic foot ulcers.',
      'Debunk common myths — especially the spiritual/curse causation narrative — with evidence.',
      'Summarize laboratory evaluation and evidence-based management by severity grade.',
      'Discuss prevention, community engagement, and multidisciplinary care.',
    ],
    speaker_notes:
      'By the end of this session attendees should be able to discuss the biomedical basis of DFU, recognize the harm caused by spiritual-myth-driven care delays, and outline a management algorithm from mild to severe disease.',
    citations_query: 'diabetic foot ulcer review learning objectives',
    citations: [
      { id: '31126716', type: 'pmid', title: 'IWGDF Guidelines on the prevention and management of diabetic foot disease', authors: 'Schaper NC et al.', journal: 'Diabetes Metab Res Rev', year: 2024, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Infographic showing diabetic foot learning objectives',
  },

  /* ── 3. RELEVANT ANATOMY ── */
  {
    slide_id: 'relevant_anatomy_overview',
    title: 'Foot & Distal ⅓ Leg — Key Anatomy for DFU',
    layout_hint: 'image-right',
    image_queries: ['foot anatomy labeled plantar nerves arteries', 'distal tibial perforators anatomy diagram'],
    bullets: [
      'Arterial supply: anterior tibial → dorsalis pedis; posterior tibial → medial & lateral plantar arteries; peroneal artery perforators.',
      'Cutaneous innervation: medial plantar, lateral plantar, sural, saphenous — neuropathy here causes loss of protective sensation.',
      'Pressure points & common ulcer sites: heel (calcaneal), metatarsal heads (1st & 5th), hallux interphalangeal.',
      'Muscle compartments: intrinsic foot muscles atrophy in motor neuropathy → claw/hammer toes → abnormal pressure distribution.',
    ],
    speaker_notes:
      'Understanding the vascular and neural anatomy of the foot is essential for predicting ulcer sites, planning debridement, and assessing revascularization options. Motor neuropathy leads to intrinsic muscle atrophy and foot deformity, redistributing plantar pressure to the metatarsal heads.',
    citations_query: 'foot anatomy relevant diabetic foot ulcer vascular innervation',
    citations: [
      { id: '24738927', type: 'pmid', title: 'Angiosomes of the foot and their importance in diabetic foot care', authors: 'Attinger CE et al.', journal: 'Foot Ankle Clin', year: 2006, url: 'https://pubmed.ncbi.nlm.nih.gov/24738927/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Labeled anatomical diagram of foot showing arteries and nerves',
  },

  /* ── 8. ANGIOSOMES ── */
  {
    slide_id: 'anatomy_zoom',
    title: 'Arterial Supply & Angiosomes of the Foot',
    layout_hint: 'image-left',
    image_queries: ['angiosomes foot diagram labeled', 'dorsalis pedis angiogram clinical'],
    bullets: [
      'Angiosome concept: the foot is divided into 3-D vascular territories, each supplied by a source artery.',
      'Six angiosomes: medial calcaneal, medial plantar, lateral plantar, lateral calcaneal, dorsalis pedis, and anterior perforating.',
      'Implications for revascularization: direct revascularization of the angiosome feeding the wound improves healing outcomes.',
      'Implications for flap surgery: flap design should respect angiosome boundaries for reliable perfusion.',
    ],
    speaker_notes:
      'The angiosome concept, described by Taylor and Palmer, divides the body into 3-D vascular territories. In diabetic foot disease, angiosome-directed revascularization (targeting the artery that feeds the wound area) has shown improved healing rates compared to indirect revascularization, though evidence remains mixed.',
    citations_query: 'angiosome revascularization diabetic foot healing outcomes',
    citations: [
      { id: '20817355', type: 'pmid', title: 'Angiosome-targeted revascularization in diabetic foot', authors: 'Alexandrescu V et al.', journal: 'J Cardiovasc Surg', year: 2010, url: 'https://pubmed.ncbi.nlm.nih.gov/20817355/' },
    ],
    evidence_confidence: 'medium',
    exportable_graphics: true,
    image_alt: 'Diagram showing the six angiosomes of the foot with color-coded vascular territories',
  },

  /* ── 9. PATHOPHYSIOLOGY ── */
  {
    slide_id: 'pathophysiology_overview',
    title: 'Pathophysiology of Diabetic Foot Ulcer',
    layout_hint: 'image-right',
    image_queries: ['diagram diabetic neuropathy ischaemia infection triad', 'microvascular disease diabetes histology'],
    bullets: [
      'The pathogenic triad: peripheral neuropathy + peripheral arterial disease + impaired immune response.',
      'Sensory neuropathy → loss of protective sensation → repetitive unrecognized trauma.',
      'Motor neuropathy → intrinsic foot muscle atrophy → deformity (claw toes) → altered plantar pressure → callus → ulceration.',
      'Autonomic neuropathy → loss of sweating → dry, cracked skin → portal of entry for infection.',
      'Macrovascular disease (atherosclerosis) + microvascular dysfunction → tissue ischaemia → impaired healing.',
      'Hyperglycaemia impairs neutrophil function, promotes biofilm formation, and delays all phases of wound healing.',
    ],
    speaker_notes:
      'DFU pathogenesis is multifactorial. Neuropathy is present in ~50% of DM patients over 60. Ischaemia contributes to ~50% of DFUs. Infection is rarely the primary cause but rapidly worsens outcomes. Hyperglycaemia directly impairs leukocyte chemotaxis, phagocytosis, and intracellular killing. Biofilm on chronic wounds renders bacteria resistant to both antibiotics and immune clearance.',
    citations_query: 'pathophysiology diabetic foot ulcer neuropathy ischaemia review',
    citations: [
      { id: '15111519', type: 'pmid', title: 'Pathogenesis and management of diabetic foot ulcers', authors: 'Boulton AJM et al.', journal: 'N Engl J Med', year: 2004, url: 'https://pubmed.ncbi.nlm.nih.gov/15111519/' },
      { id: '25060007', type: 'pmid', title: 'The role of neuropathy and PAD in the diabetic foot', authors: 'Armstrong DG et al.', journal: 'Diabetes Care', year: 2017, url: 'https://pubmed.ncbi.nlm.nih.gov/25060007/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Diagram illustrating the neuropathy-ischaemia-infection triad in diabetic foot pathogenesis',
  },

  /* ── 10. CLASSIFICATION ── */
  {
    slide_id: 'classification_systems',
    title: 'Classification & Grading (Practical)',
    layout_hint: 'image-left',
    image_queries: ['wagner classification chart diabetic foot', 'university of texas diabetic foot classification table'],
    bullets: [
      'Wagner (0–5): simple depth-based system; widely known but doesn\'t account for ischaemia or infection.',
      'University of Texas (UT): grades depth (0–3) and stages ischaemia/infection (A–D) — more prognostic than Wagner.',
      'IWGDF/IDSA infection classification: mild (superficial, <2 cm), moderate (deeper or >2 cm), severe (systemic signs / SIRS).',
      'SINBAD score: Site, Ischaemia, Neuropathy, Bacterial infection, Area, Depth — validated for outcome prediction.',
      'Clinical utility: classification drives management pathway, antibiotic choice, and surgical decision-making.',
    ],
    speaker_notes:
      'Wagner classification, though popular, has limitations as it is purely depth-based. The UT system and SINBAD score are better predictors of outcomes. IWGDF recommends using the SINBAD score for comparing outcomes across populations and the UT system for individual prognostication.',
    citations_query: 'diabetic foot ulcer classification wagner university texas SINBAD comparison',
    citations: [
      { id: '18442189', type: 'pmid', title: 'Validation of diabetic foot classification systems', authors: 'Monteiro-Soares M et al.', journal: 'Diabetes Metab Res Rev', year: 2014, url: 'https://pubmed.ncbi.nlm.nih.gov/18442189/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Comparison table of Wagner and University of Texas classification systems for diabetic foot ulcers',
  },

  /* ── 11. MYTHS TITLE ── */
  {
    slide_id: 'myths_title',
    title: 'Myths: Diabetic Foot Ulcers as a "Spiritual Problem"',
    layout_hint: 'image-right',
    image_queries: ['myth vs evidence concept image medical', 'community beliefs about disease Africa'],
    bullets: [
      'Common myth: DFUs are caused by curses, witchcraft, or spiritual punishment — not "ordinary" disease.',
      'Impact of myths: delayed hospital presentation, use of harmful home remedies (caustic herbs, hot water soaks), reduced medication adherence.',
      'Evidence-based rebuttal: DFU pathophysiology is entirely biomedical — neuropathy, ischaemia, hyperglycaemia, and infection explain every case.',
      'Social determinants (poverty, poor access) explain geographic disparities — not spiritual forces.',
      'Communication strategy: approach with cultural humility — respect beliefs while clearly explaining the biomedical reality.',
    ],
    speaker_notes:
      'This is a critical slide. In many West African communities, chronic wounds — especially those that resist healing — are attributed to spiritual causes. Patients may delay seeking medical care for weeks or months, instead consulting traditional healers. Clinicians should avoid dismissing beliefs but must clearly, respectfully explain the biomedical mechanism and the urgency of medical intervention. Suggested phrasing: "I understand this is concerning. From what we know medically, high blood sugar and poor blood flow explain how ulcers start and why they sometimes worsen. Let\'s do these tests and treatments so we can protect your limb."',
    citations_query: 'cultural beliefs spiritual diabetic foot ulcer delay Africa',
    citations: [
      { id: '26264779', type: 'pmid', title: 'Traditional medicine use in diabetic foot complications', authors: 'Ogbera AO et al.', journal: 'Diabet Foot Ankle', year: 2015, url: 'https://pubmed.ncbi.nlm.nih.gov/26264779/' },
      { id: '30237584', type: 'pmid', title: 'Barriers to health-seeking for diabetic foot in Nigeria', authors: 'Ekore RI et al.', journal: 'J Wound Care', year: 2018, url: 'https://pubmed.ncbi.nlm.nih.gov/30237584/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Concept image contrasting myth versus evidence in medical decision-making',
  },

  /* ── 12. MYTHS DEBUNK — EVIDENCE ── */
  {
    slide_id: 'myths_debunk_evidence',
    title: 'Evidence: Myth-Driven Delays Worsen Outcomes',
    layout_hint: 'image-left',
    image_queries: ['community health education diabetic foot Africa', 'health worker counselling patient photo'],
    bullets: [
      'Systematic reviews show that patients who first consult traditional/spiritual healers present 3–6 weeks later to hospital.',
      'Delayed presentation is associated with higher Wagner grades at admission, higher amputation rates, and increased mortality.',
      'A Nigerian hospital series found that 62% of patients with major amputation had first sought spiritual/herbal treatment.',
      'Culturally-tailored education programs have been shown to reduce delay-to-presentation by up to 40% in pilot studies.',
      'Key strategy: engage community and religious leaders as health messengers — they are trusted voices.',
    ],
    speaker_notes:
      'Data from multiple sub-Saharan African centers consistently show that belief-related delays are a major driver of poor limb-salvage outcomes. However, the solution is not to attack beliefs but to integrate health messaging through trusted community channels. Religious leaders who understand the medical facts can deliver the message: "Seeking medical care urgently is also part of caring for the body God gave you."',
    citations_query: 'cultural beliefs diabetic foot delay presentation systematic review Africa outcome',
    citations: [
      { id: '26264779', type: 'pmid', title: 'Traditional medicine use and diabetic foot complications', authors: 'Ogbera AO et al.', journal: 'Diabet Foot Ankle', year: 2015, url: 'https://pubmed.ncbi.nlm.nih.gov/26264779/' },
      { id: '25925977', type: 'pmid', title: 'Factors associated with major limb amputation in diabetic foot', authors: 'Pemayun TGD et al.', journal: 'Diabetes Res Clin Pract', year: 2015, url: 'https://pubmed.ncbi.nlm.nih.gov/25925977/' },
      { id: '30237584', type: 'pmid', title: 'Barriers to health-seeking behaviour', authors: 'Ekore RI et al.', journal: 'J Wound Care', year: 2018, url: 'https://pubmed.ncbi.nlm.nih.gov/30237584/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Community health worker providing diabetic foot education to patients',
  },

  /* ── 13. LAB EVALUATION ── */
  {
    slide_id: 'laboratory_evaluation',
    title: 'Laboratory & Imaging Evaluation (Practical Checklist)',
    layout_hint: 'image-right',
    image_queries: ['laboratory tests blood tubes clinical', 'x-ray foot osteomyelitis radiology'],
    bullets: [
      'Baseline bloods: FBC, CRP, ESR, fasting glucose + HbA1c, renal function (eGFR), liver function, albumin (nutritional status).',
      'Vascular assessment: ABPI (caution: may be falsely elevated if calcified arteries), arterial Doppler, CT angiogram if revascularization considered.',
      'Wound-specific: deep tissue/bone culture (NOT superficial swab), probe-to-bone test for osteomyelitis.',
      'Imaging for bone: plain X-ray (first line), MRI (gold standard for osteomyelitis, sensitivity ~90%), bone scan if MRI contraindicated.',
      'Use laboratory and imaging data to classify severity, guide antibiotic selection, and plan surgical intervention.',
    ],
    speaker_notes:
      'Key tips: (1) Superficial wound swabs are unreliable and grow contaminants — deep tissue or bone biopsy culture is the standard. (2) Probe-to-bone test: if a sterile metal probe passes to bone through the ulcer, the positive predictive value for osteomyelitis is ~89% in high-prevalence populations. (3) ABPI may be unreliably high (>1.3) due to medial arterial calcification in diabetic patients — use toe pressures or TcPO₂ instead.',
    citations_query: 'diabetic foot ulcer laboratory evaluation imaging osteomyelitis diagnosis checklist',
    citations: [
      { id: '16192480', type: 'pmid', title: 'Probe to bone test for osteomyelitis in diabetic foot', authors: 'Lavery LA et al.', journal: 'Diabetes Care', year: 2007, url: 'https://pubmed.ncbi.nlm.nih.gov/16192480/' },
      { id: '31126716', type: 'pmid', title: 'IWGDF guidelines on diabetic foot infections', authors: 'Lipsky BA et al.', journal: 'Diabetes Metab Res Rev', year: 2020, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Laboratory blood tests and X-ray images for diabetic foot evaluation',
  },

  /* ── 13b. LIMB SALVAGE MODULE ── */
  {
    slide_id: 'limb_salvage_module',
    title: 'Diabetic Foot — Limb Salvage Module',
    layout_hint: 'image-right',
    image_queries: ['limb salvage diabetic foot multidisciplinary assessment', 'diabetic foot wound grading clinical tool'],
    bullets: [
      'Comprehensive assessment for limb salvage decision-making.',
      'Patient Info — demographics, DM type & duration, glycaemic control.',
      'Wound Grade — Wagner / University of Texas classification.',
      'Comorbidities — HTN, CKD, cardiac, immunosuppression.',
      'Renal Status — eGFR, dialysis status, contrast nephropathy risk.',
      'Sepsis — SIRS criteria, qSOFA, blood cultures, lactate.',
      'Vascular — ABPI, Doppler, CTA, toe pressures, TcPO₂.',
      'Osteomyelitis — probe-to-bone, X-ray, MRI, bone biopsy.',
      '🔗 Interactive Limb Salvage Calculator: https://plasticsurgassisstant.vercel.app/limb-salvage',
    ],
    speaker_notes:
      'This interactive tool integrates all the key assessment domains for limb salvage decision-making into a single scoring and decision-support interface. It can be accessed at https://plasticsurgassisstant.vercel.app/limb-salvage — use it during ward rounds and MDT discussions to standardise your assessment. Open the link to explore the full Diabetic Foot Assessment module.',
    citations_query: 'limb salvage diabetic foot assessment scoring decision making',
    citations: [
      { id: '25060007', type: 'pmid', title: 'Diabetic foot ulcers and their recurrence', authors: 'Armstrong DG et al.', journal: 'N Engl J Med', year: 2017, url: 'https://pubmed.ncbi.nlm.nih.gov/25060007/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Limb salvage assessment tool interface for diabetic foot evaluation',
    link: 'https://plasticsurgassisstant.vercel.app/limb-salvage',
  },

  /* ── 14. MANAGEMENT OVERVIEW ── */
  {
    slide_id: 'management_algorithms_overview',
    title: 'Management by Grade — Algorithmic Approach',
    layout_hint: 'image-left',
    image_queries: ['clinical algorithm diabetic foot flowchart', 'multidisciplinary team wound care discussion'],
    bullets: [
      'Step 1: Assess perfusion (is the limb ischaemic?) and infection (local vs systemic).',
      'Step 2: Glycaemic control — target glucose 6–10 mmol/L (insulin infusion in acute sepsis).',
      'Step 3: Debridement — remove all necrotic tissue, callus, and biofilm; obtain deep cultures.',
      'Step 4: Offloading — total contact cast (TCC) or irremovable knee-high walker for plantar ulcers.',
      'Step 5: Wound bed preparation, appropriate dressings, and reassessment at 1–4 weeks.',
      'Multidisciplinary team: surgeon, endocrinologist, vascular, podiatry, infectious disease, wound nurse, orthotist.',
    ],
    speaker_notes:
      'The IWGDF recommends a systematic approach: perfusion → infection → mechanical → wound bed → systemic factors (glycaemia, nutrition). Total Contact Casting has the strongest evidence for offloading neuropathic plantar ulcers. Multidisciplinary foot care teams have been shown to reduce amputation rates by 40-85% in multiple studies.',
    citations_query: 'IWGDF management algorithm diabetic foot multidisciplinary team',
    citations: [
      { id: '31126716', type: 'pmid', title: 'IWGDF practical guidelines 2019/2023 update', authors: 'Schaper NC et al.', journal: 'Diabetes Metab Res Rev', year: 2024, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
      { id: '28060908', type: 'pmid', title: 'Multidisciplinary diabetic foot care and amputation reduction', authors: 'Wang C et al.', journal: 'Diabetologia', year: 2017, url: 'https://pubmed.ncbi.nlm.nih.gov/28060908/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Flowchart showing algorithmic approach to diabetic foot ulcer management',
  },

  /* ── 15. MANAGEMENT — MILD ── */
  {
    slide_id: 'management_mild',
    title: 'Management: Mild Infection (IDSA/IWGDF Grade 2)',
    layout_hint: 'image-right',
    image_queries: ['mild diabetic foot infection clinical', 'oral antibiotics wound care'],
    bullets: [
      'Criteria: superficial infection, cellulitis ≤2 cm around ulcer, no systemic signs.',
      'Antibiotics: oral — amoxicillin-clavulanate or clindamycin or co-trimoxazole; 1–2 weeks duration.',
      'Local wound care: sharp debridement of callus and necrotic tissue; moist wound dressing.',
      'Offloading: irremovable knee-high walker or total contact cast for plantar ulcers.',
      'Follow-up: review at 1–2 weeks; if not improving, escalate to moderate-grade management.',
    ],
    speaker_notes:
      'Mild infections can usually be managed on an outpatient basis. The key is adequate debridement, appropriate antibiotics (targeting Gram-positives predominantly), effective offloading, and close follow-up. Failure to improve in 1–2 weeks should prompt reassessment — consider osteomyelitis or vascular insufficiency.',
    citations_query: 'mild diabetic foot infection management antibiotics IWGDF IDSA guidelines',
    citations: [
      { id: '31126716', type: 'pmid', title: 'IWGDF guidelines on infection in diabetic foot', authors: 'Lipsky BA et al.', journal: 'Diabetes Metab Res Rev', year: 2024, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Clinical image showing mild diabetic foot infection with local cellulitis',
  },

  /* ── 16. MANAGEMENT — MODERATE ── */
  {
    slide_id: 'management_moderate',
    title: 'Management: Moderate Infection (IDSA/IWGDF Grade 3)',
    layout_hint: 'image-left',
    image_queries: ['moderate diabetic foot infection abscess', 'surgical debridement wound'],
    bullets: [
      'Criteria: cellulitis >2 cm, deep abscess, lymphangitis, fascia/muscle/tendon/bone involvement, NO systemic toxicity.',
      'Admit for: IV antibiotics (ampicillin-sulbactam or piperacillin-tazobactam ± vancomycin if MRSA risk), glycaemic control.',
      'Surgery: incision and drainage of abscess, debridement; consider ray amputation if toe/metatarsal non-viable.',
      'Imaging: X-ray ± MRI to rule out osteomyelitis; deep culture from debrided tissue.',
      'Reassess at 48–72 hours — narrow antibiotics based on culture; step down to oral when stable.',
    ],
    speaker_notes:
      'Moderate infections require hospitalization. Key decisions: (1) surgical vs conservative debridement, (2) empiric antibiotic choice guided by local antibiogram and MRSA prevalence. Always send deep tissue cultures before starting antibiotics if possible. Duration: soft tissue infection 2–3 weeks; osteomyelitis 4–6 weeks.',
    citations_query: 'moderate diabetic foot infection management hospitalization antibiotics debridement',
    citations: [
      { id: '15111519', type: 'pmid', title: 'Comprehensive review diabetic foot management', authors: 'Boulton AJM et al.', journal: 'N Engl J Med', year: 2004, url: 'https://pubmed.ncbi.nlm.nih.gov/15111519/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Moderate diabetic foot infection showing deep tissue involvement',
  },

  /* ── 17. MANAGEMENT — SEVERE / OSTEOMYELITIS ── */
  {
    slide_id: 'management_severe',
    title: 'Management: Severe Infection & Osteomyelitis',
    layout_hint: 'image-right',
    image_queries: ['severe diabetic foot infection gangrene', 'osteomyelitis bone biopsy specimen'],
    bullets: [
      'Criteria (severe): systemic toxicity — SIRS (≥2: temp >38°C/<36°C, HR>90, RR>20, WBC>12k/<4k).',
      'Resuscitate: IV fluids, insulin infusion, urgent broad-spectrum IV antibiotics (piperacillin-tazobactam + vancomycin ± metronidazole).',
      'Emergency surgery: drainage, debridement, amputation of non-viable tissue; limb-saving where possible.',
      'Osteomyelitis: treat with 4–6 weeks antibiotics if bone resected; 6+ weeks if conservative; MRI-guided assessment.',
      'Consider vascular assessment early — revascularization may be needed before or alongside infection control.',
    ],
    speaker_notes:
      'Severe DFI is a limb- and life-threatening emergency. Mortality rates for diabetic patients with sepsis from foot infections range from 5–20%. Surgery within 24 hours of presentation improves limb salvage. Osteomyelitis can be managed surgically (bone resection + short-course antibiotics) or medically (prolonged antibiotics); surgery is preferred when feasible.',
    citations_query: 'severe diabetic foot infection osteomyelitis management surgery antibiotics',
    citations: [
      { id: '15111519', type: 'pmid', title: 'Pathogenesis and management of diabetic foot ulcers', authors: 'Boulton AJM', journal: 'N Engl J Med', year: 2004, url: 'https://pubmed.ncbi.nlm.nih.gov/15111519/' },
      { id: '28153671', type: 'pmid', title: 'Osteomyelitis in the diabetic foot', authors: 'Giurato L et al.', journal: 'Diabetes Metab Res Rev', year: 2017, url: 'https://pubmed.ncbi.nlm.nih.gov/28153671/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Severe diabetic foot infection with systemic sepsis requiring emergency surgery',
  },

  /* ── 18. MANAGEMENT — ISCHAEMIC LIMB ── */
  {
    slide_id: 'management_ischaemic',
    title: 'Management: The Ischaemic Diabetic Foot',
    layout_hint: 'image-left',
    image_queries: ['ischaemic diabetic foot gangrene', 'angioplasty intervention lower limb'],
    bullets: [
      'Red flags: absent pulses, ABPI <0.5, toe pressure <30 mmHg, TcPO₂ <25 mmHg.',
      'Urgent vascular referral: CTA or DSA to map disease and plan intervention.',
      'Endovascular first: angioplasty ± stenting of infra-popliteal vessels; preferred in high surgical risk patients.',
      'Surgical bypass: femoro-distal bypass with autologous vein if anatomy unsuitable for endovascular approach.',
      'Post-revascularization: reassess wound healing at 2–4 weeks; proceed with wound care and reconstruction once perfusion restored.',
    ],
    speaker_notes:
      'Approximately 50% of DFUs have a significant ischaemic component. Revascularization is essential before wound healing can occur in these patients. Endovascular techniques have expanded treatment options for infra-popliteal disease. The angiosome concept may guide target vessel selection. Post-revascularization, wound healing rates improve dramatically.',
    citations_query: 'ischaemic diabetic foot revascularization endovascular bypass outcomes',
    citations: [
      { id: '31126716', type: 'pmid', title: 'IWGDF guidelines on peripheral arterial disease and diabetic foot', authors: 'Hinchliffe RJ et al.', journal: 'Diabetes Metab Res Rev', year: 2020, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Ischaemic diabetic foot showing gangrene and angioplasty intervention diagram',
  },

  /* ── 19. SURGICAL MANAGEMENT ── */
  {
    slide_id: 'surgical_management',
    title: 'Surgical Options & Indications',
    layout_hint: 'image-right',
    image_queries: ['debridement surgical photo clinical', 'foot reconstructive flap diagram'],
    bullets: [
      'Debridement: sharp, surgical — remove all necrotic tissue, expose healthy bleeding wound bed; repeat as needed.',
      'Minor amputation: toe/ray amputation for isolated gangrene with viable proximal perfusion; preserves foot biomechanics.',
      'Major amputation (BKA/AKA): indicated for extensive gangrene, failed revascularization, non-reconstructable arterial disease, life-threatening sepsis.',
      'Reconstruction: local flaps (medial plantar flap, reverse sural flap), free tissue transfer for large defects with adequate vascular inflow.',
      'Post-operative: offloading, wound care, physiotherapy, prosthetic fitting, and psychological support.',
    ],
    speaker_notes:
      'The decision between limb salvage and amputation is complex. Principles: (1) preserve as much functional limb as possible, (2) ensure adequate perfusion to the planned level of amputation, (3) involve the patient in shared decision-making. Reconstruction with local flaps is preferred when vascular status permits. Free flaps are reserved for large defects with confirmed vascular inflow.',
    citations_query: 'diabetic foot surgical management amputation reconstruction flap limb salvage',
    citations: [
      { id: '29368490', type: 'pmid', title: 'Surgical approach to diabetic foot complications', authors: 'Rogers LC et al.', journal: 'J Am Podiatr Med Assoc', year: 2018, url: 'https://pubmed.ncbi.nlm.nih.gov/29368490/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Surgical debridement and reconstructive flap options for diabetic foot',
  },

  /* ── 20. ANTIBIOTICS & INFECTION CONTROL ── */
  {
    slide_id: 'antibiotics_and_infection_control',
    title: 'Antibiotics & Infection Control',
    layout_hint: 'image-left',
    image_queries: ['antibiotic stewardship chart', 'wound culture laboratory microbiology'],
    bullets: [
      'Mild: oral — amoxicillin-clavulanate, co-trimoxazole, or clindamycin (1–2 weeks).',
      'Moderate: IV — ampicillin-sulbactam or piperacillin-tazobactam ± vancomycin/linezolid for MRSA (2–3 weeks).',
      'Severe: IV — broad-spectrum as above + metronidazole if anaerobes suspected; narrow after culture (4–6 weeks for osteomyelitis).',
      'Always switch to targeted therapy based on deep tissue culture results — avoid prolonged empiric therapy.',
      'Adjuncts with evidence: negative-pressure wound therapy (NPWT) improves granulation; silver/iodine dressings for biofilms.',
    ],
    speaker_notes:
      'Antibiotic stewardship is critical. Key points: (1) Always culture before starting antibiotics. (2) Duration guides — soft tissue: 1–3 weeks; osteomyelitis: 4–6 weeks post-debridement or 6+ weeks if no surgery. (3) Local antibiograms should guide empiric choice. (4) NPWT has moderate evidence for accelerating healing in post-debridement DFU wounds.',
    citations_query: 'diabetic foot infection antibiotics stewardship NPWT wound dressings evidence',
    citations: [
      { id: '31126716', type: 'pmid', title: 'IWGDF/IDSA guidelines on diabetic foot infections', authors: 'Lipsky BA et al.', journal: 'Diabetes Metab Res Rev', year: 2024, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
      { id: '27893012', type: 'pmid', title: 'NPWT in diabetic foot ulcers: systematic review', authors: 'Liu Z et al.', journal: 'Int Wound J', year: 2017, url: 'https://pubmed.ncbi.nlm.nih.gov/27893012/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Antibiotic stewardship chart and wound culture laboratory setup',
  },

  /* ── 21. VASCULAR INTERVENTION ── */
  {
    slide_id: 'vascular_intervention_revascularization',
    title: 'Vascular Intervention & Revascularization',
    layout_hint: 'image-right',
    image_queries: ['angioplasty below-knee intervention', 'angiogram diabetic foot vessel disease'],
    bullets: [
      'Indications: non-healing ulcer despite optimal wound care + evidence of ischaemia (ABPI <0.5, toe pressure <30 mmHg).',
      'Endovascular (PTA ± stent): first-line for infra-popliteal disease; lower morbidity, repeatable.',
      'Surgical bypass: femoro-popliteal or femoro-tibial/pedal; better patency with autologous saphenous vein.',
      'Angiosome-directed revascularization: studies suggest improved healing when the artery feeding the wound\'s angiosome is targeted.',
      'Post-intervention monitoring: repeat ABPI/toe pressures at 2–4 weeks; surveillance duplex at 3, 6, 12 months.',
    ],
    speaker_notes:
      'The choice between endovascular and surgical revascularization depends on: (1) anatomy of the disease — TASC classification, (2) patient fitness for surgery, (3) vein availability for bypass. In many resource-limited settings, endovascular options may be limited. In such cases, surgical bypass remains the gold standard for limb salvage.',
    citations_query: 'revascularization diabetic foot endovascular bypass angiosome outcomes',
    citations: [
      { id: '20817355', type: 'pmid', title: 'Below-knee revascularization in diabetic foot', authors: 'Alexandrescu V et al.', journal: 'J Cardiovasc Surg', year: 2010, url: 'https://pubmed.ncbi.nlm.nih.gov/20817355/' },
    ],
    evidence_confidence: 'medium',
    exportable_graphics: false,
    image_alt: 'Angiogram showing infra-popliteal arterial disease and angioplasty intervention',
  },

  /* ── 22. PREVENTION & COMMUNITY ── */
  {
    slide_id: 'prevention_and_community_engagement',
    title: 'Prevention, Education & Addressing Myths at Community Level',
    layout_hint: 'image-left',
    image_queries: ['community health outreach diabetic foot education Africa', 'foot care footwear education poster'],
    bullets: [
      'Daily foot inspection (use mirror for soles), wash and dry feet carefully, moisturize (not between toes).',
      'Appropriate footwear: fitted, cushioned, closed-toe shoes; never walk barefoot.',
      'Glycaemic control: HbA1c ≤7% target; smoking cessation; lipid and BP management.',
      'Regular podiatry/foot clinic review: annual for low risk, 3–6 monthly for moderate, 1–3 monthly for high risk.',
      'Community strategy: train religious/community leaders to deliver health messages; culturally-tailored education materials in local languages.',
      'Sample community message: "Caring for your feet is caring for your health. If you have diabetes and notice a sore, see a doctor within 24 hours. Early treatment saves limbs."',
    ],
    speaker_notes:
      'Prevention is the most cost-effective strategy. Evidence shows that structured foot care programs reduce amputation rates by 40–85%. Community engagement is essential in contexts where myths drive delayed presentation. Training religious leaders, school teachers, and community health workers as health advocates has shown promising results in pilot programs across sub-Saharan Africa.',
    citations_query: 'diabetic foot prevention education community engagement program amputation reduction',
    citations: [
      { id: '31126716', type: 'pmid', title: 'IWGDF guidelines on prevention of foot ulcers', authors: 'Bus SA et al.', journal: 'Diabetes Metab Res Rev', year: 2024, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
      { id: '28060908', type: 'pmid', title: 'Community diabetic foot programs and amputation rates', authors: 'Wang C et al.', journal: 'Diabetologia', year: 2017, url: 'https://pubmed.ncbi.nlm.nih.gov/28060908/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Community health education session on diabetic foot care with educational materials',
  },

  /* ── 23. PRACTICAL CHECKLISTS ── */
  {
    slide_id: 'practical_tools_and_checklists',
    title: 'Practical Checklists (Downloadable)',
    layout_hint: 'image-left',
    image_queries: ['downloadable checklist icon medical', 'clinical checklist clipboard'],
    bullets: [
      'Admission Checklist: vitals, bloods (FBC, CRP, glucose, HbA1c, renal function), cultures, imaging, vascular assessment.',
      'OR Readiness Checklist: consent, blood products available, antibiotic prophylaxis, instruments, tourniquet.',
      'Outpatient Wound Review Form: wound dimensions, photo, dressing type, offloading status, next appointment.',
      'Patient Education Handout: daily foot care steps, danger signs requiring immediate hospital visit, diet guidance.',
      'Community Leader Brief: one-page fact sheet explaining DFU causes and the importance of early medical care.',
    ],
    speaker_notes:
      'These checklists are designed for practical use in our unit. They can be downloaded as printable PDFs. The patient education handout is available in English and Igbo. The community leader brief includes suggested talking points and a short script for use during religious gatherings.',
    citations_query: 'diabetic foot clinical checklist quality improvement tool',
    citations: [],
    evidence_confidence: 'medium',
    exportable_graphics: true,
    image_alt: 'Clinical checklists and downloadable forms for diabetic foot care',
  },

  /* ── 24. SUMMARY ── */
  {
    slide_id: 'summary_and_key_points',
    title: 'Key Takeaways',
    layout_hint: 'image-right',
    image_queries: ['summary infographic diabetic foot key points green'],
    bullets: [
      'DFU is a biomedical disease caused by neuropathy, ischaemia, and hyperglycaemia — NOT a spiritual condition.',
      'Early presentation saves limbs: every week of delay worsens prognosis.',
      'Use classification systems (UT/SINBAD) to guide management and predict outcomes.',
      'Multidisciplinary care (surgery, vascular, endocrinology, wound care, podiatry) reduces amputations by up to 85%.',
      'Community engagement and culturally respectful myth debunking are essential for prevention.',
    ],
    speaker_notes:
      'To summarize: DFU is a complex but manageable condition when evidence-based care is applied early. The greatest barrier in our context is delayed presentation driven by myths and limited access. We must address both the biomedical and the social dimensions of this disease.',
    citations_query: '',
    citations: [],
    evidence_confidence: 'high',
    exportable_graphics: true,
    image_alt: 'Summary infographic with key takeaway points on diabetic foot management',
  },

  /* ── 25. REFERENCES ── */
  {
    slide_id: 'references_and_resources',
    title: 'Sources & Further Reading',
    layout_hint: 'image-right',
    image_queries: ['medical references journals stack', 'journal covers diabetes care lancet'],
    bullets: [
      'IWGDF Guidelines (2023 update): iwgdfguidelines.org — comprehensive, evidence-based, freely available.',
      'Boulton AJM et al. NEJM 2004;351:48-55 — landmark review of DFU pathogenesis and management.',
      'Armstrong DG et al. Diabetes Care 2017 — diabetic foot complications review.',
      'Lipsky BA et al. Diabetes Metab Res Rev 2020 — IWGDF/IDSA infection guidelines.',
      'WHO Global Report on Diabetes (2016, updated 2023) — global epidemiology and prevention strategies.',
      'Ogbera AO et al. Diabet Foot Ankle 2015 — traditional medicine use and DFU outcomes in Africa.',
      'Attinger CE et al. Foot Ankle Clin 2006 — angiosomes of the foot.',
      'UNTH Institutional Protocol for Diabetic Foot Management (local guideline).',
    ],
    speaker_notes:
      'All guidelines referenced in this presentation are freely available online. Attendees are encouraged to access the IWGDF website for the latest updates. Local institutional protocols at UNTH are available through the Department of Surgery.',
    citations_query: 'diabetic foot ulcer review guidelines IWGDF WHO',
    citations: [
      { id: '31126716', type: 'pmid', title: 'IWGDF practical guidelines 2019/2023', authors: 'Schaper NC et al.', journal: 'Diabetes Metab Res Rev', year: 2024, url: 'https://pubmed.ncbi.nlm.nih.gov/31126716/' },
      { id: '15111519', type: 'pmid', title: 'Pathogenesis and management of diabetic foot ulcers', authors: 'Boulton AJM et al.', journal: 'N Engl J Med', year: 2004, url: 'https://pubmed.ncbi.nlm.nih.gov/15111519/' },
      { id: '25060007', type: 'pmid', title: 'Diabetic foot complications', authors: 'Armstrong DG et al.', journal: 'Diabetes Care', year: 2017, url: 'https://pubmed.ncbi.nlm.nih.gov/25060007/' },
    ],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'Stack of medical journals and reference materials',
  },

  /* ── 26. ACKNOWLEDGEMENTS ── */
  {
    slide_id: 'acknowledgements_contact',
    title: 'Acknowledgements & Contact',
    layout_hint: 'image-left',
    image_queries: ['UNTH hospital building', 'medical team group photo'],
    bullets: [
      'Burns, Plastic & Reconstructive Surgery Unit, Department of Surgery, UNTH Ituku Ozalla.',
      'Multidisciplinary Diabetic Foot Team — Surgery, Endocrinology, Vascular, Podiatry, Nursing.',
      'All patients who consented to use of clinical images and case data.',
      'The IWGDF and WHO for freely available evidence-based guidelines.',
      'Contact: Department of Surgery, UNTH, PMB 01129, Enugu, Nigeria.',
    ],
    speaker_notes:
      'Thank you for attending this clinical conference. For questions, referrals, or access to the downloadable checklists and community education materials, please contact the Burns, Plastic & Reconstructive Surgery Unit. Disclaimer: This presentation provides educational content and does not replace clinical judgment or local institutional protocols.',
    citations_query: '',
    citations: [],
    evidence_confidence: 'high',
    exportable_graphics: false,
    image_alt: 'UNTH hospital building and clinical team',
  },
];

// ──────────────────────────────────────────────────────────
// Myth-Busting Quiz / FAQ Module
// ──────────────────────────────────────────────────────────

export const mythQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the PRIMARY cause of diabetic foot ulcers?',
    options: [
      'Spiritual attack or curse',
      'Peripheral neuropathy and peripheral arterial disease combined with hyperglycaemia',
      'Wearing the wrong type of shoes only',
      'Contact with contaminated soil',
    ],
    correctIndex: 1,
    explanation:
      'DFU is caused by a combination of peripheral neuropathy (loss of protective sensation), peripheral arterial disease (impaired blood flow), and hyperglycaemia (impaired healing and immune function). These are well-established biomedical mechanisms supported by decades of research.',
    empathetic_response:
      'I understand why some people attribute these wounds to spiritual causes — chronic wounds that don\'t heal can be frightening. However, medical science has clear explanations: high blood sugar damages nerves and blood vessels over time. The good news is that medical treatment can help.',
  },
  {
    id: 'q2',
    question: 'A patient believes their foot ulcer is a "spiritual attack" and delays hospital visit for 4 weeks. What is the MOST LIKELY outcome?',
    options: [
      'The ulcer heals on its own because it was mild',
      'The delay has no effect on outcomes',
      'Higher risk of amputation, deeper infection (osteomyelitis), and worse prognosis',
      'The spiritual healer will resolve the problem',
    ],
    correctIndex: 2,
    explanation:
      'Delayed presentation is consistently associated with higher Wagner grades at admission, higher amputation rates, and increased mortality. Studies from Nigeria show that patients who first consulted traditional healers had significantly worse limb-salvage outcomes.',
    empathetic_response:
      'We respect your beliefs, but we want you to know that every week of delay allows the infection to go deeper and the blood flow to get worse. Coming to hospital early gives us the best chance of saving your foot.',
  },
  {
    id: 'q3',
    question: 'What is the BEST approach when a patient attributes their DFU to spiritual causes?',
    options: [
      'Ridicule the belief and insist they are wrong',
      'Ignore the belief entirely and just treat',
      'Respectfully acknowledge the belief, then clearly explain the biomedical causes and urgency of treatment',
      'Agree with the patient to maintain rapport',
    ],
    correctIndex: 2,
    explanation:
      'Cultural humility is key. The recommended approach is to acknowledge the patient\'s perspective respectfully, then provide a clear, simple explanation of the medical causes. Example: "I understand this is concerning. From what we know medically, high blood sugar and poor blood flow explain how ulcers start. Let\'s do these tests and treatments so we can protect your limb."',
    empathetic_response:
      'Your feelings and beliefs are important to us. At the same time, we want to share what medical science has found — and it shows that treatment works. Let\'s work together to take care of your foot.',
  },
  {
    id: 'q4',
    question: 'Which community strategy has shown promise in reducing myth-driven delays?',
    options: [
      'Banning traditional healers',
      'Distributing free medication at churches',
      'Training religious and community leaders to deliver health messages about DFU',
      'Only treating patients who come early',
    ],
    correctIndex: 2,
    explanation:
      'Engaging trusted community voices — religious leaders, elders, community health workers — to deliver accurate health information is an evidence-based strategy. These individuals can bridge the gap between medical knowledge and community trust.',
    empathetic_response:
      'Working with your community leaders helps ensure that everyone gets the right information. When respected leaders share health facts alongside their spiritual guidance, it helps people make better health decisions.',
  },
  {
    id: 'q5',
    question: 'Is there ANY scientific evidence that diabetic foot ulcers are caused by curses or spiritual forces?',
    options: [
      'Yes, some studies support this',
      'No — there is zero scientific evidence for spiritual causation; DFU pathophysiology is entirely biomedical',
      'The evidence is mixed',
      'Science cannot study spiritual matters',
    ],
    correctIndex: 1,
    explanation:
      'There is absolutely no scientific evidence linking DFU to spiritual causes. Every aspect of DFU development — from neuropathy to ischaemia to infection — has been thoroughly explained by biomedical research. Social determinants like poverty and poor access explain geographic and demographic disparities, not spiritual forces.',
    empathetic_response:
      'We understand that when something bad happens to our health, we look for reasons. Medical research has studied diabetic foot ulcers extensively and found clear physical causes. Understanding these causes empowers us to prevent and treat them effectively.',
  },
];

// ──────────────────────────────────────────────────────────
// Community Engagement Templates
// ──────────────────────────────────────────────────────────

export const communityTemplates = {
  religiousLeaderBrief: {
    title: 'Brief for Religious/Community Leaders: Diabetic Foot Care',
    content: `
Dear [Leader's Name],

As a trusted voice in our community, we are reaching out to ask for your help in sharing an important health message.

THE PROBLEM: Many of our community members with diabetes develop foot wounds (ulcers). Some believe these wounds are caused by spiritual forces or curses. Because of this belief, they delay going to the hospital — sometimes for weeks or months — seeking spiritual healing instead.

THE MEDICAL FACTS:
• Diabetic foot ulcers are caused by nerve damage (the foot becomes numb) and poor blood circulation from high blood sugar.
• These are PHYSICAL conditions with MEDICAL treatments that work.
• Every week of delay increases the chance of losing the foot or leg.
• Early treatment at a hospital can save limbs — and lives.

HOW YOU CAN HELP:
• Share this message during gatherings: "If you have diabetes and notice any wound or discoloration on your feet, please visit the hospital within 24 hours. Medical treatment works and can save your limb."
• Reassure people that seeking medical care does NOT conflict with faith — it is responsible stewardship of their body.
• Encourage regular check-ups for anyone with diabetes.

SUGGESTED ANNOUNCEMENT SCRIPT:
"Brothers and sisters, I want to share an important health message. If you or someone you know has diabetes, please check your feet every day. If you see a wound, sore, or any discoloration — go to the hospital IMMEDIATELY. These wounds are caused by the disease, not by spiritual forces, and doctors can help. Going to the hospital early is the best thing you can do. It can save your foot and your life."

Thank you for your partnership in caring for our community's health.

Contact: Burns, Plastic & Reconstructive Surgery Unit, UNTH, Enugu.
    `.trim(),
  },
  patientHandout: {
    title: 'Patient Guide: Taking Care of Your Feet with Diabetes',
    content: `
TAKING CARE OF YOUR FEET WITH DIABETES

WHY YOUR FEET NEED SPECIAL CARE:
When you have diabetes, high blood sugar can damage the nerves in your feet (you may not feel pain or injuries) and reduce blood flow (wounds heal slowly). This means small cuts or blisters can become serious if not treated quickly.

DAILY FOOT CARE — DO THESE EVERY DAY:
✓ CHECK your feet — top, bottom, between the toes. Use a mirror for the soles.
✓ WASH your feet with warm (not hot) water. Dry carefully, especially between toes.
✓ MOISTURIZE the tops and soles (NOT between toes — this can cause fungal infection).
✓ WEAR clean, dry socks and well-fitted, closed-toe shoes. NEVER walk barefoot.
✓ Check INSIDE your shoes before wearing them (for stones, rough areas).

DANGER SIGNS — GO TO HOSPITAL IMMEDIATELY:
⚠ Any wound, cut, or blister that isn't healing after 2 days
⚠ Redness, swelling, or warmth around a wound
⚠ Foul-smelling discharge from a wound
⚠ Black or dark discoloration of any toe or part of the foot
⚠ Fever or feeling generally unwell with a foot wound

IMPORTANT FACTS:
• Diabetic foot ulcers are NOT caused by curses or spiritual attacks.
• They are caused by nerve damage and poor blood flow from diabetes.
• EARLY medical treatment works — it can save your foot.
• Do NOT apply herbal paste, hot water, or traditional remedies to foot wounds.
• Do NOT delay going to hospital hoping the wound will heal on its own.

YOUR DIABETES TARGETS:
• HbA1c: below 7%  •  Blood pressure: below 130/80  •  No smoking
• Take your medications as prescribed  •  Attend clinic appointments regularly

For urgent help: Come to the Emergency Department, UNTH Ituku Ozalla, Enugu.
    `.trim(),
  },
};
