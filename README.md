<div align="center">

# ✦ Personal Portfolio — JingzheZhao.github.io

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.x-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-181717?style=flat-square&logo=github)](https://JingzheZhao.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**A high-performance, animation-rich personal portfolio built from scratch with React 18 and Tailwind CSS.**  
Featuring a custom 3D tag-sphere rendered via raw Canvas math, scroll-driven entrance animations,  
and a GPU-accelerated deep-ocean visual theme — deployed as a static site on GitHub Pages.

[**Live Demo →**](https://JingzheZhao.github.io)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Design System](#design-system)

---

## Overview

This portfolio is a single-page React application designed to communicate both technical depth and design sensibility. Every component is purpose-built — no UI kit, no template. Key engineering decisions include:

- **Zero runtime backend.** All content is statically compiled. The contact form is intentionally left as a composable UI primitive, ready for serverless function integration (e.g., Resend, Formspree).
- **Custom 3D animation engine.** Instead of pulling in Three.js for a tag cloud, the `Banner` component implements its own perspective projection, Fibonacci sphere point distribution, and a `requestAnimationFrame` render loop — keeping the bundle lean while retaining full interactive control.
- **Intersection Observer-driven animations.** Framer Motion variants are gated by viewport entry via `react-intersection-observer`, so sections animate on both scroll-down and scroll-up without performance cost.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        React SPA (CRA)                        │
│                                                              │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Header  │  │    Banner    │  │  About   │  │  Work   │ │
│  │  (fixed) │  │  Hero section│  │ Timeline │  │ Carousel│ │
│  │          │  │ + 3D Sphere  │  │          │  │  (3D)   │ │
│  └──────────┘  └──────────────┘  └──────────┘  └─────────┘ │
│                                                              │
│  ┌──────────┐  ┌──────────────┐                             │
│  │ Contact  │  │     Nav      │                             │
│  │  (Form)  │  │ Floating Dock│                             │
│  └──────────┘  └──────────────┘                             │
│                                                              │
│  Animation Layer : Framer Motion + react-intersection-observer│
│  Styling Layer   : Tailwind CSS 3 + Custom Design Tokens     │
│  Scroll Layer    : react-scroll (smooth anchor navigation)   │
└──────────────────────────────────────────────────────────────┘
```

### Key Technical Decisions

| Decision | Rationale |
|---|---|
| CRA over Vite / Next.js | GitHub Pages static hosting; no SSR needed; minimal config overhead |
| Raw Canvas math over Three.js | Avoids a ~600 KB dependency for a single visual; full control over projection and physics |
| Framer Motion over CSS keyframes | Declarative variant system enables reusable, composable entrance animations across components |
| Tailwind CSS utility-first | Rapid iteration on responsive layouts; design tokens enforced centrally in `tailwind.config.js` |

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org/) | 18.2 | Component model, hooks, state management |
| [Tailwind CSS](https://tailwindcss.com/) | 3.3 | Utility-first styling, custom design tokens |
| [Framer Motion](https://www.framer.com/motion/) | 10.x | Scroll-triggered entrance animations, 3D carousel transitions |

### Animation & Interaction

| Technology | Purpose |
|---|---|
| [react-type-animation](https://github.com/maxeth/react-type-animation) | Typewriter-effect role cycling in the hero section |
| [react-scroll](https://github.com/fisshy/react-scroll) | Smooth anchor-based navigation between page sections |
| [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) | Viewport detection to gate Framer Motion animation triggers |
| [react-countup](https://github.com/glennreyes/react-countup) | Animated number counters that fire on scroll entry |

### Icons & Assets

| Technology | Purpose |
|---|---|
| [react-icons](https://react-icons.github.io/react-icons/) | Unified icon set (FontAwesome, Simple Icons, Bootstrap Icons) |

### Build & Deploy

| Technology | Purpose |
|---|---|
| react-scripts (CRA) | Webpack bundling, dev server, production build pipeline |
| GitHub Pages | Static hosting via `homepage` field in `package.json` |

---

## Features

### Interactive 3D Tech-Stack Sphere

The hero section renders a draggable, auto-rotating 3D tag cloud using pure JavaScript — no WebGL library required.

- **Fibonacci sphere distribution** places tags evenly across the sphere surface using the golden ratio (`φ = (1 + √5) / 2`), eliminating clustering at the poles.
- **Custom perspective projection** computes each tag's 2D screen coordinates from its 3D world position with a configurable focal length, updated on every frame.
- **Depth-based opacity** scales each tag's alpha from `0.3` (back) to `1.0` (front), reinforcing spatial depth without shadows or lighting passes.
- **Mouse drag interaction** captures `mousemove` deltas on `document` and applies them as incremental Euler angle rotations, with X-axis clamping to prevent gimbal flip.
- **`requestAnimationFrame` render loop** auto-rotates when idle and pauses during drag, keeping CPU usage negligible when the tab is not active.

### Scroll-Driven Entrance Animations

A shared `fadeIn(direction, delay)` variant factory in `src/variants.js` generates directional slide-in + fade animations reused across all sections. Framer Motion's `whileInView` combined with `react-intersection-observer` ensures animations re-trigger on both scroll-down and scroll-up passes, making the page feel consistently alive.

### Interactive Experience Timeline

The About section renders a chronological education and work history with expandable detail panels:

- Color-coded card types (cyan for education, purple for work experience)
- Collapsible bullet-point descriptions with animated chevron toggle
- Staggered per-item entrance animations for a polished sequential reveal

### 3D Project Carousel

The Work section implements a depth-of-field carousel using Framer Motion's `AnimatePresence`:

- The active card renders at full scale with a project-specific colored glow border
- Adjacent cards are blurred, scaled down to `0.75×`, and rotated `±45°` in Y to simulate perspective depth
- Dot indicators with active-state glow provide direct index navigation

### Floating Navigation Dock

A frosted-glass fixed navigation bar anchored to the bottom of the viewport provides smooth `react-scroll` anchor navigation. The pill container uses `backdrop-blur` and a semi-transparent dark background to stay legible over any section.

### Responsive Layout

All sections adapt across four Tailwind breakpoints (`sm: 640px`, `md: 768px`, `lg: 960px`, `xl: 1200px`). The 3D sphere and full carousel are hidden on mobile, replaced by clean text-first layouts that prioritize readability.

---

## Project Structure

```
JingzheZhao.github.io/
├── public/
│   └── index.html
├── src/
│   ├── assets/               # Project screenshots and profile images
│   ├── components/
│   │   ├── Banner.js         # Hero section + interactive 3D tag sphere
│   │   ├── Header.js         # Top navigation bar
│   │   ├── Nav.js            # Floating bottom navigation dock
│   │   ├── About.js          # Education & experience timeline
│   │   ├── Work.js           # Project showcase 3D carousel
│   │   └── Contact.js        # Contact form
│   ├── variants.js           # Reusable Framer Motion animation variants
│   ├── App.js                # Root component + ambient background layers
│   ├── index.css             # Global styles, font imports, custom utilities
│   └── index.js              # React DOM entry point
├── tailwind.config.js        # Design tokens: colors, fonts, shadows, screens
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js `>= 16.x`
- npm `>= 8.x`

### Installation

```bash
# Clone the repository
git clone https://github.com/JingzheZhao/JingzheZhao.github.io.git
cd JingzheZhao.github.io

# Install dependencies
npm install
```

### Development Server

```bash
npm start
```

Opens `http://localhost:3000` with hot reload enabled.

### Production Build

```bash
npm run build
```

Outputs an optimized static bundle to `build/`. All assets are content-hashed for cache busting.

---

## Deployment

This project deploys to GitHub Pages via the `homepage` field in `package.json`:

```json
"homepage": "https://JingzheZhao.github.io"
```

To deploy manually:

```bash
# Install gh-pages (one-time)
npm install --save-dev gh-pages

# Build and publish
npm run build
npx gh-pages -d build
```

The live site is served at **[https://JingzheZhao.github.io](https://JingzheZhao.github.io)**.

---

## Design System

The entire visual theme is defined in `tailwind.config.js` and applied exclusively through utility classes, keeping styling co-located with markup and fully tree-shaken in production.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `accent-cyan` | `#00e5ff` | Primary accent, interactive highlights, glow effects |
| `accent-teal` | `#00ffc8` | Secondary accent, timeline gradient terminus |
| `accent-purple` | `#a855f7` | Work experience cards, carousel active glow |
| `accent-coral` | `#ff6b9d` | Tertiary accent |
| `primary-deep` | `#0a1628` | Base background |
| `primary-ocean` | `#132a45` | Mid-layer background |
| `text-primary` | `#e8f4f8` | Body text |
| `text-secondary` | `#94b8c5` | Subdued text, descriptions, timestamps |

### Typography

| Font | Role |
|---|---|
| [Orbitron](https://fonts.google.com/specimen/Orbitron) | `font-primary` — section headings, logo |
| [Rajdhani](https://fonts.google.com/specimen/Rajdhani) | `font-secondary` — hero text, body labels |
| [Aldrich](https://fonts.google.com/specimen/Aldrich) | `font-tertiary` — accent text |

### Ambient Background

The layered background in `App.js` is composited from three stacked `fixed` layers:

1. A CSS `linear-gradient` base from `#0a1628` → `#1a3a5a`
2. Three `animate-pulse` radial blur orbs (cyan, purple, teal) at staggered positions and animation delays
3. A subtle CSS grid overlay using repeating `linear-gradient` lines at `50px` intervals and `3%` opacity

All layers use `blur-3xl` and GPU-composited opacity transitions to avoid layout thrashing during animation.

---

<div align="center">

Built by [Jingzhe Zhao](https://www.linkedin.com/in/jingzhezhao) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/jingzhezhao) &nbsp;·&nbsp; [GitHub](https://github.com/jingzhezhao) &nbsp;·&nbsp; [LeetCode](https://leetcode.com/attax/)

</div>
