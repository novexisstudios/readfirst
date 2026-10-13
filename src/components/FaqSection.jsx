import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { faqs } from '../content/siteContent';
import './FaqSection.css';

export default function FaqSection({
  category = 'General',
  title,
  kicker,
  description,
  showViewAll = true,
  inContentPage = false,
}) {
  const faqGroup = faqs.find(([name]) => name.toLowerCase() === category.toLowerCase()) || faqs[0];
  const items = faqGroup ? faqGroup[1] : [];
  const [openIndex, setOpenIndex] = useState(0);

  const defaultTitles = {
    'General': 'Questions about<br /><em>how we think.</em>',
    'Students': 'Questions for<br /><em>students & families.</em>',
    'Educators': 'Questions about the<br /><em>educator programme.</em>',
    'Schools & Colleges': 'Questions from<br /><em>schools & institutions.</em>',
  };

  const defaultDescriptions = {
    'General': 'Answers about ReadFirst, SMILE, independent learning and our educational proposition.',
    'Students': 'What learners explore, how our programmes operate, and learning how to learn.',
    'Educators': 'Understanding the selective immersion, reflective teaching practice, and cohort expectations.',
    'Schools & Colleges': 'Institutional partnerships, The Learning Marathon (TLM), and building a culture of inquiry.',
  };

  const displayTitle = title || defaultTitles[category] || 'Questions, answered.';
  const displayDesc = description || defaultDescriptions[category] || 'Common questions and answers.';
  const displayKicker = kicker || `FAQs // ${category}`;

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  const content = (
    <div className="rf-faq-layout">
      <div className="rf-faq-intro">
        <p className="rf-kicker">{displayKicker}</p>
        <h2 className="rf-faq-heading" dangerouslySetInnerHTML={{ __html: displayTitle }} />
        <p className="rf-faq-desc">{displayDesc}</p>
        {showViewAll && (
          <Link to="/faqs" className="rf-text-link">
            <span>Explore all FAQs</span>
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>

      <div className="rf-faq-list">
        {items.map(([question, answer], index) => {
          const isOpen = openIndex === index;
          return (
            <div key={question} className={`rf-faq-item ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="rf-faq-trigger"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <span className="rf-faq-question">{question}</span>
                <span className="rf-faq-icon-wrap">
                  <ChevronDown size={18} className={`rf-faq-chevron ${isOpen ? 'is-rotated' : ''}`} />
                </span>
              </button>
              <div
                className="rf-faq-collapse"
                style={{
                  maxHeight: isOpen ? '400px' : '0px',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="rf-faq-answer">
                  <p>{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (inContentPage) {
    return (
      <section className="rf-faq-section in-content-page" aria-label={`${category} FAQs`}>
        {content}
      </section>
    );
  }

  return (
    <section className="rf-faq-section" id="faqs-section" aria-label={`${category} FAQs`}>
      <div className="rf-container">
        {content}
      </div>
    </section>
  );
}
