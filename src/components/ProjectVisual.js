import React from 'react';

// One illustration per project, all drawn in the same style: a white "window"
// with a thick outline and offset shadow, sitting on the card's colour.
// Nothing here is a screenshot; each drawing shows the idea behind the project.

const INK = '#1d1b26';
const C = { y: '#ffd84d', b: '#5b7cff', p: '#ff8fb8', g: '#59d6a2', o: '#ff8a4c', l: '#e9e4f7' };
const mono = { fontFamily: 'DM Mono, monospace' };

function Win({ title, children }) {
  return (
    <div className="win">
      <div className="win-bar">
        <i /><i /><i />
        <span>{title}</span>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}

function Chip({ x, y, text, fill = C.y, color = INK, w }) {
  const width = w || text.length * 7.2 + 18;
  return (
    <g>
      <rect x={x} y={y} width={width} height="22" rx="11" fill={fill} stroke={INK} strokeWidth="2" />
      <text x={x + width / 2} y={y + 15} textAnchor="middle" fontSize="11" fill={color} style={mono}>{text}</text>
    </g>
  );
}

/* Eddy3D: rays from one point to the sky, some blocked by buildings */
function Eddy3D() {
  const ox = 180, oy = 150, R = 118;
  const boxes = [[38, 72, 48, 78, C.l], [112, 108, 30, 42, C.o], [258, 52, 58, 98, C.p]];
  const hit = (dx, dy) => {
    let best = 1;
    boxes.forEach(([x, y, w, h]) => {
      [[x, y, x + w, y], [x, y, x, y + h], [x + w, y, x + w, y + h]].forEach(([x1, y1, x2, y2]) => {
        const den = dx * (y2 - y1) - dy * (x2 - x1);
        if (!den) return;
        const t = ((x1 - ox) * (y2 - y1) - (y1 - oy) * (x2 - x1)) / den;
        const u = ((x1 - ox) * dy - (y1 - oy) * dx) / den;
        if (t > 0 && t < best && u >= 0 && u <= 1) best = t;
      });
    });
    return best;
  };
  const rays = [];
  for (let a = 12; a <= 168; a += 12) {
    const r = (a * Math.PI) / 180;
    const dx = Math.cos(r) * R, dy = -Math.sin(r) * R;
    const t = hit(dx, dy);
    rays.push({ x: ox + dx * t, y: oy + dy * t, blocked: t < 1 });
  }
  return (
    <Win title="eddy3d — sky exposure">
      <svg viewBox="0 0 360 170" role="img" aria-label="Rays cast from a point toward the sky, some blocked by buildings">
        <path d={`M${ox - R} ${oy} A${R} ${R} 0 0 1 ${ox + R} ${oy}`} fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="4 5" />
        {rays.map((r, i) => (
          <line key={i} x1={ox} y1={oy} x2={r.x} y2={r.y} stroke={r.blocked ? C.o : C.b} strokeWidth="2.5" strokeLinecap="round" />
        ))}
        {boxes.map(([x, y, w, h, f], i) => <rect key={i} x={x} y={y} width={w} height={h} fill={f} stroke={INK} strokeWidth="2" />)}
        <line x1="10" y1={oy} x2="350" y2={oy} stroke={INK} strokeWidth="2.5" />
        <circle cx={ox} cy={oy} r="6" fill={C.y} stroke={INK} strokeWidth="2" />
        <Chip x={10} y={8} text="145 rays / point" />
        <Chip x={262} y={8} text="90× faster" fill={INK} color="#fff" />
      </svg>
    </Win>
  );
}

/* InstantSim: height map in, sun-hours map out */
function InstantSim() {
  const n = 7, s = 17;
  const tall = new Set(['1,1', '1,2', '2,1', '4,3', '4,4', '5,4', '2,5', '5,1']);
  const ramp = ['#3d5a9e', '#5b9ff0', '#85d1ff', '#e6f59a', '#ffcc00', '#ff8800'];
  const cells = [];
  for (let r = 0; r < n; r += 1) for (let c = 0; c < n; c += 1) cells.push([r, c]);
  const sun = (r, c) => {
    if (tall.has(`${r},${c}`)) return null;
    let shade = 0;
    tall.forEach((k) => { const [tr, tc] = k.split(',').map(Number); const d = Math.abs(tr - r) + Math.abs(tc - c); if (d <= 2 && tr <= r) shade += 3 - d; });
    return ramp[Math.max(0, 5 - shade)];
  };
  return (
    <Win title="instantsim — sun hours">
      <svg viewBox="0 0 360 170" role="img" aria-label="A height map goes into a model and comes out as a sun-hours map">
        <g transform="translate(18 26)">
          {cells.map(([r, c]) => <rect key={`h${r}${c}`} x={c * s} y={r * s} width={s} height={s} fill={tall.has(`${r},${c}`) ? '#4a4858' : '#e8e6ef'} stroke="#fff" />)}
          <rect width={n * s} height={n * s} fill="none" stroke={INK} strokeWidth="2" />
          <text x={(n * s) / 2} y={n * s + 16} textAnchor="middle" fontSize="11" style={mono} fill={INK}>height map</text>
        </g>
        <g transform="translate(140 66)">
          <rect width="80" height="40" rx="12" fill={C.y} stroke={INK} strokeWidth="2" />
          <text x="40" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill={INK}>U-Net</text>
          <text x="40" y="32" textAnchor="middle" fontSize="10" style={mono} fill={INK}>~100 ms</text>
          <path d="M-12 20 h8 M88 20 h8" stroke={INK} strokeWidth="2.5" />
          <path d="M92 14 l6 6 -6 6" fill="none" stroke={INK} strokeWidth="2.5" />
        </g>
        <g transform="translate(223 26)">
          {cells.map(([r, c]) => <rect key={`s${r}${c}`} x={c * s} y={r * s} width={s} height={s} fill={sun(r, c) || '#4a4858'} stroke="#fff" />)}
          <rect width={n * s} height={n * s} fill="none" stroke={INK} strokeWidth="2" />
          <text x={(n * s) / 2} y={n * s + 16} textAnchor="middle" fontSize="11" style={mono} fill={INK}>sun hours</text>
        </g>
      </svg>
    </Win>
  );
}

/* EDAT: pick fields on the left, get SQL on the right */
function Edat() {
  const fields = [['user_id', 1], ['course_id', 1], ['session', 0], ['event_time', 1]];
  return (
    <Win title="edat — data explorer">
      <div className="v-edat">
        <ul>
          {fields.map(([f, on]) => <li key={f} className={on ? 'on' : ''}><i>{on ? '✓' : ''}</i>{f}</li>)}
        </ul>
        <pre><b>SELECT</b> user_id,{'\n'}  course_id,{'\n'}  COUNT(*) <b>AS</b> plays{'\n'}<b>FROM</b> video_play{'\n'}<b>GROUP BY</b> 1, 2;{'\n'}<em>✓ validated</em></pre>
      </div>
    </Win>
  );
}

/* StockPilot: same rules, two universes, two curves */
function StockPilot() {
  return (
    <Win title="stockpilot — backtest">
      <svg viewBox="0 0 360 170" role="img" aria-label="Returns: hand-picked list 12.1% a year versus point-in-time list 7.6% a year">
        {[40, 80, 120].map((y) => <line key={y} x1="20" y1={y} x2="345" y2={y} stroke="#e6e3ef" strokeWidth="1.5" />)}
        <path d="M20 150 C90 140 140 108 200 88 S300 40 345 24" fill="none" stroke={C.o} strokeWidth="5" strokeLinecap="round" />
        <path d="M20 150 C90 145 140 134 200 122 S300 100 345 86" fill="none" stroke={C.b} strokeWidth="5" strokeLinecap="round" />
        <line x1="345" y1="28" x2="345" y2="82" stroke={INK} strokeWidth="2" strokeDasharray="4 4" />
        <text x="210" y="54" fontSize="11" style={mono} fill="#c75a22">hand-picked 12.1%/yr</text>
        <text x="200" y="146" fontSize="11" style={mono} fill="#3a57e0">point-in-time 7.6%/yr</text>
        <Chip x={20} y={10} text="−4.5%/yr hidden bias" />
      </svg>
    </Win>
  );
}

/* Studio AI assistant: a chat answer that cites its sources */
function Assistant() {
  return (
    <Win title="#ask-the-studio">
      <div className="v-chat">
        <div className="msg"><div className="av">Q</div><div className="bub">Where's the onboarding checklist?</div></div>
        <div className="msg r">
          <div className="av" style={{ background: C.y }}>AI</div>
          <div className="bub">Employee handbook, section 3.
            <div className="src"><span>📄 Handbook.pdf · p.12</span><span>📄 IT Setup.docx</span></div>
          </div>
        </div>
        <span className="mono v-note">example conversation</span>
      </div>
    </Win>
  );
}

/* North Avenue Automotive: tables and the keys that link them */
function NorthAve() {
  const t = [
    [16, 8, 'vehicle', ['vin PK', 'status']],
    [132, 8, 'purchase_order', ['po_id PK', 'vin FK']],
    [248, 8, 'part_order', ['part_id PK', 'vin FK']],
    [16, 88, 'customer', ['cust_id PK', 'name']],
    [132, 88, 'sale', ['sale_id PK', 'vin FK']],
    [248, 88, 'user_role', ['user_id PK', 'role']],
  ];
  return (
    <Win title="north-ave — mysql schema">
      <svg viewBox="0 0 360 170" role="img" aria-label="Six database tables linked by foreign keys">
        <path d="M112 30 H132 M228 30 H248 M64 62 V88 M112 110 H132 M180 62 V88" stroke={INK} strokeWidth="2" strokeDasharray="4 3" fill="none" />
        {t.map(([x, y, name, cols]) => (
          <g key={name} transform={`translate(${x} ${y})`}>
            <rect width="96" height="54" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            <path d="M0 8 a8 8 0 0 1 8 -8 h80 a8 8 0 0 1 8 8 v12 h-96 z" fill={INK} />
            <text x="8" y="14" fontSize="10" style={mono} fill={C.y}>{name}</text>
            {cols.map((c, i) => <text key={c} x="8" y={34 + i * 15} fontSize="10" style={mono} fill={INK}>{c}</text>)}
          </g>
        ))}
        <Chip x={268} y={147} text="+8 tables" fill={C.p} w={78} />
      </svg>
    </Win>
  );
}

/* Carbon Tools: model groups coloured by material, totals on the side */
function CarbonTools() {
  const iso = (x, y, w, d, h, fill) => {
    const top = `${x},${y} ${x + w},${y - w / 2} ${x + w + d},${y - w / 2 + d / 2} ${x + d},${y + d / 2}`;
    const left = `${x},${y} ${x + d},${y + d / 2} ${x + d},${y + d / 2 + h} ${x},${y + h}`;
    const right = `${x + d},${y + d / 2} ${x + w + d},${y - w / 2 + d / 2} ${x + w + d},${y - w / 2 + d / 2 + h} ${x + d},${y + d / 2 + h}`;
    return (
      <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
        <polygon points={left} fill={fill} />
        <polygon points={right} fill={fill} opacity=".8" />
        <polygon points={top} fill="#fff" />
      </g>
    );
  };
  const rows = [['concrete', C.o, 78], ['timber', C.g, 42], ['steel', C.b, 60]];
  return (
    <Win title="carbon-tools — localhost">
      <svg viewBox="0 0 360 170" role="img" aria-label="A 3D model coloured by material with carbon and cost totals">
        {iso(30, 110, 60, 40, 30, C.o)}
        {iso(92, 82, 44, 30, 52, C.b)}
        {iso(66, 140, 70, 28, 14, C.g)}
        <g transform="translate(200 30)">
          <text fontSize="11" style={mono} fill={INK}>embodied carbon</text>
          {rows.map(([name, fill, w], i) => (
            <g key={name} transform={`translate(0 ${16 + i * 30})`}>
              <rect width={w + 40} height="18" rx="9" fill={fill} stroke={INK} strokeWidth="2" />
              <text x="9" y="13" fontSize="10" style={mono} fill={INK}>{name}</text>
            </g>
          ))}
          <text y="122" fontSize="10.5" style={mono} fill={INK}>model never leaves</text>
          <text y="136" fontSize="10.5" style={mono} fill={INK}>your machine ✓</text>
        </g>
      </svg>
    </Win>
  );
}

/* Game AI: an agent finding its way around walls with A* */
function GameAI() {
  const s = 20, cols = 15, rows = 7;
  const walls = new Set(['3,1', '3,2', '3,3', '3,4', '7,2', '7,3', '7,4', '7,5', '7,6', '11,0', '11,1', '11,2', '11,3']);
  const path = [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [9, 2], [9, 3], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [13, 3], [13, 2], [13, 1]];
  const pts = path.map(([c, r]) => `${c * s + s / 2},${r * s + s / 2}`).join(' ');
  return (
    <Win title="unity — a* pathfinding">
      <svg viewBox="0 0 360 170" role="img" aria-label="A grid where an agent follows an A* path around walls to a goal">
        <g transform="translate(30 14)">
          {Array.from({ length: rows }).map((_, r) => Array.from({ length: cols }).map((__, c) => (
            <rect key={`${c},${r}`} x={c * s} y={r * s} width={s} height={s} fill={walls.has(`${c},${r}`) ? INK : '#f3f1f8'} stroke="#fff" />
          )))}
          <polyline points={pts} fill="none" stroke={C.b} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={1 * s + s / 2} cy={5 * s + s / 2} r="8" fill={C.y} stroke={INK} strokeWidth="2" />
          <path d="M270 22 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1 z" transform="translate(-4 -2)" fill={C.p} stroke={INK} strokeWidth="2" />
          <rect width={cols * s} height={rows * s} fill="none" stroke={INK} strokeWidth="2" />
        </g>
      </svg>
    </Win>
  );
}

const visuals = {
  eddy3d: Eddy3D,
  instantsim: InstantSim,
  edat: Edat,
  stockpilot: StockPilot,
  assistant: Assistant,
  northave: NorthAve,
  carbon: CarbonTools,
  gameai: GameAI,
};

export default function ProjectVisual({ project }) {
  const Visual = visuals[project.visual];
  return Visual ? <Visual /> : null;
}
