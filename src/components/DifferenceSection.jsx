import React from 'react';
import { Sparkles, CheckCircle2, Search, Brain, Lightbulb, Users, UserCheck } from 'lucide-react';

export default function DifferenceSection() {
  const learnerPillars = [
    {
      title: 'How Students Learn',
      description: 'Unlocking cognitive discovery, natural curiosity, and deep focus.',
      icon: Brain,
    },
    {
      title: 'How Students Understand',
      description: 'Moving from rote recall to conceptual clarity and lasting comprehension.',
      icon: Lightbulb,
    },
    {
      title: 'How Students Develop Curiosity',
      description: 'Framing authentic questions that inspire exploration rather than passive answers.',
      icon: Search,
    },
    {
      title: 'How Students Become Independent Learners',
      description: 'Building self-study routines, purpose-driven reading, and self-motivation.',
      icon: UserCheck,
    },
    {
      title: 'How Educators Influence Learning Behaviour',
      description: 'Empowering teachers with reflective, research-based pedagogical practice.',
      icon: Users,
    },
  ];

  return (
    <section className="rf-section-difference" id="difference" aria-label="04 How ReadFirst Is Different">
      <div className="rf-container">
        {/* Section Header */}
        <div className="rf-difference-header">
          <div>
            <div className="rf-difference-badge">
              <Sparkles size={14} />
              <span>RESEARCH-BASED TEACHING & LEARNING</span>
            </div>
            <h2 className="rf-serif-display rf-difference-title">
              WE START WITH <br />
              <em>THE LEARNER.</em>
            </h2>
          </div>
          <div className="rf-difference-lead-wrap">
            <p className="rf-difference-lead">
              ReadFirst is not simply about delivering more content. It is about understanding learning itself.
            </p>
            <p className="rf-difference-sublead">
              Instead of layering more worksheets or exam drills, we focus on the fundamental mechanisms of how human beings think, read, and understand.
            </p>
          </div>
        </div>

        {/* 5 Focus Pillars */}
        <div className="rf-difference-grid">
          {learnerPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rf-difference-card">
                <div className="rf-diff-card-head">
                  <span className="rf-diff-idx">0{idx + 1}</span>
                  <div className="rf-diff-icon-wrap">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="rf-diff-card-title">{item.title}</h3>
                <p className="rf-diff-card-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
