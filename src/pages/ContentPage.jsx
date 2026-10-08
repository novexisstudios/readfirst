import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { pages, faqs } from '../content/siteContent';
export default function ContentPage({ page, onOpenConversation }) {
  const data = pages[page];
  useEffect(() => { document.title = `${data?.label || 'FAQs'} | ReadFirst`; const meta = document.querySelector('meta[name="description"]'); if (meta) meta.content = data?.intro || 'Answers about ReadFirst, SMILE, student programmes, educators and The Learning Marathon.'; }, [data]);
  if (page === 'faqs') return <div className="rf-content-page rf-container"><p className="rf-kicker">Your questions, answered</p><h1>Understanding ReadFirst.</h1><div className="rf-faqs">{faqs.map(([group, items]) => <section key={group}><h2>{group}</h2>{items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>)}</div></div>;
  return <div className="rf-content-page rf-container"><p className="rf-kicker">{data.label}</p><h1>{data.title}</h1><p className="rf-content-intro">{data.intro}</p>
    <div className="rf-content-sections">{data.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div>
    {page === 'contact' ? <div className="rf-contact-options">{[['Institutions', 'Schools & Colleges — TLM'], ['Educators', 'Educators — Apply to the Programme'], ['Students', 'Students — Explore programmes'], ['General Inquiry', 'Another question']].map(([value, label]) => <button className="rf-text-link" key={value} onClick={() => onOpenConversation(value)}>{label}<ArrowUpRight size={17} /></button>)}</div> : <button className="rf-btn-primary" onClick={() => onOpenConversation(data.audience || 'General Inquiry')}>{data.cta || 'Start a conversation'}<ArrowUpRight size={17} /></button>}
    <nav className="rf-related-links" aria-label="Explore more">{data.links.map(([label, path]) => <Link className="rf-text-link" key={path} to={path}>{label}<ArrowUpRight size={17} /></Link>)}</nav>
  </div>;
}
