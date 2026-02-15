import React from 'react';
import type { Citation } from '../types';

interface CitationModalProps {
  citations: Citation[];
  slideTitle: string;
  onClose: () => void;
}

const CitationModal: React.FC<CitationModalProps> = ({ citations, slideTitle, onClose }) => {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="View Sources"
    >
      <div className="modal-content">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-800">Sources</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-neutral-500 mb-4">
          Citations for: <em>{slideTitle}</em>
        </p>

        <ol className="space-y-3">
          {citations.map((cite, i) => (
            <li key={cite.id} className="text-sm border-b border-neutral-100 pb-3">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-neutral-800 leading-snug">{cite.title}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">
                    {cite.authors} — <em>{cite.journal}</em> ({cite.year})
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-primary-600">
                      {cite.type === 'pmid' ? `PMID: ${cite.id}` : `DOI: ${cite.id}`}
                    </span>
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-500 hover:text-primary-700 underline"
                    >
                      Open ↗
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {citations.length === 0 && (
          <p className="text-sm text-neutral-400 text-center py-4">
            No citations available for this slide.
          </p>
        )}
      </div>
    </div>
  );
};

export default CitationModal;
