import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import './PrivacyPage.css';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Notice & Consent | ReadFirst';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="rf-privacy-page">
      <div className="rf-privacy-container">
        {/* Back Link */}
        <div className="rf-privacy-back-bar">
          <Link to="/" className="rf-privacy-back-link">
            <ArrowLeft size={16} />
            <span>Return to ReadFirst</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="rf-privacy-header">
          <div className="rf-privacy-brand-kicker">
            <ShieldCheck size={14} color="var(--rf-orange)" />
            <span>ReadFirst · Legal & Privacy</span>
          </div>
          <h1 className="rf-privacy-title">Privacy Notice & Consent</h1>
          <p className="rf-privacy-subtitle">How we use the information you share with us</p>
          <div className="rf-privacy-dates">
            Effective date: October 2026 · Last updated: October 2026
          </div>
        </header>

        {/* Main Document Card */}
        <div className="rf-privacy-card">
          <div className="rf-privacy-content">
            {/* Section 1 */}
            <section className="rf-privacy-section">
              <h2>1. Who we are</h2>
              <p>
                ReadFirst Learning Innovations Pvt. Ltd. (“ReadFirst”, “we”, “us” or “our”) works with students, educators and educational institutions to support deeper learning, independent thinking and research-based learning.
              </p>
              <p>
                For privacy questions, contact <strong>privacy@readfirst.in</strong>. Address: New Delhi, India.
              </p>
            </section>

            {/* Section 2 */}
            <section className="rf-privacy-section">
              <h2>2. What information may we collect?</h2>
              <p>
                When you complete a form or contact us, we may collect information you choose to provide, such as your name, email address, phone number, school or organisation, role, programme enquiry, message, communication history and information needed to manage registration or participation.
              </p>
            </section>

            {/* Section 3 */}
            <section className="rf-privacy-section">
              <h2>3. Why do we use it?</h2>
              <p>
                We use this information to respond to your enquiry, contact you about your request, share information about a programme you asked about, manage registrations and programme administration, improve our programmes and communications, and meet applicable legal obligations.
              </p>
              <p>
                We will not use your information for a materially different purpose unless we explain it and have a lawful basis to do so.
              </p>
            </section>

            {/* Section 4 */}
            <section className="rf-privacy-section">
              <h2>4. Who may we share it with?</h2>
              <p>
                We may share relevant information with authorised ReadFirst team members and service providers that help us operate our website, forms, email, communications or programme administration. We may also disclose information where required by law.
              </p>
            </section>

            {/* Section 5 */}
            <section className="rf-privacy-section">
              <h2>5. How long do we keep it?</h2>
              <p>
                We keep personal information only for as long as reasonably necessary for the purpose it was collected, or for any period required or permitted by law. We then delete it or take appropriate steps to remove identifying details, subject to legal requirements.
              </p>
            </section>

            {/* Section 6 */}
            <section className="rf-privacy-section">
              <h2>6. Your choices and privacy requests</h2>
              <p>
                Depending on applicable law, you may be able to ask how your data is used, request correction or erasure, withdraw consent where consent is the basis for processing, or raise a privacy concern. Contact <strong>privacy@readfirst.in</strong>. We may need to verify your identity.
              </p>
            </section>

            {/* Section 7 */}
            <section className="rf-privacy-section">
              <h2>7. Keeping information secure</h2>
              <p>
                We use reasonable safeguards designed to protect personal information from unauthorised access, use, disclosure, loss or alteration. No online transmission or storage method can be guaranteed completely secure.
              </p>
            </section>

            {/* Section 8 */}
            <section className="rf-privacy-section">
              <h2>8. Children’s information</h2>
              <p>
                If a form or programme involves a child, ReadFirst will apply parental-consent and other safeguards required by applicable law. Where necessary, a parent or legal guardian should complete the form or provide consent.
              </p>
            </section>

            {/* Section 9 */}
            <section className="rf-privacy-section">
              <h2>9. Cookies and website technologies</h2>
              <p>
                Our website may use cookies or similar technologies for essential functions, preferences, security or analytics, depending on the tools enabled. See our cookie notice and browser settings for details and available choices.
              </p>
            </section>

            {/* Section 10 */}
            <section className="rf-privacy-section">
              <h2>10. Changes to this notice</h2>
              <p>
                We may update this notice when our practices or legal requirements change. The latest version and effective date will always be available at <strong>readfirst.in/privacy</strong>.
              </p>
            </section>

            {/* Section 11 */}
            <section className="rf-privacy-section">
              <h2>11. Communication and consent choices</h2>
              <p>
                When submitting an enquiry or application through our website, we ensure clear choices for communication and consent:
              </p>

              <div className="rf-privacy-consent-box">
                <div className="rf-consent-sample-list">
                  <div className="rf-consent-sample-item">
                    <strong>Service & enquiry communications</strong>
                    “I have read the Privacy Notice and understand that ReadFirst will use the information I provide to respond to my enquiry and manage the request or service I have asked about, in accordance with the Notice and applicable law.”
                  </div>

                  <div className="rf-consent-sample-item">
                    <strong>Optional programme updates & insights</strong>
                    “I would like to receive occasional updates about ReadFirst programmes, events and related learning opportunities by email, phone, SMS or WhatsApp. I understand this choice is optional and I can opt out at any time.”
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
