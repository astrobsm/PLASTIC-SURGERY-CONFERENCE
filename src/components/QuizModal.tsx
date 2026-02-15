import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizModalProps {
  questions: QuizQuestion[];
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ questions, onClose }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (optionIdx: number) => {
    if (showResult) return;
    setSelectedOption(optionIdx);
    setShowResult(true);
    if (optionIdx === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Myth-Busting Quiz"
    >
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary-500">
            🧠 Myth-Busting Interactive Quiz
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500"
            aria-label="Close quiz"
          >
            ✕
          </button>
        </div>

        {!completed ? (
          <>
            <div className="text-xs text-neutral-400 mb-1">
              Question {currentQ + 1} of {questions.length}
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-neutral-100 rounded-full mb-4">
              <div
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>

            <p className="text-base font-medium text-neutral-800 mb-4 leading-relaxed">
              {q.question}
            </p>

            <div className="space-y-2 mb-4">
              {q.options.map((opt, i) => {
                let optClass = 'quiz-option';
                if (showResult) {
                  if (i === q.correctIndex) optClass += ' correct';
                  else if (i === selectedOption) optClass += ' incorrect';
                }
                return (
                  <button
                    key={i}
                    className={optClass}
                    onClick={() => handleSelect(i)}
                    disabled={showResult}
                    style={{ width: '100%', textAlign: 'left', background: 'transparent' }}
                  >
                    <span className="font-medium text-sm">{String.fromCharCode(65 + i)}.</span>{' '}
                    <span className="text-sm">{opt}</span>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-neutral-700 leading-relaxed mb-2">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
                {q.empathetic_response && (
                  <div className="mt-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="text-xs font-semibold text-primary-700 mb-1">
                      💬 Suggested empathetic response:
                    </p>
                    <p className="text-sm text-primary-800 italic leading-relaxed">
                      "{q.empathetic_response}"
                    </p>
                  </div>
                )}
                <button
                  onClick={handleNext}
                  className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">
              {score === questions.length ? '🏆' : score >= questions.length * 0.6 ? '👏' : '📚'}
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              Quiz Complete!
            </h3>
            <p className="text-lg text-neutral-600 mb-1">
              Score: <strong className="text-primary-600">{score}/{questions.length}</strong>
            </p>
            <p className="text-sm text-neutral-500 mb-6">
              {score === questions.length
                ? 'Perfect! You have a solid understanding of the evidence-based facts.'
                : 'Review the myth-debunking slides for a deeper understanding.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="px-4 py-2 border border-primary-500 text-primary-500 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
