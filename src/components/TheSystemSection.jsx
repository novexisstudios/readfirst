import React from 'react';
import { ArrowRight, BookOpen, HelpCircle, Sparkles, Search } from 'lucide-react';

export default function TheSystemSection() {
  const systemNodes = ['SYLLABUS', 'TEACHING', 'ASSIGNMENT', 'EXAMINATION', 'MARKS'];

  const spaces = [
    {
      title: 'Deeper Reading',
      desc: 'Engaging directly with textbooks and core materials with sustained attention.',
      icon: BookOpen,
    },
    {
      title: 'Authentic Questions',
      desc: 'Asking "Why?", "How?", and "What if?" rather than seeking pre-packaged answers.',
      icon: HelpCircle,
    },
    {
      title: 'Mindful Reflection',
      desc: 'Pausing to examine assumptions and build genuine strength of mind.',
      icon: Sparkles,
    },
    {
      title: 'Investigation',
      desc: 'Moving from information consumption toward evidence and inquiry.',
      icon: Search,
    },
  ];

  return (
    <section className="rf-section-system-space" id="system-space" aria-label="04 The System & What If Learning Had More Space">
      <div className="rf-container">
        {/* Section 04: The System We Know */}
        <div className="rf-system-block">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            04 // The Familiar Sequence
          </span>

          <h2 className="rf-serif-display rf-system-title">
            THE SYSTEM <span style={{ fontStyle: 'italic', color: 'var(--rf-navy)' }}>WE KNOW.</span>
          </h2>

          <p className="rf-system-lead">
            Conventional schooling organizes learning into a linear sequence:
          </p>

          <div className="rf-system-sequence-strip" role="list">
            {systemNodes.map((node, idx) => (
              <React.Fragment key={node}>
                <div className={`rf-system-node ${idx === systemNodes.length - 1 ? 'is-final' : ''}`} role="listitem">
                  <span className="rf-system-node-idx">0{idx + 1}</span>
                  <span className="rf-system-node-name">{node}</span>
                </div>
                {idx < systemNodes.length - 1 && (
                  <span className="rf-system-seq-arrow" aria-hidden="true">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Transition Divider: Possibility */}
        <div className="rf-system-transition-divider">
          <div className="rf-transition-line" />
          <span className="rf-transition-badge">A NEW POSSIBILITY</span>
          <div className="rf-transition-line" />
        </div>

        {/* Section 05: What If Learning Had More Space? */}
        <div className="rf-space-block">
          <div className="rf-space-header">
            <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1rem' }}>
              05 // Expanding Possibility
            </span>
            <h2 className="rf-serif-display rf-space-title">
              WHAT IF LEARNING <br />
              <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>HAD MORE SPACE?</span>
            </h2>
            <p className="rf-space-lead">
              When we make intentional room within education, learning changes from compliance into authentic intellectual discovery.
            </p>
          </div>

          <div className="rf-space-grid">
            {spaces.map((sp) => {
              const Icon = sp.icon;
              return (
                <div key={sp.title} className="rf-space-card">
                  <div className="rf-space-card-icon">
                    <Icon size={20} />
                  </div>
                  <h3 className="rf-space-card-title">{sp.title}</h3>
                  <p className="rf-space-card-desc">{sp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
