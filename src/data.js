// All site copy lives here. Edit text, links and projects in this file only.

const asset = (path) => `${process.env.PUBLIC_URL}${path}`;

export const profile = {
  name: 'Jingzhe Zhao',
  email: 'jzhao602@gatech.edu',
  resume: asset('/resume.pdf'),
  github: 'https://github.com/JingzheZhao',
  linkedin: 'https://www.linkedin.com/in/jingzhezhao',
  intro:
    'Software engineer who takes slow, messy problems (simulations, data pipelines, research tools) and ships them fast, tested and easy to use, across backend, data, ML and web.',
  now: {
    title: 'Research Assistant',
    text: 'making an open-source simulation tool faster, Georgia Tech',
  },
  degree: {
    note: 'graduated Aug 2026',
    title: 'MS Computer Science',
    school: 'Georgia Institute of Technology · GPA 3.90',
  },
};

// `visual` picks one of the illustrations in components/ProjectVisual.js,
// or shows `image` when visual is 'image'.
export const projects = [
  {
    title: 'InstantSim',
    kind: 'ML + full-stack',
    color: 'y',
    highlight: 'minutes → milliseconds',
    text: 'Real-time sunlight analysis. A PyTorch model behind a FastAPI service streams predictions over WebSocket to a Three.js client. 90.8% of pixels within an hour of ground truth on 200 held-out scenes, against 53.6% for the baseline.',
    tags: ['PyTorch', 'FastAPI', 'WebSocket', 'Three.js', 'Docker'],
    url: 'https://github.com/JingzheZhao/InstantSim',
    visual: 'image',
    image: asset('/assets/portfolio-img1.png'),
  },
  {
    title: 'Eddy3D solver',
    kind: 'performance · open source',
    color: 'g',
    highlight: '90× faster',
    text: 'The sky-exposure step was the bottleneck in an open-source climate simulation tool. I rewrote it as parallel C#, validated it against reference simulations, and locked it down with 62 unit and regression tests in CI.',
    tags: ['C#', '.NET', 'Parallel.For', 'CI'],
    url: 'https://github.com/Eddy3D-Dev/Eddy3D',
    visual: 'bars',
  },
  {
    title: 'EDAT',
    kind: 'full-stack data · team',
    color: 'o',
    highlight: '10M+ records',
    text: 'Education researchers had to write raw Spark to explore clickstream data. EDAT gives them a schema browser and filters that turn selections into editable SQL / PySpark, validated by a FastAPI backend before it runs.',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'PySpark'],
    visual: 'sql',
  },
  {
    title: 'StockPilot',
    kind: 'backend + research',
    color: 'l',
    highlight: 'found a 4.5%/yr hidden bias',
    text: 'A backtest engine built to avoid look-ahead and survivorship bias, pre-registered experiments, and a daily cloud paper-trading agent you can query over MCP.',
    tags: ['Python', 'pandas', 'pytest', 'GitHub Actions', 'MCP'],
    url: 'https://github.com/JingzheZhao/StockPilot',
    visual: 'chart',
  },
  {
    title: 'Studio AI assistant',
    kind: 'LLM app · shipped',
    color: 'b',
    highlight: '30 daily users',
    text: 'A Slack assistant that answers questions from company documents and cites its sources. Built on retrieval-augmented generation, with an Azure Functions pipeline that pulls SharePoint through the Microsoft Graph API.',
    tags: ['LLM / RAG', 'Dify', 'OpenAI', 'Azure Functions'],
    visual: 'chat',
  },
  {
    title: 'North Avenue Automotive',
    kind: 'full-stack web · team',
    color: 'p',
    highlight: '14 tables · JWT · RBAC',
    text: 'A dealership management system that follows a vehicle from purchase order through parts repair to sale. I worked mainly on the Vue 3 frontend and contributed to the TypeScript REST API and MySQL schema.',
    tags: ['Vue 3', 'TypeScript', 'Hono', 'MySQL', 'Docker'],
    url: 'https://github.com/JingzheZhao/north-avenue-automotive',
    visual: 'schema',
  },
  {
    title: 'Sitewise',
    kind: 'desktop + web · solo',
    color: 'y',
    highlight: 'local-first, no upload',
    text: "An open-source carbon and cost calculator. A C# plugin runs a small local server and streams the 3D model to a three.js viewer, where each colour group maps to a material. The model never leaves the user's machine.",
    tags: ['C#/.NET', 'JavaScript', 'three.js', 'REST'],
    url: 'https://github.com/JingzheZhao/carbon-tools',
    visual: 'flow',
  },
  {
    title: 'Game AI in Unity',
    kind: 'game AI · coursework',
    color: 'g',
    highlight: 'A* · navmesh · FSM · fuzzy logic',
    text: 'Game AI systems in C#: A* pathfinding, navigation mesh generation, finite-state-machine agents with projectile targeting, and fuzzy-logic steering for an autonomous racer.',
    tags: ['C#', 'Unity', 'Pathfinding', 'FSM'],
    visual: 'image',
    image: asset('/assets/portfolio-img2.png'),
  },
];

