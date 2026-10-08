import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpenCheck, CheckCircle2, Compass, Eye } from 'lucide-react';

export default function EducatorCohortSection({ onOpenConversation }) {
  const cohortAspects = [
    'Research-Based Teaching Practice',
    'Understanding How Students Learn & Behave',
    'Classroom Observation & Reflection',
    'Transition from Instructor to Learning Coach',
    'SMILE Learning Model Implementation',
  ];

  return (
    <section className="rf-section-educator-spotlight" id="educators-section" aria-label="08 Educators Programme">
      <div className="rf-container">
        <div className="rf-educator-cohort-card">
          <div className="rf-educator-cohort-content">
            <div className="rf-cohort-eyebrow-wrap">
              <span className="rf-cohort-selective-badge">
                <Sparkles size={13} style={{ marginRight: '6px' }} />
                SELECTIVE COHORT · APPLICATION BASIS
              </span>
            </div>

            <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-peach)', marginBottom: '0.8rem' }}>
              08 // For Educators
            </span>

            <h2 className="rf-educator-cohort-title">
              RESEARCH-BASED TEACHING <br />
              <em>& LEARNING PROGRAMME.</em>
            </h2>

            <p className="rf-educator-cohort-tagline">
              “For educators who want to understand learning deeply enough to transform their own practice.”
            </p>

            <p className="rf-educator-cohort-desc">
              A rare opportunity to rethink how learning happens. Rather than another conventional training workshop, this selective, research-led immersion equips educators to observe student understanding, nurture genuine curiosity, and guide reflective self-learning.
            </p>

            <div className="rf-educator-aspects-list">
              {cohortAspects.map((item) => (
                <div key={item} className="rf-educator-aspect-item">
                  <CheckCircle2 size={15} color="var(--rf-orange)" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="rf-educator-cohort-actions">
              <button
                onClick={() => onOpenConversation('Educator Transformation Program')}
                className="rf-btn-primary rf-btn-orange"
                id="apply-educator-cohort-btn"
              >
                <span>Apply to the Programme</span>
                <ArrowRight size={15} />
              </button>

              <Link to="/educators" className="rf-btn-secondary dark-mode">
                <span>Explore Programme Details →</span>
              </Link>
            </div>
          </div>

          <div className="rf-educator-cohort-aside">
            <div className="rf-cohort-conviction-box">
              <div className="rf-cohort-quote-glyph">“</div>
              <blockquote className="rf-cohort-quote-text">
                This is not a certification to collect. It is a rare, rigorous opportunity to understand how students learn and transform your practice as a learning coach.
              </blockquote>
              <div className="rf-cohort-quote-author">
                EDUCATOR IMMERSION // READFIRST
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
