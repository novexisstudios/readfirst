import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Layers, CheckCircle2, Calendar, FileText, Compass, Sparkles } from 'lucide-react';

export default function EducatorsPage({ onOpenConversation }) {
  const [selectedDay, setSelectedDay] = useState(0);

  const immersionDays = [
    {
      day: 'DAY 01',
      title: 'Higher-Level Reading',
      focus: 'Reclaiming Deep Textual Engagement',
      description: 'Educators undergo the disorienting, powerful experience of slow syntopical reading. We dismantle the habit of reading for syllabus transmission and cultivate the habit of reading as intellectual dialogue, rigorous marginalia, and interpretive investigation.',
      outcomes: [
        'Unlearning speed-skimming and surface comprehension',
        'Advanced annotation taxonomies for classroom modeling',
        'Framing interpretive provocations from primary source texts'
      ]
    },
    {
      day: 'DAY 02',
      title: 'From Teaching to Self-Motivated Learning',
      focus: 'Flipping the Instructional Energy',
      description: 'Examining what happens when the teacher ceases to be the sole energy source in the classroom. Exploring the architecture of environments that compel student curiosity, cognitive autonomy, and productive struggle.',
      outcomes: [
        'Diagnosing teacher-dependency vs cognitive autonomy',
        'Designing student-led seminar dialogues',
        'Reframing errors as essential empirical data points'
      ]
    },
    {
      day: 'DAY 03',
      title: 'Building a Research Culture',
      focus: 'The Educator as Empirical Investigator',
      description: 'Every classroom is a living laboratory. Educators learn how to observe student thinking without premature intervention, frame empirical questions about learning barriers, and document evidence with academic discipline.',
      outcomes: [
        'Formulating precise classroom research questions',
        'Qualitative evidence collection (think-alouds, dialogue transcripts)',
        'Structuring rigorous classroom observation protocols'
      ]
    },
    {
      day: 'DAY 04',
      title: 'Noise Audit',
      focus: 'Eliminating Institutional Clutter',
      description: 'A ruthless audit of pedagogical noise: excessive worksheets, superficial administrative checklists, disjointed digital tools, and exam panic that crowd out genuine reflection and deep contemplation.',
      outcomes: [
        'Mapping cognitive overload across existing lesson plans',
        'Pruning redundant tasks to restore sustained silence and inquiry',
        'Creating intentional space for unstructured student investigation'
      ]
    },
    {
      day: 'DAY 05',
      title: 'Designing a Research-Based School',
      focus: 'Institutionalising Inquiry as Routine',
      description: 'Synthesizing the immersion into a concrete 60-day action plan. Designing sustainable peer study groups, departmental research inquiries, and student-facing inquiry studios.',
      outcomes: [
        'Authoring the departmental 60-day inquiry blueprint',
        'Establishing peer observation and critical friend protocols',
        'Presenting institutional findings to leadership'
      ]
    }
  ];

  const synthesisStages = [
    { role: 'TEACHER', desc: 'Starts with subject matter mastery and classroom instruction.' },
    { role: 'LEARNER', desc: 'Re-enters the curiosity, patience, and vulnerability of authentic inquiry.' },
    { role: 'RESEARCHER', desc: 'Treats student questions and classroom observations as empirical inquiries.' },
    { role: 'LEARNING COACH', desc: 'Adopts the SMILE 2.0 approach to guide students from passive absorption to autonomous inquiry.' },
    { role: 'CULTURE BUILDER', desc: 'Builds a lasting research culture across the department and the wider school.' }
  ];

  const discoveryArtifacts = [
    { name: 'Foundational Monographs', desc: 'Curated volume of seminal research on cognition, inquiry, and deep reading.' },
    { name: 'Field Research Diary', desc: 'Physical leather-bound ledger for recording classroom observations and reflective marginalia.' },
    { name: 'Provocation Deck', desc: 'Taxonomy of 40 inquiry prompts designed to provoke high-order dialogue.' },
    { name: 'Protocol Handbooks', desc: 'Step-by-step methodologies for student seminars, noise audits, and peer coaching.' }
  ];

  return (
    <div className="rf-page-wrapper">
      {/* -----------------------------------------------------------
          HERO SECTION
          ----------------------------------------------------------- */}
      <section className="rf-page-hero">
        <div className="rf-container">
          <div className="rf-page-hero-inner">
            <span className="rf-editorial-eyebrow" style={{ color: 'var(--rf-orange)' }}>
              A SELECTIVE COHORT EXPERIENCE · BY APPLICATION ONLY
            </span>
            <h1 className="rf-page-hero-title">
              A RARE OPPORTUNITY TO RETHINK<br />
              <em>HOW LEARNING HAPPENS.</em>
            </h1>
            <p className="rf-page-hero-lead">
              The ReadFirst Educator Transformation Program is not another teacher-training workshop or mass-enrollment course. It is an intensive, selective cohort experience for educators who are serious about rethinking how learning happens. We place the educator back in the position of an active learner — cultivating research-based teaching, strength of mind, and the mastery to build an enduring research culture in the classroom.
            </p>
            <div className="rf-page-hero-actions">
              <button
                onClick={() => onOpenConversation('Selective Educator Cohort')}
                className="rf-btn-primary"
              >
                <span>Apply To Join Next Cohort</span>
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => onOpenConversation('Institutional Partnership')}
                className="rf-btn-secondary"
              >
                <span>Bring ReadFirst to Your Faculty</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE 5-STAGE STRATEGIC SYNTHESIS
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-light">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// PROPOSED STRATEGIC SYNTHESIS</span>
            <h2 className="rf-section-title">
              The Evolution of the <em>Modern Educator.</em>
            </h2>
            <p className="rf-section-lead">
              Professional development too often focuses on tools and compliance. 
              ReadFirst charts an intellectual trajectory from instructional deliverer to culture architect.
            </p>
          </div>

          <div className="rf-synthesis-flow">
            {synthesisStages.map((stage, i) => (
              <div key={stage.role} className="rf-synthesis-step">
                <div className="rf-synthesis-badge">
                  <span className="rf-synthesis-idx">0{i + 1}</span>
                  <h4 className="rf-synthesis-role">{stage.role}</h4>
                </div>
                <p className="rf-synthesis-desc">{stage.desc}</p>
                {i < synthesisStages.length - 1 && (
                  <span className="rf-synthesis-arrow" aria-hidden="true">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE 5-DAY IMMERSION CURRICULUM
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-white">
        <div className="rf-container">
          <div className="rf-section-header">
            <span className="rf-eyebrow">// THE SIGNATURE PROGRAMME</span>
            <h2 className="rf-section-title">
              The 5-Day Faculty <em>Immersion.</em>
            </h2>
            <p className="rf-section-lead">
              An intensive, experiential residency that immerses educators in the discipline of independent inquiry.
            </p>
          </div>

          <div className="rf-immersion-layout">
            {/* Days Navigation Tabs */}
            <div className="rf-day-tabs">
              {immersionDays.map((d, index) => (
                <button
                  key={d.day}
                  className={`rf-day-tab-btn ${selectedDay === index ? 'is-active' : ''}`}
                  onClick={() => setSelectedDay(index)}
                >
                  <span className="rf-day-tab-num">{d.day}</span>
                  <span className="rf-day-tab-title">{d.title}</span>
                </button>
              ))}
            </div>

            {/* Active Day Detail Spotlight */}
            <div className="rf-day-detail-panel">
              <div className="rf-day-header">
                <span className="rf-badge-accent">{immersionDays[selectedDay].day} // FOCUS</span>
                <h3 className="rf-day-headline">{immersionDays[selectedDay].title}</h3>
                <span className="rf-day-focus-sub">{immersionDays[selectedDay].focus}</span>
              </div>
              <p className="rf-day-full-desc">{immersionDays[selectedDay].description}</p>
              
              <div className="rf-day-outcomes-wrap">
                <span className="rf-outcomes-title">Key Methodological Takeaways:</span>
                <ul className="rf-outcomes-list">
                  {immersionDays[selectedDay].outcomes.map((outcome, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="rf-check-icon" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          THE DISCOVERY BOX & LONGITUDINAL TRAJECTORY
          ----------------------------------------------------------- */}
      <section className="rf-editorial-section bg-navy text-white">
        <div className="rf-container">
          <div className="rf-grid-7-5">
            <div>
              <span className="rf-eyebrow-accent">// PHYSICAL INTELLECTUAL ARTIFACTS</span>
              <h2 className="rf-section-title text-white">
                The ReadFirst <em>Discovery Box.</em>
              </h2>
              <p className="rf-section-lead text-white-70">
                Learning is anchored in physical artifacts. Every participant receives a bespoke Discovery Box 
                containing essential primary texts, a field research diary, observational matrices, and inquiry provocations.
              </p>

              <div className="rf-artifacts-grid">
                {discoveryArtifacts.map((art) => (
                  <div key={art.name} className="rf-artifact-item">
                    <h4 className="rf-artifact-name">{art.name}</h4>
                    <p className="rf-artifact-desc">{art.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rf-trajectory-card">
              <span className="rf-eyebrow-accent">// LONGITUDINAL ENGAGEMENT</span>
              <h3 className="rf-trajectory-title">Beyond the 5 Days</h3>
              
              <div className="rf-milestone-step">
                <div className="rf-milestone-time">30 DAYS</div>
                <div className="rf-milestone-body">
                  <h4>Read · Reflect · Record</h4>
                  <p>Daily observation logging in the classroom research diary. Documenting shifts in student questioning patterns.</p>
                </div>
              </div>

              <div className="rf-milestone-step">
                <div className="rf-milestone-time">60 DAYS</div>
                <div className="rf-milestone-body">
                  <h4>Team Research Paper</h4>
                  <p>Collaborative inquiry paper authored by faculty cohorts, examining an empirical question of student autonomy.</p>
                </div>
              </div>

              <div className="rf-milestone-step">
                <div className="rf-milestone-time">ONGOING</div>
                <div className="rf-milestone-body">
                  <h4>Community of Inquiring Educators</h4>
                  <p>Cross-institutional peer seminars, symposium presentations, and contribution to the ReadFirst research repository.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          CLOSING ENQUIRY CTA
          ----------------------------------------------------------- */}
      <section className="rf-closing-invitation">
        <div className="rf-container">
          <div className="rf-closing-box">
            <span className="rf-eyebrow" style={{ color: 'var(--rf-orange)' }}>
              SELECTIVE COHORT IMMERSION · APPLICATION BASIS
            </span>
            <h2 className="rf-closing-title">
              “I would like to be part of this cohort.”
            </h2>
            <p className="rf-closing-lead">
              The Educator Transformation Program is an intentional cohort experience designed for educators who are serious about rethinking how learning happens. If you would like to participate in our next cohort, we welcome your application.
            </p>
            <div className="rf-closing-actions">
              <button
                onClick={() => onOpenConversation('Educator Transformation Program')}
                className="rf-btn-primary"
              >
                <span>Apply For The Next Cohort</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
