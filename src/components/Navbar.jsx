import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenConversation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      if (isHome) {
        // Detect if scroll is over the dark 3D story track, Section 04 (Navy), or Section 08 (Navy)
        const storyTrack = document.getElementById('story-track');
        const secIdea = document.getElementById('idea');
        const secFinal = document.getElementById('conversation');

        let dark = false;
        if (storyTrack) {
          const rect = storyTrack.getBoundingClientRect();
          if (rect.top <= 70 && rect.bottom >= 70) dark = true;
        }
        if (secIdea) {
          const rect = secIdea.getBoundingClientRect();
          if (rect.top <= 70 && rect.bottom >= 70) dark = true;
        }
        if (secFinal) {
          const rect = secFinal.getBoundingClientRect();
          if (rect.top <= 70 && rect.bottom >= 70) dark = true;
        }
        setIsDarkSection(dark);
      } else {
        // On interior pages, header sits transparently over hero then becomes crisp white blur on scroll
        setIsDarkSection(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, location.pathname]);

  const navItems = [
    { label: 'Our Approach', path: '/approach' },
    { label: 'Students', path: '/students' },
    { label: 'Educators', path: '/educators' },
    { label: 'Institutions', path: '/institutions' },
    { label: 'Research', path: '/research' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`rf-header ${isScrolled ? 'is-scrolled' : ''} ${
          isDarkSection ? 'dark-theme' : ''
        } ${!isHome ? 'is-subpage-header' : ''}`}
      >
        <div className="rf-container rf-header-inner">
          {/* Brand Logo Image */}
          <Link to="/" className="rf-logo-wrap" aria-label="ReadFirst Homepage">
            <div className="rf-logo-img-wrap">
              <img
                src="/images/Readfirst%20LOGO.png"
                alt="ReadFirst - Igniting Imagination"
                className="rf-logo-img"
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav aria-label="Main Navigation">
            <ul className="rf-nav-list">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`rf-nav-link ${isActive ? 'is-current' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Area: CTA Button & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              onClick={() => onOpenConversation('General Inquiry')}
              className="rf-btn-primary"
              id="header-cta-btn"
            >
              <span>Start A Conversation</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              className="rf-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`rf-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="rf-mobile-drawer-header">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="rf-logo-wrap">
            <div className="rf-logo-img-wrap is-drawer">
              <img
                src="/images/Readfirst%20LOGO.png"
                alt="ReadFirst - Igniting Imagination"
                className="rf-logo-img"
              />
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rf-mobile-close-btn"
            aria-label="Close Mobile Menu"
          >
            <X size={26} />
          </button>
        </div>

        <nav className="rf-mobile-links">
          <Link
            to="/"
            className={`rf-mobile-link ${location.pathname === '/' ? 'is-current' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home // Monograph
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`rf-mobile-link ${location.pathname === item.path ? 'is-current' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConversation('General Inquiry');
            }}
            className="rf-btn-primary rf-btn-orange"
            style={{ width: '100%', padding: '1.1rem' }}
          >
            <span>Start A Conversation</span>
            <ArrowUpRight size={18} />
          </button>
          <p
            style={{
              fontFamily: 'var(--rf-font-mono)',
              fontSize: '0.72rem',
              color: 'var(--rf-white-40)',
              marginTop: '1.2rem',
              textAlign: 'center',
            }}
          >
            READFIRST × RESEARCH-BASED TEACHING & LEARNING
          </p>
        </div>
      </div>
    </>
  );
}
