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
import { sendApplicantConfirmationEmail } from '../lib/resend';

const STORAGE_KEY = 'readfirst_educator_application_draft_v2';

export default function ApplicationPage() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('readfirst_educator_application_draft_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          fullName: parsed.fullName || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          designation: parsed.designation || '',
          organisation: parsed.organisation || '',
          experience: parsed.experience || '',
          q6: parsed.q6 || parsed.q5 || '',
          q7: parsed.q7 || '',
          q8: parsed.q8 || '',
          q9: parsed.q9 || '',
          q10: parsed.q10 || '',
          q11: parsed.q11 || '',
          q12: parsed.q12 || '',
          q13: parsed.q13 || '',
          confirmed: Boolean(parsed.confirmed),
        };
      }
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
      q6: '',
      q7: '',
      q8: '',
      q9: '',
      q10: '',
      q11: '',
      q12: '',
      q13: '',
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

  useEffect(() => {
    document.title = 'Educator Transformation Program Application | ReadFirst';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content =
        'Apply for the ReadFirst Educator Transformation Program. Welcome! Let\'s Start With a Question.';
    }
  }, []);

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
Section 1: A Little About You:
1. Full Name: ${formData.fullName || '(Not provided)'}
2. Email Address: ${formData.email || '(Not provided)'}
   Phone Number: ${formData.phone || '(Not provided)'}
3. Current Role / Designation: ${formData.designation || '(Not provided)'}
4. Work / Teaching Institution: ${formData.organisation || '(Not provided)'}
5. Years Working in Education: ${formData.experience || '(Not provided)'}

Section 2: Your Learning Journey:
6. Chapter, book, or lesson that stayed with you / made you curious:
${formData.q6 || '(No response entered)'}

7. What interests you most about teaching & how children learn:
${formData.q7 || '(No response entered)'}

8. What draws you towards ReadFirst & what you hope to discover/take away:
${formData.q8 || '(No response entered)'}

9. Experience/idea that influenced your thinking or how you explore differing ideas:
${formData.q9 || '(No response entered)'}

10. Plans to bring learning into practice in next 30-60 days & measure impact:
${formData.q10 || '(No response entered)'}

11. How you plan to make time for sessions, reading, and 30-day research paper:
${formData.q11 || '(No response entered)'}

12. Experiences, insights, or life lessons you would enjoy sharing with fellow educators:
${formData.q12 || '(No response entered)'}

