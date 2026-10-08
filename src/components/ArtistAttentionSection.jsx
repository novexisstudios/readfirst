import React from 'react';
import { Compass } from 'lucide-react';

export default function ArtistAttentionSection() {
  return (
    <section className="rf-section-artist" id="artist-attention" aria-label="02 The Principle of Attention">
      <div className="rf-container">
        <div className="rf-artist-grid">
          {/* Left: Thoughtful Portrait of Concentration & Observation */}
          <div className="rf-artist-media">
            <div className="rf-artist-image-frame">
              <img
                src="/images/editorial_artist_observation.jpg"
                alt="A thoughtful student in deep concentration and reflection by a library window"
                className="rf-artist-image"
                loading="lazy"
              />
            </div>
            <div className="rf-artist-caption">
              <span>Observation & Quiet Reflection // Learning Readiness</span>
            </div>
          </div>

          {/* Right: Typography-Led Editorial Statement */}
          <div className="rf-artist-content">
            <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)', marginBottom: '1.4rem' }}>
              02 // The Principle of Attention
            </span>

            <h2 className="rf-artist-title">
              LEARN IT <br />
              FROM AN <em>ARTIST.</em>
            </h2>

            <p className="rf-artist-lead">
              “The deepest learning begins with attention.”
            </p>

            <div className="rf-artist-quote-box">
              <p className="rf-artist-quote-text">
                Before we rush to formulate an answer, we must first learn to observe what is truly in front of us. Attention is an act of intellectual devotion.
              </p>
              <div className="rf-artist-quote-author">
                <Compass size={14} style={{ color: 'var(--rf-orange)', marginRight: '6px' }} />
                <span>READFIRST FIELD JOURNAL // HABITS OF MIND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
