// Case study content. Every fact here comes from the project's repository docs
// or from Jingzhe's résumé; do not add numbers that are not backed by one of them.

export const caseStudies = {
  eddy3d: {
    title: 'Eddy3D solver',
    color: 'g',
    kind: 'Performance engineering · open source',
    summary:
      'Eddy3D is a public C#/.NET plugin for Rhino and Grasshopper that runs outdoor climate simulations. I replaced a slow third-party sky-exposure step with my own parallel ray-casting component, proved it matches the reference results, and wrapped it in tests so it stays correct.',
    meta: [
      ['Role', 'Research Assistant, contributor'],
      ['Where', 'Sustainable Urban Systems Lab, Georgia Tech'],
      ['When', 'May 2026 — present'],
      ['Stack', 'C#, .NET, Rhino / Grasshopper SDK, Parallel.For, CI'],
    ],
    links: [['Eddy3D on GitHub', 'https://github.com/Eddy3D-Dev/Eddy3D']],
    metrics: [
      ['90×', 'faster than the third-party solution it replaced'],
      ['< 0.01', 'MAE against reference simulations (0–1 scale)'],
      ['0.9998', 'Pearson r against reference simulations'],
      ['62', 'unit and regression tests in CI'],
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Sky exposure (the sky view factor) measures how much of the sky each point on a site can see, and it is computed over many points at once. In Eddy3D this step relied on a third-party solution, and it was slow.',
          'The codebase is large and was written mostly by other engineers, and every change is public: it goes through code review and has to pass CI builds and tests on Windows and macOS before it merges.',
        ],
      },
      {
        heading: 'How it works',
        diagram: 'skyExposure',
        body: [
          'For every analysis point, the component casts 145 rays toward the upper hemisphere, one per patch of the Tregenza sky subdivision, and records the fraction that reach the sky without hitting geometry. Points are independent, so the work is spread across all CPU cores with Parallel.For.',
          'The component is self-contained: it uses Rhino geometry for the intersection tests directly instead of calling out to the third-party solution.',
        ],
      },
      {
        heading: 'What I built',
        bullets: [
          'The Sky Exposure component: Tregenza-based ray casting, parallelised with Parallel.For, merged into Eddy3D through public code review (PR #587).',
          'A surface-temperature solver using a frequency-domain admittance method, with a material picker and Grasshopper components.',
          'An Outdoor Solar MRT component, EPW-driven UTCI, and vegetation evaporative cooling for outdoor thermal comfort.',
        ],
      },
      {
        heading: 'Proving it is correct',
        body: [
          'A faster result is only useful if it is the same result. I designed the validation: run the new component and the reference simulations on the same scenes and compare point by point. The new component agrees with the reference to a mean absolute error below 0.01 on the 0–1 scale, with a Pearson correlation of 0.9998.',
        ],
        bullets: [
          'Unit tests cover convergence, edge cases and degenerate input.',
          'Regression tests are pinned to reference output, so any change that silently shifts the numbers fails the build instead of reaching users.',
          'All of it runs in CI on every pull request.',
        ],
      },
    ],
  },

  instantsim: {
    title: 'InstantSim',
    color: 'y',
    kind: 'ML + full-stack · solo',
    summary:
      'Sunlight analysis normally means running a physics simulation that takes minutes or longer, too slow to use while a design is still changing. InstantSim replaces the simulation with a trained model and serves the result to a 3D dashboard in about 100 ms.',
    meta: [
      ['Role', 'Sole developer: data, model, backend and frontend'],
      ['Stack', 'PyTorch, FastAPI, WebSocket, Three.js, OpenCV, Docker'],
      ['Data', '4,000 training and 200 held-out test scenes'],
    ],
    links: [
      ['Code on GitHub', 'https://github.com/JingzheZhao/InstantSim'],
      ['Watch the demo', 'https://www.youtube.com/watch?v=3uCVHuaowtU&t=8s'],
    ],
    image: '/assets/portfolio-img1.png',
    metrics: [
      ['~100 ms', 'from height map to sun-hours map'],
      ['90.8%', 'of pixels within ±1 hour of ground truth'],
      ['0.56 h', 'mean absolute error (baseline: 2.18 h)'],
      ['53.6%', 'within ±1 hour for the no-shadow baseline'],
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Tools like Ladybug and EnergyPlus are accurate, but a single sunlight analysis can take minutes to hours. When a model changes every few seconds, that delay means people stop checking. The goal was feedback fast enough to keep up with the edits.',
        ],
      },
      {
        heading: 'Architecture',
        diagram: 'instantsim',
        body: [
          'Three decoupled layers. A Rhino/Grasshopper client captures the scene as a 512×512 height map and posts it to the backend. A FastAPI service loads the model once at startup, runs inference, computes statistics and broadcasts the result over WebSocket. A Three.js dashboard renders the geometry with the prediction as a texture and lets the user change location and date.',
          'The backend caches the last height map and the current sun vectors and only re-runs inference when one of them changes, so moving the date slider does not re-send the image.',
        ],
      },
      {
        heading: 'The model',
        bullets: [
          'A conditional U-Net with FiLM. The input is the height map plus a 36-number sun vector: nine hourly sun positions from 9:00 to 17:00 and their daylight flags.',
          'A shared MLP embeds each sun position; the embeddings are masked by the daylight flags and fused into a 128-d vector that conditions 13 encoder and decoder blocks.',
          'Trained with a least-squares GAN loss plus 50× L1 on 4,000 generated scenes whose labels are Ladybug direct sun hours.',
        ],
      },
      {
        heading: 'Engineering decisions and bugs fixed',
        bullets: [
          'Colour remapping in CIE Lab: the model outputs continuous colours, so each pixel snaps to the nearest legend colour in Lab space, which tracks perceived difference better than RGB. The same index gives its sun-hour value for statistics.',
          'A valid-pixel mask with 1 px erosion keeps the background and anti-aliased edges out of the statistics; nearest-neighbour upscaling keeps hard class boundaries in the browser.',
          'Fixed a training-versus-inference input-masking mismatch, and added tests so it cannot return.',
          'Found that an earlier 9-colour palette was missing the 5-hour class and biasing the statistics; replaced it with a 10-colour legend measured from the ground-truth images.',
          'Converted between Rhino (Z-up) and Three.js (Y-up) and flipped the texture V axis so the analysis lines up with the geometry.',
        ],
      },
      {
        heading: 'Evaluation',
        body: [
          'On 200 held-out scenes the model gets 59.3% of pixels to the exact hour and 90.8% within one hour, with a mean absolute error of 0.56 h. A no-shadow baseline reaches 53.6% within one hour and an error of 2.18 h.',
          'The errors are not uniform, and the evaluation breaks them down: accuracy is 49% exact near class boundaries against 91% inside uniform regions, and high-rise scenes have a higher error (0.73 h) than low-rise ones (0.40 h).',
        ],
      },
      {
        heading: 'Known limits and next steps',
        bullets: [
          'The height map comes from a screen capture, so display lighting and anti-aliasing can shift grey values, heights above 250 m are clipped, and the model is not told the pixel size.',
          'A downward ray cast that writes heights as numbers at a fixed metres-per-pixel would remove all three problems.',
        ],
      },
    ],
  },
};
