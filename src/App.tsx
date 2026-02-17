import { useState, useEffect, useCallback, useRef } from 'react';
import Slide from './components/Slide';
import Controls from './components/Controls';
import SpeakerNotes from './components/SpeakerNotes';
import JumpPanel from './components/JumpPanel';
import CitationModal from './components/CitationModal';
import QuizModal from './components/QuizModal';
import { slides as defaultSlides, mythQuiz } from './data/slides';
import { cacheSlides, getCachedSlides, getLastUpdated } from './services/cache';
import { fetchCitationsForSlide } from './services/pubmed';
import { exportToPDF } from './services/pdfExport';
import type { SlideData } from './types';

function App() {
  const [slides, setSlides] = useState<SlideData[]>(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationClass, setAnimationClass] = useState('slide-enter-next');
  const [showNotes, setShowNotes] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const [showCitations, setShowCitations] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideRef = useRef<number>(currentSlide);

  // Keep ref in sync
  slideRef.current = currentSlide;

  // ── Content version (bump when slide data changes) ──
  const CONTENT_VERSION = 'v3';

  // ── Load cached slides on mount ──
  useEffect(() => {
    (async () => {
      try {
        const cached = await getCachedSlides();
        const cachedVersion = localStorage.getItem('dfu-content-version');
        if (cached.length === defaultSlides.length && cachedVersion === CONTENT_VERSION) {
          setSlides(cached);
        } else {
          // Cache is stale — re-cache from defaults
          await cacheSlides(defaultSlides);
          localStorage.setItem('dfu-content-version', CONTENT_VERSION);
        }
        const ts = await getLastUpdated();
        setLastUpdated(ts);
      } catch {
        // Use defaults
      }
    })();
  }, []);

  // ── Navigation ──
  const goTo = useCallback((index: number, direction: 'next' | 'prev' = 'next') => {
    if (index < 0 || index >= slides.length) return;
    setAnimationClass(direction === 'next' ? 'slide-enter-next' : 'slide-enter-prev');
    setCurrentSlide(index);
  }, [slides.length]);

  const goNext = useCallback(() => {
    if (slideRef.current < slides.length - 1) goTo(slideRef.current + 1, 'next');
  }, [slides.length, goTo]);

  const goPrev = useCallback(() => {
    if (slideRef.current > 0) goTo(slideRef.current - 1, 'prev');
  }, [goTo]);

  // ── Keyboard navigation ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goPrev();
          break;
        case 'n':
        case 'N':
          setShowNotes((v) => !v);
          break;
        case 'j':
        case 'J':
          setShowJump((v) => !v);
          break;
        case 'q':
        case 'Q':
          setShowQuiz((v) => !v);
          break;
        case 'Escape':
          setShowJump(false);
          setShowCitations(false);
          setShowQuiz(false);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0, 'prev');
          break;
        case 'End':
          e.preventDefault();
          goTo(slides.length - 1, 'next');
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, goTo, slides.length]);

  // ── Autoplay ──
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        if (slideRef.current < slides.length - 1) {
          goTo(slideRef.current + 1, 'next');
        } else {
          setAutoplay(false);
        }
      }, 8000);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, slides.length, goTo]);

  // ── Touch/swipe ──
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // ── Refresh evidence from PubMed ──
  const refreshEvidence = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const updated = await Promise.all(
        slides.map(async (slide) => {
          if (!slide.citations_query) return slide;
          const newCitations = await fetchCitationsForSlide(slide.citations_query, slide.citations);
          return { ...slide, citations: newCitations, last_updated: new Date().toISOString() };
        })
      );
      setSlides(updated);
      await cacheSlides(updated);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error('Evidence refresh failed:', err);
    }
    setIsRefreshing(false);
  }, [slides]);

  // ── Update a single slide (edits, image uploads) ──
  const handleUpdateSlide = useCallback((index: number, updates: Partial<SlideData>) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updates };
      return copy;
    });
  }, []);

  // ── Add a new blank slide after current ──
  const handleAddSlide = useCallback(() => {
    const newSlide: SlideData = {
      slide_id: `slide_${Date.now()}`,
      title: 'New Slide — Click to Edit',
      layout_hint: 'image-right',
      image_queries: [],
      bullets: ['Click to add your first point'],
      speaker_notes: '',
      citations_query: '',
      citations: [],
      evidence_confidence: 'medium',
      exportable_graphics: false,
      image_alt: 'Slide image',
    };
    setSlides((prev) => {
      const copy = [...prev];
      copy.splice(currentSlide + 1, 0, newSlide);
      return copy;
    });
    // Navigate to the new slide
    setTimeout(() => goTo(currentSlide + 1, 'next'), 50);
  }, [currentSlide, goTo]);

  // ── Duplicate current slide ──
  const handleDuplicateSlide = useCallback(() => {
    setSlides((prev) => {
      const copy = [...prev];
      const dup = { ...copy[currentSlide], slide_id: `slide_${Date.now()}` };
      copy.splice(currentSlide + 1, 0, dup);
      return copy;
    });
    setTimeout(() => goTo(currentSlide + 1, 'next'), 50);
  }, [currentSlide, goTo]);

  // ── Delete current slide ──
  const handleDeleteSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setSlides((prev) => {
      const copy = prev.filter((_, i) => i !== currentSlide);
      return copy;
    });
    setCurrentSlide((prev) => Math.min(prev, slides.length - 2));
  }, [currentSlide, slides.length]);

  // ── Export PDF ──
  const handleExportPDF = useCallback(() => {
    exportToPDF(slides, true);
  }, [slides]);

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="slide-container">
      {/* Progress bar */}
      <div className="slide-progress" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />

      {/* Slide counter + last updated */}
      <div className="slide-counter">
        {currentSlide + 1} / {slides.length}
        {lastUpdated && (
          <span className="ml-2 text-neutral-400" title={`Last updated: ${new Date(lastUpdated).toLocaleString()}`}>
            •
          </span>
        )}
        {isRefreshing && <span className="ml-1 text-primary-500 animate-pulse">⟳</span>}
      </div>

      {/* Current slide */}
      <Slide
        key={slide.slide_id + '-' + currentSlide}
        slide={slide}
        slideIndex={currentSlide}
        totalSlides={slides.length}
        animationClass={animationClass}
        onShowCitations={() => setShowCitations(true)}
        onUpdateSlide={(updates) => handleUpdateSlide(currentSlide, updates)}
      />

      {/* Speaker notes */}
      <SpeakerNotes notes={slide.speaker_notes} visible={showNotes} />

      {/* Controls */}
      <Controls
        onPrev={goPrev}
        onNext={goNext}
        onToggleNotes={() => setShowNotes((v) => !v)}
        onToggleJump={() => setShowJump((v) => !v)}
        onToggleAutoplay={() => setAutoplay((v) => !v)}
        onExportPDF={handleExportPDF}
        onRefreshEvidence={refreshEvidence}
        onShowQuiz={() => setShowQuiz(true)}
        onAddSlide={handleAddSlide}
        onDuplicateSlide={handleDuplicateSlide}
        onDeleteSlide={handleDeleteSlide}
        autoplay={autoplay}
        isFirst={currentSlide === 0}
        isLast={currentSlide === slides.length - 1}
        showNotes={showNotes}
        canDelete={slides.length > 1}
      />

      {/* Jump panel */}
      <JumpPanel
        slides={slides}
        currentIndex={currentSlide}
        visible={showJump}
        onJump={(i) => goTo(i, i > currentSlide ? 'next' : 'prev')}
        onClose={() => setShowJump(false)}
      />

      {/* Citation modal */}
      {showCitations && (
        <CitationModal
          citations={slide.citations}
          slideTitle={slide.title}
          onClose={() => setShowCitations(false)}
        />
      )}

      {/* Quiz modal */}
      {showQuiz && (
        <QuizModal
          questions={mythQuiz}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}

export default App;
