import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Compass, Search, HelpCircle, Eye, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StudentsPage({ onOpenConversation }) {
  const [activeTab, setActiveTab] = useState('inquiry');
  const [activeHabit, setActiveHabit] = useState(0);

  const pillars = [
    {
      number: '01',
      title: 'Deep Reading',
      tagline: 'Beyond Surface Scanning',
      description: 'Moving beyond passive comprehension into active interrogation of texts. Students learn to annotate, decode underlying assumptions, identify conceptual contradictions, and construct structured mental models.',
      focus: ['Marginalia & Critical Annotation', 'Syntopical Textual Comparison', 'Identifying Author Intent & Blindspots']
    },
    {
      number: '02',
      title: 'Self-Learning',
      tagline: 'Internal Scaffolding',
      description: 'Developing the metacognitive discipline to navigate complex unfamiliar domains independently. Students transition from dependent instruction receivers into self-directed investigators who know how to architect their own inquiries.',
      focus: ['Autonomous Knowledge Synthesis', 'Metacognitive Self-Assessment', 'Independent Resource Discovery']
    },
    {
      number: '03',
      title: 'Questioning',
      tagline: 'The Catalyst of Thought',
      description: 'Formulating high-order inquiry questions that generate insight rather than superficial answers. Learning to ask "Why?", "What if?", "How do we know?", and "Under what conditions is this false?".',
      focus: ['High-Order Question Taxonomy', 'Challenging Axiomatic Premises', 'Inquiry-Driven Problem Formulation']
    }
  ];

  const inquirySteps = [
    { stage: '01', label: 'QUESTION', question: 'What is genuinely happening here?', desc: 'Frame an authentic intellectual provocation that does not have an obvious, pre-packaged textbook answer.' },
    { stage: '02', label: 'OBSERVE', question: 'What patterns emerge under sustained attention?', desc: 'Pay close attention to nuances, anomalies, unstated assumptions, and primary evidence before jumping to conclusions.' },
    { stage: '03', label: 'INVESTIGATE', question: 'What evidence substantiates or refutes our hypothesis?', desc: 'Formulate systematic methods to gather primary sources, conduct experiments, and test conceptual boundaries.' },
    { stage: '04', label: 'DISCUSS', question: 'How do peer perspectives refine the interpretation?', desc: 'Subject findings to rigorous seminar dialogue, constructive critique, and collaborative synthesis.' },
    { stage: '05', label: 'CREATE', question: 'What new understanding or artifact emerges?', desc: 'Synthesize insights into an original monograph, analytical paper, model, or structured creative proposal.' }
  ];

  const researchSteps = [
    { stage: '01', label: 'QUESTION', prompt: 'Define the empirical or theoretical boundary to interrogate.' },
    { stage: '02', label: 'METHOD', prompt: 'Architect the qualitative or quantitative framework of inquiry.' },
    { stage: '03', label: 'FINDING', prompt: 'Isolate substantive patterns from the gathered evidence without bias.' },
    { stage: '04', label: 'IMPLICATION', prompt: 'Determine how this finding changes understanding or practice.' }
  ];

  const habits = [
    { title: 'Read Deeply', summary: 'Treat reading as an active intellectual dialogue rather than information ingestion.' },
    { title: 'Ask Meaningful Questions', summary: 'Seek questions that reveal underlying structures rather than surface facts.' },
    { title: 'Observe Carefully', summary: 'Notice the overlooked detail, the anomaly that standard models fail to explain.' },
    { title: 'Reflect Daily', summary: 'Step back to examine one’s own reasoning, cognitive biases, and evolving assumptions.' },
    { title: 'Investigate Rigorously', summary: 'Pursue evidence across multiple disciplines with academic integrity.' },
    { title: 'Think Independently', summary: 'Form well-reasoned convictions rather than defaulting to consensus.' }
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
              // AUDIENCE / LEARNERS
            </span>
            <h1 className="rf-page-hero-title">
              DON’T JUST STUDY.<br />
              LEARN <em>HOW TO LEARN.</em>
            </h1>
            <p className="rf-page-hero-lead">
              Conventional schooling teaches students what to remember for the next exam. 
              ReadFirst equips learners with the enduring intellectual habits of deep reading, 
              rigorous questioning, independent inquiry, and autonomous thought.
            </p>
            <div className="rf-page-hero-actions">
              <button
                onClick={() => onOpenConversation('Students')}
                className="rf-btn-primary"
              >
                <span>Explore Student Learning</span>
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => onOpenConversation('Institutions')}
                className="rf-btn-secondary"
              >
                <span>Talk To Your School</span>
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
