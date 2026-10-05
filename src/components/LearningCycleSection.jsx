import React, { useState, useEffect } from 'react';
import { ArrowRight, RotateCw, Sparkles, BookOpen, Search, Eye, MessageSquare, Lightbulb, PenTool } from 'lucide-react';

export default function LearningCycleSection({ onOpenConversation }) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'question',
      name: 'QUESTION',
      num: '01',
      icon: Lightbulb,
      tagline: 'The Genesis of Inquiry',
      description:
        'Learning begins not with a prescribed syllabus answer, but with authentic curiosity. Learners formulate questions that resist simple answers and demand rigorous investigation.',
      practices: ['Formulating non-trivial inquiries', 'Distinguishing fact from assumption', 'Mapping intellectual curiosity'],
    },
    {
      id: 'read',
      name: 'READ',
      num: '02',
      icon: BookOpen,
      tagline: 'Higher-Level Analytical Reading',
      description:
        'Moving past passive skimming into deep, forensic reading. Students annotate margins, compare historical viewpoints, and deconstruct arguments as active dialogue partners with the text.',
      practices: ['Active marginalia & notation', 'Dissecting rhetorical structure', 'Synthesizing conflicting sources'],
    },
    {
      id: 'observe',
      name: 'OBSERVE',
      num: '03',
      icon: Eye,
      tagline: 'Trained Empirical Perception',
      description:
        'Learning from the artist: cultivating acute attention to subtle patterns, unstated assumptions, environmental details, and anomalies that casual observers overlook.',
      practices: ['Empirical note-taking', 'Identifying unspoken biases', 'Attentive fieldwork'],
    },
    {
      id: 'reflect',
      name: 'REFLECT',
      num: '04',
      icon: Sparkles,
      tagline: 'Metacognitive Synthesis',
      description:
        'Stepping back from information intake to evaluate one’s own cognitive framework. What has changed in our understanding? What new ambiguities have surfaced?',
      practices: ['Reflective journaling', 'Metacognitive audits', 'Conceptual model revision'],
    },
    {
      id: 'investigate',
      name: 'INVESTIGATE',
      num: '05',
      icon: Search,
      tagline: 'Evidence-Based Investigation',
      description:
        'Designing a methodology to test assumptions. Students collect qualitative and quantitative data, trace citations, and build evidence-backed rationale.',
      practices: ['Methodological discipline', 'Primary source verification', 'Hypothesis testing'],
    },
    {
      id: 'discuss',
      name: 'DISCUSS',
      num: '06',
      icon: MessageSquare,
      tagline: 'Dialectical Collaborative Discourse',
      description:
        'Engaging with peers and mentors in seminar-style interrogation of ideas. Defending hypotheses with evidence while embracing constructive criticism and doubt.',
      practices: ['Socratic seminar defense', 'Peer critique protocols', 'Collaborative refinement'],
    },
    {
      id: 'create',
      name: 'CREATE',
      num: '07',
      icon: PenTool,
      tagline: 'Original Knowledge Production',
      description:
        'Synthesizing discoveries into genuine monographs, essays, or models. Creation is not an end-point, but an invitation that spawns the next tier of questions.',
      practices: ['Research monograph authoring', 'Artifact publication', 'Next-question formulation'],
    },
  ];

  // Auto-cycle through stages gently if user is idling
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [stages.length]);

  const current = stages[activeStage];
  const IconComp = current.icon;

  return (
    <section className="rf-section-cycle" id="approach" aria-label="Section 05: The ReadFirst Learning Cycle">
      <div className="rf-container">
        {/* Header */}
        <div className="rf-cycle-header">
          <span className="rf-editorial-eyebrow" style={{ marginBottom: '1.5rem' }}>
            05 // The Cognitive Architecture
          </span>
          <h2
            className="rf-serif-display"
            style={{ fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', color: 'var(--rf-navy)', marginBottom: '1.2rem' }}
          >
            THE READFIRST <br />
            <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>LEARNING CYCLE.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--rf-ink-soft)', lineHeight: 1.5, maxWidth: '620px', margin: '0 auto' }}>
            A continuous, connected ecosystem of inquiry. Seven interdependent stages that transform how an individual encounters knowledge.
          </p>
        </div>

        {/* Interactive Cycle System */}
        <div className="rf-cycle-interactive-wrap">
          {/* Circular Orbit Visualization */}
          <div className="rf-cycle-diagram">
            <svg viewBox="0 0 460 460" width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F2642A" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00326A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FBCFBA" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Main Orbit Ring */}
              <circle
                cx="230"
                cy="230"
                r="175"
                fill="none"
                stroke="var(--rf-grey-border)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />

              {/* Dynamic Glow Segment */}
              <circle
                cx="230"
                cy="230"
                r="175"
                fill="none"
                stroke="url(#orbitGrad)"
                strokeWidth="3"
                strokeDasharray="80 180"
                strokeLinecap="round"
                style={{
                  transformOrigin: 'center',
                  transform: `rotate(${activeStage * (360 / 7)}deg)`,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Center Brand Monogram */}
              <circle cx="230" cy="230" r="48" fill="#F4F6F7" stroke="var(--rf-grey-border)" strokeWidth="1" />
              <text
                x="230"
                y="226"
                textAnchor="middle"
                fontFamily="var(--rf-font-sans)"
                fontSize="11"
                fontWeight="800"
                letterSpacing="3"
                fill="#00326A"
              >
                READFIRST
              </text>
              <text
                x="230"
                y="244"
                textAnchor="middle"
                fontFamily="var(--rf-font-mono)"
                fontSize="8"
                letterSpacing="1.5"
                fill="#F2642A"
              >
                CYCLE
              </text>

              {/* 7 Connected Nodes on Orbit */}
              {stages.map((stage, idx) => {
                const angle = (idx * (360 / 7) - 90) * (Math.PI / 180);
                const x = 230 + 175 * Math.cos(angle);
                const y = 230 + 175 * Math.sin(angle);
                const isActive = activeStage === idx;

                return (
                  <g
                    key={stage.id}
                    onClick={() => setActiveStage(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Active pulse ring */}
                    {isActive && (
                      <circle
                        cx={x}
                        cy={y}
                        r="24"
                        fill="none"
                        stroke="var(--rf-orange)"
                        strokeWidth="1.5"
                        opacity="0.3"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isActive ? 16 : 12}
                      fill={isActive ? 'var(--rf-orange)' : 'var(--rf-white)'}
                      stroke={isActive ? 'var(--rf-orange)' : 'var(--rf-grey-border)'}
                      strokeWidth={isActive ? '3' : '2'}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fontFamily="var(--rf-font-mono)"
                      fontSize="9"
                      fontWeight="700"
                      fill={isActive ? '#FFFFFF' : 'var(--rf-ink-soft)'}
                    >
                      {idx + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detailed Stage Card */}
          <div className="rf-cycle-stage-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <span className="rf-stage-num">
                STAGE {current.num} // 07
              </span>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(242, 100, 42, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--rf-orange)',
                }}
              >
                <IconComp size={20} />
              </div>
            </div>

            <h3 className="rf-stage-name">{current.name}</h3>

            <p style={{ fontFamily: 'var(--rf-font-mono)', fontSize: '0.82rem', letterSpacing: '0.08em', color: 'var(--rf-orange)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              {current.tagline}
            </p>

            <p className="rf-stage-desc">{current.description}</p>

            <div style={{ marginTop: '2rem' }}>
              <span style={{ display: 'block', fontFamily: 'var(--rf-font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--rf-ink-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Key Disciplinary Practices
              </span>
              <div className="rf-stage-pills">
                {current.practices.map((practice) => (
                  <span key={practice} className="rf-stage-pill">
                    {practice}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {stages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStage(i)}
                    aria-label={`Jump to stage ${i + 1}`}
                    style={{
                      width: '28px',
                      height: '4px',
                      border: 'none',
                      borderRadius: '2px',
                      backgroundColor: activeStage === i ? 'var(--rf-orange)' : 'var(--rf-grey-border)',
                      cursor: 'pointer',
                      transition: 'background-color 0.25s ease',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => onOpenConversation('Learning Cycle Inquiry')}
                className="rf-btn-primary"
                style={{ padding: '0.7rem 1.3rem', fontSize: '0.75rem' }}
              >
                <span>Explore Our Approach</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
