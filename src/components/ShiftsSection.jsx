import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ShiftsSection() {
  const [activeShift, setActiveShift] = useState(0);

  const shifts = [
    {
      from: 'BEYOND MARKS',
      to: 'TOWARD MASTERY',
      subline: 'Memorising → Genuine Understanding',
      context: 'From memorising for high-stakes test scores to cultivating enduring, autonomous cognitive mastery and strength of mind.',
    },
    {
      from: 'BEYOND ANSWERS',
      to: 'TOWARD QUESTIONS',
      subline: 'Information Consumption → Exploration',
      context: 'From rewarding fast pre-packaged answers to honoring deep, courageous, problem-generating questions that sustain lifelong curiosity.',
    },
    {
      from: 'BEYOND CONSUMPTION',
      to: 'TOWARD INQUIRY',
      subline: 'Screen Dependence → Purposeful Reading',
      context: 'From passive digital scanning to rigorous textbook interrogation, attentive marginalia, and slow reflective reading.',
    },
    {
      from: 'BEYOND ASSIGNMENTS',
      to: 'TOWARD RESEARCH',
      subline: 'Passive Learning → Active Exploration',
      context: 'From compliance-driven homework packets to self-directed empirical investigations and authentic problem formulation.',
    },
    {
      from: 'BEYOND TEACHING',
      to: 'TOWARD LEARNING',
      subline: 'Being Taught → Self-Learning',
      context: 'From continuous instructor delivery to empowering the learner as an independent, self-motivated thinker.',
    },
  ];

  return (
    <section className="rf-section-shifts" id="shifts" aria-label="09 Five Shifts in Learning Reality">
      <div className="rf-container">
        {/* Header */}
        <div className="rf-shifts-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-peach)', marginBottom: '1.2rem' }}>
            09 // Paradigm Transformation
          </span>
          <h2 className="rf-shifts-title">
            FIVE SHIFTS IN <br />
            <em>EDUCATIONAL REALITY.</em>
          </h2>
          <p className="rf-shifts-lead">
            Transforming how learners, educators, and schools relate to knowledge and understanding.
          </p>
        </div>

        {/* Interactive / Sequential Shifts Visual Grid */}
        <div className="rf-shifts-container">
          <div className="rf-shifts-selector-list">
            {shifts.map((shift, idx) => {
              const isActive = activeShift === idx;
              return (
                <button
                  key={shift.from}
                  onClick={() => setActiveShift(idx)}
                  className={`rf-shift-select-row ${isActive ? 'is-active' : ''}`}
                >
                  <span className="rf-shift-idx">0{idx + 1}</span>
                  <div className="rf-shift-pair-preview">
                    <span className="rf-shift-from-txt">{shift.from}</span>
                    <ArrowRight size={14} className="rf-shift-arrow-icon" />
                    <span className="rf-shift-to-txt">{shift.to}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Shift Feature Showcase */}
          <div className="rf-shift-showcase-card">
            <div className="rf-shift-showcase-badge">
              <span>SHIFT 0{activeShift + 1} OF 05</span>
              <span className="rf-shift-vocab-tag">{shifts[activeShift].subline}</span>
            </div>

            <div className="rf-shift-showcase-headline">
              <span className="rf-showcase-from">{shifts[activeShift].from}</span>
              <div className="rf-showcase-arrow">→</div>
              <span className="rf-showcase-to">{shifts[activeShift].to}</span>
            </div>

            <p className="rf-shift-showcase-context">
              {shifts[activeShift].context}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
