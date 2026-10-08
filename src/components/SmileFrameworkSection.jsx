import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Compass, BookOpen, Brain } from 'lucide-react';

export default function SmileFrameworkSection({ onOpenConversation }) {
  const smileFacets = [
    {
      num: '01',
      title: 'What Is SMILE?',
      desc: 'Self-Motivated Intelligent Learning Environment — ReadFirst’s proprietary intellectual framework for understanding and architecting learning spaces that sustain intrinsic intellectual drive.',
      icon: Brain,
    },
    {
      num: '02',
      title: 'Why It Matters',
      desc: 'Conventional education often relies on external compliance: marks, bells, and surveillance. SMILE replaces artificial pressure with natural curiosity, focused attention, and autonomous inquiry.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'How It Is Practiced',
      desc: 'SMILE is deployed across classroom routines, textbook engagement, educator coaching, and institutional knowledge centres to cultivate true learner independence.',
      icon: Compass,
    },
    {
      num: '04',
      title: 'Evidence & Practice',
      desc: 'Grounded in cognitive psychology, research-based teaching, syntopical deep reading, and metacognitive self-regulation.',
      icon: BookOpen,
    },
  ];

  return (
    <section className="rf-section-smile-framework" id="smile" aria-label="18 The SMILE Framework">
      <div className="rf-container">
        {/* Section Header */}
        <div className="rf-smile-fw-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            11 // Intellectual Framework
          </span>

          <h2 className="rf-serif-display rf-smile-fw-title">
            THE SMILE <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>FRAMEWORK.</span>
          </h2>

          <div className="rf-smile-fw-acronym">
            <span className="rf-smile-fw-pill">SMILE</span>
            <span className="rf-smile-fw-exp">Self-Motivated Intelligent Learning Environment</span>
          </div>

          <p className="rf-smile-fw-lead">
            An intellectual framework designed to cultivate intrinsic motivation, purposeful reading, and independent thinking without constant external surveillance.
          </p>
        </div>

        {/* 4 Architectural Dimensions Grid */}
        <div className="rf-smile-fw-grid">
          {smileFacets.map((facet) => {
            const Icon = facet.icon;
            return (
              <div key={facet.title} className="rf-smile-fw-card">
                <div className="rf-smile-fw-card-top">
                  <span className="rf-smile-fw-num">{facet.num}</span>
                  <div className="rf-smile-fw-icon">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="rf-smile-fw-card-title">{facet.title}</h3>
                <p className="rf-smile-fw-card-desc">{facet.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Link to Full Approach */}
        <div className="rf-smile-fw-cta">
          <Link to="/approach" className="rf-btn-secondary">
            <span>Read The Full SMILE Methodology In Our Approach</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
