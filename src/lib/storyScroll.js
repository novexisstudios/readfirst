// Scroll progress (0 → 1) through the pinned 3D story track.
// Kept outside React so scrolling never re-renders components: the 3D scene
// reads it inside its frame loop and the hero overlay writes styles directly.

const listeners = new Set();
let progress = 0;
let trackEl = null;
let trackTop = 0;
let trackRange = 0;

// Phones read the book one page at a time, so the final spread (which only
// gets 0.96 → 0.982 of the desktop timeline) needs far more scroll room.
// On phone-shaped screens raw scroll is remapped onto the story timeline;
// the track is also taller there (see .rf-story-track) to keep the pace.
const PHONE_TIMELINE = [
  [0, 0],
  [0.84, 0.96],   // cover + spreads 01–03B + final leaf turn, slightly compressed
  [0.97, 0.982],  // final spread gets ~13% of the scroll instead of ~2%
  [1, 1],         // exit
];
const phoneQuery = window.matchMedia('(max-aspect-ratio: 4/5)');

function toStoryTime(raw) {
  if (!phoneQuery.matches) return raw;
  for (let i = 1; i < PHONE_TIMELINE.length; i++) {
    const [r0, s0] = PHONE_TIMELINE[i - 1];
    const [r1, s1] = PHONE_TIMELINE[i];
    if (raw <= r1) return s0 + ((raw - r0) / (r1 - r0)) * (s1 - s0);
  }
  return 1;
}

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
  const next = toStoryTime(Math.max(0, Math.min(1, (window.scrollY - trackTop) / trackRange)));
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
