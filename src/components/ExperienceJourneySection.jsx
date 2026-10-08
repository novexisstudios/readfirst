import React from 'react';
import { BookOpen, Compass, Eye, Sparkles, MessageSquare, PenTool } from 'lucide-react';

export default function ExperienceJourneySection() {
  const experiences = [
    {
      num: '01',
      title: 'READ DEEPLY & QUESTION',
      tagline: 'Attentive Textual Engagement',
      description: 'Opening the physical volume, noting in the margins, and examining foundational arguments directly.',
      icon: BookOpen,
    },
    {
      num: '02',
      title: 'OBSERVE & REFLECT',
      tagline: 'Mindfulness & Perception',
      description: 'Pausing in quiet concentration, examining assumptions, and noticing nuance before reaching conclusions.',
      icon: Eye,
    },
    {
      num: '03',
      title: 'INVESTIGATE & DISCUSS',
      tagline: 'Research-Based Dialogue',
      description: 'Testing hypotheses in collaborative seminars and cross-referencing evidence like an empirical researcher.',
      icon: MessageSquare,
    },
    {
      num: '04',
      title: 'CREATE MEANING',
      tagline: 'Independent Thinking',
      description: 'Transforming inquiries into original reasoned insights, structured monographs, and lasting habits of mind.',
      icon: PenTool,
    },
  ];

  return (
    <section className="rf-section-experience-journey" id="experience" aria-label="08 The ReadFirst Experience">
      <div className="rf-container">
        {/* Section Header */}
        <div className="rf-experience-header">
          <div>
            <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1rem' }}>
              08 // The Living Process
            </span>
            <h2 className="rf-serif-display rf-experience-title">
              THE READFIRST <br />
              <em>EXPERIENCE.</em>
            </h2>
          </div>
          <p className="rf-experience-lead">
            An immersive journey through deep reading, marginalia, quiet observation, collaborative seminar dialogue, and independent thought.
          </p>
        </div>

        {/* Editorial Visual Composition */}
        <div className="rf-experience-composition">
          <div className="rf-experience-media-grid">
            <div className="rf-exp-img-frame is-primary">
              <img
                src="/images/editorial_seminar_inquiry.jpg"
                alt="A scholarly seminar discussion with open books, notebooks, and thoughtful faculty dialogue"
                className="rf-exp-img"
                loading="lazy"
              />
              <div className="rf-exp-img-caption">
                <span>Collaborative Inquiry Seminar // Testing Ideas in Dialogue</span>
              </div>
            </div>

            <div className="rf-exp-img-frame is-secondary">
              <img
                src="/images/editorial_book_hands.jpg"
                alt="Hands writing reflective marginalia in a scholarly research journal"
                className="rf-exp-img"
                loading="lazy"
              />
              <div className="rf-exp-img-caption">
                <span>Field Research Notes // Active Marginalia</span>
              </div>
            </div>
          </div>

          {/* Continuous Journey Ribbon */}
          <div className="rf-experience-flow-strip">
            {experiences.map((exp) => {
              const Icon = exp.icon;
              return (
                <div key={exp.num} className="rf-exp-flow-node">
                  <div className="rf-exp-flow-top">
                    <span className="rf-exp-flow-num">{exp.num}</span>
                    <Icon size={18} className="rf-exp-flow-icon" />
                  </div>
                  <h3 className="rf-exp-flow-title">{exp.title}</h3>
                  <div className="rf-exp-flow-tagline">{exp.tagline}</div>
                  <p className="rf-exp-flow-desc">{exp.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
