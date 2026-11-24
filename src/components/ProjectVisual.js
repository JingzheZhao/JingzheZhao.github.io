import React from 'react';

// Small illustrations for projects that have no screenshot yet.
// Each one is drawn from the project's real numbers.

function Bars() {
  return (
    <div className="v-bars">
      <div className="bar">previous third-party solver<div style={{ background: '#fff', width: '100%' }}>1× runtime</div></div>
      <div className="bar">my parallel C# solver<div style={{ background: 'var(--y)', width: '16%', minWidth: 96 }}>1/90</div></div>
      <div className="mono">MAE &lt; 0.01 · r = 0.9998 · 62 tests green</div>
    </div>
  );
}

function Sql() {
  return (
    <div className="v-code">
      <span className="k">SELECT</span> user_id, course_id,<br />
      &nbsp;&nbsp;COUNT(*) <span className="k">AS</span> plays<br />
      <span className="k">FROM</span> events.video_play<br />
      <span className="k">WHERE</span> course_id = 'CS6750'<br />
      <span className="k">GROUP BY</span> 1, 2;<br />
      <span className="ok">✓ validated · preview 50 rows</span>
    </div>
  );
}

function Chart() {
  return (
    <svg viewBox="0 0 420 220" width="88%" height="88%" role="img" aria-label="Returns: hand-picked list 12.1% a year versus point-in-time list 7.6% a year">
      <rect x="2" y="2" width="416" height="216" rx="16" fill="#fff" stroke="#1d1b26" strokeWidth="2" />
      <path d="M30 185 C100 175 150 140 210 120 S320 70 390 40" fill="none" stroke="#ff8a4c" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 185 C100 180 150 168 210 155 S320 130 390 112" fill="none" stroke="#5b7cff" strokeWidth="5" strokeLinecap="round" />
      <text x="250" y="58" fontFamily="DM Mono" fontSize="12" fill="#c75a22">hand-picked 12.1%/yr</text>
      <text x="250" y="160" fontFamily="DM Mono" fontSize="12" fill="#3a57e0">point-in-time 7.6%/yr</text>
      <text x="30" y="46" fontFamily="Bricolage Grotesque" fontWeight="800" fontSize="26" fill="#1d1b26">−4.5%/yr</text>
    </svg>
  );
}

function Chat() {
  return (
    <div className="v-chat">
      <span className="mono" style={{ color: '#fff' }}>example conversation</span>
      <div className="msg"><div className="av">Q</div><div className="bub">Where's the onboarding checklist?</div></div>
      <div className="msg r">
        <div className="av" style={{ background: 'var(--y)' }}>AI</div>
        <div className="bub">Employee handbook, section 3.
          <div className="src"><span>📄 Handbook.pdf · p.12</span><span>📄 IT Setup.docx</span></div>
        </div>
      </div>
    </div>
  );
}

const tables = [
  ['vehicle', 'vin PK', 'status'],
  ['purchase_order', 'po_id PK', 'vin FK'],
  ['part_order', 'part_id PK', 'vin FK'],
  ['customer', 'customer_id PK', 'name'],
  ['sale', 'sale_id PK', 'vin FK'],
  ['user_role', 'user_id PK', 'role'],
];

function Schema() {
  return (
    <div className="v-schema">
      {tables.map(([name, ...cols]) => (
        <div key={name}><b>{name}</b>{cols.map((c) => <span key={c}>{c}</span>)}</div>
      ))}
    </div>
  );
}

function Flow() {
  return (
    <div className="v-flow">
      <div className="nd"><b>3D model</b><span>C# plugin</span></div><span className="aw">→</span>
      <div className="nd"><b>localhost</b><span>HTTP server</span></div><span className="aw">→</span>
      <div className="nd"><b>three.js</b><span>carbon + cost</span></div>
    </div>
  );
}

const visuals = { bars: Bars, sql: Sql, chart: Chart, chat: Chat, schema: Schema, flow: Flow };

export default function ProjectVisual({ project }) {
  if (project.visual === 'image') {
    return <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />;
  }
  const Visual = visuals[project.visual];
  return Visual ? <Visual /> : null;
}
