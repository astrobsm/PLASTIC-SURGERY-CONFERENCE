import React from 'react';
import type { SlideData } from '../types';

interface JumpPanelProps {
  slides: SlideData[];
  currentIndex: number;
  visible: boolean;
  onJump: (index: number) => void;
  onClose: () => void;
}

const JumpPanel: React.FC<JumpPanelProps> = ({ slides, currentIndex, visible, onJump, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {visible && (
        <div
          className="fixed inset-0 bg-black/20 z-50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`jump-panel ${visible ? 'visible' : ''}`}
        role="navigation"
        aria-label="Slide navigator"
      >
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-bold text-sm text-neutral-800">Slides</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 text-sm"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <div className="pb-4">
          {slides.map((slide, i) => (
            <button
              key={slide.slide_id}
              className={`jump-panel-item w-full text-left ${i === currentIndex ? 'active' : ''}`}
              onClick={() => { onJump(i); onClose(); }}
              aria-current={i === currentIndex ? 'true' : undefined}
            >
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded text-xs flex items-center justify-center bg-neutral-100 text-neutral-500 font-mono">
                  {i + 1}
                </span>
                <span className="truncate">{slide.title.replace(/\n/g, ' ')}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default JumpPanel;
