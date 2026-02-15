import React from 'react';

interface SpeakerNotesProps {
  notes: string;
  visible: boolean;
}

const SpeakerNotes: React.FC<SpeakerNotesProps> = ({ notes, visible }) => {
  return (
    <div
      className={`speaker-notes ${visible ? 'visible' : ''}`}
      role="complementary"
      aria-label="Speaker notes"
    >
      <div className="flex items-start gap-3 max-w-4xl mx-auto">
        <span className="text-lg mt-0.5">🎤</span>
        <div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">
            Speaker Notes
          </p>
          <p className="text-neutral-100 leading-relaxed">{notes}</p>
        </div>
      </div>
    </div>
  );
};

export default SpeakerNotes;
