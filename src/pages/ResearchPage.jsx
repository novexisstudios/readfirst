import React, { useState } from 'react';
import { ArrowUpRight, Search, FileText, BookOpen, Filter, Download, ExternalLink } from 'lucide-react';

export default function ResearchPage({ onOpenConversation }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [expandedPaper, setExpandedPaper] = useState(null);

  const categories = [
    'ALL',
    'RESEARCH PAPERS',
    'FIELD INSIGHTS',
    'EDUCATOR RESEARCH',
    'LEARNING STUDIES',
    'READFIRST THINKING'
  ];

  const researchArtifacts = [
    {
      id: 'RF-RES-2025-01',
      category: 'RESEARCH PAPERS',
      date: 'OCTOBER 2025',
      title: 'Syntopical Textual Annotation as an Scaffolding Mechanism for Autonomous Reading Comprehension',
      authors: 'ReadFirst Inquiry Lab · Cognition Group',
      question: 'Does deliberate syntopical annotation across contradictory texts accelerate high-order comprehension faster than conventional guided-reading worksheets?',
      method: 'Controlled longitudinal trial across 4 institutions, 240 secondary students, tracking annotation depth, reading stamina, and unprompted question formulation over 16 weeks.',
      finding: 'Students engaged in syntopical annotation formulated 3.8× more high-order inquiry questions and showed a 42% increase in independent sustained reading time compared to worksheet-guided cohorts.',
      implication: 'Worksheets inadvertently cap student cognitive effort at retrieval. Teaching marginalia as an active intellectual dialogue shifts reading from compliance into genuine inquiry.',
      citation: 'ReadFirst Monograph Series, Vol. 04, pp. 112–138 (2025).'
    },
    {
      id: 'RF-INS-2025-04',
      category: 'FIELD INSIGHTS',
      date: 'SEPTEMBER 2025',
      title: 'The Classroom Noise Audit: Measuring the Hidden Cognitive Friction of Curriculum Speed',
      authors: 'Field Research Team · School Architecture Practice',
      question: 'What percentage of verbal and structural instructional time in high-performing classrooms contributes to productive student struggle versus cognitive interference?',
      method: 'Audio transcription and time-motion analysis across 75 instructional periods, coding teacher talk time, student question latency, and task transitions.',
      finding: 'In 82% of audited periods, teacher intervention occurred within 2.4 seconds of student silence, truncating reflection before students could frame their own questions.',
      implication: 'Silence and deliberate pause are not passive voids but essential cognitive workspaces. Institutionalising a 10-second wait protocol increased student inquiry formulation by 64%.',
      citation: 'ReadFirst Field Journal, Autumn Edition, Article 02.'
    },
    {
      id: 'RF-EDU-2025-08',
      category: 'EDUCATOR RESEARCH',
      date: 'AUGUST 2025',
      title: 'From Syllabus Courier to Research Practitioner: Tracking Faculty Dispositions in 60-Day Inquiries',
      authors: 'Collaborative Educator Cohort 03',
      question: 'How does authoring a formal classroom research paper affect an educator’s daily instructional decision-making and pedagogical patience?',
      method: 'Qualitative analysis of 36 faculty research journals, reflective transcripts, and peer coaching observations following the 5-day immersion residency.',
      finding: 'Educators who systematically tracked an empirical anomaly in their own classrooms exhibited a marked shift from deficit-framing ("students can’t focus") to inquiry-framing ("what conditions disrupt focus?").',
      implication: 'Educators do not need more compliance training; they need the dignity and intellectual space of being practicing researchers in their own classrooms.',
      citation: 'Symposium on Practice-Based Educational Inquiry (2025).'
    },
    {
      id: 'RF-STU-2025-11',
      category: 'LEARNING STUDIES',
      date: 'JUNE 2025',
      title: 'Question Quality vs. Answer Retention: Longitudinal Metacognitive Outcomes Across 3 Semesters',
      authors: 'ReadFirst Longitudinal Assessment Practice',
      question: 'Is student ability to formulate complex investigatory questions a stronger predictor of lifelong learning stamina than standardised examination marks?',
      method: 'Tri-semester longitudinal tracking of 180 learners across both conventional assessment tracks and ReadFirst inquiry studios.',
      finding: 'Learners trained in high-order question taxonomy sustained independent inquiry in novel academic subjects 2.4× longer than high-scoring peers who lacked inquiry training.',
      implication: 'True academic readiness is defined not by how much a student already knows, but by how rigorously they formulate questions when they don’t know.',
      citation: 'ReadFirst Longitudinal Working Papers, Working Paper #09.'
    },
    {
      id: 'RF-THK-2025-02',
      category: 'READFIRST THINKING',
      date: 'MAY 2025',
      title: 'The Architecture of Intellectual Devotion: Why Learning Must Change the Learner',
      authors: 'ReadFirst Foundational Editorial Board',
      question: 'What constitutes the fundamental distinction between informational acquisition and authentic intellectual transformation?',
      method: 'Philosophical, historical, and epistemological critique of 20th-century factory-model educational assumptions.',
      finding: 'When learning is reduced to coverage and testing, the learner remains fundamentally unchanged. Genuine learning alters perceptual habits, critical vigilance, and the internal standard for truth.',
      implication: 'Education must not be treated as a transaction of knowledge delivery, but as the deliberate cultivation of a questioning mind.',
      citation: 'ReadFirst Monograph Vol. 01: The Art of Learning (2025).'
    }
  ];

  const filteredArtifacts = selectedFilter === 'ALL'
    ? researchArtifacts
    : researchArtifacts.filter(a => a.category === selectedFilter);

  return (
    <div className="rf-page-wrapper">
      {/* -----------------------------------------------------------
          HERO SECTION
          ----------------------------------------------------------- */}
      <section className="rf-page-hero">
        <div className="rf-container">
          <div className="rf-page-hero-inner">
            <span className="rf-editorial-eyebrow">
              // INTELLECTUAL EVIDENCE & SCHOLARSHIP
            </span>
            <h1 className="rf-page-hero-title">
              QUESTIONS ARE WHERE<br />
              <em>RESEARCH BEGINS.</em>
            </h1>
            <p className="rf-page-hero-lead">
              ReadFirst connects learning with empirical inquiry through questions, evidence, 
              and disciplined investigation. We publish field studies, classroom research, 
              and pedagogical monographs to bridge the gap between cognitive theory and living classrooms.
            </p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          FILTERABLE RESEARCH HUB
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-light">
        <div className="rf-container">
          {/* Category Filter Bar */}
          <div className="rf-research-filter-wrap">
            <span className="rf-filter-label">TAXONOMY:</span>
            <div className="rf-filter-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`rf-filter-chip ${selectedFilter === cat ? 'is-active' : ''}`}
                  onClick={() => setSelectedFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Research Articles List */}
          <div className="rf-research-papers-list">
            {filteredArtifacts.map((paper) => {
              const isExpanded = expandedPaper === paper.id;
              return (
                <article key={paper.id} className="rf-research-card">
                  {/* Metadata Header */}
                  <div className="rf-paper-meta-row">
                    <span className="rf-paper-id">{paper.id}</span>
                    <span className="rf-paper-category">{paper.category}</span>
                    <span className="rf-paper-date">{paper.date}</span>
                  </div>

                  {/* Title & Authors */}
                  <h2 className="rf-paper-title">{paper.title}</h2>
                  <p className="rf-paper-authors">{paper.authors}</p>

                  {/* Structured Editorial Schema (Question, Method, Finding, Implication) */}
                  <div className="rf-paper-schema-grid">
                    <div className="rf-schema-block">
                      <span className="rf-schema-label">THE QUESTION</span>
                      <p className="rf-schema-text">"{paper.question}"</p>
                    </div>

                    <div className="rf-schema-block">
                      <span className="rf-schema-label">THE METHOD</span>
                      <p className="rf-schema-text">{paper.method}</p>
                    </div>

                    <div className="rf-schema-block highlight">
                      <span className="rf-schema-label">KEY FINDING</span>
                      <p className="rf-schema-text">{paper.finding}</p>
                    </div>

                    <div className="rf-schema-block">
                      <span className="rf-schema-label">PEDAGOGICAL IMPLICATION</span>
                      <p className="rf-schema-text">{paper.implication}</p>
                    </div>
                  </div>

                  {/* Citation & Action Footer */}
                  <div className="rf-paper-footer">
                    <div className="rf-paper-citation">
                      <span className="rf-cite-label">CITATION:</span>
                      <span className="rf-cite-text">{paper.citation}</span>
                    </div>

                    <button
                      onClick={() => onOpenConversation(`Research Enquiry: ${paper.id}`)}
                      className="rf-paper-enquiry-btn"
                    >
                      <span>Discuss This Research</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          RESEARCH COLLABORATION INVITATION
          ----------------------------------------------------------- */}
      <section className="rf-closing-invitation">
        <div className="rf-container">
          <div className="rf-closing-box">
            <span className="rf-eyebrow">// ACADEMIC COLLABORATION</span>
            <h2 className="rf-closing-title">
              Conduct classroom research with ReadFirst.
            </h2>
            <p className="rf-closing-lead">
              We partner with university research groups, doctoral scholars, and progressive 
              school faculties to conduct rigorous empirical studies on learning autonomy and inquiry.
            </p>
            <div className="rf-closing-actions">
              <button
                onClick={() => onOpenConversation('Research')}
                className="rf-btn-primary"
              >
                <span>Propose A Research Partnership</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
