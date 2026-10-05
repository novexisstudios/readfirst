import React, { useState } from 'react';
import { Lightbulb, BookOpen, Search, Sparkles, PenTool, CheckCircle2 } from 'lucide-react';

export default function LearningCycleSection({ onOpenConversation }) {
  const [selectedStage, setSelectedStage] = useState(0);

  const stages = [
    {
      step: '01',
      name: 'QUESTION',
      icon: Lightbulb,
      tag: 'Authentic Inquiry',
      summary: 'Formulating authentic questions: "Why?", "How do we know?", and "What if?".',
      practice: 'Authentic question generation',
    },
    {
      step: '02',
      name: 'READ',
      icon: BookOpen,
      tag: 'Deep Reading',
      summary: 'Engaging directly with textbooks through focused attention and active marginalia.',
      practice: 'Attentive, screen-free textbook study',
    },
    {
      step: '03',
      name: 'EXPLORE',
      icon: Search,
      tag: 'Investigation',
      summary: 'Gathering evidence, cross-referencing ideas, and testing assumptions.',
      practice: 'Evidence gathering & hypothesis testing',
    },
    {
      step: '04',
      name: 'REFLECT',
      icon: Sparkles,
      tag: 'Strength of Mind',
      summary: 'Building strength of mind, conceptual depth, and lasting clarity.',
      practice: 'Reflective learning & self-assessment',
    },
    {
      step: '05',
      name: 'CREATE',
      icon: PenTool,
      tag: 'Independent Thinkers',
      summary: 'Synthesizing inquiry into original reasoning and independent thinking.',
      practice: 'Original synthesis & reasoned dialogue',
    },
  ];

  const current = stages[selectedStage];
  const CurrentIcon = current.icon;

  return (
    <section className="rf-section-cycle" id="cycle" aria-label="Section 05: The ReadFirst Learning Cycle">
      <div className="rf-container">
        {/* Header */}
        <div className="rf-cycle-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            Habits of Mind
          </span>
          <h2 className="rf-serif-display" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--rf-navy)', marginBottom: '0.8rem' }}>
            THE READFIRST <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>LEARNING CYCLE.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--rf-ink-soft)', lineHeight: 1.5, maxWidth: '580px', margin: '0 auto' }}>
            Five steps from curiosity to independent thinking.
          </p>
        </div>

        {/* Straightforward 5-Step Progression Bar */}
        <div className="rf-cycle-steps-strip" role="tablist" aria-label="Learning Cycle Stages">
          {stages.map((stage, idx) => {
            const isSelected = selectedStage === idx;
            const IconComp = stage.icon;
            return (
              <button
                key={stage.step}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedStage(idx)}
                className={`rf-cycle-step-pill ${isSelected ? 'is-active' : ''}`}
              >
                <span className="rf-step-pill-num">{stage.step}</span>
                <IconComp size={16} className="rf-step-pill-icon" />
                <span className="rf-step-pill-name">{stage.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="rf-cycle-focus-card">
          <div className="rf-cycle-focus-grid">
            <div className="rf-cycle-focus-main">
              <div className="rf-cycle-focus-badge">
                <span className="rf-cycle-stage-idx">STAGE {current.step} OF 05</span>
                <span className="rf-cycle-tag-badge">{current.tag}</span>
              </div>
              <h3 className="rf-cycle-focus-name">{current.name}</h3>
              <p className="rf-cycle-focus-summary" style={{ fontSize: '1.25rem', lineHeight: 1.5, color: 'var(--rf-navy)' }}>
                {current.summary}
              </p>
            </div>

            <div className="rf-cycle-focus-sidebar">
              <div className="rf-cycle-practice-box">
                <div className="rf-cycle-practice-label">Inquiry Practice</div>
                <div className="rf-cycle-practice-text">
                  <CheckCircle2 size={16} color="var(--rf-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{current.practice}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.2rem' }}>
                <button
                  onClick={() => onOpenConversation(`Learning Cycle: ${current.name}`)}
                  className="rf-btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Explore Practice →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
