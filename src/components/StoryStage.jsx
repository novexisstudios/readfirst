import React, { useEffect, useRef } from 'react';
import { ArrowDown, BookOpen } from 'lucide-react';
import BookCanvas from './BookCanvas';

export default function StoryStage({ scrollProgress, onOpenConversation }) {
  // Hero headline fades out smoothly as book opens
  // Active [0.00, 0.08], fully fades out by 0.14
  const heroOpacity = Math.max(0, Math.min(1, (0.13 - scrollProgress) / 0.05));
  const heroTranslateY = (scrollProgress / 0.13) * -32;

  // Background styling: Cinematic dark gallery studio that smoothly deepens into Section 04 (#00254D)
  const isExiting = scrollProgress > 0.96;

  // Where the hero copy sits on screen, so the 3D camera can frame the closed
  // book in the free space above it on portrait screens (phones / tablets).
  const heroCopyRef = useRef(null);
  const heroFrame = useRef({ headerPx: 80, textTopPx: 0 });

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('.rf-header');
      const copy = heroCopyRef.current;
      heroFrame.current = {
        headerPx: header ? header.offsetHeight : 80,
        // offsetTop ignores the fade-out translate, giving the resting position
        textTopPx: copy ? copy.offsetTop : 0,
      };
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (heroCopyRef.current) observer.observe(heroCopyRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Scroll to spread helper
  const scrollToSpread = (fraction) => {
    const track = document.getElementById('story-track');
    if (!track) return;
    const top = track.offsetTop;
    const height = track.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + height * fraction,
      behavior: 'smooth',
    });
  };

  return (
    <div id="story-track" className="rf-story-track" aria-label="3D Story Experience">
      {/* Sticky 100vh Viewport Stage with Atmospheric Studio Gradient */}
      <div
        className="rf-story-sticky-stage is-dark-stage"
        style={{
          background: isExiting
            ? '#00254D'
            : 'radial-gradient(ellipse at 52% 44%, #001C38 0%, #001022 55%, #000713 100%)',
          transition: 'background 0.5s ease',
        }}
      >
        {/* Fullscreen Hyper-Realistic 3D Reading Canvas */}
        <BookCanvas
          scrollProgress={scrollProgress}
          isVisible={scrollProgress < 0.985}
          heroFrame={heroFrame}
        />

        {/* -----------------------------------------------------------
            INITIAL HERO INTRODUCTION (Visible only when book is closed)
            ----------------------------------------------------------- */}
        <div
          className="rf-hero-opening-text"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px)`,
            pointerEvents: heroOpacity > 0.3 ? 'auto' : 'none',
            visibility: heroOpacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <div className="rf-container">
            <div className="rf-hero-opening-copy" ref={heroCopyRef}>
              <span className="rf-editorial-eyebrow rf-hero-opening-eyebrow">
                01 // READFIRST PHILOSOPHY
              </span>

              <h1 className="rf-hero-title">
                TO LEARN <br />
                IS AN <em>ART.</em>
              </h1>

              <p className="rf-hero-sub">
                Learning is more than receiving information.
              </p>

              <p className="rf-hero-tagline">
                OBSERVE. QUESTION. EXPLORE. REFLECT.
              </p>

              <div className="rf-hero-opening-actions">
                <button
                  onClick={() => scrollToSpread(0.24)}
                  className="rf-btn-primary"
                  id="hero-explore-btn"
                >
                  <BookOpen size={16} />
                  <span>Open The Book</span>
                  <ArrowDown size={14} />
                </button>

                <button
                  onClick={() => onOpenConversation('General Inquiry')}
                  className="rf-btn-secondary rf-hero-ghost-btn"
                >
                  <span>Start A Conversation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------
            WHISPER-QUIET EDITORIAL FOLIO & SCROLL GUIDANCE
            Replaces the clunky bottom app UI with a refined luxury cue
            ----------------------------------------------------------- */}
        {/* Folio metadata at bottom-right */}
        <div className="rf-stage-folio" aria-hidden="true">
          <span className="rf-stage-folio-dot" />
          <span>READFIRST // INQUIRY MONOGRAPH — VOL. 01</span>
        </div>

        {/* Subtle scroll cue (whispers at the beginning, fades out as user scrolls) */}
        <div
          className="rf-stage-scroll-cue"
          aria-hidden="true"
          style={{ opacity: Math.max(0, Math.min(1, (0.08 - scrollProgress) / 0.04)) }}
        >
          <span>SCROLL TO READ</span>
          <span style={{ color: 'var(--rf-orange)' }}>↓</span>
        </div>

        {/* -----------------------------------------------------------
            ACCESSIBLE / SEO SEMANTIC LAYER
            Ensures all book text is 100% accessible to screen readers
            ----------------------------------------------------------- */}
        <div className="rf-sr-only" aria-live="polite">
          <article>
            <h2>Spread 01: The Art of Learning</h2>
            <p>To learn is an art. Learning is more than receiving information. Observe. Question. Explore. Reflect.</p>
          </article>
          <article>
            <h2>Spread 02: The Principle of Attention</h2>
            <p>Learn it from an artist. The deepest learning begins with attention. Attention is an act of intellectual devotion.</p>
          </article>
          <article>
            <h2>Spread 03: The Question and The System We Know</h2>
            <p>What if we taught people how to learn? Conventional schooling organizes learning into a linear sequence: Syllabus, Teaching, Assignment, Examination, Marks.</p>
            <p>Make space for questions: Why? How? What if? How do we know?</p>
          </article>
          <article>
            <h2>Spread 04: The ReadFirst Idea</h2>
            <p>Learning should create questions, not just answers. A learner who can ask a meaningful question can continue learning beyond the classroom.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
