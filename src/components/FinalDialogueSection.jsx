import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
const currentYear = new Date().getFullYear();
export default function FinalDialogueSection({ onOpenConversation }) {
  return <footer className="rf-conversation-footer" id="conversation"><div className="rf-container">
    <p className="rf-kicker">Let’s begin with a question</p><h2>Curious about what<br /><em>learning could look like?</em></h2>
    <p>Tell us what you’re trying to understand, change or explore.</p><button className="rf-btn-primary rf-btn-orange" onClick={() => onOpenConversation('General Inquiry')}>Start a conversation <ArrowUpRight size={17} /></button>
    <div className="rf-footer-paths"><Link to="/the-learning-marathon">Schools & Colleges · Explore TLM ↗</Link><button onClick={() => onOpenConversation('Educators')}>Educators · Apply to the Programme ↗</button><Link to="/students">Students · Explore programmes ↗</Link></div>
    <div className="rf-compact-footer"><Link className="rf-footer-wordmark" to="/">ReadFirst<span>Learn how to learn.</span></Link><nav aria-label="Footer navigation"><Link to="/learning">Learning</Link><Link to="/reading">Reading</Link><Link to="/smile">SMILE</Link><Link to="/research">Research & Insights</Link><Link to="/about">About</Link><Link to="/faqs">FAQs</Link><Link to="/contact">Get in Touch</Link></nav><small>© {currentYear} ReadFirst</small></div>
  </div></footer>;
}

