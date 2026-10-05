import React, { useEffect, useRef } from 'react';
import { ArrowDown, BookOpen } from 'lucide-react';
import BookCanvas from './BookCanvas';
import { attachStoryTrack, subscribeStoryProgress } from '../lib/storyScroll';

export default function StoryStage({ onOpenConversation }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const heroTextRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Scroll-driven overlay styles are written straight to the DOM (no React
  // re-render per scroll event), which keeps scrolling smooth.
  useEffect(() => {
    const detach = attachStoryTrack(trackRef.current);
    const unsubscribe = subscribeStoryProgress((p) => {
      // Hero headline fades out as the book opens (gone by 0.13)
      const heroOpacity = Math.max(0, Math.min(1, (0.13 - p) / 0.05));
      const hero = heroTextRef.current;
      if (hero) {
        hero.style.opacity = heroOpacity;
        hero.style.transform = `translate3d(0, ${Math.min(p, 0.13) / 0.13 * -32}px, 0)`;
        hero.style.pointerEvents = heroOpacity > 0.3 ? 'auto' : 'none';
        hero.style.visibility = heroOpacity > 0.01 ? 'visible' : 'hidden';
      }
      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = Math.max(0, Math.min(1, (0.08 - p) / 0.04));
      }
      // Studio background deepens into Section 04 navy on exit
      stageRef.current?.classList.toggle('is-exiting', p > 0.96);
    });
    return () => {
      unsubscribe();
      detach();
    };
  }, []);

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
    const target = top + height * fraction;
    // Route through Lenis when active so the two smooth-scrollers don't fight
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.6 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div id="story-track" ref={trackRef} className="rf-story-track" aria-label="3D Story Experience">
      {/* Sticky 100vh Viewport Stage with Atmospheric Studio Gradient */}
      <div ref={stageRef} className="rf-story-sticky-stage is-dark-stage">
        {/* Fullscreen Hyper-Realistic 3D Reading Canvas */}
        <BookCanvas heroFrame={heroFrame} />

        {/* -----------------------------------------------------------
            INITIAL HERO INTRODUCTION (Visible only when book is closed)
            ----------------------------------------------------------- */}
        <div className="rf-hero-opening-text" ref={heroTextRef}>
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
        <div className="rf-stage-scroll-cue" aria-hidden="true" ref={scrollCueRef}>
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
