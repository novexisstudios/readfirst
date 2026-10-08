import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, CheckCircle2 } from 'lucide-react';

export default function ResearchInsightsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const studies = [
    {
      id: '01',
      tag: 'INDEPENDENT STUDY & READING',
      question: 'Does deliberate textual annotation and textbook self-study build enduring learner stamina?',
      method: 'Field observation across partner school cohorts, tracking annotation depth, reading stamina, and unprompted inquiry formulation over 16 weeks.',
      finding: 'Students engaged in deliberate textual annotation consistently formulated higher-order questions and demonstrated substantial gains in autonomous self-study stamina.',
      implication: 'Teaching marginalia as an active intellectual dialogue shifts reading from passive scanning into genuine, sustained independent inquiry.',
      source: 'ReadFirst Monograph Series, Vol. 04.',
    },
    {
      id: '02',
      tag: 'EDUCATOR TRANSFORMATION',
      question: 'How does research-based teaching shift an educator’s classroom questioning and patience?',
      method: 'Qualitative analysis of educator research journals, reflective transcripts, and peer coaching observations following selective cohort immersion.',
      finding: 'Educators who systematically tracked student questions transitioned from rapid lecturing to guided inquiry coaching, allowing students to reach conceptual clarity autonomously.',
      implication: 'Educators flourish when equipped with the observational tools and pedagogical patience of practicing learning coaches.',
      source: 'Symposium on Practice-Based Educational Inquiry.',
    },
  ];

  const current = studies[activeTab];

  return (
    <section className="rf-section-research-insights" id="research" aria-label="19 Research & Insights">
      <div className="rf-container">
        {/* Header */}
        <div className="rf-research-ins-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            12 // Evidence In Practice
          </span>
          <h2 className="rf-serif-display rf-research-ins-title">
            QUESTIONS ARE WHERE <br />
            <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>RESEARCH BEGINS.</span>
          </h2>
          <p className="rf-research-ins-lead">
            What happens when learning environments are grounded in empirical observation and rigorous inquiry.
          </p>
        </div>

        {/* Tab switch */}
        <div className="rf-research-tabs-strip">
          {studies.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`rf-res-tab-btn ${activeTab === idx ? 'is-active' : ''}`}
            >
              <span className="rf-res-tab-idx">FIELD STUDY 0{item.id}</span>
              <span className="rf-res-tab-tag">{item.tag}</span>
            </button>
          ))}
        </div>

        {/* Structured Evidence Card */}
        <div className="rf-evidence-trail-card">
          <div className="rf-evidence-trail-grid">
            <div className="rf-evidence-node">
              <span className="rf-evidence-node-label">THE QUESTION</span>
              <p className="rf-evidence-question">"{current.question}"</p>
            </div>

            <div className="rf-evidence-node">
              <span className="rf-evidence-node-label">METHODOLOGY</span>
              <p className="rf-evidence-text">{current.method}</p>
            </div>

            <div className="rf-evidence-node is-highlight">
              <span className="rf-evidence-node-label">CORE FINDING</span>
              <p className="rf-evidence-text bold">{current.finding}</p>
            </div>

            <div className="rf-evidence-node">
              <span className="rf-evidence-node-label">EDUCATIONAL IMPLICATION</span>
              <p className="rf-evidence-text">{current.implication}</p>
              <span className="rf-evidence-source">Source: {current.source}</span>
            </div>
          </div>

          <div className="rf-evidence-card-footer">
            <Link to="/research" className="rf-btn-secondary" style={{ textDecoration: 'none' }}>
              <span>Explore Full Research Repository</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
