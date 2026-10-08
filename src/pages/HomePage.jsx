import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import HeroEditorialSection from '../components/HeroEditorialSection';
import FinalDialogueSection from '../components/FinalDialogueSection';
const beliefs = [
  ['Deep learning', 'Move beyond memorisation towards genuine understanding.'],
  ['Self-learning', 'Develop the ability to learn without constant instruction.'],
  ['Independent thinking', 'Question, analyse and form your own understanding.'],
  ['Purposeful reading', 'Read to understand. Read to think.'],
  ['Learning independence', 'Make room for reflection and reduce dependence on screens.'],
];
export default function HomePage({ onOpenConversation }) {
  useEffect(() => { document.title = 'ReadFirst — Learn How to Learn'; document.querySelector('meta[name="description"]').content = 'Develop deep learning, self-learning and independent thinking. Explore SMILE, The Learning Marathon and ReadFirst programmes for educators and students.'; }, []);
  return <><HeroEditorialSection />
    <section className="rf-narrative" id="how-we-are-different"><div className="rf-container">
      <p className="rf-kicker">01 / A different way of learning</p>
      <div className="rf-story-grid"><h2>Education teaches us what to learn.<br /><em>Who teaches us how?</em></h2><div className="rf-story-copy"><p>Completing a syllabus and remembering answers are only part of learning. What helps a student read deeply, question, reflect and understand?</p><h3>Learning should create learners.</h3><p>We don’t start with technology. We start with the learner: how they learn, what creates curiosity and what helps them become independent.</p></div></div>
      <div className="rf-belief-strip">{beliefs.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
    </div></section>
    <section className="rf-smile-feature" id="smile"><div className="rf-container rf-story-grid">
      <div><p className="rf-kicker">02 / The learning model</p><h2 className="rf-smile-word">SMILE<span>Self-Motivated Intelligent<br />Learning Environment</span></h2></div>
      <div className="rf-story-copy"><h3>The conditions for independent learning.</h3><p>The learning model behind ReadFirst brings together deep learning, self-learning, independent thinking, reading and reflection.</p><p>It starts with understanding the learner and creating an environment that supports learning independence.</p><Link className="rf-text-link" to="/smile">Explore the SMILE Learning Model <ArrowUpRight size={17} /></Link></div>
    </div></section>
    <section className="rf-narrative rf-pathways" id="who-we-work-with"><div className="rf-container">
      <p className="rf-kicker">03 / Who we work with</p><h2>Different learners.<br /><em>One fundamental question.</em></h2><p className="rf-pathway-intro">How can we make learning better?</p>
      <article className="rf-pathway-row"><div><span className="rf-kicker">01 / Schools & colleges</span><h3>Build a culture of<br />independent learning.</h3></div><div><h4>The Learning Marathon — TLM</h4><p>An institutional learning offering that encourages curiosity, purposeful reading, reflection and deeper engagement with learning.</p><Link className="rf-text-link" to="/the-learning-marathon">Explore The Learning Marathon <ArrowUpRight size={17} /></Link></div></article>
      <article className="rf-pathway-row"><div><span className="rf-kicker">02 / Educators</span><h3>Understand learning.<br />Transform your practice.</h3></div><div><h4>Research-Based Teaching & Learning</h4><p>For educators who believe teaching can be more than delivering a syllabus. Participation is selective, looking for curiosity, openness, reflection and a willingness to rethink teaching.</p><Link className="rf-text-link" to="/educators">Explore the programme <ArrowUpRight size={17} /></Link><button className="rf-text-link" onClick={() => onOpenConversation('Educators')}>Apply to the Programme <ArrowUpRight size={17} /></button></div></article>
      <article className="rf-pathway-row"><div><span className="rf-kicker">03 / Students</span><h3>Become a learner.<br /><em>Learn how to learn.</em></h3></div><div className="rf-student-options"><div><h4>14-Day Mindfulness Programme</h4><p>Pause. Observe. Reset. Develop awareness, attention and mental readiness for learning.</p><Link className="rf-text-link" to="/mindfulness">Explore Mindfulness <ArrowUpRight size={17} /></Link></div><div><h4>30-Day Accelerate Your Learning</h4><p>Develop as a self-learner and independent thinker through SMILE, purposeful reading and understanding.</p><Link className="rf-text-link" to="/accelerate-your-learning">Explore Accelerate Your Learning <ArrowUpRight size={17} /></Link></div></div></article>
    </div></section><FinalDialogueSection onOpenConversation={onOpenConversation} /></>;
}
