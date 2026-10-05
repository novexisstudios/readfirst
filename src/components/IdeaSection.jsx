import React from 'react';
import { Compass, Sparkles, BookOpen, Brain, Building2 } from 'lucide-react';

export default function IdeaSection() {
  const pillars = [
    {
      icon: BookOpen,
      title: 'Self-Motivated Learners',
      subtitle: 'Mindful Self-Study',
      description: 'Shifting study from a burden into a privilege through focused textbook habits.',
    },
    {
      icon: Sparkles,
      title: 'Teacher to Learning Coach',
      subtitle: 'SMILE 2.0 Approach',
      description: 'Guiding student investigation, authentic questioning, and thoughtful dialogue.',
    },
    {
      icon: Brain,
      title: 'Strength of Mind',
      subtitle: 'Independent Thinkers',
      description: 'Cultivating the focus, patience, and stamina to reason independently.',
    },
    {
      icon: Building2,
      title: 'Knowledge Centres',
      subtitle: 'A Research Culture',
      description: 'Building an enduring whole-school environment of inquiry and innovation.',
    },
  ];

  return (
    <section className="rf-section-idea" id="purpose" aria-label="Section 04: What ReadFirst Adds to Learning">
      <div className="rf-container">
        {/* Eyebrow & Section Header */}
        <div className="rf-idea-header">
          <div>
            <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-peach)' }}>
              What ReadFirst Adds to Education
            </span>
            <h2 className="rf-idea-title">
              RESEARCH-BASED <br />
              <em>TEACHING & LEARNING.</em>
            </h2>
          </div>
          <p className="rf-idea-lead">
            Bringing inquiry, self-study habits, and independent thinking into everyday education.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="rf-value-pillars-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="rf-value-pillar-card">
                <div className="rf-pillar-icon-wrap">
                  <Icon size={22} />
                </div>
                <div className="rf-pillar-subtitle">{pillar.subtitle}</div>
                <h3 className="rf-pillar-title" style={{ color: '#FFFFFF' }}>{pillar.title}</h3>
                <p className="rf-pillar-desc" style={{ color: '#FFFFFF', opacity: 1 }}>{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Editorial Conviction Box */}
        <div className="rf-conviction-box">
          <div className="rf-conviction-icon-wrap">
            <Compass size={24} />
          </div>
          <div className="rf-conviction-content">
            <p className="rf-conviction-quote">
              "We believe learning should change the learner. Nurturing strength of mind and independent thinkers."
            </p>
            <span className="rf-conviction-author">
              READFIRST IDENTITY // RESEARCH-BASED TEACHING & LEARNING
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
