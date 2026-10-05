import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap, BookOpenCheck, Building2, CheckCircle2 } from 'lucide-react';

export default function AudiencesSection({ onOpenConversation }) {
  const [activeAudience, setActiveAudience] = useState(null);

  const audiences = [
    {
      id: 'students',
      tier: 'For Students',
      headline: 'STUDENTS',
      tagline: 'Become an independent learner.',
      description: 'Build the habits to read, question, and learn on your own through focused textbook self-study.',
      linkTo: '/students',
      linkText: 'Explore Student Pathway',
      icon: GraduationCap,
      badge: null,
    },
    {
      id: 'educators',
      tier: 'For Educators',
      headline: 'EDUCATORS',
      tagline: 'A rare opportunity to rethink how learning happens.',
      description: 'Adopt SMILE 2.0: an intentional transition from unilateral lecturing to guided learning coach.',
      linkTo: '/educators',
      linkText: 'Explore Educator Cohort',
      icon: BookOpenCheck,
      badge: 'SELECTIVE COHORT',
    },
    {
      id: 'institutions',
      tier: 'For Institutions',
      headline: 'INSTITUTIONS',
      tagline: 'Build a research-based education culture.',
      description: 'Transform your school into a vibrant Knowledge Centre of inquiry and innovation.',
      linkTo: '/institutions',
      linkText: 'Partner With ReadFirst',
      icon: Building2,
      badge: null,
    },
  ];

  return (
    <section
      className="rf-section-audiences"
      id="audiences"
      aria-label="Section 06: Three Levels of Change"
      style={{
        backgroundColor:
          activeAudience === 'educators'
            ? '#FDF8F5'
            : activeAudience === 'institutions'
            ? '#F4F7F9'
            : 'var(--rf-grey-bg)',
        transition: 'background-color 0.4s ease',
      }}
    >
      <div className="rf-container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            Three Pathways
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
            ONE INQUIRY PHILOSOPHY. <br />
            <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>
              THREE DISTINCT PATHWAYS.
            </span>
          </h2>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--rf-ink-soft)',
              lineHeight: 1.5,
            }}
          >
            Cultivating independent learners, empowering educators, and transforming schools.
          </p>
        </div>

        {/* 3 Editorial Columns */}
        <div className="rf-audiences-grid">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            const isEducator = aud.id === 'educators';

            return (
              <div
                key={aud.id}
                className={`rf-audience-column ${isEducator ? 'is-educator-featured' : ''}`}
                onMouseEnter={() => setActiveAudience(aud.id)}
                onMouseLeave={() => setActiveAudience(null)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <span className="rf-audience-tier">{aud.tier}</span>
                    <Icon size={20} color={isEducator ? 'var(--rf-orange)' : 'var(--rf-navy)'} strokeWidth={1.75} />
                  </div>

                  {aud.badge && (
                    <div className="rf-cohort-selective-badge" style={{ marginBottom: '1rem' }}>
                      <span>{aud.badge}</span>
                    </div>
                  )}

                  <h3 className="rf-audience-title">{aud.headline}</h3>

                  <p className="rf-audience-tagline">
                    "{aud.tagline}"
                  </p>

                  <p className="rf-audience-body">
                    {aud.description}
                  </p>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <Link
                    to={aud.linkTo}
                    className="rf-btn-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      borderColor: isEducator ? 'var(--rf-orange)' : 'var(--rf-navy)',
                      color: isEducator ? 'var(--rf-orange)' : 'var(--rf-navy)',
                    }}
                  >
                    <span>{aud.linkText} →</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
