import React from 'react';
import { Compass, BookOpen, Brain, Sparkles, Eye, Shield } from 'lucide-react';

export default function BeliefsSection() {
  const beliefs = [
    {
      number: '01',
      title: 'DEEP LEARNING',
      summary: 'Learning beyond memorisation, towards genuine understanding.',
      icon: Brain,
    },
    {
      number: '02',
      title: 'SELF-LEARNING',
      summary: 'Developing the capability to learn without constant instruction.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'INDEPENDENT THINKING',
      summary: "Questioning, exploring and forming one's own reasoned understanding.",
      icon: Compass,
    },
    {
      number: '04',
      title: 'PURPOSEFUL READING',
      summary: 'Reading to understand. Reading to think. Learning through books.',
      icon: BookOpen,
    },
    {
      number: '05',
      title: 'REDUCED SCREEN DEPENDENCE',
      summary: 'Making space for learning through focused attention, reading and reflection.',
      icon: Eye,
    },
  ];

  return (
    <section className="rf-section-beliefs" id="beliefs" aria-label="03 What ReadFirst Believes">
      <div className="rf-container">
        {/* Section Header */}
        <div className="rf-beliefs-header">
          <div>
            <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-peach)', marginBottom: '1rem' }}>
              03 // Core Philosophy
            </span>
            <h2 className="rf-beliefs-title">
              WHAT READFIRST <br />
              <em>BELIEVES.</em>
            </h2>
          </div>
          <p className="rf-beliefs-lead">
            Learning is not passive absorption. It is an active habit of mind that transforms how a person sees and engages with the world.
          </p>
        </div>

        {/* 5 Core Belief Statements in Editorial Layout */}
        <div className="rf-beliefs-grid">
          {beliefs.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.number} className="rf-belief-card">
                <div className="rf-belief-card-top">
                  <span className="rf-belief-number">{item.number}</span>
                  <div className="rf-belief-icon">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="rf-belief-name">{item.title}</h3>
                <p className="rf-belief-desc">{item.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Editorial Conviction Strip */}
        <div className="rf-beliefs-conviction">
          <p className="rf-beliefs-conviction-quote">
            “We believe learning should change the learner — cultivating strength of mind, curiosity, and independent thought.”
          </p>
          <span className="rf-beliefs-conviction-author">
            READFIRST PHILOSOPHY // RESEARCH-BASED TEACHING & LEARNING
          </span>
        </div>
      </div>
    </section>
  );
}
