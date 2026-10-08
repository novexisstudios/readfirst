import React from 'react';

export default function CentralQuestionSection() {
  return (
    <section className="rf-section-central-question" id="the-question" aria-label="03 The Central Question">
      <div className="rf-container">
        <div className="rf-central-question-wrap">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-peach)', marginBottom: '2rem' }}>
            03 // The Central Inquiry
          </span>

          <h2 className="rf-central-question-title">
            Education can teach students what to learn. <br />
            <em>But does it teach them how to learn?</em>
          </h2>

          <div className="rf-central-question-subline">
            <span className="rf-central-dot" />
            <p>
              Most learning environments focus on delivering curriculum. ReadFirst builds the foundation for how human beings think, read, and understand independently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
