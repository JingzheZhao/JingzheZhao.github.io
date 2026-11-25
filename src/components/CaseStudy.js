import React, { useEffect } from 'react';
import { caseStudies } from '../caseStudies';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

function SkyExposureDiagram() {
  const steps = [
    ['Analysis points', 'from the site geometry'],
    ['145 rays per point', 'one per Tregenza sky patch'],
    ['Parallel ray casting', 'Parallel.For across cores'],
    ['Sky view factor', 'fraction of rays that reach the sky, 0–1'],
  ];
  return <Pipeline steps={steps} />;
}

function InstantSimDiagram() {
  const steps = [
    ['Rhino / Grasshopper', '512×512 height map · HTTP POST'],
    ['FastAPI + PyTorch', 'inference, Lab colour remap, statistics'],
    ['WebSocket broadcast', 'texture, mask and stats to every client'],
    ['Three.js dashboard', '3D scene, sun controls, stats panel'],
  ];
  return <Pipeline steps={steps} />;
}

function Pipeline({ steps }) {
  return (
    <div className="pipe">
      {steps.map(([title, sub], i) => (
        <React.Fragment key={title}>
          {i > 0 && <span className="pipe-arrow" aria-hidden="true">→</span>}
          <div className="pipe-step"><b>{title}</b><span>{sub}</span></div>
        </React.Fragment>
      ))}
    </div>
  );
}

const diagrams = { skyExposure: SkyExposureDiagram, instantsim: InstantSimDiagram };

export default function CaseStudy({ id }) {
  const cs = caseStudies[id];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cs) document.title = `${cs.title} — Jingzhe Zhao`;
    return () => { document.title = 'Jingzhe Zhao — Software Engineer'; };
  }, [cs]);

  if (!cs) {
    return (
      <div className="wrap case">
        <a className="btn w" href="#work">← Back to projects</a>
        <h1 className="case-title">Case study not found</h1>
      </div>
    );
  }

  return (
    <div className="wrap case">
      <nav className="topnav">
        <a href="#top"><b>jingzhe ✦</b></a>
        <a className="btn sm" href="#work">← All projects</a>
      </nav>

      <header className="tile case-hero" style={{ background: `var(--${cs.color})` }}>
        <span className="sticker">{cs.kind}</span>
        <h1 className="case-title">{cs.title}</h1>
        <p className="case-summary">{cs.summary}</p>
        <div className="case-links">
          {cs.links.map(([label, url]) => <a key={url} className="btn" href={url} {...ext}>{label} ↗</a>)}
        </div>
      </header>

      <div className="case-meta">
        {cs.meta.map(([k, v]) => <div key={k} className="tile"><span className="mono">{k}</span><b>{v}</b></div>)}
      </div>

      <div className="case-metrics">
        {cs.metrics.map(([v, label]) => <div key={label} className="tile"><b>{v}</b><span>{label}</span></div>)}
      </div>

      {cs.image && (
        <div className="tile case-image"><img src={`${process.env.PUBLIC_URL}${cs.image}`} alt={`${cs.title} screenshot`} /></div>
      )}

      {cs.sections.map((s) => {
        const Diagram = s.diagram && diagrams[s.diagram];
        return (
          <section key={s.heading} className="case-sec">
            <h2>{s.heading}</h2>
            <div className="case-body">
              {Diagram && <Diagram />}
              {s.body && s.body.map((p, i) => <p key={i}>{p}</p>)}
              {s.bullets && <ul>{s.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
            </div>
          </section>
        );
      })}

      <div className="case-end">
        <a className="btn" href="#work">← Back to all projects</a>
        {cs.links.slice(0, 1).map(([label, url]) => <a key={url} className="btn w" href={url} {...ext}>{label} ↗</a>)}
      </div>
    </div>
  );
}
