import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpenCheck, Building2, ArrowRight, CheckCircle2, Sparkles, Eye, BookOpen } from 'lucide-react';

export default function ThreePathwaysSection({ onOpenConversation }) {
  return (
    <section className="rf-section-three-pathways" id="pathways" aria-label="10 One Philosophy Three Pathways">
      <div className="rf-container">
        {/* Section Master Header */}
        <div className="rf-pathways-master-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            10 // Audiences & Pathways
          </span>
          <h2 className="rf-serif-display rf-pathways-master-title">
            ONE PHILOSOPHY. <br />
            <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>
              THREE DISTINCT PATHWAYS.
            </span>
          </h2>
          <p className="rf-pathways-master-lead">
            Whether for an individual student, a selective educator cohort, or a school leadership team, ReadFirst cultivates true learner independence.
          </p>
        </div>

        {/* -----------------------------------------------------------
            PATHWAY 01 — STUDENTS
            ----------------------------------------------------------- */}
        <div className="rf-pathway-editorial-block" id="students-pathway">
          <div className="rf-pathway-grid">
            <div className="rf-pathway-copy">
              <div className="rf-pathway-tag-wrap">
                <span className="rf-pathway-num-badge">PATHWAY 01</span>
                <span className="rf-pathway-audience">FOR STUDENTS</span>
              </div>

              <h3 className="rf-pathway-headline">
                DON'T JUST STUDY. <br />
                <em>LEARN HOW TO LEARN.</em>
              </h3>

              <p className="rf-pathway-body">
                Developing the habits to read deeply, question authentically, and learn independently. Shifting studying from a burden of compliance into a self-motivated intellectual pursuit with reduced screen dependence.
              </p>

              {/* Student Journey Strip */}
              <div className="rf-pathway-journey-strip">
                <span className="rf-journey-label">STUDENT JOURNEY:</span>
                <div className="rf-journey-nodes">
                  <span>DEEP READING</span>
                  <span className="rf-journey-arr">→</span>
                  <span>SELF-LEARNING</span>
                  <span className="rf-journey-arr">→</span>
                  <span>QUESTIONING</span>
                  <span className="rf-journey-arr">→</span>
                  <span>INQUIRY</span>
                  <span className="rf-journey-arr">→</span>
                  <span className="rf-journey-final">RESEARCH</span>
                </div>
              </div>

              {/* Sub-offerings summary */}
              <div className="rf-student-offerings-duo">
                <div className="rf-student-duo-card">
                  <div className="rf-duo-head">
                    <Eye size={16} color="var(--rf-orange)" />
                    <strong>Mindfulness Programme</strong>
                  </div>
                  <span className="rf-duo-tagline">“Pause. Observe. Reset.”</span>
                  <p>Mental readiness, presence, and sustained attention stamina for deep learning.</p>
                </div>

                <div className="rf-student-duo-card">
                  <div className="rf-duo-head">
                    <BookOpen size={16} color="var(--rf-orange)" />
                    <strong>Accelerate Your Learning</strong>
                  </div>
                  <span className="rf-duo-tagline">“Learn How to Learn”</span>
                  <p>Purposeful textbook reading, authentic questioning, and autonomous self-study habits.</p>
                </div>
              </div>

              <div className="rf-pathway-actions">
                <Link to="/students" className="rf-btn-primary">
                  <span>Explore Student Pathway</span>
                  <ArrowRight size={15} />
                </Link>
                <button
                  onClick={() => onOpenConversation('Students')}
                  className="rf-btn-secondary"
                >
                  <span>Start Student Dialogue</span>
                </button>
              </div>
            </div>

            <div className="rf-pathway-media">
              <div className="rf-pathway-image-frame">
                <img
                  src="/images/editorial_hero_reading.jpg"
                  alt="Student deeply engaged in textbook inquiry with handwritten notes and coffee"
                  className="rf-pathway-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------
            PATHWAY 02 — EDUCATORS
            ----------------------------------------------------------- */}
        <div className="rf-pathway-editorial-block is-educator-featured" id="educators-pathway">
          <div className="rf-pathway-grid is-reversed">
            <div className="rf-pathway-copy text-white">
              <div className="rf-pathway-tag-wrap">
                <span className="rf-pathway-num-badge is-orange">PATHWAY 02</span>
                <span className="rf-selective-badge">
                  <Sparkles size={12} style={{ marginRight: '4px' }} />
                  SELECTIVE COHORT · RESEARCH-LED
                </span>
              </div>

              <h3 className="rf-pathway-headline text-white">
                DON'T JUST LEARN HOW TO TEACH DIFFERENTLY. <br />
                <em>EXPERIENCE LEARNING DIFFERENTLY.</em>
              </h3>

              <p className="rf-pathway-body text-white-70">
                A rare opportunity to rethink how learning happens. For educators who want to understand learning deeply enough to transform their own practice, shifting from syllabus delivery into practicing learning coaches.
              </p>

              {/* Educator Journey Strip */}
              <div className="rf-pathway-journey-strip is-dark">
                <span className="rf-journey-label text-peach">EDUCATOR IMMERSION:</span>
                <div className="rf-journey-nodes text-white">
                  <span>EXPLORE</span>
                  <span className="rf-journey-arr">→</span>
                  <span>APPLICATION</span>
                  <span className="rf-journey-arr">→</span>
                  <span>READING TASK</span>
                  <span className="rf-journey-arr">→</span>
                  <span>DIAGNOSTIC</span>
                  <span className="rf-journey-arr">→</span>
                  <span className="rf-journey-final is-orange">PROGRAMME</span>
                </div>
              </div>

              <div className="rf-educator-highlights-list">
                <div className="rf-educator-hl-item">
                  <CheckCircle2 size={16} color="var(--rf-orange)" />
                  <span>Observation & Reflection on Student Learning Behaviour</span>
                </div>
                <div className="rf-educator-hl-item">
                  <CheckCircle2 size={16} color="var(--rf-orange)" />
                  <span>Research-Based Teaching & Guided Inquiry Architecture</span>
                </div>
                <div className="rf-educator-hl-item">
                  <CheckCircle2 size={16} color="var(--rf-orange)" />
                  <span>Mastering the SMILE Learning Model in the Classroom</span>
                </div>
              </div>

              <div className="rf-pathway-actions">
                <button
                  onClick={() => onOpenConversation('Selective Educator Cohort')}
                  className="rf-btn-primary rf-btn-orange"
                  id="apply-educator-pathway-btn"
                >
                  <span>Apply to the Programme</span>
                  <ArrowRight size={15} />
                </button>
                <Link to="/educators" className="rf-btn-secondary dark-mode">
                  <span>Explore Programme Details →</span>
                </Link>
              </div>
            </div>

            <div className="rf-pathway-media">
              <div className="rf-pathway-image-frame">
                <img
                  src="/images/editorial_seminar_inquiry.jpg"
                  alt="Educator cohort in deep dialogue around research papers and teaching journals"
                  className="rf-pathway-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------
            PATHWAY 03 — INSTITUTIONS
            ----------------------------------------------------------- */}
        <div className="rf-pathway-editorial-block" id="institutions-pathway">
          <div className="rf-pathway-grid">
            <div className="rf-pathway-copy">
              <div className="rf-pathway-tag-wrap">
                <span className="rf-pathway-num-badge">PATHWAY 03</span>
                <span className="rf-pathway-offering-badge">THE LEARNING MARATHON (TLM)</span>
              </div>

              <h3 className="rf-pathway-headline">
                BUILD A CULTURE OF <br />
                <em>INDEPENDENT LEARNING.</em>
              </h3>

              <p className="rf-pathway-body">
                The Learning Marathon (TLM) helps schools and colleges build an enduring learning culture. We partner with school leaders to transform libraries and classrooms into vibrant Knowledge Centres where curiosity, deep reading, and research flourish.
              </p>

              {/* Institutional Journey Strip */}
              <div className="rf-pathway-journey-strip">
                <span className="rf-journey-label">TRANSFORMATION PATH:</span>
                <div className="rf-journey-nodes">
                  <span>LEADERSHIP</span>
                  <span className="rf-journey-arr">→</span>
                  <span>EDUCATORS</span>
                  <span className="rf-journey-arr">→</span>
                  <span>STUDENTS</span>
                  <span className="rf-journey-arr">→</span>
                  <span className="rf-journey-final">EVIDENCE</span>
                </div>
              </div>

              <div className="rf-schools-pillars-list">
                <div className="rf-schools-pillar-item">
                  <div className="rf-schools-pillar-icon">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <h4 className="rf-schools-pillar-title">Knowledge Centre Transformation</h4>
                    <p className="rf-schools-pillar-desc">Designing physical and intellectual spaces for sustained study and inquiry.</p>
                  </div>
                </div>
                <div className="rf-schools-pillar-item">
                  <div className="rf-schools-pillar-icon">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="rf-schools-pillar-title">School-Wide Reading Culture</h4>
                    <p className="rf-schools-pillar-desc">Cultivating textbook mastery, active annotation, and reflective study habits.</p>
                  </div>
                </div>
              </div>

              <div className="rf-pathway-actions">
                <Link to="/institutions" className="rf-btn-primary">
                  <span>Explore Institutional TLM</span>
                  <ArrowRight size={15} />
                </Link>
                <button
                  onClick={() => onOpenConversation('Institutional Partnership')}
                  className="rf-btn-secondary"
                >
                  <span>Initiate Leadership Dialogue</span>
                </button>
              </div>
            </div>

            <div className="rf-pathway-media">
              <div className="rf-pathway-image-frame">
                <img
                  src="/images/editorial_learning_space.jpg"
                  alt="Modern collegiate knowledge centre and quiet research library"
                  className="rf-pathway-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
