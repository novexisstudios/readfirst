import React, { useState } from 'react';
import { HelpCircle, BookOpen, Eye, Sparkles, Search, MessageSquare, PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearningCycleConnectedSection() {
  const [activeStep, setActiveStep] = useState(0);

  const cycleSteps = [
    {
      num: '01',
      name: 'QUESTION',
      icon: HelpCircle,
      prompt: 'What is worth understanding?',
      summary: 'Formulating authentic inquiries that ignite genuine curiosity rather than passive recall.',
    },
    {
      num: '02',
      name: 'READ',
      icon: BookOpen,
      prompt: 'Engage deeply with ideas and evidence.',
      summary: 'Attentive, screen-free textbook reading and annotation to encounter core principles directly.',
    },
    {
      num: '03',
      name: 'OBSERVE',
      icon: Eye,
      prompt: 'Look carefully before deciding.',
      summary: 'Developing the patience to notice nuance, empirical patterns, and overlooked assumptions.',
    },
    {
      num: '04',
      name: 'REFLECT',
      icon: Sparkles,
      prompt: 'Examine what you think and assume.',
      summary: 'Pausing with mindfulness to examine one’s own mental models and build cognitive clarity.',
    },
    {
      num: '05',
      name: 'INVESTIGATE',
      icon: Search,
      prompt: 'Move from curiosity toward inquiry.',
      summary: 'Gathering evidence, testing hypotheses, and cross-referencing insights like a researcher.',
    },
    {
      num: '06',
      name: 'DISCUSS',
      icon: MessageSquare,
      prompt: 'Test ideas through dialogue.',
      summary: 'Engaging in reasoned seminar dialogue to refine viewpoints and challenge intellectual complacency.',
    },
    {
      num: '07',
      name: 'CREATE',
      icon: PenTool,
      prompt: 'Turn learning into an output or insight.',
      summary: 'Synthesizing inquiry into original reasoning, structured writing, or enduring independent thinking.',
    },
  ];

  const current = cycleSteps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section className="rf-section-cycle-connected" id="learning-cycle" aria-label="06 ReadFirst Learning Cycle">
      <div className="rf-container">
        {/* Section Header */}
        <div className="rf-cycle-connected-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1rem' }}>
            06 // The Inquiry Cycle
          </span>
          <h2 className="rf-serif-display rf-cycle-connected-title">
            THE READFIRST <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>LEARNING CYCLE.</span>
          </h2>
          <p className="rf-cycle-connected-lead">
            Seven connected disciplines from initial curiosity to independent creation.
          </p>
        </div>

        {/* Continuous Connected Progress Strip */}
        <div className="rf-cycle-connected-track" role="tablist" aria-label="Learning Cycle Stages">
          {cycleSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStep(idx)}
                className={`rf-cycle-track-node ${isActive ? 'is-active' : ''}`}
              >
                <span className="rf-track-node-num">{step.num}</span>
                <Icon size={16} className="rf-track-node-icon" />
                <span className="rf-track-node-name">{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dominant Active Step Card */}
        <div className="rf-cycle-stage-spotlight">
          <div className="rf-stage-spotlight-content">
            <div className="rf-stage-spotlight-meta">
              <span className="rf-stage-badge">STAGE {current.num} OF 07</span>
              <span className="rf-stage-prompt">{current.prompt}</span>
            </div>
            <h3 className="rf-stage-title">{current.name}</h3>
            <p className="rf-stage-summary">{current.summary}</p>
          </div>

          <div className="rf-stage-spotlight-action">
            <Link to="/approach" className="rf-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Explore The Cycle In Our Approach</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
