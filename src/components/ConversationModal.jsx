import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ConversationModal({ isOpen, onClose, initialAudience }) {
  const [audience, setAudience] = useState('Institutions');
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialAudience) {
      if (initialAudience.includes('Student')) setAudience('Students');
      else if (initialAudience.includes('Educator')) setAudience('Educators');
      else if (initialAudience.includes('Institution')) setAudience('Institutions');
      else if (initialAudience.includes('Research')) setAudience('Research');
    }
    if (isOpen) {
      setSubmitted(false);
    }
  }, [initialAudience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="rf-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="rf-modal-card">
        <button
          onClick={onClose}
          className="rf-modal-close"
          aria-label="Close conversation dialog"
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <div className="rf-modal-logo-wrap">
                <img
                  src="/images/Readfirst%20LOGO.png"
                  alt="ReadFirst Logo"
                  style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>

            <span
              className="rf-editorial-eyebrow"
              style={{ marginBottom: '1.2rem' }}
            >
              Dialogue // Inquiry Initiation
            </span>

            <h3
              id="modal-title"
              className="rf-serif-display"
              style={{
                fontSize: '2.1rem',
                color: 'var(--rf-navy)',
                marginBottom: '0.6rem',
              }}
            >
              Start A Conversation.
            </h3>

            <p
              style={{
                fontSize: '0.94rem',
                color: 'var(--rf-ink-soft)',
                marginBottom: '2rem',
                lineHeight: 1.5,
              }}
            >
              Whether you are an institutional leader, an educator, or an inquiring learner, the conversation begins with a question.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Audience selection */}
              <div className="rf-form-group">
                <label className="rf-form-label">I am reaching out as a:</label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '0.6rem',
                  }}
                >
                  {['Institutions', 'Educators', 'Students', 'Research'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setAudience(item)}
                      style={{
                        padding: '0.6rem 0.8rem',
                        fontFamily: 'var(--rf-font-sans)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: audience === item ? 'var(--rf-navy)' : 'var(--rf-grey-border)',
                        backgroundColor: audience === item ? 'var(--rf-navy)' : 'var(--rf-white)',
                        color: audience === item ? 'var(--rf-white)' : 'var(--rf-ink-soft)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* The Core Question */}
              <div className="rf-form-group">
                <label className="rf-form-label" htmlFor="user-question">
                  What question are you trying to explore in your learning environment?
                </label>
                <textarea
                  id="user-question"
                  className="rf-form-textarea"
                  rows={3}
                  required
                  placeholder="e.g. How can we shift our school culture from rote assessment to self-motivated student inquiry?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              {/* Name & Email Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
              >
                <div className="rf-form-group">
                  <label className="rf-form-label" htmlFor="user-name">
                    Your Name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    className="rf-form-input"
                    required
                    placeholder="Eleanor Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="rf-form-group">
                  <label className="rf-form-label" htmlFor="user-email">
                    Email Address
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    className="rf-form-input"
                    required
                    placeholder="eleanor@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Institution / School */}
              <div className="rf-form-group">
                <label className="rf-form-label" htmlFor="user-institution">
                  School / Organization (Optional)
                </label>
                <input
                  id="user-institution"
                  type="text"
                  className="rf-form-input"
                  placeholder="Institution or University Name"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="rf-btn-secondary"
                  style={{ fontSize: '0.78rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rf-btn-primary rf-btn-orange"
                  style={{ fontSize: '0.78rem' }}
                >
                  <span>Submit Question</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(242, 100, 42, 0.12)',
                color: 'var(--rf-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3
              className="rf-serif-display"
              style={{
                fontSize: '2.2rem',
                color: 'var(--rf-navy)',
                marginBottom: '1rem',
              }}
            >
              Inquiry Received.
            </h3>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--rf-ink-soft)',
                maxWidth: '440px',
                margin: '0 auto 2rem',
                lineHeight: 1.6,
              }}
            >
              Thank you, {name}. A member of the ReadFirst research & engagement team will review your question regarding <strong>{audience}</strong> and be in touch shortly.
            </p>

            <button
              onClick={onClose}
              className="rf-btn-primary"
              style={{ margin: '0 auto' }}
            >
              <span>Back To Homepage</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
