import React, { useState } from 'react';
import { ArrowUpRight, Compass, Sparkles, CheckCircle2, RotateCcw, Shield, Layers, HelpCircle } from 'lucide-react';

export default function ApproachPage({ onOpenConversation }) {
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);

  const learningCycle = [
    { stage: '01', name: 'QUESTION', desc: 'Framing an authentic intellectual inquiry that demands exploration rather than simple fact retrieval.' },
    { stage: '02', name: 'READ', desc: 'Slow, deep reading of primary texts, annotations, and contrasting theoretical viewpoints.' },
    { stage: '03', name: 'OBSERVE', desc: 'Sustained, disciplined perception of real-world phenomena, contradictions, and empirical data.' },
    { stage: '04', name: 'REFLECT', desc: 'Pausing to examine one’s own internal thinking models, assumptions, and emerging hypotheses.' },
    { stage: '05', name: 'INVESTIGATE', desc: 'Conducting structured experiments, archival research, interviews, or qualitative fieldwork.' },
    { stage: '06', name: 'DISCUSS', desc: 'Subjecting findings to peer seminar dialogue, dialectical debate, and collaborative synthesis.' },
    { stage: '07', name: 'CREATE', desc: 'Authoring a new conceptual model, research paper, creative artifact, or systemic solution.' }
  ];

  const foundationalShifts = [
    { from: 'BEYOND MARKS', to: 'TOWARD MASTERY', context: 'From memorising for high-stakes test scores to cultivating enduring, autonomous cognitive mastery.' },
    { from: 'BEYOND ANSWERS', to: 'TOWARD QUESTIONS', context: 'From rewarding fast pre-packaged answers to honoring deep, courageous, problem-generating questions.' },
    { from: 'BEYOND CONSUMPTION', to: 'TOWARD INQUIRY', context: 'From passive consumption of digital summaries to rigorous primary textual interrogation.' },
    { from: 'BEYOND ASSIGNMENTS', to: 'TOWARD RESEARCH', context: 'From compliance-driven homework packets to self-directed empirical investigations.' },
    { from: 'BEYOND TEACHING', to: 'TOWARD LEARNING', context: 'From teacher-centered lecture performance to learner-centered cognitive architecture.' }
  ];

  const smileElements = [
    {
      title: 'What Is SMILE?',
      desc: 'SMILE stands for Self-Motivated Intelligent Learning Environment. It is ReadFirst’s proprietary intellectual framework for understanding and architecting learning spaces that sustain intrinsic intellectual drive without constant external surveillance.'
    },
    {
      title: 'The Problem It Addresses',
      desc: 'Conventional schooling relies on artificial external urgency: bells, marks, compliance checklists, and threat of failure. When these external props are removed, student learning collapses. SMILE replaces artificial compliance with internal curiosity and rigorous inquiry routines.'
    },
    {
      title: 'How ReadFirst Uses It',
      desc: 'SMILE is not an app or an educational widget; it is an architectural framework deployed across classroom routines, physical room ergonomics, text selection, peer seminar design, and pedagogical coaching.'
    },
    {
      title: 'The Intellectual Basis',
      desc: 'Built upon decades of research in self-determination theory, syntopical cognitive reading, metacognitive self-regulation, and democratic seminar pedagogy.'
    }
  ];

  return (
    <div className="rf-page-wrapper">
      {/* -----------------------------------------------------------
          HERO SECTION
          ----------------------------------------------------------- */}
      <section className="rf-page-hero">
        <div className="rf-container">
          <div className="rf-page-hero-inner">
            <span className="rf-editorial-eyebrow">
              // METHODOLOGY & FRAMEWORK
            </span>
            <h1 className="rf-page-hero-title">
              THE READFIRST<br />
              <em>APPROACH.</em>
            </h1>
            <p className="rf-page-hero-lead">
              Education should not be an assembly line of syllabus coverage. 
              We architect self-motivated learning environments, disciplined inquiry cycles, 
              and profound intellectual shifts that change how human beings think.
            </p>
            <div className="rf-page-hero-actions">
              <button
                onClick={() => onOpenConversation('Our Approach')}
                className="rf-btn-primary"
              >
                <span>Explore The Framework</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE SMILE FRAMEWORK (Intellectual IP)
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-light">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// PROPRIETARY INTELLECTUAL FRAMEWORK</span>
            <h2 className="rf-section-title">
              The SMILE <em>Framework.</em>
            </h2>
            <p className="rf-section-lead">
              Self-Motivated Intelligent Learning Environment — ReadFirst’s intellectual architecture 
              for cultivating self-sustaining inquiry cultures.
            </p>
          </div>

          <div className="rf-smile-grid">
            {smileElements.map((el, i) => (
              <div key={el.title} className="rf-smile-card">
                <span className="rf-smile-num">0{i + 1}</span>
                <h3 className="rf-smile-title">{el.title}</h3>
                <p className="rf-smile-desc">{el.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE 7-STAGE LEARNING CYCLE
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-white">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// RECURSIVE COGNITION</span>
            <h2 className="rf-section-title">
              The 7-Stage <em>Learning Cycle.</em>
            </h2>
            <p className="rf-section-lead">
              Inquiry is not a linear sprint with a final full stop. It is a continuous, 
              deepening spiral where answers generate superior questions.
            </p>
          </div>

          <div className="rf-cycle-interactive">
            <div className="rf-cycle-nav">
              {learningCycle.map((stage, idx) => (
                <button
                  key={stage.stage}
                  className={`rf-cycle-step-btn ${activeCycleIndex === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveCycleIndex(idx)}
                >
                  <span className="rf-cycle-step-num">{stage.stage}</span>
                  <span className="rf-cycle-step-name">{stage.name}</span>
                </button>
              ))}
            </div>

            <div className="rf-cycle-display-card">
              <span className="rf-badge-accent">STAGE {learningCycle[activeCycleIndex].stage} OF 07</span>
              <h3 className="rf-cycle-stage-title">{learningCycle[activeCycleIndex].name}</h3>
              <p className="rf-cycle-stage-desc">{learningCycle[activeCycleIndex].desc}</p>
              <div className="rf-cycle-progression-hint">
                <span>Next Step in Inquiry: </span>
                <strong>{learningCycle[(activeCycleIndex + 1) % 7].name} →</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE 5 FOUNDATIONAL SHIFTS
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-navy text-white">
        <div className="rf-container">
          <div className="rf-section-header dark">
            <span className="rf-eyebrow-accent">// PARADIGM SHIFTS</span>
            <h2 className="rf-section-title text-white">
              Five Shifts in <em>Educational Reality.</em>
            </h2>
            <p className="rf-section-lead text-white-70">
              Transforming how students, educators, and schools relate to knowledge.
            </p>
          </div>

          <div className="rf-shifts-list">
            {foundationalShifts.map((shift, idx) => (
              <div key={idx} className="rf-shift-row">
                <div className="rf-shift-pair">
                  <span className="rf-shift-old">{shift.from}</span>
                  <span className="rf-shift-arrow">→</span>
                  <span className="rf-shift-new">{shift.to}</span>
                </div>
                <p className="rf-shift-context">{shift.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          CLOSING CTA
          ----------------------------------------------------------- */}
      <section className="rf-closing-invitation">
        <div className="rf-container">
          <div className="rf-closing-box">
            <span className="rf-eyebrow">// ENGAGEMENT</span>
            <h2 className="rf-closing-title">
              Bring the ReadFirst Approach to Your Learning Community.
            </h2>
            <p className="rf-closing-lead">
              Connect with our pedagogical strategists to explore how these frameworks 
              can be tailored to your institutional priorities.
            </p>
            <div className="rf-closing-actions">
              <button
                onClick={() => onOpenConversation('Our Approach')}
                className="rf-btn-primary"
              >
                <span>Start A Conversation</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
