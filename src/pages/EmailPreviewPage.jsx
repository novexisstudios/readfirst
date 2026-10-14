import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  Eye,
  Code,
  FileText,
  Send,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  generateApplicationEmailHtml,
  isEmailJsConfigured,
  sendApplicationEmail,
  APPLICATION_EMAILJS_TEMPLATE
} from '../lib/emailjs';
import './ApplicationPage.css';

const SAMPLE_DATA = {
  fullName: 'Dr. Ananya Sharma',
  email: 'ananya.sharma@example.edu.in',
  phone: '+91 98765 43210',
  designation: 'Head of Pedagogy & Senior Educator',
  organisation: 'Delhi International Learning Academy',
  experience: '12 years',
  q5: 'During a Grade 9 critical reading module on historical perspectives, students were asked to analyze primary source excerpts. Rather than engaging in critical evaluation, most learners focused solely on summarizing factual events for test answers. It revealed to me that despite encouraging discussion, our classroom scaffolding still prioritized surface recall over epistemic curiosity.',
  q6: 'How do we design reading ecosystems where students read not to finish a passage, but to construct a dialogue with the author? How do we transition teachers from being dispensers of curriculum to architects of active mental models?',
  q7: 'ReadFirst\'s commitment to scientific rigor and deep reflective inquiry resonates strongly with me. I am looking to bring back cognitive-science based reading frameworks to train our department of 35 educators.',
  q8: 'Early in my career, I emphasized rapid reading fluency and speed drills. After engaging with cognitive load theory and Stanovich\'s dual-process models, I completely reversed my methodology to prioritize slow, deliberate comprehension and metacognitive questioning.',
  q9: 'I welcome it wholeheartedly. True pedagogical growth requires intellectual humility. If empirical research demonstrates that a habit I have practiced lacks efficacy, I see it as an exciting invitation to redesign my classroom interventions.',
  q10: 'We are launching our term-long cross-disciplinary reading seminar in 45 days. I will implement structured reflective prompts and measure student ownership and interpretive depth through pre-and-post reading diagnostic reflections.',
  q11: 'Yes, fully prepared. My institution has approved dedicated research study hours for the 5-day online intensive and the 30-day collaborative research paper.',
  q12: 'I can offer 12 years of hands-on classroom data on bridging adolescent reading resistance, as well as experience structuring collaborative peer inquiry groups.',
  q13: 'Looking forward to engaging with like-minded educators and researchers from across India and beyond.',
  confirmed: true,
};

