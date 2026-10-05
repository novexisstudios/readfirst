// Scroll progress (0 → 1) through the pinned 3D story track.
// Kept outside React so scrolling never re-renders components: the 3D scene
// reads it inside its frame loop and the hero overlay writes styles directly.

const listeners = new Set();
let progress = 0;
let trackEl = null;
let trackTop = 0;
let trackRange = 0;

function measure() {
  if (!trackEl) return;
  trackTop = trackEl.getBoundingClientRect().top + window.scrollY;
  trackRange = trackEl.offsetHeight - window.innerHeight;
}

export function getStoryProgress() {
  return progress;
}

export function subscribeStoryProgress(listener) {
  listeners.add(listener);
  listener(progress);
  return () => listeners.delete(listener);
}

export function updateStoryProgress() {
  if (!trackEl || trackRange <= 0) return;
  const next = Math.max(0, Math.min(1, (window.scrollY - trackTop) / trackRange));
  if (next === progress) return;
  progress = next;
  listeners.forEach((listener) => listener(progress));
}

// Binds the store to the track element and keeps it in sync with scrolling.
export function attachStoryTrack(el) {
  trackEl = el;
  const remeasure = () => {
    measure();
    updateStoryProgress();
  };
  remeasure();

  const observer = new ResizeObserver(remeasure);
  observer.observe(el);
  observer.observe(document.body);
  window.addEventListener('scroll', updateStoryProgress, { passive: true });
  window.addEventListener('resize', remeasure);

  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', updateStoryProgress);
    window.removeEventListener('resize', remeasure);
    if (trackEl === el) trackEl = null;
  };
}
