import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function IdeaSection() {
  const [activeShiftIndex, setActiveShiftIndex] = useState(0);

  const shifts = [
    {
      from: 'Beyond Marks',
      to: 'Toward Mastery',
      detail: 'Moving from point accumulation to genuine intellectual competence and enduring understanding.',
    },
    {
      from: 'Beyond Answers',
      to: 'Toward Questions',
      detail: 'Cultivating the courage to formulate profound questions rather than regurgitating premade replies.',
    },
    {
      from: 'Beyond Consumption',
      to: 'Toward Inquiry',
      detail: 'Transforming passive consumers of textbooks into active investigators of reality and texts.',
    },
    {
      from: 'Beyond Assignments',
      to: 'Toward Research',
      detail: 'Replacing mechanical worksheets with genuine student-led research papers and evidence-based findings.',
    },
    {
      from: 'Beyond Teaching',
      to: 'Toward Learning',
      detail: 'Empowering learners to navigate the world autonomously with metacognitive clarity.',
    },
  ];

  return (
    <section className="rf-section-idea" id="shifts" aria-label="Section 04: The Foundational Pedagogical Shifts">
      <div className="rf-container">
        {/* Eyebrow & Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            paddingBottom: '1.2rem',
            marginBottom: '2rem',
          }}
        >
          <span
            className="rf-editorial-eyebrow"
            style={{ color: 'var(--rf-peach)' }}
          >
            The Foundational Shifts
          </span>
          <span
            style={{
              fontFamily: 'var(--rf-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--rf-white-40)',
            }}
          >
            05 Conceptual Milestones
          </span>
        </div>

        {/* 5 Shifts Grid */}
        <div className="rf-shifts-grid">
          {shifts.map((shift, idx) => (
            <div
              key={shift.to}
              className="rf-shift-card"
              onMouseEnter={() => setActiveShiftIndex(idx)}
              style={{
                borderColor:
                  activeShiftIndex === idx
                    ? 'var(--rf-orange)'
                    : 'rgba(255, 255, 255, 0.1)',
                background:
                  activeShiftIndex === idx
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(255, 255, 255, 0.03)',
                cursor: 'pointer',
              }}
            >
              <div className="rf-shift-from">{shift.from}</div>
              <div className="rf-shift-to">
                <span>{shift.to}</span>
                <ArrowRight size={16} />
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--rf-white-70)',
                  lineHeight: 1.5,
                  marginTop: '1rem',
                }}
              >
                {shift.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Quote Box */}
        <div
          style={{
            marginTop: '4.5rem',
            padding: '2.5rem',
            background: 'rgba(0, 21, 45, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(242, 100, 42, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--rf-orange)',
              flexShrink: 0,
            }}
          >
            <Compass size={24} />
          </div>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <p
              style={{
                fontFamily: 'var(--rf-font-serif)',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: 'var(--rf-white)',
                lineHeight: 1.45,
              }}
            >
              "We believe learning should change the learner. Not simply what they know, but how they read, question, think and continue learning."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
