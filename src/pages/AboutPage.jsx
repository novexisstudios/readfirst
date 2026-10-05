import React from 'react';
import { ArrowUpRight, Compass, Users, BookOpen, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function AboutPage({ onOpenConversation }) {
  const pillars = [
    {
      title: 'People',
      desc: 'Educators who cherish intellectual vitality, students who hunger for meaningful understanding, and school leaders courageous enough to challenge compliance.'
    },
    {
      title: 'Purpose',
      desc: 'To cultivate a culture of deep learning, authentic inquiry, and independent thinking across schools and communities.'
    },
    {
      title: 'Practice',
      desc: 'Translating cognitive research into daily, living classroom routines: slow syntopical reading, seminar dialogues, noise audits, and discovery boxes.'
    },
    {
      title: 'Research',
      desc: 'Grounded in empirical evidence, longitudinal inquiry tracking, and classroom action research rather than unsubstantiated claims.'
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
              // PHILOSOPHY & IDENTITY
            </span>
            <h1 className="rf-page-hero-title">
              BUILDING A DIFFERENT<br />
              RELATIONSHIP WITH <em>LEARNING.</em>
            </h1>
            <p className="rf-page-hero-lead">
              ReadFirst is a research-based learning initiative working with students, educators, 
              and educational institutions. We are not an EdTech vendor or a test-prep factory; 
              we are a collective of educationists, researchers, and practitioners dedicated to 
              reclaiming the intellectual soul of learning.
            </p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          FOUR FOUNDATIONAL PILLARS
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-light">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// OUR FOUNDATION</span>
            <h2 className="rf-section-title">
              People. Purpose. Practice. <em>Research.</em>
            </h2>
            <p className="rf-section-lead">
              We reject the sterile, corporate vocabulary of modern educational consultancy. 
              Our work is human, intellectually rigorous, and grounded in living school environments.
            </p>
          </div>

          <div className="rf-about-pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={pillar.title} className="rf-about-pillar-card">
                <span className="rf-about-pillar-idx">0{idx + 1}</span>
                <h3 className="rf-about-pillar-title">{pillar.title}</h3>
                <p className="rf-about-pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE CORE BELIEF STATEMENT
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-navy text-white">
        <div className="rf-container">
          <div className="rf-statement-box">
            <span className="rf-eyebrow-accent">// CORE CONVICTION</span>
            <blockquote className="rf-monograph-quote">
              "We believe learning should change the learner. Not simply what they know, 
              but how they read, question, think, and continue learning."
            </blockquote>
            <p className="rf-quote-attribution">
              — The ReadFirst Foundational Monograph
            </p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          GOVERNANCE & ETHICAL BOUNDARY
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-white">
        <div className="rf-container">
          <div className="rf-boundary-card">
            <div className="rf-boundary-logo-wrap">
              <img
                src="/images/Readfirst%20LOGO.png"
                alt="ReadFirst Official Trademark"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h3 className="rf-boundary-title">Institutional Integrity & Clear Boundaries</h3>
              <p className="rf-boundary-body">
                ReadFirst operates with strict scholarly and ethical rigor. We treat unsupported 
                quantitative claims and neuroscience jargon as requiring verified empirical substantiation. 
                ReadFirst is an independent educational initiative dedicated exclusively to deep learning, 
                inquiry methodologies, and educator development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          CLOSING DIALOGUE INVITATION
          ----------------------------------------------------------- */}
      <section className="rf-closing-invitation">
        <div className="rf-container">
          <div className="rf-closing-box">
            <span className="rf-eyebrow">// BEGIN A RELATIONSHIP</span>
            <h2 className="rf-closing-title">
              The conversation begins with a question.
            </h2>
            <p className="rf-closing-lead">
              Whether you are an educator seeking intellectual revitalization, a school leader 
              designing a culture of inquiry, or an independent scholar.
            </p>
            <div className="rf-closing-actions">
              <button
                onClick={() => onOpenConversation('General Inquiry')}
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
