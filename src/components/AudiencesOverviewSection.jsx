import React from 'react';
import { Building2, BookOpenCheck, GraduationCap, ArrowDown } from 'lucide-react';

export default function AudiencesOverviewSection() {
  const pathways = [
    {
      num: '01',
      title: 'SCHOOLS & COLLEGES',
      offering: 'The Learning Marathon — TLM',
      description: 'Creating an institutional learning culture of deep reading, research, and learner independence.',
      targetId: 'schools-section',
      icon: Building2,
    },
    {
      num: '02',
      title: 'EDUCATORS',
      offering: 'Research-Based Teaching & Learning Programme',
      description: 'A selective cohort for teachers who want to understand learning deeply and transform their practice.',
      targetId: 'educators-section',
      icon: BookOpenCheck,
    },
    {
      num: '03',
      title: 'STUDENTS',
      offering: 'Mindfulness + Accelerate Your Learning',
      description: 'Helping students cultivate attention, active textbook reading, and the ability to learn how to learn.',
      targetId: 'students-section',
      icon: GraduationCap,
    },
  ];

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="rf-section-who" id="who-we-work-with" aria-label="06 Who We Work With">
      <div className="rf-container">
        {/* Transition Header */}
        <div className="rf-who-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.2rem' }}>
            06 // Who We Work With
          </span>
          <h2 className="rf-serif-display rf-who-title">
            Different learners. <br />
            <em>One fundamental question.</em>
          </h2>
          <div className="rf-who-question-badge">
            <span>“How can we make learning better?”</span>
          </div>
        </div>

        {/* 3 Pathway Cards */}
        <div className="rf-who-grid">
          {pathways.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.num} className="rf-who-card">
                <div className="rf-who-card-top">
                  <span className="rf-who-card-num">{p.num}</span>
                  <div className="rf-who-card-icon">
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className="rf-who-card-title">{p.title}</h3>
                <div className="rf-who-card-offering">{p.offering}</div>
                <p className="rf-who-card-desc">{p.description}</p>
                <button
                  onClick={() => handleScrollTo(p.targetId)}
                  className="rf-who-card-btn"
                >
                  <span>Explore Pathway</span>
                  <ArrowDown size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
