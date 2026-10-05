import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function HeroSections({ onExploreClick, onOpenConversation }) {
  return (
    <div className="rf-hero-sequence-wrapper" id="why">
      {/* ===================================================================
          SECTION 01: TO LEARN IS AN ART.
          =================================================================== */}
      <section
        id="section-01"
        className="rf-hero-section rf-section-art"
        aria-label="Section 01: To Learn Is An Art"
      >
        <div className="rf-container">
          <div className="rf-hero-col-left">
            <span className="rf-editorial-eyebrow" style={{ marginBottom: '1.8rem' }}>
              01 // ReadFirst Philosophy
            </span>

            <h1 className="rf-hero-title">
              TO LEARN <br />
              IS AN <em>ART.</em>
            </h1>

            <p className="rf-hero-sub">
              Learning is more than receiving information.
            </p>

            <p className="rf-hero-tagline">
              Observe. Question. Explore. Reflect.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
              <a
                href="#section-02"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('section-02')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rf-btn-primary"
                id="hero-explore-btn"
              >
                <span>Explore ReadFirst</span>
                <ArrowDown size={15} />
              </a>

              <button
                onClick={() => onOpenConversation('General Inquiry')}
                className="rf-btn-secondary"
              >
                <span>Start A Conversation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 02: LEARN IT FROM AN ARTIST.
          =================================================================== */}
      <section
        id="section-02"
        className="rf-hero-section rf-section-artist"
        aria-label="Section 02: Learn It From An Artist"
      >
        <div className="rf-container">
          <div className="rf-hero-col-left">
            <span className="rf-editorial-eyebrow" style={{ marginBottom: '1.8rem' }}>
              02 // The Principle of Attention
            </span>

            <h2 className="rf-hero-title" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)' }}>
              LEARN IT <br />
              FROM AN <em>ARTIST.</em>
            </h2>

            <p className="rf-hero-sub">
              The deepest learning begins with attention.
            </p>

            <div className="rf-marginalia-box">
              <p className="rf-marginalia-quote">
                "Attention is an act of intellectual devotion. Before we formulate an answer, we must first learn to observe what is truly in front of us."
              </p>
              <span className="rf-marginalia-author">
                Marginalia Note // ReadFirst Field Journal
              </span>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <a
                href="#section-03"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('section-03')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rf-btn-secondary"
              >
                <span>Continue Reading</span>
                <ArrowDown size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 03: THE QUESTION & THE SYSTEM WE KNOW
          =================================================================== */}
      <section
        id="section-03"
        className="rf-hero-section rf-section-system"
        aria-label="Section 03: What If We Taught People How To Learn?"
      >
        <div className="rf-container">
          <div style={{ maxWidth: '820px' }}>
            <span className="rf-editorial-eyebrow" style={{ marginBottom: '1.8rem' }}>
              03 // The Inquiry
            </span>

            <h2
              className="rf-hero-title"
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)', lineHeight: 1.05 }}
            >
              WHAT IF WE TAUGHT <br />
              PEOPLE <em>HOW TO LEARN?</em>
            </h2>

            <p className="rf-hero-sub" style={{ maxWidth: '640px' }}>
              Conventional schooling organizes learning into a linear sequence of coverage and evaluation:
            </p>

            {/* The Linear Sequence: SYLLABUS → TEACHING → ASSIGNMENT → EXAMINATION → MARKS */}
            <div className="rf-linear-sequence">
              <span className="rf-sequence-node">Syllabus</span>
              <span className="rf-sequence-arrow">→</span>
              <span className="rf-sequence-node">Teaching</span>
              <span className="rf-sequence-arrow">→</span>
              <span className="rf-sequence-node">Assignment</span>
              <span className="rf-sequence-arrow">→</span>
              <span className="rf-sequence-node">Examination</span>
              <span className="rf-sequence-arrow">→</span>
              <span className="rf-sequence-node is-marks">MARKS</span>
            </div>

            <div
              style={{
                marginTop: '3.5rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid var(--rf-grey-border)',
              }}
            >
              <h3 className="rf-questions-title">
                Make space for questions.
              </h3>
              <p style={{ color: 'var(--rf-ink-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                When learning is not restricted to memorization, inquiry begins to flourish:
              </p>

              {/* Questions appearing */}
              <div className="rf-questions-grid">
                <div className="rf-question-pill">Why?</div>
                <div className="rf-question-pill">How?</div>
                <div className="rf-question-pill">What if?</div>
                <div className="rf-question-pill">How do we know?</div>
              </div>

              <div style={{ marginTop: '2.8rem' }}>
                <a
                  href="#idea"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('idea')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rf-btn-primary rf-btn-orange"
                >
                  <span>Explore The ReadFirst Idea</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
