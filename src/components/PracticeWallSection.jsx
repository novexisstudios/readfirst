import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Users, BookOpen } from 'lucide-react';

export default function PracticeWallSection() {
  const practiceItems = [
    {
      title: 'Reading & Marginalia',
      category: 'STUDENT PRACTICE',
      desc: 'Active textbook engagement and reflective note-making.',
      image: '/images/editorial_hero_reading.jpg',
    },
    {
      title: 'Inquiry Seminars',
      category: 'COLLABORATIVE DIALOGUE',
      desc: 'Dialectical seminar debate and question formulation.',
      image: '/images/editorial_seminar_inquiry.jpg',
    },
    {
      title: 'Reflective Spaces',
      category: 'LEARNING READINESS',
      desc: 'Quiet contemplation, observation, and cognitive clarity.',
      image: '/images/editorial_artist_observation.jpg',
    },
  ];

  return (
    <section className="rf-section-practice-people" id="about-practice" aria-label="20 & 21 Practice and People">
      <div className="rf-container">
        {/* Section Header */}
        <div className="rf-practice-header">
          <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-peach)', marginBottom: '1.2rem' }}>
            13 // Living Practice
          </span>
          <h2 className="rf-practice-title">
            WE BELIEVE LEARNING <br />
            SHOULD <em>CHANGE THE LEARNER.</em>
          </h2>
          <p className="rf-practice-lead">
            ReadFirst is a collective of educationists, researchers, and practitioners dedicated to cultivating a living culture of deep learning, authentic inquiry, and independent thought.
          </p>
        </div>

        {/* Editorial Practice Artefact Gallery */}
        <div className="rf-practice-grid">
          {practiceItems.map((item) => (
            <div key={item.title} className="rf-practice-card">
              <div className="rf-practice-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rf-practice-card-img"
                  loading="lazy"
                />
                <span className="rf-practice-category-tag">{item.category}</span>
              </div>
              <div className="rf-practice-card-info">
                <h3 className="rf-practice-card-title">{item.title}</h3>
                <p className="rf-practice-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* People & Philosophy Link */}
        <div className="rf-practice-footer-link">
          <Link to="/about" className="rf-btn-secondary dark-mode">
            <span>Learn More About Our Philosophy & People</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
