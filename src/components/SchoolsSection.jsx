import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, BookOpen, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SchoolsSection({ onOpenConversation }) {
  const highlights = [
    {
      title: 'Reading & Inquiry Culture',
      description: 'Building school-wide habits of deep reading, textbook-first study, and authentic student inquiry.',
      icon: BookOpen,
    },
    {
      title: 'Knowledge Centre Transformation',
      description: 'Transforming classrooms and libraries into active hubs of exploration, research, and dialogue.',
      icon: Compass,
    },
    {
      title: 'Teacher Development',
      description: 'Empowering educators with research-based teaching practices that foster independent learners.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="rf-section-schools" id="schools-section" aria-label="07 Schools & Colleges">
      <div className="rf-container">
        <div className="rf-schools-grid">
          {/* Left / Main Info */}
          <div className="rf-schools-main">
            <div className="rf-schools-tag-wrap">
              <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '0.6rem' }}>
                07 // For Schools & Colleges
              </span>
              <div className="rf-schools-offering-badge">THE LEARNING MARATHON (TLM)</div>
            </div>

            <h2 className="rf-serif-display rf-schools-title">
              CREATING A LIVING <br />
              <em>LEARNING CULTURE.</em>
            </h2>

            <p className="rf-schools-lead">
              The Learning Marathon (TLM) helps schools and colleges build an environment where students engage more deeply with learning, develop curiosity, read, reflect, and become self-motivated independent learners.
            </p>

            <div className="rf-schools-pillars-list">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rf-schools-pillar-item">
                    <div className="rf-schools-pillar-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="rf-schools-pillar-title">{item.title}</h3>
                      <p className="rf-schools-pillar-desc">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rf-schools-actions">
              <Link to="/institutions" className="rf-btn-primary" id="explore-tlm-btn">
                <span>Explore TLM</span>
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => onOpenConversation('Institutional Partnership')}
                className="rf-btn-secondary"
              >
                <span>Talk to ReadFirst</span>
              </button>
            </div>
          </div>

          {/* Right Visual / Quote Card */}
          <div className="rf-schools-aside">
            <div className="rf-schools-quote-card">
              <div className="rf-schools-quote-glyph">“</div>
              <blockquote className="rf-schools-quote-text">
                When an institution invests in research-based teaching and learning, students develop the stamina to read deeply and reason for themselves.
              </blockquote>
              <div className="rf-schools-quote-footer">
                <span className="rf-schools-quote-label">INSTITUTIONAL TRANSFORMATION</span>
                <span className="rf-schools-quote-sub">Knowledge Centre Framework</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
