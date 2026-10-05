import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Users, Compass, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function InstitutionsPage({ onOpenConversation }) {
  const [activeStage, setActiveStage] = useState(0);

  const fourConditions = [
    {
      title: 'Leadership',
      role: 'Institutional Vision & Air-Cover',
      desc: 'School leadership must protect time, grant intellectual autonomy, and reward curricular courage rather than superficial syllabus speed.'
    },
    {
      title: 'Educators',
      role: 'Practitioners as Researchers',
      desc: 'Faculty transition from passive curriculum couriers into reflective scholars who model curiosity and conduct classroom action inquiry.'
    },
    {
      title: 'Students',
      role: 'Agents of Their Own Learning',
      desc: 'Learners acquire the metacognitive vocabulary to self-assess, formulate original questions, and pursue deep textual investigation.'
    },
    {
      title: 'Evidence',
      role: 'Empirical Rigor & Iteration',
      desc: 'Decisions are grounded in longitudinal observation, qualitative dialogue analysis, and rigorous demonstration of thinking habits.'
    }
  ];

  const transformationStages = [
    {
      stage: '01',
      title: 'DIAGNOSE',
      summary: 'Comprehensive Culture & Noise Audit',
      details: 'We evaluate the existing school day, examining where student passivity is inadvertently engineered, how much noise crowds out deep reflection, and what barriers prevent teachers from engaging in sustained intellectual dialogue.'
    },
    {
      stage: '02',
      title: 'DESIGN',
      summary: 'Bespoke Institutional Blueprint',
      details: 'Architecting an inquiry model tailored to the institution’s ethos, curriculum requirements, and faculty strengths. Defining the structural milestones for embedding deep reading and research.'
    },
    {
      stage: '03',
      title: 'DEVELOP',
      summary: 'Faculty Immersion & Discovery Box Launch',
      details: 'Deploying the intensive 5-day educator immersion and equipping all participating teachers with the ReadFirst Discovery Box, observational tools, and pedagogical frameworks.'
    },
    {
      stage: '04',
      title: 'IMPLEMENT',
      summary: 'Classroom Inquiry Studios & Routines',
      details: 'Launching student-led inquiry seminars, deep reading routines, and structured seminar dialogues across target grade levels, supported by on-ground coaching.'
    },
    {
      stage: '05',
      title: 'INQUIRE',
      summary: 'Empirical Classroom Research Sprints',
      details: 'Educator cohorts engage in collaborative action research, systematically tracking student questioning behavior, depth of comprehension, and autonomous problem formulation.'
    },
    {
      stage: '06',
      title: 'INSTITUTIONALISE',
      summary: 'Embedding into Timetables & School Identity',
      details: 'Solidifying inquiry time into the permanent master timetable, establishing peer observation protocols, and authoring school-wide independent learning guidelines.'
    },
    {
      stage: '07',
      title: 'MEASURE',
      summary: 'Longitudinal Impact & Research Publication',
      details: 'Measuring gains in critical reading ability, metacognitive self-regulation, and inquiry depth. Compiling findings into institutional white papers and academic symposium presentations.'
    }
  ];

  const transformationChain = [
    { from: 'INSTRUCTION', to: 'LEARNING', shift: 'From teacher delivery to student agency' },
    { from: 'LEARNING', to: 'INQUIRY', shift: 'From receiving knowledge to questioning it' },
    { from: 'INQUIRY', to: 'RESEARCH', shift: 'From casual curiosity to disciplined evidence' },
    { from: 'RESEARCH', to: 'CULTURE', shift: 'From isolated events to permanent school ethos' }
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
              // AUDIENCE / INSTITUTIONAL LEADERS & EDUCATIONISTS
            </span>
            <h1 className="rf-page-hero-title">
              BUILD A CULTURE OF<br />
              <em>INDEPENDENT LEARNING.</em>
            </h1>
            <div className="rf-institutional-question-box">
              <span className="rf-question-lead">The Institutional Question:</span>
              <p className="rf-question-text">
                "What would change if independent learning were part of culture, 
                not an occasional activity?"
              </p>
            </div>
            <p className="rf-page-hero-lead">
              Sustainable educational transformation does not come from another software app 
              or compliance rubric. It happens when curiosity, deep reading, and scholarly inquiry 
              are built into the physical, cultural, and pedagogical infrastructure of the school.
            </p>
            <div className="rf-page-hero-actions">
              <button
                onClick={() => onOpenConversation('Institutions')}
                className="rf-btn-primary"
              >
                <span>Start A Conversation</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE 4 CONDITIONS FOR SUSTAINABLE CHANGE
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-light">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// FOUNDATIONAL ARCHITECTURE</span>
            <h2 className="rf-section-title">
              Four Conditions for <em>Lasting Change.</em>
            </h2>
            <p className="rf-section-lead">
              Inquiry cannot survive in a vacuum. A true culture of deep learning 
              requires all four pillars to operate in mutual reinforcement.
            </p>
          </div>

          <div className="rf-conditions-grid">
            {fourConditions.map((cond, idx) => (
              <div key={cond.title} className="rf-condition-card">
                <span className="rf-condition-idx">0{idx + 1}</span>
                <h3 className="rf-condition-title">{cond.title}</h3>
                <span className="rf-condition-role">{cond.role}</span>
                <p className="rf-condition-desc">{cond.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE 7-STAGE TRANSFORMATION JOURNEY
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-white">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// INSTITUTIONAL ROADMAP</span>
            <h2 className="rf-section-title">
              From Instruction to <em>Environment.</em>
            </h2>
            <p className="rf-section-lead">
              Change the environment, change what learning can become. 
              Our 7-stage roadmap guides school leaders through systemic transformation.
            </p>
          </div>

          {/* Horizontal Journey Navigation */}
          <div className="rf-journey-stepper">
            {transformationStages.map((stg, i) => (
              <button
                key={stg.stage}
                className={`rf-journey-step-btn ${activeStage === i ? 'is-active' : ''}`}
                onClick={() => setActiveStage(i)}
              >
                <span className="rf-journey-idx">{stg.stage}</span>
                <span className="rf-journey-title">{stg.title}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Detail */}
          <div className="rf-journey-detail-box">
            <div className="rf-journey-detail-header">
              <span className="rf-badge-accent">STAGE {transformationStages[activeStage].stage} OF 07</span>
              <h3 className="rf-journey-detail-title">{transformationStages[activeStage].title}</h3>
              <p className="rf-journey-detail-summary">{transformationStages[activeStage].summary}</p>
            </div>
            <p className="rf-journey-detail-body">{transformationStages[activeStage].details}</p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE TRANSFORMATION STATEMENT CHAIN
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-navy text-white">
        <div className="rf-container">
          <div className="rf-section-header dark">
            <span className="rf-eyebrow-accent">// SYSTEMIC LOGIC</span>
            <h2 className="rf-section-title text-white">
              The Evolution of the <em>Learning Institution.</em>
            </h2>
          </div>

          <div className="rf-chain-grid">
            {transformationChain.map((chain, idx) => (
              <div key={idx} className="rf-chain-card">
                <div className="rf-chain-transition">
                  <span className="rf-chain-term">{chain.from}</span>
                  <span className="rf-chain-arrow">→</span>
                  <span className="rf-chain-term active">{chain.to}</span>
                </div>
                <p className="rf-chain-desc">{chain.shift}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          CLOSING INSTITUTIONAL CTA
          ----------------------------------------------------------- */}
      <section className="rf-closing-invitation">
        <div className="rf-container">
          <div className="rf-closing-box">
            <span className="rf-eyebrow">// STRATEGIC DIALOGUE</span>
            <h2 className="rf-closing-title">
              Tell us what you are trying to change.
            </h2>
            <p className="rf-closing-lead">
              Whether you are an established institution seeking to deepen academic rigor, 
              or a newly conceived school designing an inquiry-first foundation.
            </p>
            <div className="rf-closing-actions">
              <button
                onClick={() => onOpenConversation('Institutions')}
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