export const experience = [
  {
    when: 'May 2026 — present',
    title: 'Research Assistant, Software Development',
    org: 'Sustainable Urban Systems Lab, Georgia Tech · Remote',
    color: 'g',
    points: [
      ['Reimplemented the sky-exposure solver of open-source ', 'Eddy3D', ' in parallel C#: ', '90× faster', ' than the third-party solution it replaced.'],
      ['Validated against reference simulations: ', 'MAE < 0.01, Pearson r = 0.9998', '.'],
      ['Built surface-temperature and thermal-comfort components; added ', '62 unit and regression tests', ' in CI.'],
    ],
    tags: ['C#', '.NET', 'Testing', 'CI', 'Open source'],
  },
  {
    when: 'Oct 2024 — present',
    title: 'Computational R&D',
    org: 'Janet Rosenberg & Studio · Toronto',
    color: 'p',
    points: [
      ['Designed and deployed a ', 'RAG assistant in Slack', ' used across the ', '30-person studio', ', with answers that cite source documents.'],
      ['Built the ingestion service on ', 'Azure Functions', ', pulling SharePoint through the ', 'Microsoft Graph API', ' into the knowledge base.'],
    ],
    tags: ['LLM / RAG', 'Dify', 'OpenAI', 'Azure Functions', 'Graph API'],
  },
];

export const education = {
  degree: 'Master of Science in Computer Science',
  school: 'Georgia Institute of Technology · Aug 2024 — Aug 2026',
  gpa: '3.90',
  focus: 'AI',
  courses: [
    ['CS 6601', 'Artificial Intelligence'],
    ['CS 7637', 'Knowledge-Based AI'],
    ['CS 7632', 'Game AI'],
    ['CS 6603', 'AI, Ethics and Society'],
    ['CS 6300', 'Software Development Process'],
    ['CS 6400', 'Database Systems'],
    ['CS 6750', 'Human-Computer Interaction'],
    ['INTA 6450', 'Data Analytics and Security'],
    ['CS 8903', 'Special Problems (research)'],
  ],
  certificates: [
    ['Programming in Python', 'Meta'],
    ['Intro to Front-End Development', 'Meta'],
    ['Math for ML: Linear Algebra', 'Imperial'],
    ['Probability and Data with R', 'Duke'],
  ],
};

export const toolbox = [
  { group: 'Languages', color: 'y', items: ['Python', 'TypeScript', 'C#', 'JavaScript', 'SQL', 'Java'], used: 'InstantSim, StockPilot, EDAT, Eddy3D, Sitewise' },
  { group: 'Web and backend', color: 'g', items: ['React', 'Vue 3', 'Three.js', 'FastAPI', '.NET', 'Hono', 'REST', 'WebSocket'], used: 'EDAT, InstantSim, North Avenue Automotive' },
  { group: 'Data and cloud', color: 'o', items: ['PostgreSQL', 'MySQL', 'PySpark', 'pandas', 'Azure', 'Docker'], used: 'EDAT, StockPilot, Studio assistant' },
  { group: 'AI and ML', color: 'l', items: ['PyTorch', 'scikit-learn', 'OpenCV', 'RAG / LLMs', 'Dify', 'MCP'], used: 'InstantSim, Studio assistant, StockPilot' },
];

export const practice = ['pytest', 'JUnit', 'Regression tests', 'GitHub Actions CI/CD', 'Code review', 'Agile / Scrum', 'Claude Code'];
