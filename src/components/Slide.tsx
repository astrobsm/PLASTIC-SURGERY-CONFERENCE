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

/* ── SVG Icons ── */
const PlaceholderIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
  </svg>
);

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

const EditIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.744h-3.5a1.5 1.5 0 0 0-1.5 1.5v3.5m0 6.5v3.5a1.5 1.5 0 0 0 1.5 1.5h3.5m6.5 0h3.5a1.5 1.5 0 0 0 1.5-1.5v-3.5m0-6.5v-3.5a1.5 1.5 0 0 0-1.5-1.5h-3.5" />
  </svg>
);

const Slide: React.FC<SlideProps> = ({ slide, slideIndex, totalSlides, animationClass, onShowCitations, onUpdateSlide }) => {
  const isImageLeft = slide.layout_hint === 'image-left';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addFileInputRef = useRef<HTMLInputElement>(null);

  // ── Image carousel state ──
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Resolve which images are actual uploaded/linked images
  const uploadedImages = useMemo(() => {
    return (slide.image_queries ?? []).filter(q => q.startsWith('data:') || q.startsWith('http'));
  }, [slide.image_queries]);

  const hasImages = uploadedImages.length > 0;
  const safeIndex = Math.min(activeImageIndex, Math.max(0, uploadedImages.length - 1));
  const currentImgSrc = uploadedImages[safeIndex] ?? '';

  // Per-image styles
  const allImgStyles = slide.imageStyles ?? [];
  const currentImgStyle: ImageStyle = allImgStyles[safeIndex] ?? slide.imageStyle ?? DEFAULT_IMAGE_STYLE;

  const updateCurrentImageStyle = useCallback((patch: Partial<ImageStyle>) => {
    const styles = [...allImgStyles];
    while (styles.length <= safeIndex) styles.push({ ...DEFAULT_IMAGE_STYLE });
    styles[safeIndex] = { ...styles[safeIndex], ...patch };
    onUpdateSlide({ imageStyles: styles });
  }, [allImgStyles, safeIndex, onUpdateSlide]);

  const confidenceColor = useMemo(() => {
    switch (slide.evidence_confidence) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  }, [slide.evidence_confidence]);

  const isCover = slide.slide_id === 'cover';

  // ── Upload handler (replace current or first upload) ──
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (!hasImages) {
        onUpdateSlide({
          image_alt: file.name,
          image_queries: [dataUrl],
          imageStyles: [{ ...DEFAULT_IMAGE_STYLE }],
        });
      } else {
        const updated = [...slide.image_queries];
        const styles = [...allImgStyles];
        // Find the real index of the current uploaded image
        let realIdx = -1;
        let uploadCount = 0;
        for (let i = 0; i < updated.length; i++) {
          if (updated[i].startsWith('data:') || updated[i].startsWith('http')) {
            if (uploadCount === safeIndex) { realIdx = i; break; }
            uploadCount++;
          }
        }
        if (realIdx !== -1) {
          updated[realIdx] = dataUrl;
        }
        while (styles.length <= safeIndex) styles.push({ ...DEFAULT_IMAGE_STYLE });
        styles[safeIndex] = { ...DEFAULT_IMAGE_STYLE };
        onUpdateSlide({ image_queries: updated, imageStyles: styles });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [hasImages, slide.image_queries, allImgStyles, safeIndex, onUpdateSlide]);

  // ── Add additional image ──
  const handleAddImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const updated = [...slide.image_queries, dataUrl];
      const styles = [...allImgStyles, { ...DEFAULT_IMAGE_STYLE }];
      onUpdateSlide({ image_queries: updated, imageStyles: styles });
      const newUploadedCount = updated.filter(q => q.startsWith('data:') || q.startsWith('http')).length;
      setActiveImageIndex(newUploadedCount - 1);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [slide.image_queries, allImgStyles, onUpdateSlide]);

  // ── Remove current image ──
  const handleRemoveImage = useCallback(() => {
    if (uploadedImages.length <= 0) return;
    let realIdx = -1;
    let uploadCount = 0;
    for (let i = 0; i < slide.image_queries.length; i++) {
      if (slide.image_queries[i].startsWith('data:') || slide.image_queries[i].startsWith('http')) {
        if (uploadCount === safeIndex) { realIdx = i; break; }
        uploadCount++;
      }
    }
    if (realIdx === -1) return;
    const updated = slide.image_queries.filter((_, i) => i !== realIdx);
    const styles = allImgStyles.filter((_, i) => i !== safeIndex);
    onUpdateSlide({ image_queries: updated, imageStyles: styles });
    setActiveImageIndex(Math.max(0, safeIndex - 1));
  }, [uploadedImages, slide.image_queries, allImgStyles, safeIndex, onUpdateSlide]);

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

  // ── Bullet management ──
  const addBullet = useCallback(() => {
    onUpdateSlide({ bullets: [...slide.bullets, 'New point — click to edit'] });
  }, [slide.bullets, onUpdateSlide]);

  const removeBullet = useCallback((index: number) => {
    if (slide.bullets.length <= 1) return;
    onUpdateSlide({ bullets: slide.bullets.filter((_, i) => i !== index) });
  }, [slide.bullets, onUpdateSlide]);

  const moveBulletUp = useCallback((index: number) => {
    if (index === 0) return;
    const updated = [...slide.bullets];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onUpdateSlide({ bullets: updated });
  }, [slide.bullets, onUpdateSlide]);

  const moveBulletDown = useCallback((index: number) => {
    if (index >= slide.bullets.length - 1) return;
    const updated = [...slide.bullets];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onUpdateSlide({ bullets: updated });
  }, [slide.bullets, onUpdateSlide]);

  // ── Speaker notes editing ──
  const handleNotesBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    const newNotes = e.currentTarget.value;
    if (newNotes !== slide.speaker_notes) {
      onUpdateSlide({ speaker_notes: newNotes });
    }
  }, [slide.speaker_notes, onUpdateSlide]);

  // ── Drag-to-reposition handlers ──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!showEditor) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, ox: currentImgStyle.offsetX, oy: currentImgStyle.offsetY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [showEditor, currentImgStyle.offsetX, currentImgStyle.offsetY]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragStart.current.x) / rect.width) * 100;
    const dy = ((e.clientY - dragStart.current.y) / rect.height) * 100;
    updateCurrentImageStyle({
      offsetX: Math.max(-50, Math.min(50, dragStart.current.ox + dx)),
      offsetY: Math.max(-50, Math.min(50, dragStart.current.oy + dy)),
    });
  }, [updateCurrentImageStyle]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  /** Compute inline style for the current image */
  const imageInlineStyle: React.CSSProperties = {
    objectFit: currentImgStyle.objectFit,
    transform: `scale(${currentImgStyle.scale}) translate(${currentImgStyle.offsetX}%, ${currentImgStyle.offsetY}%)`,
    cursor: showEditor ? 'grab' : 'default',
    transition: isDragging.current ? 'none' : 'transform 0.2s ease',
  };

  /* ─────────────────────── IMAGE PANEL ─────────────────────── */
  const imagePanel = (
    <div
      className="slide-image-panel murphy-image"
      role="img"
      aria-label={slide.image_alt}
      ref={panelRef}
    >
      {hasImages ? (
        <>
          {/* Current image */}
          <img
            src={currentImgSrc}
            alt={slide.image_alt}
            className="slide-image-display"
            style={imageInlineStyle}
            loading="lazy"
            draggable={false}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />

          {/* ── Image counter badge ── */}
          {uploadedImages.length > 1 && (
            <div className="image-counter-badge">
              {safeIndex + 1} / {uploadedImages.length}
            </div>
          )}

          {/* ── Carousel navigation arrows ── */}
          {uploadedImages.length > 1 && (
            <>
              <button
                className="carousel-arrow carousel-arrow-left"
                onClick={() => setActiveImageIndex(Math.max(0, safeIndex - 1))}
                disabled={safeIndex === 0}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="carousel-arrow carousel-arrow-right"
                onClick={() => setActiveImageIndex(Math.min(uploadedImages.length - 1, safeIndex + 1))}
                disabled={safeIndex === uploadedImages.length - 1}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          {/* ── Dot indicators ── */}
          {uploadedImages.length > 1 && (
            <div className="carousel-dots">
              {uploadedImages.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === safeIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="image-placeholder">
          <PlaceholderIcon />
          <span className="text-sm font-medium text-center px-4 opacity-70">
            {slide.image_queries?.[0] ?? 'Clinical Image'}
          </span>
        </div>
      )}

      {/* ── Image Editor Toolbar ── */}
      {hasImages && showEditor && (
        <div className="image-editor-toolbar" onClick={(e) => e.stopPropagation()}>
          <div className="editor-row">
            <span className="editor-label">Fit</span>
            <div className="editor-btn-group">
              {(['contain', 'cover', 'fill'] as const).map((mode) => (
                <button
                  key={mode}
                  className={`editor-mode-btn ${currentImgStyle.objectFit === mode ? 'active' : ''}`}
                  onClick={() => updateCurrentImageStyle({ objectFit: mode })}
                  title={mode}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="editor-row">
            <span className="editor-label">Size</span>
            <input
              type="range"
              min="0.3"
              max="3"
              step="0.05"
              value={currentImgStyle.scale}
              onChange={(e) => updateCurrentImageStyle({ scale: parseFloat(e.target.value) })}
              className="editor-slider"
            />
            <span className="editor-value">{Math.round(currentImgStyle.scale * 100)}%</span>
          </div>
          <div className="editor-row">
            <span className="editor-label-hint">Drag image to reposition</span>
            <button
              className="editor-reset-btn"
              onClick={() => updateCurrentImageStyle({ ...DEFAULT_IMAGE_STYLE })}
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="image-action-buttons">
        <button
          className="image-upload-btn"
          onClick={() => fileInputRef.current?.click()}
          aria-label={hasImages ? 'Replace current image' : 'Upload image'}
          title={hasImages ? 'Replace this image' : 'Upload image'}
        >
          <UploadIcon />
          <span>{hasImages ? 'Replace' : 'Upload'}</span>
        </button>

        <button
          className="image-upload-btn"
          onClick={() => addFileInputRef.current?.click()}
          aria-label="Add another image"
          title="Add another image"
        >
          <span style={{ fontSize: '16px', lineHeight: 1 }}>+</span>
          <span>Add</span>
        </button>

        {hasImages && (
          <>
            <button
              className={`image-edit-btn ${showEditor ? 'active' : ''}`}
              onClick={() => setShowEditor((v) => !v)}
              aria-label="Edit image size and crop"
              title="Edit size & crop"
            >
              <EditIcon />
              <span>{showEditor ? 'Done' : 'Edit'}</span>
            </button>
            <button
              className="image-edit-btn image-remove-btn"
              onClick={handleRemoveImage}
              aria-label="Remove this image"
              title="Remove this image"
            >
              <span style={{ fontSize: '14px', lineHeight: 1 }}>✕</span>
              <span>Remove</span>
            </button>
          </>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        aria-hidden="true"
      />
      <input
        ref={addFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAddImage}
        aria-hidden="true"
      />
    </div>
  );

  /* ─────────────────────── TEXT PANEL ─────────────────────── */
  const textPanel = (
    <div className="slide-text-panel murphy-text">
      {/* ── Institutional Header ── */}
      <div className="text-panel-header">
        <span>{INSTITUTION_HEADER}</span>
      </div>

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

      {/* Editable Bullets with management controls */}
      <ul className="space-y-2 mb-4">
        {slide.bullets.map((bullet, i) => {
          const urlMatch = bullet.match(/(https?:\/\/[^\s]+)/);
          return (
            <li key={i} className="murphy-bullet bullet-editable-row">
              {/* Bullet controls (left) */}
              <div className="bullet-controls">
                <button
                  className="bullet-ctrl-btn"
                  onClick={() => moveBulletUp(i)}
                  disabled={i === 0}
                  title="Move up"
                  aria-label="Move bullet up"
                >▲</button>
                <button
                  className="bullet-ctrl-btn"
                  onClick={() => moveBulletDown(i)}
                  disabled={i === slide.bullets.length - 1}
                  title="Move down"
                  aria-label="Move bullet down"
                >▼</button>
                <button
                  className="bullet-ctrl-btn bullet-ctrl-remove"
                  onClick={() => removeBullet(i)}
                  disabled={slide.bullets.length <= 1}
                  title="Remove bullet"
                  aria-label="Remove bullet"
                >✕</button>
              </div>

              {/* Bullet dot */}
              <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary-400" />

              {/* Bullet text */}
              {urlMatch ? (
                <span className="flex-1 text-neutral-700 text-base leading-relaxed">
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
                  className="editable-field flex-1 outline-none text-neutral-700 text-base leading-relaxed"
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

      {/* Add bullet button */}
      <button
        className="add-bullet-btn"
        onClick={addBullet}
        title="Add a new bullet point"
        aria-label="Add bullet point"
      >
        + Add bullet
      </button>

      {/* Inline speaker notes editor */}
      <details className="slide-notes-editor">
        <summary className="notes-summary">Speaker Notes</summary>
        <textarea
          className="notes-textarea"
          defaultValue={slide.speaker_notes}
          onBlur={handleNotesBlur}
          placeholder="Enter speaker notes..."
          rows={3}
        />
      </details>

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

      {/* Slide number */}
      <div className="absolute bottom-4 left-8 text-xs text-neutral-400 font-medium">
        {slideIndex + 1} / {totalSlides}
      </div>

      {/* UNTH Logo Watermark */}
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
