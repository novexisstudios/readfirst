import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that navigating between pages instantly resets
 * the scroll position to the very top (0, 0), accounting for both standard
 * browser scrolling and the Lenis smooth-scroll engine.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigating to a specific in-page section hash (e.g. #anchor)
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -90 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }

    // 1. Instantly reset native window and document scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Synchronously reset Lenis virtual scroll target
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    // 3. Secondary frame tick fallback to catch any DOM layout reflow
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, search, hash]);

  return null;
}
