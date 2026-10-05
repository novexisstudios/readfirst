import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ResearchSection({ onOpenConversation }) {
  const [activeTab, setActiveTab] = useState(0);

  const studies = [
    {
      id: '01',
      title: 'Study 01 // Independent Learners',
      headline: 'Students shift from waiting for answers to independent inquiry.',
      takeaway: 'Deliberate question-generation frameworks build sustained textbook self-study habits.',
      tag: 'Independent Learners',
    },
    {
      id: '02',
      title: 'Study 02 // Research Culture',
      headline: 'Teachers move from unilateral lecturing to guided learning coaching.',
      takeaway: 'Placing the educator back as an active researcher transforms everyday classroom dialogue.',
      tag: 'Research Culture',
    },
  ];

  const current = studies[activeTab];

  return (
    <section className="rf-section-research" id="research" aria-label="Section 07: Research">
      <div className="rf-container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '2.5rem' }}>
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            Evidence in Practice
          </span>
          <h2
            className="rf-serif-display"
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              color: 'var(--rf-navy)',
              lineHeight: 1.1,
              marginBottom: '0.8rem',
            }}
          >
            EVIDENCE IN <br />
            <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>REAL CLASSROOMS.</span>
          </h2>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--rf-ink-soft)',
              lineHeight: 1.5,
            }}
          >
            What happens when schools cultivate strength of mind and a genuine research culture.
          </p>
        </div>

        {/* Tab switch */}
        <div className="rf-research-tabs-wrap">
          {studies.map((item, idx) => (
            <button
              key={item.title}
              onClick={() => setActiveTab(idx)}
              className={`rf-research-tab-btn ${activeTab === idx ? 'is-active' : ''}`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Editorial Research Card */}
        <div className="rf-research-card">
          <div className="rf-research-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="rf-research-card-top" style={{ marginBottom: '1.5rem' }}>
              <span className="rf-research-card-eyebrow">FIELD OBSERVATION</span>
              <span className="rf-research-tag-badge">{current.tag}</span>
            </div>

            <h3 className="rf-research-card-title">
              "{current.headline}"
            </h3>

            <p style={{ fontSize: '1.08rem', lineHeight: 1.65, color: 'var(--rf-ink-soft)', marginBottom: '2rem' }}>
              {current.takeaway}
            </p>

            <div>
              <Link
                to="/research"
                className="rf-btn-secondary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <span>Explore Full Evidence Repository</span>
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
            <div className="rf-research-photo-caption">
              <p>Research Culture in Action // Developing Independent Thinkers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
