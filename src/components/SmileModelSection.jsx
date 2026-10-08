import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, BookOpen, Search, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SmileModelSection({ onOpenConversation }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      name: 'QUESTION',
      icon: Lightbulb,
      tagline: 'Curiosity & Inquiry',
      description: 'Framing authentic questions ("Why?", "How?", "What if?") that create a genuine need to know.',
    },
    {
      num: '02',
      name: 'READ',
      icon: BookOpen,
      tagline: 'Deep Reading & Attention',
      description: 'Engaging attentively with textbooks and primary texts through purposeful, screen-free reading.',
    },
    {
      num: '03',
      name: 'EXPLORE',
      icon: Search,
      tagline: 'Research & Evidence',
      description: 'Examining evidence, testing assumptions, and connecting concepts across ideas.',
    },
    {
      num: '04',
      name: 'REFLECT',
      icon: Sparkles,
      tagline: 'Mindfulness & Clarity',
      description: 'Pausing to examine one’s own understanding, synthesize insights, and build cognitive stamina.',
    },
    {
      num: '05',
      name: 'UNDERSTAND',
      icon: CheckCircle2,
      tagline: 'Independent Thinking',
      description: 'Forming reasoned conclusions and articulating original thought with clarity and conviction.',
    },
  ];

  const connections = [
    'Deep Learning',
    'Self-Learning',
    'Independent Thinking',
    'Purposeful Reading',
    'Reflection & Mindfulness',
    'Curiosity & Attention',
    'Reduced Screen Dependence',
  ];

  return (
    <section className="rf-section-smile" id="smile-model" aria-label="05 SMILE Learning Model">
      <div className="rf-container">
        {/* Section Header */}
        <div className="rf-smile-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1rem' }}>
            05 // Intellectual Asset
          </span>
          <h2 className="rf-serif-display rf-smile-title">
            THE SMILE <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>LEARNING MODEL.</span>
          </h2>
          <div className="rf-smile-acronym-banner">
            <span className="rf-smile-acronym-badge">SMILE</span>
            <span className="rf-smile-acronym-full">Self-Motivated Intelligent Learning Environment</span>
          </div>
          <p className="rf-smile-lead">
            An evidence-based learning environment that connects curiosity, attention, purposeful reading, and reflection to build true learner independence.
          </p>
        </div>

        {/* Connected Principles Tag Ribbon */}
        <div className="rf-smile-ribbon" aria-label="SMILE Learning Dimensions">
          {connections.map((item) => (
            <span key={item} className="rf-smile-ribbon-tag">
              {item}
            </span>
          ))}
        </div>

        {/* 5-Step Inquiry Cycle Progression */}
        <div className="rf-smile-cycle-container">
          <div className="rf-smile-steps-nav" role="tablist">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStep(idx)}
                  className={`rf-smile-step-btn ${isActive ? 'is-active' : ''}`}
                >
                  <span className="rf-smile-step-num">{step.num}</span>
                  <Icon size={16} />
                  <span className="rf-smile-step-name">{step.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Feature Display */}
          <div className="rf-smile-active-card">
            <div className="rf-smile-card-main">
              <div className="rf-smile-card-meta">
                <span className="rf-smile-card-step">PHASE {steps[activeStep].num} OF 05</span>
                <span className="rf-smile-card-tag">{steps[activeStep].tagline}</span>
              </div>
              <h3 className="rf-smile-card-heading">{steps[activeStep].name}</h3>
              <p className="rf-smile-card-text">{steps[activeStep].description}</p>
            </div>
            <div className="rf-smile-card-action">
              <Link to="/approach" className="rf-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore Full SMILE Framework</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
