import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import EducatorsPage from './pages/EducatorsPage';
import InstitutionsPage from './pages/InstitutionsPage';
import ResearchPage from './pages/ResearchPage';
import ApproachPage from './pages/ApproachPage';
import AboutPage from './pages/AboutPage';
import ApplicationPage from './pages/ApplicationPage';
import EmailPreviewPage from './pages/EmailPreviewPage';
import PrivacyPage from './pages/PrivacyPage';
import FinalDialogueSection from './components/FinalDialogueSection';
import ContentPage from './pages/ContentPage';
import './refinement.css';

function AppContent() {
  const navigate = useNavigate();

  // Initialize Lenis Smooth Inertial Scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    window.__lenis = lenis;

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const handleOpenConversation = (audience = 'Educators') => {
    navigate('/apply', { state: { audience } });
  };

  return (
    <div className="rf-app-wrapper">
      {/* Physical tactile texture overlay */}
      <div className="rf-texture-overlay" aria-hidden="true" />

      {/* Global Navigation */}
      <Navbar onOpenConversation={handleOpenConversation} />

      {/* Main Routed Content */}
      <main id="main-content">
        <Routes>
          {/* Privacy Notice & Consent Page */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/privacy-notice" element={<PrivacyPage />} />

          {/* Email Template Preview (Accessible in local development only, excluded in production) */}
          {import.meta.env.DEV && (
            <>
              <Route path="/email-preview" element={<EmailPreviewPage />} />
              <Route path="/template-preview" element={<EmailPreviewPage />} />
            </>
          )}

          {/* New Separate Application Form Page */}
          <Route path="/apply" element={<ApplicationPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/educator-application" element={<ApplicationPage />} />

          {['learning', 'reading', 'mindfulness', 'accelerate-your-learning', 'schools', 'the-learning-marathon', 'smile', 'faqs', 'contact'].map((page) => (
            <Route
              key={page}
              path={`/${page}`}
              element={<ContentPage page={page} onOpenConversation={handleOpenConversation} />}
            />
          ))}
          <Route
            path="/"
            element={<HomePage onOpenConversation={handleOpenConversation} />}
          />
          <Route
            path="/students"
            element={<StudentsPage onOpenConversation={handleOpenConversation} />}
          />
          <Route
            path="/educators"
            element={<EducatorsPage onOpenConversation={handleOpenConversation} />}
          />
          <Route
            path="/institutions"
            element={<InstitutionsPage onOpenConversation={handleOpenConversation} />}
          />
          <Route
            path="/research"
            element={<ResearchPage onOpenConversation={handleOpenConversation} />}
          />
          <Route
            path="/approach"
            element={<ApproachPage onOpenConversation={handleOpenConversation} />}
          />
          <Route
            path="/about"
            element={<AboutPage onOpenConversation={handleOpenConversation} />}
          />
          <Route
            path="*"
            element={
              <div className="rf-content-page rf-container">
                <h1>Page not found.</h1>
                <a href="/">Return to ReadFirst</a>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Global Footer for Interior Pages */}
      <Routes>
        <Route path="/" element={null} />
        <Route
          path="*"
          element={<FinalDialogueSection onOpenConversation={handleOpenConversation} />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
