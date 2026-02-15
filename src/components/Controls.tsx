import React from 'react';

interface ControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onToggleNotes: () => void;
  onToggleJump: () => void;
  onToggleAutoplay: () => void;
  onExportPDF: () => void;
  onRefreshEvidence: () => void;
  onShowQuiz: () => void;
  autoplay: boolean;
  isFirst: boolean;
  isLast: boolean;
  showNotes: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onPrev,
  onNext,
  onToggleNotes,
  onToggleJump,
  onToggleAutoplay,
  onExportPDF,
  onRefreshEvidence,
  onShowQuiz,
  autoplay,
  isFirst,
  isLast,
  showNotes,
}) => {
  return (
    <>
    {/* ── Left-side nav: Previous ── */}
    <button
      className="slide-nav-btn slide-nav-prev"
      onClick={onPrev}
      disabled={isFirst}
      aria-label="Previous slide"
      title="Previous (←)"
      style={{ opacity: isFirst ? 0.3 : 1 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {/* ── Right-side nav: Next ── */}
    <button
      className="slide-nav-btn slide-nav-next"
      onClick={onNext}
      disabled={isLast}
      aria-label="Next slide"
      title="Next (→)"
      style={{ opacity: isLast ? 0.3 : 1 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* ── Center toolbar: utility buttons ── */}
    <div className="slide-controls" role="toolbar" aria-label="Slide controls">
      {/* Autoplay */}
      <button
        onClick={onToggleAutoplay}
        aria-label={autoplay ? 'Stop autoplay' : 'Start autoplay'}
        title={autoplay ? 'Stop autoplay' : 'Autoplay'}
        style={{ background: autoplay ? '#0b8a3e' : undefined, color: autoplay ? 'white' : undefined }}
      >
        {autoplay ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Speaker Notes */}
      <button
        onClick={onToggleNotes}
        aria-label="Toggle speaker notes"
        title="Speaker notes (N)"
        style={{ background: showNotes ? '#0b8a3e' : undefined, color: showNotes ? 'white' : undefined }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </button>

      {/* Jump to slide */}
      <button
        onClick={onToggleJump}
        aria-label="Jump to slide"
        title="Jump to slide (J)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Quiz */}
      <button
        onClick={onShowQuiz}
        aria-label="Open myth-busting quiz"
        title="Myth-busting quiz (Q)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01" />
        </svg>
      </button>

      {/* Refresh evidence */}
      <button
        onClick={onRefreshEvidence}
        aria-label="Refresh evidence from PubMed"
        title="Refresh evidence"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Export PDF */}
      <button
        onClick={onExportPDF}
        aria-label="Export to PDF"
        title="Export PDF"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>
    </div>
    </>
  );
};

export default Controls;
