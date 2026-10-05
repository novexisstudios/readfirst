import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import FinalCtaSection from './components/FinalCtaSection';
import ConversationModal from './components/ConversationModal';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [conversationModalOpen, setConversationModalOpen] = useState(false);
  const [initialAudience, setInitialAudience] = useState('Institutions');

  // Initialize Lenis Smooth Inertial Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Track scrollProgress along the 3D Story Stage
  useEffect(() => {
    const handleScroll = () => {
      const track = document.getElementById('story-track');
      if (!track) return;

      const trackTop = track.offsetTop;
      const scrollableDistance = track.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const currentScroll = window.scrollY - trackTop;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial compute
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenConversation = (audience = 'Institutions') => {
    setInitialAudience(audience);
    setConversationModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="rf-app-wrapper">
        {/* Physical tactile texture overlay */}
        <div className="rf-texture-overlay" aria-hidden="true" />

        {/* Global Navigation */}
        <Navbar onOpenConversation={handleOpenConversation} />

        {/* Main Routed Content */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  scrollProgress={scrollProgress}
                  onOpenConversation={handleOpenConversation}
                />
              }
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
          </Routes>
        </main>

        {/* Global Footer for Interior Pages */}
        <Routes>
          <Route path="/" element={null} />
          <Route
            path="*"
            element={<FinalCtaSection onOpenConversation={handleOpenConversation} />}
          />
        </Routes>

        {/* Interactive Dialogue Modal */}
        <ConversationModal
          isOpen={conversationModalOpen}
          onClose={() => setConversationModalOpen(false)}
          initialAudience={initialAudience}
        />
      </div>
    </BrowserRouter>
  );
}