13. Additional notes / expectations / contributions (Optional):
${formData.q13 || '(None)'}

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

      // 2. Dispatch automated confirmation email to applicant via Resend
      try {
        const confirmResult = await sendApplicantConfirmationEmail(formData);
        console.log('[ReadFirst Confirmation Email Result]:', confirmResult);
      } catch (confirmErr) {
        console.warn('[ReadFirst Applicant Confirmation Notice]:', confirmErr);
      }

      // 3. Optional backup webhook endpoint if configured in environment
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
          ? `Submission failed (${detailedError}). Please check your connection or copy your responses below and email pratyush@readfirst.in.`
          : 'There was an issue submitting your application. Please copy your responses using the button below and email pratyush@readfirst.in.'
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
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
        q11: '',
        q12: '',
        q13: '',
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
            Thank You for Sharing!
          </h2>

          <div className="rf-success-modal-body">
            <p>
              Thank you for taking the time to tell us a little about yourself, your experiences, and the questions that matter to you.
            </p>
            <p>
              Every educator has a story, and every learning journey begins somewhere. We're glad you've taken this first step towards exploring yours with ReadFirst.
            </p>
            <p className="rf-success-modal-quote">
              “We look forward to learning more about you!”
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
            <span>ReadFirst | Learning and Growing Together</span>
          </div>
          <h1 className="rf-app-title">Welcome! Let's Start With a Question</h1>
          <p className="rf-app-subtitle">
            At ReadFirst, we believe that some of the most meaningful learning begins when we become curious, ask questions, and explore ideas together.
          </p>
        </header>

        {isSubmitted ? (
          /* Thank You Screen */
          <div className="rf-thank-you-card" role="region" aria-label="Application Submitted Confirmation">
            <div className="rf-thank-you-badge">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="rf-thank-you-title">Thank You for Sharing!</h2>
            <div className="rf-thank-you-text">
              <p>
                Thank you for taking the time to tell us a little about yourself, your experiences, and the questions that matter to you.
              </p>
              <p>
                Every educator has a story, and every learning journey begins somewhere. We're glad you've taken this first step towards exploring yours with ReadFirst.
              </p>
            </div>

            <p className="rf-thank-you-closing">
              “We look forward to learning more about you!”
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
                Our admissions committee will review your reflective inquiry within 3 to 5 business days and contact you via email ({formData.email}) or phone ({formData.phone}). For inquiries, reach out to pratyush@readfirst.in.
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome to ReadFirst Educator Transformation Overview Card */}
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
                <h2>Welcome! Let's Start With a Question</h2>
                <p>
                  At ReadFirst, we believe that some of the most meaningful learning begins when we become curious, ask questions, and explore ideas together.
                </p>
                <p>
                  Our Educator Transformation Program brings educators together to explore the science and practice of learning through research, deep reading, reflection, and inquiry.
                </p>
                <p>
                  Before we begin, we'd love to get to know you a little better. There are no perfect answers here, and you don't need to have a background in research. Just bring your experiences, your questions, and a willingness to learn.
                </p>
              </div>
            </section>

            {/* A little about the program Section */}
            <section className="rf-program-overview-section" aria-label="A little about the program">
              <h2 className="rf-overview-heading">A little about the program</h2>

              <ul className="rf-program-bullets-list">
                <li>
                  <div className="rf-bullet-dot" />
                  <div>
                    <strong>Duration:</strong> Five days, entirely online.
                  </div>
                </li>
                <li>
                  <div className="rf-bullet-dot" />
                  <div>
                    <strong>Program fee:</strong> ₹50,000.
                  </div>
                </li>
                <li>
                  <div className="rf-bullet-dot" />
                  <div>
                    <strong>What to expect:</strong> Preparatory reading, reflective activities, discussions, and active participation throughout the program.
                  </div>
                </li>
                <li>
                  <div className="rf-bullet-dot" />
                  <div>
                    <strong>What comes next:</strong> After the five days, you'll work with a group of five educators to prepare and submit a research paper within 30 days.
                  </div>
                </li>
              </ul>

              <div className="rf-program-narrative">
                <p>
                  The journey calls for curiosity, openness to new ideas, thoughtful reflection, and a willingness to learn with others.
                </p>
                <p>
                  Places are limited, and we review each application carefully to understand whether the program is the right fit for you and your learning goals.
                </p>
                <p className="rf-begin-callout">
                  So, let's begin!
                </p>
              </div>
            </section>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="rf-application-form-wrap" noValidate={false}>
              {/* SECTION 1: A LITTLE ABOUT YOU */}
              <section className="rf-form-section" aria-labelledby="section-1-heading">
                <div className="rf-form-section-header">
                  <h2 id="section-1-heading">Section 1: A Little About You</h2>
                  <p>First, we'd like to know a few things about you and your work.</p>
                </div>

                <div className="rf-fields-stack">
                  {/* Field 1: Full name */}
                  <div className="rf-field-group full-width">
                    <label htmlFor="fullName" className="rf-field-label">
                      <span>1. What's your full name? <span className="rf-required-star">*</span></span>
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

                  {/* Field 2: Email & Phone compound question */}
                  <div className="rf-field-compound full-width">
                    <div className="rf-compound-title">
                      2. What's the best email address and phone number to reach you on? <span className="rf-required-star">*</span>
                    </div>
                    <div className="rf-compound-grid">
                      <div className="rf-field-group">
                        <label htmlFor="email" className="rf-subfield-label">
                          <span>• Email address <span className="rf-required-star">*</span></span>
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

                      <div className="rf-field-group">
                        <label htmlFor="phone" className="rf-subfield-label">
                          <span>• Phone number <span className="rf-required-star">*</span></span>
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
                    </div>
                  </div>

                  {/* Field 3: Current designation */}
                  <div className="rf-field-group full-width">
                    <label htmlFor="designation" className="rf-field-label">
                      <span>3. What is your current role or designation? <span className="rf-required-star">*</span></span>
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

                  {/* Field 4: Organisation */}
                  <div className="rf-field-group full-width">
                    <label htmlFor="organisation" className="rf-field-label">
                      <span>4. Where do you currently work or teach? <span className="rf-required-star">*</span></span>
                    </label>
                    <p className="rf-field-subhint">
                      Please share the name of your school, college, university, or organisation.
                    </p>
                    <input
                      type="text"
                      id="organisation"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="Enter school, college, university, or organisation name"
                      required
                      className="rf-input-text"
                    />
                  </div>

                  {/* Field 5: Experience */}
                  <div className="rf-field-group full-width">
                    <label htmlFor="experience" className="rf-field-label">
                      <span>5. How long have you been working in education? <span className="rf-required-star">*</span></span>
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
                    Every educator brings their own experiences, ideas, and questions to the learning journey. We'd love to hear a little about yours. There are no right or wrong answers, so feel free to share what comes naturally to you.
                  </p>
                </div>

                {/* Question 6 */}
                <div className="rf-question-block">
                  <label htmlFor="q6" className="rf-field-label">
                    <span className="rf-question-title">
                      6. There must have been a chapter, a book, or a lesson that has stayed with you or made you more curious. We'd love to hear about your experience, reflections and thoughts you've had while teaching or learning it. <span className="rf-required-star">*</span>
                    </span>
                  </label>
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
                      7. We would love to know what interests you most about teaching and how children learn, along with the ideas, questions, or aspects of learning you would like to explore more deeply. <span className="rf-required-star">*</span>
                    </span>
                  </label>
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
                      8. We'd be happy to know what draws you towards ReadFirst at this point in your journey, and what you hope to discover, understand, or take away from this experience. <span className="rf-required-star">*</span>
                    </span>
                  </label>
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
                      9. We are eager to hear from you about an experience, a new idea or learning that has influenced the way you think, teach, or work. You could also reflect on how you explore new ideas that may differ from your existing understanding. <span className="rf-required-star">*</span>
                    </span>
                  </label>
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
                      10. As you explore ReadFirst, we'd love to hear about your plans to bring your learning into practice over the next 30–60 days, and the difference and impact you hope to make for your students and their learning environment. <span className="rf-required-star">*</span>
                    </span>
                  </label>
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
                      11. We'd like to understand how you plan to make time for the sessions, preparatory reading, reflection, and collaborative research alongside teaching and your other commitments, including the research paper to be completed within 30 days after the program. <span className="rf-required-star">*</span>
                    </span>
                  </label>
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
                      12. Every educator brings something special to the learning community. We'd love to hear about the experiences, insights, ideas, or life lessons you would enjoy sharing with fellow educators as you learn and grow together. <span className="rf-required-star">*</span>
                    </span>
                  </label>
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

                {/* Question 13 (Optional) */}
                <div className="rf-question-block">
                  <label htmlFor="q13" className="rf-field-label">
                    <span className="rf-question-title">
                      13. Feel free to share anything more about your interest in ReadFirst, your expectations from the program, or how you hope to contribute to this learning journey.
                    </span>
                  </label>
                  <p className="rf-question-hint" style={{ fontStyle: 'italic', marginBottom: '4px' }}>
                    Question 13 is optional.
                  </p>
                  <p className="rf-question-hint">
                    This is completely optional. Feel free to share anything we haven't asked about but that you'd like us to know.
                  </p>
                  <textarea
                    id="q13"
                    name="q13"
                    value={formData.q13}
                    onChange={handleChange}
                    placeholder="Share anything else you would like us to know..."
                    rows={3}
                    className="rf-question-textarea"
                  />
                  <div className="rf-char-indicator">{formData.q13.length} characters</div>
                </div>
              </section>

              {/* Thank You for Sharing Card */}
              <div className="rf-sharing-card">
                <h3 className="rf-sharing-title">Thank You for Sharing!</h3>
                <p className="rf-sharing-text">
                  Thank you for taking the time to tell us a little about yourself, your experiences, and the questions that matter to you.
                </p>
                <p className="rf-sharing-text">
                  Every educator has a story, and every learning journey begins somewhere. We're glad you've taken this first step towards exploring yours with ReadFirst.
                </p>
                <p className="rf-sharing-closing">
                  We look forward to learning more about you!
                </p>
              </div>

              {/* DECLARATION CHECKBOX */}
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

              {/* ACTION BUTTONS */}
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
                  For details on how your application information is handled, please read our{' '}
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
