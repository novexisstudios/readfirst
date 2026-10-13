import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  BookOpen,
  Users,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Sparkles,
  RotateCcw,
  X,
} from 'lucide-react';
import './ApplicationPage.css';
import { sendApplicationEmail } from '../lib/emailjs';

const STORAGE_KEY = 'readfirst_educator_application_draft_v1';

export default function ApplicationPage() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      fullName: '',
      email: '',
      phone: '',
      designation: '',
      organisation: '',
      experience: '',
      q5: '',
      q6: '',
      q7: '',
      q8: '',
      q9: '',
      q10: '',
      q11: '',
      q12: '',
      q13: '',
      q14: '',
      confirmed: false,
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  const successDialogRef = useRef(null);

  // Manage modal open/close and lenis scroll locking
  useEffect(() => {
    const dialogEl = successDialogRef.current;
    if (showSuccessPopup && dialogEl) {
      if (!dialogEl.open) {
        dialogEl.showModal();
      }
      window.__lenis?.stop();
    } else if (dialogEl && dialogEl.open) {
      dialogEl.close();
      window.__lenis?.start();
    }

    return () => {
      window.__lenis?.start();
    };
  }, [showSuccessPopup]);

  // Auto-save draft to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSaved(new Date());
    } catch {
      // Ignore
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCopyResponses = async () => {
    const formatted = `=== READFIRST EDUCATOR TRANSFORMATION PROGRAM APPLICATION ===
Applicant Information:
- Full Name: ${formData.fullName || '(Not provided)'}
- Email: ${formData.email || '(Not provided)'}
- Phone: ${formData.phone || '(Not provided)'}
- Current Designation: ${formData.designation || '(Not provided)'}
- School / Organisation: ${formData.organisation || '(Not provided)'}
- Years of Experience: ${formData.experience || '(Not provided)'}

Section 2: Learning Journey Reflections:
5. Time a learner didn't learn as expected / lesson didn't go as planned:
${formData.q5 || '(No response entered)'}

6. Questions about learning or teaching you'd like to explore:
${formData.q6 || '(No response entered)'}

7. What has drawn you to ReadFirst & hoped outcomes:
${formData.q7 || '(No response entered)'}

8. Time you changed your thinking or approach after learning something new:
${formData.q8 || '(No response entered)'}

9. Response to reading something challenging a long-used teaching approach:
${formData.q9 || '(No response entered)'}

10. Where you could apply ReadFirst insights in 30-60 days & measure impact:
${formData.q10 || '(No response entered)'}

11. Making time for online sessions, reading, activities & 30-day research paper:
${formData.q11 || '(No response entered)'}

12. Response regarding program fee (₹50,000) and readiness to proceed:
${formData.q12 || '(No response entered)'}

13. Experience, perspective or question you wish to contribute to cohort:
${formData.q13 || '(No response entered)'}

14. Additional information (Optional):
${formData.q14 || '(None)'}

Declaration Confirmed: ${formData.confirmed ? 'Yes' : 'No'}
============================================================`;

    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert('Unable to copy automatically. Please select text manually.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.confirmed) {
      setErrorMessage('Please confirm the declaration checkbox before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Dispatch through EmailJS provider
      const emailResult = await sendApplicationEmail(formData);
      setSubmissionFeedback(emailResult);

      // 2. Optional backup webhook endpoint if configured in environment
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
      if (endpoint) {
        try {
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              formType: 'Educator Transformation Program Application',
              ...formData,
              submittedAt: new Date().toISOString(),
            }),
          });
        } catch (endpointErr) {
          console.warn('[ReadFirst Webhook Backup]:', endpointErr);
        }
      }

      setIsSubmitted(true);
      setShowSuccessPopup(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('[ReadFirst Application Submission Error]:', err);
      const detailedError = err?.text || err?.message || '';
      setErrorMessage(
        detailedError
          ? `Submission failed (${detailedError}). Please check your EmailJS keys or copy your responses below and email admissions@readfirst.in.`
          : 'There was an issue submitting your application via EmailJS. Please copy your responses using the button below and email admissions@readfirst.in.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start a new application? Your current inputs will be cleared.')) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        designation: '',
        organisation: '',
        experience: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
        q11: '',
        q12: '',
        q13: '',
        q14: '',
        confirmed: false,
      });
      setIsSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="rf-application-page">
      {/* Automated Application Submitted Popup Modal */}
      <dialog
        ref={successDialogRef}
        className="rf-application-success-modal"
        aria-labelledby="success-popup-title"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onCancel={() => setShowSuccessPopup(false)}
        onClick={(e) => {
          if (e.target === successDialogRef.current) {
            setShowSuccessPopup(false);
          }
        }}
      >
        <button
          type="button"
          className="rf-drawer-close"
          aria-label="Close message"
          onClick={() => setShowSuccessPopup(false)}
        >
          <X size={20} />
        </button>

        <div className="rf-success-modal-content">
          <div className="rf-success-modal-badge">
            <CheckCircle2 size={34} color="var(--rf-orange)" />
          </div>

          <p className="rf-success-modal-kicker">
            ✦ ReadFirst · Educator Transformation Program
          </p>

          <h2 id="success-popup-title" className="rf-success-modal-title">
            Thank You for Applying!
          </h2>

          <div className="rf-success-modal-body">
            <p>
              Thank you for your interest in <strong>ReadFirst</strong>. We appreciate the time and thought you have put into your responses.
            </p>
            <p>
              Your application will be carefully reviewed, and we will be in touch regarding the next steps.
            </p>
            <p className="rf-success-modal-quote">
              “We look forward to the possibility of learning and growing together.”
            </p>
          </div>

          {formData.fullName && (
            <div className="rf-success-modal-meta">
              <div><strong>Applicant:</strong> {formData.fullName}</div>
              {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
            </div>
          )}

          <div className="rf-success-modal-actions">
            <button
              type="button"
              onClick={handleCopyResponses}
              className="rf-btn-secondary-action"
            >
              {copied ? <Check size={16} color="#15803d" /> : <Copy size={16} />}
              <span>{copied ? 'Responses Copied!' : 'Copy your responses'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="rf-btn-submit"
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </dialog>

      <div className="rf-app-container">
        {/* Top Navigation */}
        <Link to="/educators" className="rf-back-link">
          <ArrowLeft size={16} />
          <span>Back to Educators Programme</span>
        </Link>

        {/* Page Header */}
        <header className="rf-app-header">
          <div className="rf-app-meta-badge">
            <Sparkles size={13} color="var(--rf-orange)" />
            <span>ReadFirst Educator Transformation</span>
          </div>
          <h1 className="rf-app-title">Program Application Form</h1>
          <p className="rf-app-subtitle">
            A selective learning experience for educators ready to explore the science and practice of learning through research, deep reading, reflection, and inquiry.
          </p>
        </header>

        {isSubmitted ? (
          /* Thank You Screen (Page 5 & 6 of PDF) */
          <div className="rf-thank-you-card" role="region" aria-label="Application Submitted Confirmation">
            <div className="rf-thank-you-badge">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="rf-thank-you-title">Thank You</h2>
            <div className="rf-thank-you-text">
              <p>
                Thank you for taking the time to reflect and share your responses. By completing this application, you have already begun to examine your own questions about learning—and that spirit of inquiry is an important part of the ReadFirst journey.
              </p>
              <p>
                ReadFirst is a selective program, and applications are reviewed carefully for alignment with the program’s learning approach, participation requirements and opportunities for meaningful application. We appreciate your interest and the thought you have brought to this process.
              </p>
            </div>

            <p className="rf-thank-you-closing">
              “We look forward to the possibility of exploring a more thoughtful, curious and meaningful culture of learning together.”
            </p>

            <div className="rf-thank-you-actions">
              <button
                type="button"
                onClick={handleCopyResponses}
                className="rf-btn-secondary-action"
              >
                {copied ? <Check size={16} color="#15803d" /> : <Copy size={16} />}
                <span>{copied ? 'Responses Copied!' : 'Copy your submitted responses'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSuccessPopup(true)}
                className="rf-btn-secondary-action"
              >
                <Sparkles size={16} color="var(--rf-orange)" />
                <span>View Thank You Message</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="rf-btn-secondary-action"
              >
                <span>Review / Edit Application</span>
              </button>

              <Link to="/" className="rf-btn-submit" style={{ textDecoration: 'none' }}>
                <span>Return to Home</span>
              </Link>
            </div>

            <div className="rf-implementation-footer">
              <strong>Applicant Confirmation:</strong> A record of your submission has been saved and dispatched to the ReadFirst admissions committee.
              {import.meta.env.DEV && submissionFeedback?.simulated && (
                <div style={{ marginTop: '8px', padding: '8px 12px', background: '#FFF4EE', border: '1px solid #F7BA9E', borderRadius: '6px', color: '#C2410C', fontSize: '0.85rem' }}>
                  ℹ Dev Note: Captured in simulation mode. Add your EmailJS keys in <code>.env</code> for live inbox delivery.
                </div>
              )}
              <div style={{ marginTop: '8px' }}>
                Our admissions committee will review your reflective inquiry within 3 to 5 business days and contact you via email ({formData.email}) or phone ({formData.phone}).
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome to a New Way of Thinking About Learning Card (Page 1 of PDF) */}
            <section className="rf-app-welcome-card" aria-label="Welcome Overview">
              <div className="rf-app-hero-image-wrap">
                <img
                  src="/images/educator_application_hero.jpg"
                  alt="Educators engaged in collaborative study and reflection"
                  className="rf-app-hero-image"
                />
                <div className="rf-app-hero-overlay">
                  <span className="rf-app-hero-pill">Collaborative Inquiry & Research</span>
                </div>
              </div>

              <div className="rf-app-welcome-body">
                <h2>Welcome to a New Way of Thinking About Learning</h2>
                <p>
                  Learning can be more than completing a syllabus, remembering information or preparing for examinations. What if we could create learning environments where curiosity grows, learners take ownership, and understanding continues beyond the classroom?
                </p>
                <p>
                  ReadFirst brings educators together to explore the science and practice of learning through research, deep reading, reflection and inquiry.
                </p>
                <p>
                  Our <strong>Educator Transformation Program</strong> is a selective learning experience for educators who are ready to question familiar approaches, explore research-based ideas and consider how learning can be made more meaningful.
                </p>
                <div className="rf-app-quote-box">
                  “A meaningful transformation in learning begins when educators are willing to rethink what learning can be.”
                </div>
              </div>
            </section>

            {/* About the Program Section (Page 1 & 2 of PDF) */}
            <section className="rf-program-overview-section" aria-label="About the Program">
              <h2 className="rf-overview-heading">About the Program</h2>
              <p className="rf-overview-sub">
                Please review the program details before beginning your application.
              </p>

              <div className="rf-program-spec-grid">
                <div className="rf-spec-item">
                  <div className="rf-spec-header">
                    <div className="rf-spec-icon-wrap"><Calendar size={18} /></div>
                    <h3>Duration and format</h3>
                  </div>
                  <p>Five days, conducted entirely online.</p>
                </div>

                <div className="rf-spec-item fee-highlight">
                  <div className="rf-spec-header">
                    <div className="rf-spec-icon-wrap"><IndianRupee size={18} /></div>
                    <h3>Program fee</h3>
                  </div>
                  <p className="rf-fee-amount">₹50,000.</p>
                </div>

                <div className="rf-spec-item">
                  <div className="rf-spec-header">
                    <div className="rf-spec-icon-wrap"><BookOpen size={18} /></div>
                    <h3>Preparation and participation</h3>
                  </div>
                  <p>Preparatory reading, reflective activities, discussions and active participation throughout the program.</p>
                </div>

                <div className="rf-spec-item">
                  <div className="rf-spec-header">
                    <div className="rf-spec-icon-wrap"><Users size={18} /></div>
                    <h3>Collaborative research</h3>
                  </div>
                  <p>After the five-day program, participants work in groups of five to prepare and submit a research paper within 30 days.</p>
                </div>

                <div className="rf-approach-block">
                  <div className="rf-spec-header" style={{ marginBottom: '8px' }}>
                    <div className="rf-spec-icon-wrap"><Lightbulb size={18} /></div>
                    <h3>Our approach</h3>
                  </div>
                  <p>
                    Curiosity, evidence, reflection, intellectual openness, collaboration and thoughtful application. Previous research experience is not required; a willingness to engage sincerely is important.
                  </p>
                </div>
              </div>

              <div className="rf-selection-notice">
                <p>
                  This application is the first step in our selection process. You do not need to have all the answers or be a research expert. We want to understand the questions you carry, the experiences that have shaped your thinking, and your willingness to explore and apply new ideas.
                </p>
                <p>
                  Places are limited, and applications are reviewed carefully for alignment with the program’s approach and expectations.
                </p>
              </div>
            </section>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="rf-application-form-wrap" noValidate={false}>
              {/* SECTION 1: ABOUT YOU */}
              <section className="rf-form-section" aria-labelledby="section-1-heading">
                <div className="rf-form-section-header">
                  <h2 id="section-1-heading">Section 1: About You</h2>
                  <p>Please complete the following details. Fields marked * are required.</p>
                </div>

                <div className="rf-fields-grid">
                  {/* Field 1: Full name */}
                  <div className="rf-field-group">
                    <label htmlFor="fullName" className="rf-field-label">
                      <span>1. Full name <span className="rf-required-star">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="rf-input-text"
                    />
                  </div>

                  {/* Email (User requested) */}
                  <div className="rf-field-group">
                    <label htmlFor="email" className="rf-field-label">
                      <span>Email address <span className="rf-required-star">*</span></span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className="rf-input-text"
                    />
                  </div>

                  {/* Phone (User requested) */}
                  <div className="rf-field-group">
                    <label htmlFor="phone" className="rf-field-label">
                      <span>Phone number <span className="rf-required-star">*</span></span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      required
                      className="rf-input-text"
                    />
                  </div>

                  {/* Field 2: Current designation */}
                  <div className="rf-field-group">
                    <label htmlFor="designation" className="rf-field-label">
                      <span>2. Current designation <span className="rf-required-star">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Teacher, Professor, Academic Leader"
                      required
                      className="rf-input-text"
                    />
                  </div>

                  {/* Field 3: Organisation */}
                  <div className="rf-field-group">
                    <label htmlFor="organisation" className="rf-field-label">
                      <span>3. School, college, university or organisation <span className="rf-required-star">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="organisation"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="Enter your institution or organisation"
                      required
                      className="rf-input-text"
                    />
                  </div>

                  {/* Field 4: Years of experience */}
                  <div className="rf-field-group">
                    <label htmlFor="experience" className="rf-field-label">
                      <span>4. Years of experience in education <span className="rf-required-star">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 8 years"
                      required
                      className="rf-input-text"
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 2: YOUR LEARNING JOURNEY */}
              <section className="rf-form-section" aria-labelledby="section-2-heading">
                <div className="rf-form-section-header">
                  <h2 id="section-2-heading">Section 2: Your Learning Journey</h2>
                  <p>
                    There are no model answers. Please respond in your own words, drawing on your experiences, questions and reflections.
                  </p>
                </div>

                {/* Question 5 */}
                <div className="rf-question-block">
                  <label htmlFor="q5" className="rf-field-label">
                    <span className="rf-question-title">
                      5. Think of a time when a learner did not learn what you expected, or a lesson did not go as planned. What happened, and what did it make you wonder about learning? <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    Describe a real experience and what you took away from it.
                  </p>
                  <textarea
                    id="q5"
                    name="q5"
                    value={formData.q5}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q5.length} characters</div>
                </div>

                {/* Question 6 */}
                <div className="rf-question-block">
                  <label htmlFor="q6" className="rf-field-label">
                    <span className="rf-question-title">
                      6. What questions about learning or teaching would you most like to explore at this stage of your professional journey? <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    Share the questions you genuinely want to understand.
                  </p>
                  <textarea
                    id="q6"
                    name="q6"
                    value={formData.q6}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q6.length} characters</div>
                </div>

                {/* Question 7 */}
                <div className="rf-question-block">
                  <label htmlFor="q7" className="rf-field-label">
                    <span className="rf-question-title">
                      7. What has drawn you to ReadFirst at this point in your journey? What would you hope to understand or do differently after the program? <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    Tell us what makes this opportunity meaningful to you.
                  </p>
                  <textarea
                    id="q7"
                    name="q7"
                    value={formData.q7}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q7.length} characters</div>
                </div>

                {/* Question 8 */}
                <div className="rf-question-block">
                  <label htmlFor="q8" className="rf-field-label">
                    <span className="rf-question-title">
                      8. Can you share a time when you changed the way you thought about or approached something after learning something new? What did you learn, and what did you do differently? <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    You can use an example from teaching, personal experience or feedback you received. If no example comes to mind, describe how you might respond if you discovered that something you believed was not correct.
                  </p>
                  <textarea
                    id="q8"
                    name="q8"
                    value={formData.q8}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q8.length} characters</div>
                </div>

                {/* Question 9 */}
                <div className="rf-question-block">
                  <label htmlFor="q9" className="rf-field-label">
                    <span className="rf-question-title">
                      9. Imagine you read something that challenges a teaching approach you have used for years. How would you respond, and what would you do next? <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    We are interested in how you approach new evidence and differing perspectives.
                  </p>
                  <textarea
                    id="q9"
                    name="q9"
                    value={formData.q9}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q9.length} characters</div>
                </div>

                {/* Question 10 */}
                <div className="rf-question-block">
                  <label htmlFor="q10" className="rf-field-label">
                    <span className="rf-question-title">
                      10. If you learn something useful through ReadFirst, where could you try applying it in the next 30–60 days? How might you tell whether it made a difference? <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    Consider a classroom, institution, teaching practice or learning environment.
                  </p>
                  <textarea
                    id="q10"
                    name="q10"
                    value={formData.q10}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q10.length} characters</div>
                </div>

                {/* Question 11 */}
                <div className="rf-question-block">
                  <label htmlFor="q11" className="rf-field-label">
                    <span className="rf-question-title">
                      11. The program involves work beyond the five online days. Please describe how you would make time for the online sessions, preparatory reading, reflective activities and the group research paper due within 30 days after the program. <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    Please consider your current responsibilities and availability.
                  </p>
                  <textarea
                    id="q11"
                    name="q11"
                    value={formData.q11}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q11.length} characters</div>
                </div>

                {/* Question 12 */}
                <div className="rf-question-block">
                  <label htmlFor="q12" className="rf-field-label">
                    <span className="rf-question-title">
                      12. The program fee is ₹50,000. Having reviewed the fee, please tell us whether you would be able to proceed if selected. If you would need further information, please explain briefly. <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    An honest response will help both you and ReadFirst assess the practical fit.
                  </p>
                  <textarea
                    id="q12"
                    name="q12"
                    value={formData.q12}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q12.length} characters</div>
                </div>

                {/* Question 13 */}
                <div className="rf-question-block">
                  <label htmlFor="q13" className="rf-field-label">
                    <span className="rf-question-title">
                      13. Every participant brings something to a learning community. What experience, perspective or question would you like to share with other educators? <span className="rf-required-star">*</span>
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    Think about what you could contribute to a group that learns together.
                  </p>
                  <textarea
                    id="q13"
                    name="q13"
                    value={formData.q13}
                    onChange={handleChange}
                    placeholder="Write your response here..."
                    required
                    rows={4}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q13.length} characters</div>
                </div>

                {/* Question 14 (Optional) */}
                <div className="rf-question-block">
                  <label htmlFor="q14" className="rf-field-label">
                    <span className="rf-question-title">
                      14. Is there anything else you would like us to know about your interest in ReadFirst or your readiness to take part?
                    </span>
                  </label>
                  <p className="rf-question-hint">
                    Optional.
                  </p>
                  <textarea
                    id="q14"
                    name="q14"
                    value={formData.q14}
                    onChange={handleChange}
                    placeholder="Share anything else you would like us to know..."
                    rows={3}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q14.length} characters</div>
                </div>
              </section>

              {/* DECLARATION CHECKBOX (Page 5 of PDF) */}
              <div className="rf-declaration-card">
                <label className="rf-checkbox-label">
                  <input
                    type="checkbox"
                    name="confirmed"
                    checked={formData.confirmed}
                    onChange={handleChange}
                    required
                    className="rf-custom-checkbox"
                  />
                  <span className="rf-checkbox-text">
                    I have reviewed the program format, fee, participation expectations and research-paper requirement, and confirm that the information I have provided is accurate. <span className="rf-required-star">*</span>
                  </span>
                </label>
              </div>

              {errorMessage && (
                <div className="rf-form-notice" style={{ color: '#b91c1c', borderLeftColor: '#ef4444' }} role="alert">
                  {errorMessage}
                </div>
              )}

              {/* ACTION BUTTONS (Page 5 of PDF) */}
              <div className="rf-form-actions-bar">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rf-btn-submit"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Submitting Application…' : 'Submit Application'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyResponses}
                  className="rf-btn-secondary-action"
                  title="Copy your answers to the clipboard so you retain a personal copy"
                >
                  {copied ? <Check size={16} color="#15803d" /> : <Copy size={16} />}
                  <span>{copied ? 'Responses Copied!' : 'Copy application responses'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rf-btn-secondary-action"
                  title="Clear all fields to start over"
                  style={{ color: '#94a3b8' }}
                >
                  <RotateCcw size={15} />
                  <span>Clear draft</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                <p className="rf-preview-note">
                  For details on how your application details are handled, please review our{' '}
                  <Link to="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rf-navy)', textDecoration: 'underline' }}>
                    Privacy Notice & Consent
                  </Link>.
                </p>
                {lastSaved && (
                  <span className="rf-draft-status-pill">
                    <Check size={12} /> Draft saved locally
                  </span>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
