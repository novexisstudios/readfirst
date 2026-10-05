import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle2, BookmarkCheck } from 'lucide-react';

export default function ResearchSection({ onOpenConversation }) {
  const [activeTab, setActiveTab] = useState(0);

  const monographs = [
    {
      title: 'Monograph 01 // The Architecture of Attention',
      question:
        'What happens when learners are equipped with deliberate question-generation frameworks before reading complex expository texts?',
      method:
        '30-day cohort immersion, comparative analysis of 420 learner journals, and pre/post metacognitive audits.',
      finding:
        '4.2× increase in autonomous follow-up inquiries; 68% deeper conceptual retention over rote memorization cohorts.',
      implication:
        'Independent learning is not an innate talent. It is an engineered habit of sustained attention and question framing.',
      tag: 'Cognitive Inquiry',
    },
    {
      title: 'Monograph 02 // The SMILE Environment Field Study',
      question:
        'Can environmental noise reduction and autonomous inquiry spaces shift educator attitudes from instructional delivery to learning coaching?',
      method:
        'Fieldwork across 12 pilot schools implementing the 5-day educator immersion and Discovery Box protocol.',
      finding:
        'Teachers spent 54% less time on direct lecturing and 72% more time guiding student-led investigative dialogue.',
      implication:
        'Changing teacher behavior requires first placing the educator back in the position of an active learner.',
      tag: 'Institutional Culture',
    },
  ];

  const current = monographs[activeTab];

  return (
    <section className="rf-section-research" id="research" aria-label="Section 07: Research">
      <div className="rf-container">
        {/* Header */}
        <div style={{ maxWidth: '820px' }}>
          <span className="rf-editorial-eyebrow" style={{ marginBottom: '1.4rem' }}>
            07 // Evidence & Inquiry
          </span>
          <h2
            className="rf-serif-display"
            style={{
              fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
              color: 'var(--rf-navy)',
              lineHeight: 1.05,
              marginBottom: '1.2rem',
            }}
          >
            RESEARCH BEGINS <br />
            WITH A <em>QUESTION.</em>
          </h2>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--rf-ink-soft)',
              lineHeight: 1.5,
              maxWidth: '650px',
            }}
          >
            ReadFirst connects learning with inquiry through questions, evidence and investigation.
          </p>
        </div>

        {/* Tab switch for monographs */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
          {monographs.map((item, idx) => (
            <button
              key={item.title}
              onClick={() => setActiveTab(idx)}
              style={{
                fontFamily: 'var(--rf-font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.65rem 1.2rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: activeTab === idx ? 'var(--rf-navy)' : 'var(--rf-grey-border)',
                backgroundColor: activeTab === idx ? 'var(--rf-navy)' : 'transparent',
                color: activeTab === idx ? 'var(--rf-white)' : 'var(--rf-ink-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Editorial Research Card */}
        <div className="rf-research-card">
          <div className="rf-research-content">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.8rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--rf-font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--rf-orange)',
                }}
              >
                FIELD RESEARCH DOSSIER
              </span>
              <span
                style={{
                  fontFamily: 'var(--rf-font-mono)',
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(0, 50, 106, 0.08)',
                  color: 'var(--rf-navy)',
                }}
              >
                {current.tag}
              </span>
            </div>

            <div className="rf-monograph-steps">
              {/* Question */}
              <div className="rf-monograph-step">
                <span className="rf-step-label">Question:</span>
                <span
                  className="rf-step-val"
                  style={{
                    fontFamily: 'var(--rf-font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: 'var(--rf-navy)',
                  }}
                >
                  "{current.question}"
                </span>
              </div>

              {/* Method */}
              <div className="rf-monograph-step">
                <span className="rf-step-label">Method:</span>
                <span className="rf-step-val">{current.method}</span>
              </div>

              {/* Finding */}
              <div className="rf-monograph-step">
                <span className="rf-step-label">Finding:</span>
                <span className="rf-step-val" style={{ fontWeight: '600', color: 'var(--rf-navy)' }}>
                  {current.finding}
                </span>
              </div>

              {/* Implication */}
              <div className="rf-monograph-step">
                <span className="rf-step-label">Implication:</span>
                <span className="rf-step-val">{current.implication}</span>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <Link
                to="/research"
                className="rf-btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <span>Explore Research Repository</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Research Photo Wrap */}
          <div className="rf-research-photo-wrap">
            <img
              src="/images/editorial_book_hands.jpg"
              alt="Hands of an inquiring learner annotating a research notebook in a sunlit library"
              className="rf-research-photo"
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '18px',
                right: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                padding: '0.8rem 1.2rem',
                borderRadius: '6px',
                border: '1px solid rgba(0, 50, 106, 0.08)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--rf-font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  color: 'var(--rf-navy)',
                  textTransform: 'uppercase',
                }}
              >
                Evidence in Practice // Metacognitive Journaling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
