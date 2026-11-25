import React, { useEffect } from 'react';
import { profile, projects, experience, education, toolbox, practice } from '../data';
import ProjectVisual from './ProjectVisual';

const bg = (c) => ({ background: `var(--${c})` });
const ext = { target: '_blank', rel: 'noopener noreferrer' };

function Chips({ items }) {
  return <div className="chips">{items.map((t) => <span key={t}>{t}</span>)}</div>;
}

function ProjectCard({ p }) {
  const href = p.caseStudy ? `#/case/${p.caseStudy}` : p.url;
  const Tag = href ? 'a' : 'div';
  const linkProps = p.caseStudy ? { href } : p.url ? { href, ...ext } : {};
  return (
    <Tag className="tile pc" {...linkProps}>
      <div className="vis" style={bg(p.color)}>
        <ProjectVisual project={p} />
      </div>
      <div className="t">
        <div className="top">
          <span className="sticker" style={{ ...bg(p.color), color: p.color === 'b' ? '#fff' : undefined }}>{p.kind}</span>
          {p.caseStudy && <span className="case-cta">How I built it <span className="arrow" aria-hidden="true">→</span></span>}
          {!p.caseStudy && p.url && <span className="arrow" aria-hidden="true">↗</span>}
          {p.private && <span className="private">🔒 private</span>}
        </div>
        <h3>{p.title}</h3>
        <span className="hl">{p.highlight}</span>
        <p>{p.text}</p>
        <Chips items={p.tags} />
        {p.private && <span className="priv-note">🔒 {p.private}</span>}
      </div>
    </Tag>
  );
}

export default function Portfolio() {
  // Coming back from a case study (e.g. #work), jump to that section once the page has rendered.
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrap" id="top">
      <nav className="topnav">
        <b>jingzhe ✦</b>
        <ul>
          <li><a href="#work">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#toolbox">Toolbox</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="btn sm" href="#contact">Get in touch</a>
      </nav>

      <header className="bento">
        <div className="tile intro">
          <span className="mono">hi there <span className="wave" aria-hidden="true">👋</span></span>
          <div>
            <h1>I'm {profile.name}.<br />I build software.</h1>
            <p>{profile.intro}</p>
          </div>
          <div className="cta">
            <a className="btn" href="#work">See projects ↓</a>
            <a className="btn w" href={`mailto:${profile.email}`}>Email me</a>
          </div>
        </div>
        <div className="tile avatar" aria-hidden="true"><div className="face">JZ</div></div>
        <div className="tile now">
          <span className="mono">● right now</span>
          <ul>
            {profile.now.map((n) => <li key={n.role}><b>{n.role}</b><span>{n.org}</span></li>)}
          </ul>
        </div>
        <div className="tile edu-t">
          <div className="badge">GT</div>
          <div>
            <span className="mono">{profile.degree.note}</span>
            <b>{profile.degree.title}</b>
            <span className="mono">{profile.degree.school}</span>
          </div>
        </div>
      </header>

      <main>
        <h2 id="work">Projects <span className="n">{projects.length}</span></h2>
        <div className="proj">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>

        <h2 id="experience">Experience <span className="n">{experience.length} roles</span></h2>
        <div className="xp">
          {experience.map((x) => (
            <div className="tile role" style={bg(x.color)} key={x.title}>
              <span className="when">{x.when}</span>
              <h3>{x.title}</h3>
              <div className="org">{x.org}</div>
              <ul>
                {x.points.map((parts, i) => (
                  // parts alternate plain text and bold text
                  <li key={i}>{parts.map((t, j) => (j % 2 ? <b key={j}>{t}</b> : t))}</li>
                ))}
              </ul>
              <Chips items={x.tags} />
            </div>
          ))}
        </div>

        <h2 id="education">Education <span className="n">MSCS</span></h2>
        <div className="edu">
          <div className="tile deg">
            <div className="badge">GT</div>
            <h3>{education.degree}</h3>
            <span className="sch">{education.school}</span>
            <div className="facts">
              <div><b>{education.gpa}</b><span>GPA / 4.00</span></div>
              <div><b>{education.focus}</b><span>specialization</span></div>
            </div>
          </div>
          <div className="tile">
            <span className="lab">selected coursework</span>
            <div className="cg">
              {education.courses.map(([code, name]) => <div key={code}><i>{code}</i>{name}</div>)}
            </div>
            <span className="lab">certificates</span>
            <div className="certs">
              {education.certificates.map(([name, by]) => <span key={name}>{name} <small>· {by}</small></span>)}
            </div>
          </div>
        </div>

        <h2 id="toolbox">Toolbox <span className="n">what I use, and where</span></h2>
        <div className="tools">
          {toolbox.map((t) => (
            <div className="tile tg" style={bg(t.color)} key={t.group}>
              <h3>{t.group}</h3>
              <div className="ts">{t.items.map((i) => <span key={i}>{i}</span>)}</div>
              <small>{t.used}</small>
            </div>
          ))}
          <div className="tile tg practice">
            <h3>Engineering practice</h3>
            <div className="ts">{practice.map((i) => <span key={i}>{i}</span>)}</div>
          </div>
        </div>
      </main>

      <section className="end" id="contact">
        <div className="tile" style={{ background: 'var(--b)', color: '#fff' }}>
          <span className="mono">say hello</span>
          <h2>Let's build<br />something together.</h2>
          <a className="btn w" href={`mailto:${profile.email}`}>{profile.email} ✉</a>
        </div>
        <div className="tile">
          <span className="mono">find me</span>
          <div className="links">
            <a href={profile.github} {...ext}>GitHub <span>↗</span></a>
            <a href={profile.linkedin} {...ext}>LinkedIn <span>↗</span></a>          </div>
        </div>
      </section>
      <footer><span>© {new Date().getFullYear()} {profile.name}</span><span>made with care ✦</span></footer>
    </div>
  );
}