export default function EmailPreviewPage() {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code' | 'guide'
  const [previewMode, setPreviewMode] = useState('sample'); // 'sample' | 'variables'
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const sampleHtml = generateApplicationEmailHtml(SAMPLE_DATA);
  const configured = isEmailJsConfigured();

  const handleCopyHtml = async () => {
    try {
      // Copy the dynamic EmailJS template containing {{fullName}}, {{email}}, etc.
      await navigator.clipboard.writeText(APPLICATION_EMAILJS_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert('Unable to copy automatically. Please select text manually.');
    }
  };

  const handleSendTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await sendApplicationEmail(SAMPLE_DATA);
      setTestResult({
        success: true,
        message: res.simulated
          ? 'Simulation successful! (Keys not set yet in .env; provide keys to send real emails).'
          : `Live EmailJS email sent successfully! Status: ${res.status || '200'}`,
        simulated: res.simulated,
      });
    } catch (err) {
      setTestResult({
        success: false,
        message: err?.text || err?.message || 'Error sending test email. Check console and API keys.',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="rf-application-page" style={{ paddingTop: '110px' }}>
      <div className="rf-app-container" style={{ maxWidth: '980px' }}>
        
        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
          <Link to="/apply" className="rf-back-link" style={{ marginBottom: 0 }}>
            <ArrowLeft size={16} />
            <span>Back to Application Form</span>
          </Link>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '20px',
              background: configured ? '#EBF7EE' : '#FFF4EE',
              color: configured ? '#15803D' : '#F2642A',
              border: `1px solid ${configured ? '#B8E4C3' : '#F7BA9E'}`
            }}>
              {configured ? <ShieldCheck size={14} /> : <AlertCircle size={14} />}
              {configured ? 'EmailJS Keys Configured' : 'Keys Pending in .env'}
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="rf-app-header" style={{ marginBottom: '1.8rem' }}>
          <div className="rf-app-meta-badge">
            <Sparkles size={13} color="var(--rf-orange)" />
            <span>ReadFirst Design System · EmailJS Integration</span>
          </div>
          <h1 className="rf-app-title" style={{ fontSize: '2.5rem' }}>
            Email Notification Template
          </h1>
          <p className="rf-app-subtitle">
            This branded email template matches the ReadFirst aesthetic (Deep Navy, Editorial Typography, Crisp Cards, and Warm Accents). It automatically formats all applicant responses for immediate review.
          </p>
        </header>

        {/* Action Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: '#ffffff',
          padding: '14px 18px',
          borderRadius: '10px',
          border: '1px solid #e5e0d8',
          marginBottom: '20px'
        }}>
          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              id="rf-tab-preview"
              type="button"
              onClick={() => setActiveTab('preview')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: activeTab === 'preview' ? '1px solid var(--rf-navy)' : '1px solid #d2dadb',
                background: activeTab === 'preview' ? 'var(--rf-navy)' : '#ffffff',
                color: activeTab === 'preview' ? '#ffffff' : 'var(--rf-ink)',
                fontWeight: 600,
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              <Eye size={15} /> Visual Preview
            </button>
            <button
              id="rf-tab-code"
              type="button"
              onClick={() => setActiveTab('code')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: activeTab === 'code' ? '1px solid var(--rf-navy)' : '1px solid #d2dadb',
                background: activeTab === 'code' ? 'var(--rf-navy)' : '#ffffff',
                color: activeTab === 'code' ? '#ffffff' : 'var(--rf-ink)',
                fontWeight: 600,
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              <Code size={15} /> Template HTML
            </button>
            <button
              id="rf-tab-guide"
              type="button"
              onClick={() => setActiveTab('guide')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: activeTab === 'guide' ? '1px solid var(--rf-navy)' : '1px solid #d2dadb',
                background: activeTab === 'guide' ? 'var(--rf-navy)' : '#ffffff',
                color: activeTab === 'guide' ? '#ffffff' : 'var(--rf-ink)',
                fontWeight: 600,
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              <FileText size={15} /> Setup Guide
            </button>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              id="rf-copy-html-btn"
              type="button"
              onClick={handleCopyHtml}
              className="rf-btn-secondary-action"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              {copied ? <Check size={15} color="#15803d" /> : <Copy size={15} />}
              <span>{copied ? 'HTML Copied!' : 'Copy HTML for EmailJS'}</span>
            </button>

            <button
              id="rf-send-test-btn"
              type="button"
              onClick={handleSendTest}
              disabled={testing}
              className="rf-btn-submit"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Send size={15} />
              <span>{testing ? 'Sending Test…' : 'Send Test Submission'}</span>
            </button>
          </div>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.88rem',
            background: testResult.success ? '#EBF7EE' : '#FEF2F2',
            color: testResult.success ? '#15803D' : '#991B1B',
            border: `1px solid ${testResult.success ? '#B8E4C3' : '#FECACA'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {testResult.success ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Tab 1: Visual Preview */}
        {activeTab === 'preview' && (
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e5e0d8',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0, 31, 66, 0.05)'
          }}>
            <div style={{
              background: '#f4f6f7',
              padding: '12px 18px',
              borderBottom: '1px solid #e5e0d8',
              fontSize: '0.82rem',
              color: '#576778',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--rf-navy-deep)' }}>Live Visual Email Rendering</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>View Mode:</span>
                <button
                  type="button"
                  onClick={() => setPreviewMode('sample')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #d2dadb',
                    background: previewMode === 'sample' ? 'var(--rf-navy)' : '#ffffff',
                    color: previewMode === 'sample' ? '#ffffff' : 'var(--rf-ink)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Filled Sample Data
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('variables')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #d2dadb',
                    background: previewMode === 'variables' ? 'var(--rf-navy)' : '#ffffff',
                    color: previewMode === 'variables' ? '#ffffff' : 'var(--rf-ink)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Dynamic Variables ({'{{fullName}}'}…)
                </button>
              </div>
            </div>
            <div style={{ padding: '16px', background: '#faf8f5' }}>
              <iframe
                title="Email Template Visual Preview"
                srcDoc={previewMode === 'sample' ? sampleHtml : APPLICATION_EMAILJS_TEMPLATE}
                style={{
                  width: '100%',
                  height: '820px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#faf8f5'
                }}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Code View */}
        {activeTab === 'code' && (
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e5e0d8',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#10262e',
              color: '#f8fafc',
              padding: '12px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 600 }}>
                  email-templates/readfirst-application-template.html
                </span>
                <span style={{
                  display: 'inline-block',
                  marginLeft: '12px',
                  background: '#15803d',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontWeight: 600
                }}>
                  ✓ 100% Dynamic EmailJS Template Variables
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyHtml}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                {copied ? '✓ Copied Dynamic Template!' : 'Copy Template Code'}
              </button>
            </div>
            
            <div style={{
              background: '#07131b',
              padding: '10px 18px',
              borderBottom: '1px solid #1e2d3d',
              fontSize: '0.78rem',
              color: '#94a3b8'
            }}>
              ℹ This code uses EmailJS placeholder tags like <code>{"{{fullName}}"}</code>, <code>{"{{email}}"}</code>, <code>{"{{phone}}"}</code>, <code>{"{{q5}}"}</code>… When a user submits on the site, EmailJS dynamically replaces them with their actual answers.
            </div>

            <pre style={{
              margin: 0,
              padding: '18px',
              maxHeight: '680px',
              overflowY: 'auto',
              background: '#0c1724',
              color: '#e2e8f0',
              fontSize: '0.78rem',
              lineHeight: 1.5,
              fontFamily: 'Consolas, Monaco, monospace'
            }}>
              {APPLICATION_EMAILJS_TEMPLATE}
            </pre>
          </div>
        )}

        {/* Tab 3: Setup Guide */}
        {activeTab === 'guide' && (
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e5e0d8',
            padding: '32px'
          }}>
            <h2 style={{ color: 'var(--rf-navy-deep)', marginBottom: '16px', fontSize: '1.6rem' }}>
              How to Connect EmailJS with ReadFirst
            </h2>
            <ol style={{ lineHeight: 1.8, color: 'var(--rf-ink)', paddingLeft: '22px' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Create an account at EmailJS:</strong> Sign in at{' '}
                <a href="https://dashboard.emailjs.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rf-navy)', fontWeight: 600 }}>
                  dashboard.emailjs.com <ExternalLink size={12} style={{ display: 'inline' }} />
                </a>.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Add an Email Service:</strong> Go to <em>Email Services</em> &rarr; <em>Add New Service</em> (e.g. Gmail or Outlook). Connect your account and copy your <code>Service ID</code>.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Create an Email Template:</strong> Go to <em>Email Templates</em> &rarr; <em>Create New Template</em>.
                <ul style={{ marginTop: '6px', listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Subject: <code>New ReadFirst Application: {"{{fullName}}"} ({"{{organisation}}"})</code></li>
                  <li>To Email: <code>admissions@readfirst.in</code> (or your review email)</li>
                  <li>Click <strong>&lt;&gt; (HTML / Source Code)</strong> in the editor toolbar and paste the template HTML from the <em>Template HTML</em> tab.</li>
                  <li>Click <strong>Save</strong> and copy your <code>Template ID</code>.</li>
                </ul>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Copy your Public Key:</strong> Go to <em>Account</em> &rarr; <em>API Keys</em> and copy your <code>Public Key</code>.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Enter keys into <code>.env</code> file:</strong>
                <pre style={{ background: '#f4f6f7', padding: '12px', borderRadius: '6px', margin: '8px 0', fontSize: '0.82rem' }}>
{`VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key`}
                </pre>
              </li>
            </ol>
            <div style={{ marginTop: '24px', padding: '16px', background: '#FFF4EE', border: '1px solid #F7BA9E', borderRadius: '8px' }}>
              <strong>Alternative:</strong> You can also paste the keys directly in the chat with me, and I will configure the <code>.env</code> file for you!
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
