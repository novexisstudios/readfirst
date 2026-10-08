import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, BookOpen, ArrowRight, Sparkles, CheckCircle2, Brain } from 'lucide-react';

export default function StudentsSection({ onOpenConversation }) {
  return (
    <section className="rf-section-students-spotlight" id="students-section" aria-label="09 Student Offerings">
      <div className="rf-container">
        {/* Header */}
        <div className="rf-students-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1rem' }}>
            09 // For Students
          </span>
          <h2 className="rf-serif-display rf-students-title">
            LEARNER <span style={{ fontStyle: 'italic', color: 'var(--rf-orange)' }}>TRANSFORMATION.</span>
          </h2>
          <p className="rf-students-lead">
            Moving beyond passive instruction. We help learners cultivate focused attention, purpose-driven textbook study, and the power of independent thinking.
          </p>
        </div>

        {/* Two Student Programs Grid */}
        <div className="rf-students-grid">
          {/* Program 1: Mindfulness Programme */}
          <div className="rf-student-program-card">
            <div className="rf-student-card-tag">
              <Eye size={16} />
              <span>PAUSE. OBSERVE. RESET.</span>
            </div>

            <h3 className="rf-student-card-title">Mindfulness Programme</h3>
            <p className="rf-student-card-subtitle">
              Mental readiness, sustained attention, and cognitive clarity.
            </p>
            <p className="rf-student-card-body">
              True learning requires presence. This programme is designed as an integral part of learner development — helping students build self-awareness, deep concentration, and the attentional stamina to reflect and reason without constant digital overwhelm.
            </p>

            <div className="rf-student-card-points">
              <div className="rf-student-point">
                <CheckCircle2 size={15} color="var(--rf-orange)" />
                <span>Focus, Presence & Attention Stamina</span>
              </div>
              <div className="rf-student-point">
                <CheckCircle2 size={15} color="var(--rf-orange)" />
                <span>Self-Awareness & Reflection Habits</span>
              </div>
              <div className="rf-student-point">
                <CheckCircle2 size={15} color="var(--rf-orange)" />
                <span>Mental Readiness for Deep Learning</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Link to="/students" className="rf-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore Mindfulness Details →</span>
              </Link>
            </div>
          </div>

          {/* Program 2: Accelerate Your Learning */}
          <div className="rf-student-program-card is-accelerate">
            <div className="rf-student-card-tag is-orange">
              <BookOpen size={16} />
              <span>LEARN HOW TO LEARN</span>
            </div>

            <h3 className="rf-student-card-title">Accelerate Your Learning</h3>
            <p className="rf-student-card-subtitle">
              Self-motivation, purposeful reading, and independent thinking.
            </p>
            <p className="rf-student-card-body">
              Not a generic speed-study course. We teach learners how to learn: engaging directly with textbooks, asking high-order questions, and developing autonomous self-study habits with reduced screen dependence.
            </p>

            <div className="rf-student-card-points">
              <div className="rf-student-point">
                <CheckCircle2 size={15} color="var(--rf-orange)" />
                <span>Purposeful Reading & Textbook Mastery</span>
              </div>
              <div className="rf-student-point">
                <CheckCircle2 size={15} color="var(--rf-orange)" />
                <span>Authentic Curiosity & Critical Thinking</span>
              </div>
              <div className="rf-student-point">
                <CheckCircle2 size={15} color="var(--rf-orange)" />
                <span>Self-Learner Independence & Motivation</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Link to="/students" className="rf-btn-primary rf-btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore Student Pathway</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
