import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function TheQuestionSection() {
  const transformationPairs = [
    { from: 'Syllabus Completion', to: 'Genuine Understanding' },
    { from: 'Memorising', to: 'Understanding' },
    { from: 'Being Taught', to: 'Self-Learning' },
    { from: 'Instruction', to: 'Independent Thinking' },
    { from: 'Information Consumption', to: 'Exploration' },
  ];

  return (
    <section className="rf-section-question" id="the-question" aria-label="02 The Question">
      <div className="rf-container">
        <div className="rf-question-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            02 // The Fundamental Question
          </span>
          <h2 className="rf-serif-display rf-question-headline">
            Education teaches students what to learn. <br />
            <em>But who teaches them how to learn?</em>
          </h2>
          <p className="rf-question-lead">
            Conventional education focuses on delivering the curriculum. ReadFirst builds the inner capabilities that turn students into self-motivated, independent thinkers.
          </p>
        </div>

        {/* Visual Transformation Pairs */}
        <div className="rf-transformations-grid">
          {transformationPairs.map((pair, idx) => (
            <div key={idx} className="rf-transformation-row">
              <div className="rf-transform-from">
                <span className="rf-transform-label">Conventional Focus</span>
                <span className="rf-transform-text">{pair.from}</span>
              </div>
              <div className="rf-transform-arrow">
                <ArrowRight size={18} />
              </div>
              <div className="rf-transform-to">
                <span className="rf-transform-label">The ReadFirst Addition</span>
                <span className="rf-transform-text">{pair.to}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
