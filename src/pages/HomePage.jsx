import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import HeroEditorialSection from '../components/HeroEditorialSection';
import FinalDialogueSection from '../components/FinalDialogueSection';
import FaqSection from '../components/FaqSection';

const beliefs = [
  ['Deep learning', 'Go beyond memorisation to understand ideas and make connections.'],
  ['Self-learning', 'Develop the ability to explore, understand and learn without constant instruction.'],
  ['Independent thinking', 'Question ideas, examine perspectives and form your own understanding.'],
  ['Purposeful reading', 'Read to understand. Read to question. Read to think.'],
];

export default function HomePage({ onOpenConversation }) {
  useEffect(() => {
    document.title = 'ReadFirst — Learn How to Learn | Deep Learning & Independent Thinking';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content =
        'Develop deep learning, self-learning and independent thinking through purposeful reading and the SMILE Learning Model. Research-based programmes for educators, schools and students.';
    }
  }, []);

  return (
    <>
      <HeroEditorialSection />

      {/* Section 1: A different way of learning */}
      <section className="rf-narrative" id="how-we-are-different">
        <div className="rf-container">
          <p className="rf-kicker">01 / A different way of learning</p>
          <div className="rf-story-grid">
            <h2>
              Learning is more than knowing.
            </h2>
            <div className="rf-story-copy">
              <p>
                It is about understanding how to learn, how to question what we encounter, and how to make sense of what we discover.
              </p>
              <h3>Learning should create learners.</h3>
              <p>
                Learners who can think beyond answers, find their own questions and develop an understanding that is truly their own.
              </p>
            </div>
          </div>
          <div className="rf-belief-strip">
            {beliefs.map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: THE LEARNING MODEL */}
      <section className="rf-smile-feature" id="smile">
        <div className="rf-container rf-story-grid">
          <div>
            <p className="rf-kicker">02 / The learning model</p>
            <h2 className="rf-smile-word">
              SMILE
              <span>
                Self-Motivated Intelligent<br />Learning Environment
              </span>
            </h2>
          </div>
          <div className="rf-story-copy">
            <h3>The conditions for independent learning.</h3>
            <p>
              Learning independence does not develop simply by asking students to study on their own. It requires an environment that encourages curiosity, supports understanding and gives learners the space to think for themselves.
            </p>
            <p>
              The SMILE Learning Model brings together deep learning, purposeful reading, self-learning and reflection to support this process.
            </p>
            <p>
              It begins with understanding the learner and creating the conditions in which curiosity can grow, understanding can deepen and independence can develop.
            </p>
            <Link className="rf-text-link" to="/smile">
              Explore the SMILE Learning Model <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: WHO WE WORK WITH */}
      <section className="rf-narrative rf-pathways" id="who-we-work-with">
        <div className="rf-container">
          <p className="rf-kicker">03 / Who we work with</p>
          <h2>
            Different learners.<br />
            <em>One fundamental question.</em>
          </h2>
          <p className="rf-pathway-intro">
            How can we create the conditions for meaningful, independent learning?
          </p>

          {/* 01 / Schools & Colleges */}
          <article className="rf-pathway-row">
            <div>
              <span className="rf-kicker">01 / Schools & colleges</span>
              <h3>
                Build a culture of<br />independent learning.
              </h3>
            </div>
            <div>
              <h4>The Learning Marathon — TLM</h4>
              <p>
                An institutional learning initiative that encourages curiosity, purposeful reading, reflection and deeper engagement with learning. It aims to make these practices part of the wider learning culture.
              </p>
              <Link className="rf-text-link" to="/the-learning-marathon">
                Explore The Learning Marathon <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>

          {/* 02 / Educators */}
          <article className="rf-pathway-row">
            <div>
              <span className="rf-kicker">02 / Educators</span>
              <h3>
                Understand learning.<br />Transform your practice.
              </h3>
            </div>
            <div>
              <h4>Research-Based Teaching & Learning</h4>
              <p>
                Explore how learning happens and how educators can create conditions in which learners can think, question and learn independently.
              </p>
              <p>
                This selective programme is for educators who are curious about learning, willing to reflect on their practice and open to questioning familiar approaches to teaching.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <Link className="rf-text-link" to="/educators">
                  Explore the programme <ArrowUpRight size={17} />
                </Link>
                <Link className="rf-text-link" to="/apply">
                  Apply to the programme <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </article>

          {/* 03 / Students */}
          <article className="rf-pathway-row">
            <div>
              <span className="rf-kicker">03 / Students</span>
              <h3>Learn how to learn.</h3>
            </div>
            <div className="rf-student-options">
              <div>
                <h4>14-Day Mindfulness Programme</h4>
                <p style={{ fontWeight: 600, color: 'var(--rf-navy)', marginBottom: '0.35rem' }}>
                  Pause. Observe. Reset.
                </p>
                <p>
                  Develop focus, attention and self-awareness to engage more consciously with the process of learning.
                </p>
                <Link className="rf-text-link" to="/mindfulness">
                  Explore Mindfulness <ArrowUpRight size={17} />
                </Link>
              </div>
              <div>
                <h4>30-Day Accelerate Your Learning</h4>
                <p>
                  Develop the ability to learn independently through purposeful reading, deeper understanding and the SMILE Learning Model.
                </p>
                <Link className="rf-text-link" to="/accelerate-your-learning">
                  Explore Accelerate Your Learning <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Section 4: Common Questions */}
      <FaqSection
        category="General"
        kicker="04 / Common Questions"
        title="Understanding ReadFirst.<br /><em>Frequently asked questions.</em>"
        description="Discover the philosophy, approach and purpose behind ReadFirst."
      />

      <FinalDialogueSection onOpenConversation={onOpenConversation} />
    </>
  );
}
