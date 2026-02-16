import React, { useMemo, useRef, useCallback, useState } from 'react';
import type { SlideData, ImageStyle } from '../types';

const INSTITUTION_HEADER = 'Burns, Plastic & Reconstructive Surgery Unit, Department of Surgery, UNTH Ituku Ozalla.';

const DEFAULT_IMAGE_STYLE: ImageStyle = {
  objectFit: 'contain',
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};

interface SlideProps {
  slide: SlideData;
  slideIndex: number;
  totalSlides: number;
  animationClass: string;
  onShowCitations: () => void;
  onUpdateSlide: (updated: Partial<SlideData>) => void;
}

/** SVG icon for the image placeholder */
const PlaceholderIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
  </svg>
);

/** Camera / upload icon */
const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

/** Edit / crop icon */
const EditIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.744h-3.5a1.5 1.5 0 0 0-1.5 1.5v3.5m0 6.5v3.5a1.5 1.5 0 0 0 1.5 1.5h3.5m6.5 0h3.5a1.5 1.5 0 0 0 1.5-1.5v-3.5m0-6.5v-3.5a1.5 1.5 0 0 0-1.5-1.5h-3.5" />
  </svg>
);

const Slide: React.FC<SlideProps> = ({ slide, slideIndex, totalSlides, animationClass, onShowCitations, onUpdateSlide }) => {
  const isImageLeft = slide.layout_hint === 'image-left';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Image editor state ──
  const [showEditor, setShowEditor] = useState(false);
  const imgStyle = slide.imageStyle ?? DEFAULT_IMAGE_STYLE;
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const updateImageStyle = useCallback((patch: Partial<ImageStyle>) => {
    onUpdateSlide({ imageStyle: { ...imgStyle, ...patch } });
  }, [imgStyle, onUpdateSlide]);

  const confidenceColor = useMemo(() => {
    switch (slide.evidence_confidence) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  }, [slide.evidence_confidence]);

  const isCover = slide.slide_id === 'cover';

  // ── Image upload handler ──
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateSlide({
        image_alt: file.name,
        image_queries: [reader.result as string],
        imageStyle: { ...DEFAULT_IMAGE_STYLE },
      });
    };
    reader.readAsDataURL(file);
  }, [onUpdateSlide]);

  // ── Editable handlers ──
  const handleTitleBlur = useCallback((e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.innerText.trim();
    if (newTitle && newTitle !== slide.title.replace(/\n/g, ' ')) {
      onUpdateSlide({ title: newTitle });
    }
  }, [slide.title, onUpdateSlide]);

  const handleBulletBlur = useCallback((index: number, e: React.FocusEvent<HTMLSpanElement>) => {
    const newText = e.currentTarget.innerText.trim();
    if (newText !== slide.bullets[index]) {
      const updated = [...slide.bullets];
      updated[index] = newText;
      onUpdateSlide({ bullets: updated });
    }
  }, [slide.bullets, onUpdateSlide]);

  // ── Drag-to-reposition handlers ──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!showEditor) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, ox: imgStyle.offsetX, oy: imgStyle.offsetY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [showEditor, imgStyle.offsetX, imgStyle.offsetY]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragStart.current.x) / rect.width) * 100;
    const dy = ((e.clientY - dragStart.current.y) / rect.height) * 100;
    updateImageStyle({
      offsetX: Math.max(-50, Math.min(50, dragStart.current.ox + dx)),
      offsetY: Math.max(-50, Math.min(50, dragStart.current.oy + dy)),
    });
  }, [updateImageStyle]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Check if we have an uploaded image (data URL or http URL)
  const hasImage = slide.image_queries?.[0]?.startsWith('data:') || slide.image_queries?.[0]?.startsWith('http');

  /** Compute inline style for the image */
  const imageInlineStyle: React.CSSProperties = {
    objectFit: imgStyle.objectFit,
    transform: `scale(${imgStyle.scale}) translate(${imgStyle.offsetX}%, ${imgStyle.offsetY}%)`,
    cursor: showEditor ? 'grab' : 'default',
    transition: isDragging.current ? 'none' : 'transform 0.2s ease',
  };

  /** Render the image panel */
  const imagePanel = (
    <div
      className="slide-image-panel murphy-image"
      role="img"
      aria-label={slide.image_alt}
      ref={panelRef}
    >
      {/* ── Institutional Header ── */}
      <div className="image-panel-header">
        <span>{INSTITUTION_HEADER}</span>
      </div>

      {hasImage ? (
        /* Show uploaded / linked image */
        <img
          src={slide.image_queries[0]}
          alt={slide.image_alt}
          className="slide-image-display"
          style={imageInlineStyle}
          loading="lazy"
          draggable={false}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      ) : (
        /* Show placeholder with upload prompt */
        <div className="image-placeholder">
          <PlaceholderIcon />
          <span className="text-sm font-medium text-center px-4 opacity-70">
            {slide.image_queries?.[0] ?? 'Clinical Image'}
          </span>
        </div>
      )}

      {/* ── Image Editor Toolbar ── */}
      {hasImage && showEditor && (
        <div className="image-editor-toolbar" onClick={(e) => e.stopPropagation()}>
          {/* Fit mode buttons */}
          <div className="editor-row">
            <span className="editor-label">Fit</span>
            <div className="editor-btn-group">
              {(['contain', 'cover', 'fill'] as const).map((mode) => (
                <button
                  key={mode}
                  className={`editor-mode-btn ${imgStyle.objectFit === mode ? 'active' : ''}`}
                  onClick={() => updateImageStyle({ objectFit: mode })}
                  title={mode}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Scale slider */}
          <div className="editor-row">
            <span className="editor-label">Size</span>
            <input
              type="range"
              min="0.3"
              max="3"
              step="0.05"
              value={imgStyle.scale}
              onChange={(e) => updateImageStyle({ scale: parseFloat(e.target.value) })}
              className="editor-slider"
            />
            <span className="editor-value">{Math.round(imgStyle.scale * 100)}%</span>
          </div>

          {/* Position hint */}
          <div className="editor-row">
            <span className="editor-label-hint">Drag image to reposition</span>
            <button
              className="editor-reset-btn"
              onClick={() => onUpdateSlide({ imageStyle: { ...DEFAULT_IMAGE_STYLE } })}
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Action buttons overlay */}
      <div className="image-action-buttons">
        <button
          className="image-upload-btn"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload image for this slide"
          title="Upload or change image"
        >
          <UploadIcon />
          <span>{hasImage ? 'Change' : 'Upload'}</span>
        </button>
        {hasImage && (
          <button
            className={`image-edit-btn ${showEditor ? 'active' : ''}`}
            onClick={() => setShowEditor((v) => !v)}
            aria-label="Edit image size and crop"
            title="Edit size & crop"
          >
            <EditIcon />
            <span>{showEditor ? 'Done' : 'Edit'}</span>
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        aria-hidden="true"
      />
    </div>
  );

  /** Render the text panel */
  const textPanel = (
    <div className="slide-text-panel murphy-text">
      {/* Evidence badge */}
      {!isCover && slide.evidence_confidence && (
        <div className="mb-3">
          <span className={`evidence-badge ${confidenceColor}`}>
            {slide.evidence_confidence} evidence
          </span>
        </div>
      )}

      {/* Editable Title */}
      <h1
        className={`font-heading font-bold leading-tight mb-4 editable-field ${
          isCover ? 'text-3xl md:text-4xl text-primary-500' : 'text-2xl md:text-3xl text-neutral-900'
        }`}
        style={{ fontFamily: 'var(--font-heading)' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleTitleBlur}
        spellCheck={false}
        role="textbox"
        aria-label="Slide title — click to edit"
      >
        {slide.title.replace(/\n/g, ' ')}
      </h1>

      {/* Green accent bar */}
      <div className="w-16 h-1 bg-primary-500 rounded mb-5" />

      {/* Editable Bullets */}
      <ul className="space-y-3 mb-6">
        {slide.bullets.map((bullet, i) => {
          // Detect if bullet contains a URL and render it as a clickable link
          const urlMatch = bullet.match(/(https?:\/\/[^\s]+)/);
          return (
            <li key={i} className="murphy-bullet flex items-start gap-2.5 text-neutral-700 text-base leading-relaxed">
              <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary-400" />
              {urlMatch ? (
                <span className="flex-1">
                  {bullet.slice(0, urlMatch.index)}
                  <a
                    href={urlMatch[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 underline font-semibold hover:text-primary-800 transition-colors"
                  >
                    {urlMatch[1]}
                  </a>
                  {bullet.slice((urlMatch.index ?? 0) + urlMatch[1].length)}
                </span>
              ) : (
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleBulletBlur(i, e)}
                  spellCheck={false}
                  className="editable-field flex-1 outline-none"
                  role="textbox"
                  aria-label={`Bullet point ${i + 1} — click to edit`}
                >
                  {bullet}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Citation badge */}
      {slide.citations.length > 0 && (
        <button
          className="citation-badge"
          onClick={onShowCitations}
          aria-label={`View ${slide.citations.length} source citations`}
          title="View Sources"
        >
          📚 {slide.citations.length} source{slide.citations.length > 1 ? 's' : ''}
        </button>
      )}

      {/* Slide number (bottom-left of text panel) */}
      <div className="absolute bottom-4 left-8 text-xs text-neutral-400 font-medium">
        {slideIndex + 1} / {totalSlides}
      </div>

      {/* UNTH Logo Watermark — lower-right corner */}
      <img
        src="/logo-unth.png"
        alt="UNTH Logo"
        className="slide-watermark"
        aria-hidden="true"
        draggable={false}
      />
    </div>
  );

  return (
    <div
      className={`slide-grid ${animationClass}`}
      style={{ position: 'relative' }}
      role="region"
      aria-roledescription="slide"
      aria-label={`Slide ${slideIndex + 1} of ${totalSlides}: ${slide.title}`}
    >
      {isImageLeft ? (
        <>
          {imagePanel}
          {textPanel}
        </>
      ) : (
        <>
          {textPanel}
          {imagePanel}
        </>
      )}

      {/* ── UNTH Logo Watermark (lower-right) ── */}
      <img
        src="/logo-unth.png"
        alt=""
        aria-hidden="true"
        className="slide-watermark"
      />
    </div>
  );
};

export default Slide;
