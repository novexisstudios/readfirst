import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpenCheck, CheckCircle2 } from 'lucide-react';

export default function EducatorCohortSection({ onOpenConversation }) {
  return (
    <section className="rf-section-educator-spotlight" id="educator-cohort" aria-label="Section 07: The Educator Transformation Program">
      <div className="rf-container">
        <div className="rf-educator-cohort-card">
          <div className="rf-educator-cohort-content">
            <div className="rf-cohort-eyebrow-wrap">
              <span className="rf-cohort-selective-badge">
                <Sparkles size={13} style={{ marginRight: '6px' }} />
                SELECTIVE COHORT · APPLICATION BASIS
              </span>
            </div>

            <h2 className="rf-educator-cohort-title">
              THE EDUCATOR <br />
              <em>TRANSFORMATION PROGRAM.</em>
            </h2>

            <p className="rf-educator-cohort-tagline">
              "For educators who are serious about rethinking how learning happens."
            </p>

            <p className="rf-educator-cohort-desc" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              Master research-based teaching and the SMILE 2.0 methodology to guide authentic student inquiry.
            </p>

            <div className="rf-educator-cohort-actions">
              <button
                onClick={() => onOpenConversation('Educator Transformation Program')}
                className="rf-btn-primary rf-btn-orange"
                id="apply-educator-cohort-btn"
              >
                <span>Apply For Next Cohort</span>
                <ArrowRight size={15} />
              </button>

              <Link to="/educators" className="rf-btn-secondary dark-mode">
                <span>Explore Program Details</span>
              </Link>
            </div>
          </div>

          <div className="rf-educator-cohort-aside">
            <div className="rf-cohort-conviction-box">
              <div className="rf-cohort-quote-glyph">“</div>
              <blockquote className="rf-cohort-quote-text">
                This is not another course to complete. It is a rare opportunity to rethink how I understand learning.
              </blockquote>
              <div className="rf-cohort-quote-author">
                EDUCATOR COHORT EXPERIENCE // READFIRST
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
