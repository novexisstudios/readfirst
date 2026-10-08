import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

export default function ConversationModal({ isOpen, onClose, initialAudience }) {
  const dialog = useRef(null);
  const [audience, setAudience] = useState(
    initialAudience?.includes('Educator')
      ? 'Educators'
      : initialAudience?.includes('Student')
      ? 'Students'
      : initialAudience?.includes('Institution')
      ? 'Institutions'
      : 'General Inquiry'
  );
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  useEffect(() => {
    if (initialAudience) {
      setAudience(
        initialAudience.includes('Educator')
          ? 'Educators'
          : initialAudience.includes('Student')
          ? 'Students'
          : initialAudience.includes('Institution')
          ? 'Institutions'
          : 'General Inquiry'
      );
    }
  }, [initialAudience]);

  useEffect(() => {
    const dialogEl = dialog.current;
    if (isOpen && dialogEl) {
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
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === dialog.current) {
      const rect = dialog.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInside) {
        onClose();
      }
    }
  };

  async function submit(event) {
    event.preventDefault();
    if (!endpoint || sending) return;
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    setSending(true);
    setStatus('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('Your enquiry has been sent. Thank you for starting a conversation.');
      event.target.reset();
    } catch {
      setStatus('Your enquiry could not be sent. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog
      ref={dialog}
      className="rf-enquiry-dialog"
      aria-labelledby="enquiry-title"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      onCancel={onClose}
      onClick={handleBackdropClick}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="rf-drawer-close"
        aria-label="Close conversation dialog"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      <p className="rf-kicker">ReadFirst / Get in touch</p>
      <h2 id="enquiry-title">Start a conversation.</h2>
      <p>Tell us what you’re trying to understand, change or explore.</p>

      <form onSubmit={submit} data-lenis-prevent="true">
        <label htmlFor="enquiry-audience">Your pathway</label>
        <select
          id="enquiry-audience"
          name="audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        >
          <option value="Institutions">Schools & Colleges — TLM</option>
          <option value="Educators">Educators — Programme application</option>
          <option value="Students">Students — Programme enquiry</option>
          <option value="General Inquiry">General enquiry</option>
        </select>

        {audience === 'Students' && (
          <>
            <label htmlFor="enquiry-programme">Programme</label>
            <select id="enquiry-programme" name="programme">
              <option>14-Day Mindfulness Programme</option>
              <option>30-Day Accelerate Your Learning</option>
              <option>Both programmes</option>
            </select>
          </>
        )}

        <label htmlFor="enquiry-question">What would you like to explore?</label>
        <textarea id="enquiry-question" name="question" required rows={3} />

        <label htmlFor="enquiry-name">Your name</label>
        <input id="enquiry-name" name="name" autoComplete="name" required />

        <label htmlFor="enquiry-email">Email address</label>
        <input id="enquiry-email" name="email" type="email" autoComplete="email" required />

        <label htmlFor="enquiry-institution">School or organisation (optional)</label>
        <input id="enquiry-institution" name="institution" autoComplete="organization" />

        {!endpoint && (
          <p className="rf-form-notice">
            Online enquiries are not available yet. This form cannot send your details at present.
          </p>
        )}

        {status && <p role="status" aria-live="polite">{status}</p>}

        <button
          className="rf-btn-primary"
          type="submit"
          disabled={!endpoint || sending}
        >
          <span>{sending ? 'Sending…' : 'Send enquiry'}</span>
          <ArrowUpRight size={16} />
        </button>
      </form>
    </dialog>
  );
}
