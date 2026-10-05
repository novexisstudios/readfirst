import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function FinalCtaSection({ onOpenConversation }) {
  return (
    <footer className="rf-section-final" id="conversation" aria-label="Section 08: Final Conversation & Footer">
      <div className="rf-container">
        {/* Main Closing Editorial Grid */}
        <div className="rf-final-grid">
          <div>
            <span
              className="rf-editorial-eyebrow"
              style={{ color: 'var(--rf-peach)', marginBottom: '1.5rem' }}
            >
              A Selective Community of Inquiry
            </span>

            <h2 className="rf-final-headline" style={{ color: '#FFFFFF' }}>
              READY TO BUILD A <br />
              <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>
                RESEARCH CULTURE?
              </span>
            </h2>

            <p className="rf-final-sub">
              Nurturing strength of mind, inquiry habits, and independent thinkers.
            </p>

            <div className="rf-final-buttons">
              <button
                onClick={() => onOpenConversation('Selective Educator Cohort')}
                className="rf-btn-primary rf-btn-orange"
                id="final-cta-primary"
              >
                <span>Apply For Educator Cohort</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => onOpenConversation('Institutional Partnership')}
                className="rf-btn-secondary dark-mode"
              >
                <span>Initiate Institutional Dialogue</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Photography & Ethos Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '2.5rem',
            }}
          >
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1.8rem',
                maxHeight: '220px',
              }}
            >
              <img
                src="/images/editorial_learning_space.jpg"
                alt="Contemporary research studio and quiet library environment"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>

            <div className="rf-footer-col-title" style={{ marginBottom: '0.6rem' }}>
              The ReadFirst Conviction
            </div>
            <p className="rf-footer-quote">
              "When schools cultivate a living research culture, students develop genuine strength of mind and the power to think for themselves."
            </p>
          </div>
        </div>

        {/* Global Footer Index & Governance */}
        <div id="about" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {/* Brand Manifesto */}
            <div>
              <div style={{ marginBottom: '1.2rem' }}>
                <div className="rf-footer-logo-wrap">
                  <img
                    src="/images/Readfirst%20LOGO.png"
                    alt="ReadFirst - Igniting Imagination"
                    className="rf-footer-logo-img"
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--rf-white-70)',
                  lineHeight: 1.6,
                  maxWidth: '320px',
                }}
              >
                Building a culture of deep learning, inquiry, and independent thinking across students, educators, and institutions.
              </p>
            </div>

            {/* Architecture Index */}
            <div>
              <div className="rf-footer-col-title">
                Learning Philosophy
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/" className="rf-nav-link" style={{ color: 'var(--rf-white-70)', fontSize: '0.85rem' }}>
                    Home // The Philosophy
                  </Link>
                </li>
                <li>
                  <Link to="/approach" className="rf-nav-link" style={{ color: 'var(--rf-white-70)', fontSize: '0.85rem' }}>
                    SMILE Framework & IP
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="rf-nav-link" style={{ color: 'var(--rf-white-70)', fontSize: '0.85rem' }}>
                    Research & Field Studies
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="rf-nav-link" style={{ color: 'var(--rf-white-70)', fontSize: '0.85rem' }}>
                    About & Governance
                  </Link>
                </li>
              </ul>
            </div>

            {/* Audiences */}
            <div>
              <div className="rf-footer-col-title">
                Audiences & Frameworks
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <Link to="/students" className="rf-nav-link" style={{ color: 'var(--rf-white-70)', fontSize: '0.85rem' }}>
                    Students // Independent Learning
                  </Link>
                </li>
                <li>
                  <Link to="/educators" className="rf-nav-link" style={{ color: 'var(--rf-white-70)', fontSize: '0.85rem' }}>
                    Educators // 5-Day Immersion
                  </Link>
                </li>
                <li>
                  <Link to="/institutions" className="rf-nav-link" style={{ color: 'var(--rf-white-70)', fontSize: '0.85rem' }}>
                    Institutions // Culture Transformation
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => onOpenConversation('General Inquiry')}
                    style={{ background: 'none', border: 'none', color: 'var(--rf-orange)', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: '0.2rem 0', fontFamily: 'inherit', fontWeight: 600 }}
                  >
                    Start A Dialogue →
                  </button>
                </li>
              </ul>
            </div>

            {/* Governance & Contact */}
            <div>
              <div className="rf-footer-col-title">
                Engagement
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--rf-white-70)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                Enquiries for school leaders, cohorts, and academic researchers:
              </p>
              <button
                onClick={() => onOpenConversation('Institutional Leadership')}
                className="rf-btn-secondary dark-mode"
                style={{ padding: '0.6rem 1.1rem', fontSize: '0.74rem' }}
              >
                <span>Direct Inquiry Desk</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="rf-footer-bottom">
          <p className="rf-footer-legal">
            © {new Date().getFullYear()} READFIRST. Research-based teaching and learning initiative.
            <br />
            Designed with architectural restraint and cognitive fidelity.
          </p>

          <ul className="rf-footer-nav">
            <li><Link to="/approach">Our Approach</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/educators">Educators</Link></li>
            <li><Link to="/institutions">Institutions</Link></li>
            <li><Link to="/research">Research</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
