import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
export default function HeroEditorialSection() {
  const heroRef = useRef(null);
  useEffect(() => {
    const hero = heroRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height - 90)));
      hero.style.setProperty('--hero-scroll', progress);
      hero.style.setProperty('--hero-drift', `${progress * 48}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return <section ref={heroRef} className="rf-art-hero" id="hero" aria-labelledby="hero-title">
    <img className="rf-art-hero-image" src="/images/editorial_hero_reading.jpg" alt="An open book and handwritten notes" fetchPriority="high" />
    <div className="rf-art-hero-content"><p className="rf-kicker">ReadFirst · Learn how to learn</p>
      <h1 id="hero-title">To learn is an art.<br /><em>Learn it from an artist.</em></h1>
      <p>Develop the ability to learn, think<br className="rf-desktop-break" /> and understand independently.</p>
      <Link to="/#how-we-are-different" className="rf-hero-scroll-cue" aria-label="Explore ReadFirst: scroll to the next section">
        <span className="rf-scroll-orbit" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="rf-scroll-ring"><circle className="rf-scroll-track" cx="32" cy="32" r="29" /><circle className="rf-scroll-progress" cx="32" cy="32" r="29" pathLength="100" /></svg>
          <ArrowDown size={20} className="rf-scroll-arrow" />
        </span>
        <span className="rf-scroll-caption">Explore ReadFirst<small>Scroll to discover</small></span>
      </Link>
    </div><p className="rf-art-hero-foot">Deep Learning <span>·</span> Self-Learning <span>·</span> Independent Thinking</p>
  </section>;
}
