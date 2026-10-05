import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Compass, Search, HelpCircle, Eye, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StudentsPage({ onOpenConversation }) {
  const [activeTab, setActiveTab] = useState('inquiry');
  const [activeHabit, setActiveHabit] = useState(0);

  const pillars = [
    {
      number: '01',
      title: 'Textbook & Deep Reading',
      tagline: 'Focused, Attentive Study',
      description: 'Engaging directly with textbooks and core materials without passive screen distraction. Students learn active marginalia, focused attention, and the discipline to converse thoughtfully with complex ideas.',
      focus: ['Active Marginalia & Annotations', 'Deep Reading Stamina', 'Textbook-Based Concept Mastery']
    },
    {
      number: '02',
      title: 'Self-Study & Mindfulness',
      tagline: 'Understanding How the Brain Learns',
      description: 'Uncovering how the brain processes and retains information. By understanding cognitive learning habits, students shift their experience of study from a burden into a rewarding, lifelong privilege.',
      focus: ['Mindful Self-Study Habits', 'Concept Retention & Recall', 'Autonomous Daily Learning Routines']
    },
    {
      number: '03',
      title: 'Authentic Questioning',
      tagline: 'Strength of Mind & Inquiry',
      description: 'Formulating high-order inquiry questions that lead to genuine insight. Students learn to ask "Why?", "What if?", and "How do we know?", developing into confident independent thinkers.',
      focus: ['Independent Question Formulation', 'Evidence Evaluation', 'Independent Problem-Solving']
    }
  ];

  const inquirySteps = [
    { stage: '01', label: 'QUESTION', question: 'What is genuinely happening here?', desc: 'Frame an authentic question that sparks curiosity and deep exploration.' },
    { stage: '02', label: 'READ', question: 'What insights does the text provide?', desc: 'Engage deeply with the textbook and primary material through attentive, close reading.' },
    { stage: '03', label: 'EXPLORE', question: 'What evidence substantiates or tests our thinking?', desc: 'Gather facts, test assumptions, and examine patterns with researcher-like patience.' },
    { stage: '04', label: 'REFLECT', question: 'How has our understanding evolved?', desc: 'Pause to synthesize meaning, identify ambiguities, and anchor conceptual clarity.' },
    { stage: '05', label: 'CREATE', question: 'What original insight emerges?', desc: 'Synthesize learning into a reasoned monograph, discussion, model, or creative project.' }
  ];

  const researchSteps = [
    { stage: '01', label: 'QUESTION', prompt: 'Define the core question or problem to explore.' },
    { stage: '02', label: 'READ & GATHER', prompt: 'Examine primary sources and textbooks with focused attention.' },
    { stage: '03', label: 'EXPLORE & TEST', prompt: 'Isolate substantive patterns and test assumptions against evidence.' },
    { stage: '04', label: 'SYNTHESIZE', prompt: 'Articulate original conclusions and independent insights.' }
  ];

  const habits = [
    { title: 'Read Deeply', summary: 'Treat reading as an active intellectual dialogue rather than passive skimming.' },
    { title: 'Ask Meaningful Questions', summary: 'Seek questions that reveal core principles and encourage deeper exploration.' },
    { title: 'Observe Carefully', summary: 'Notice subtle details, patterns, and assumptions that standard glance overlooks.' },
    { title: 'Reflect With Mindfulness', summary: 'Step back to examine one’s own understanding and cognitive habits.' },
    { title: 'Explore Rigorously', summary: 'Pursue evidence, verify claims, and connect ideas across subjects.' },
    { title: 'Think Independently', summary: 'Form well-reasoned convictions through evidence and strength of mind.' }
  ];

  return (
    <div className="rf-page-wrapper">
      {/* -----------------------------------------------------------
          HERO SECTION (Oversized Editorial Typography)
          ----------------------------------------------------------- */}
      <section className="rf-page-hero">
        <div className="rf-container">
          <div className="rf-page-hero-inner">
            <span className="rf-editorial-eyebrow">
              // AUDIENCE / STUDENTS
            </span>
            <h1 className="rf-page-hero-title">
              BECOME A SELF-MOTIVATED<br />
              <em>INSIGHTFUL LEARNER.</em>
            </h1>
            <p className="rf-page-hero-lead">
              ReadFirst helps students develop the habits to read, question, explore, and learn on their own. 
              By understanding how the brain processes information, studying shifts from a burden into a lifelong privilege.
            </p>
            <div className="rf-page-hero-actions">
              <button
                onClick={() => onOpenConversation('Students')}
                className="rf-btn-primary"
              >
                <span>Start Student Pathway</span>
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => onOpenConversation('Institutions')}
                className="rf-btn-secondary"
              >
                <span>Introduce ReadFirst to Your School</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          SECTION 01: THE 3 CORE PILLARS OF INDEPENDENT LEARNING
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-light">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// FOUNDATIONAL CAPABILITIES</span>
            <h2 className="rf-section-title">
              Three Disciplines that Transform <br />
              a Student into an <em>Independent Scholar.</em>
            </h2>
          </div>

          <div className="rf-pillars-grid">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="rf-pillar-card">
                <span className="rf-pillar-num">{pillar.number}</span>
                <h3 className="rf-pillar-title">{pillar.title}</h3>
                <span className="rf-pillar-tagline">{pillar.tagline}</span>
                <p className="rf-pillar-desc">{pillar.description}</p>
                <div className="rf-pillar-focus-list">
                  <span className="rf-focus-label">Core Competencies:</span>
                  <ul>
                    {pillar.focus.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="rf-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          SECTION 02: INQUIRY & RESEARCH PATHWAYS
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-white">
        <div className="rf-container">
          <div className="rf-section-header-split">
            <div>
              <span className="rf-eyebrow">// INTELLECTUAL METHODOLOGY</span>
              <h2 className="rf-section-title">
                The Pathways of <em>Inquiry.</em>
              </h2>
            </div>
            <div className="rf-pathway-toggle">
              <button
                className={`rf-toggle-btn ${activeTab === 'inquiry' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('inquiry')}
              >
                The 5-Stage Inquiry Cycle
              </button>
              <button
                className={`rf-toggle-btn ${activeTab === 'research' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('research')}
              >
                The Research Framework
              </button>
            </div>
          </div>

          {activeTab === 'inquiry' ? (
            <div className="rf-inquiry-timeline">
              {inquirySteps.map((step, idx) => (
                <div key={step.stage} className="rf-timeline-node">
                  <div className="rf-node-badge">
                    <span className="rf-node-num">{step.stage}</span>
                    <span className="rf-node-label">{step.label}</span>
                  </div>
                  <div className="rf-node-content">
                    <h4 className="rf-node-question">"{step.question}"</h4>
                    <p className="rf-node-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rf-research-path-grid">
              {researchSteps.map((step) => (
                <div key={step.stage} className="rf-research-step-card">
                  <span className="rf-step-indicator">STAGE {step.stage}</span>
                  <h3 className="rf-step-title">{step.label}</h3>
                  <p className="rf-step-prompt">{step.prompt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -----------------------------------------------------------
          SECTION 03: THE 6 HABITS OF AN INDEPENDENT LEARNER
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-navy">
        <div className="rf-container">
          <div className="rf-section-header dark">
            <span className="rf-eyebrow-accent">// CHARACTER & DISPOSITION</span>
            <h2 className="rf-section-title text-white">
              The Habits of an <em>Independent Learner.</em>
            </h2>
            <p className="rf-section-lead text-white-70">
              Not a list of tips or study hacks, but disciplined cognitive practices 
              cultivated through rigorous attention and daily practice.
            </p>
          </div>

          <div className="rf-habits-layout">
            <div className="rf-habits-list">
              {habits.map((habit, index) => (
                <button
                  key={habit.title}
                  className={`rf-habit-item ${activeHabit === index ? 'is-active' : ''}`}
                  onClick={() => setActiveHabit(index)}
                >
                  <span className="rf-habit-idx">0{index + 1}</span>
                  <span className="rf-habit-name">{habit.title}</span>
                </button>
              ))}
            </div>

            <div className="rf-habit-spotlight">
              <span className="rf-spotlight-tag">HABIT 0{activeHabit + 1}</span>
              <h3 className="rf-spotlight-title">{habits[activeHabit].title}</h3>
              <p className="rf-spotlight-body">{habits[activeHabit].summary}</p>
              <div className="rf-spotlight-quote">
                "Attention precedes inquiry. Inquiry precedes understanding."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          SECTION 04: CLOSING INVITATION
          ----------------------------------------------------------- */}
      <section className="rf-closing-invitation">
        <div className="rf-container">
          <div className="rf-closing-box">
            <span className="rf-eyebrow">// REAL DELIVERY MODEL</span>
            <h2 className="rf-closing-title">
              Ready to learn how to learn?
            </h2>
            <p className="rf-closing-lead">
              Whether you are an independent student seeking deeper academic autonomy, 
              or a family looking to introduce ReadFirst to your school community.
            </p>
            <div className="rf-closing-actions">
              <button
                onClick={() => onOpenConversation('Students')}
                className="rf-btn-primary"
              >
                <span>Start A Conversation</span>
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => onOpenConversation('Institutions')}
                className="rf-btn-secondary"
              >
                <span>Introduce ReadFirst to Your School</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
