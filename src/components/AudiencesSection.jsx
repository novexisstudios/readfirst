import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap, BookOpenCheck, Building2 } from 'lucide-react';

export default function AudiencesSection({ onOpenConversation }) {
  const [activeAudience, setActiveAudience] = useState(null);

  const audiences = [
    {
      id: 'students',
      tier: 'Level 01 // Learners',
      headline: 'STUDENTS',
      tagline: 'Learn how to learn.',
      description:
        'Cultivating deep analytical reading, self-directed questioning, reflective notation, and the investigative resilience that outlasts any syllabus.',
      highlights: [
        'Higher-Level Reading & Marginalia',
        'Self-Directed Inquiry Frameworks',
        'Metacognitive Independence',
      ],
      linkText: 'Explore Student Learning',
      icon: GraduationCap,
    },
    {
      id: 'educators',
      tier: 'Level 02 // Practitioners',
      headline: 'EDUCATORS',
      tagline: 'Experience learning differently.',
      description:
        'The approach begins by placing the educator in the position of a learner. Through our 5-day immersion and Discovery Box, teachers become researchers of practice.',
      highlights: [
        '5-Day Inquiry Immersion',
        'The Discovery Box Methodology',
        'From Instruction to Learning Coaching',
      ],
      linkText: 'Explore Educator Development',
      icon: BookOpenCheck,
    },
    {
      id: 'institutions',
      tier: 'Level 03 // Ecosystems',
      headline: 'INSTITUTIONS',
      tagline: 'Build a culture of independent learning.',
      description:
        'Sustainable change occurs when independent learning is structural. We partner with leadership to harmonize leadership, educators, students, and evidence.',
      highlights: [
        'Four Foundational Conditions',
        'The SMILE Framework Architecture',
        'Institutional Transformation Roadmap',
      ],
      linkText: 'Build a Learning Culture',
      icon: Building2,
    },
  ];

  return (
    <section
      className="rf-section-audiences"
      id="audiences"
      aria-label="Section 06: Three Levels of Change"
      style={{
        backgroundColor:
          activeAudience === 'institutions'
            ? '#EEF2F5'
            : activeAudience === 'educators'
            ? '#F7F2EE'
            : 'var(--rf-grey-bg)',
        transition: 'background-color 0.6s ease',
      }}
    >
      <div className="rf-container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px' }}>
          <span className="rf-editorial-eyebrow" style={{ marginBottom: '1.4rem' }}>
            06 // Three Levels of Change
          </span>
          <h2
            className="rf-serif-display"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              color: 'var(--rf-navy)',
              lineHeight: 1.08,
              marginBottom: '1.2rem',
            }}
          >
            ONE PHILOSOPHY. <br />
            <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>
              THREE LEVELS OF CHANGE.
            </span>
          </h2>
          <p
            style={{
              fontSize: '1.12rem',
              color: 'var(--rf-ink-soft)',
              lineHeight: 1.5,
            }}
          >
            ReadFirst does not treat education as a transaction. We work across the ecosystem to build sustainable cultures of inquiry.
          </p>
        </div>

        {/* 3 Editorial Columns */}
        <div className="rf-audiences-grid">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.id}
                className="rf-audience-column"
                onMouseEnter={() => setActiveAudience(aud.id)}
                onMouseLeave={() => setActiveAudience(null)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="rf-audience-tier">{aud.tier}</span>
                    <Icon size={20} color="var(--rf-ink-muted)" strokeWidth={1.5} />
                  </div>

                  <h3 className="rf-audience-title">{aud.headline}</h3>

                  <p
                    style={{
                      fontFamily: 'var(--rf-font-serif)',
                      fontStyle: 'italic',
                      fontSize: '1.18rem',
                      color: 'var(--rf-navy)',
                      marginBottom: '1.2rem',
                      fontWeight: '400',
                    }}
                  >
                    "{aud.tagline}"
                  </p>

                  <p className="rf-audience-body">{aud.description}</p>

                  <ul className="rf-audience-list">
                    {aud.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--rf-grey-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link
                    to={`/${aud.id}`}
                    className="rf-audience-action"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>{aud.linkText}</span>
                    <ArrowUpRight size={16} />
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
