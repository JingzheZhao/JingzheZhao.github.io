# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, Tailwind CSS, and Framer Motion, featuring interactive 3D tech stack visualization.

## Features

- Modern design with gradients and smooth animations
- Fully responsive layout
- Smooth animations powered by Framer Motion
- Interactive 3D tech stack sphere with Three.js
- Smooth scroll navigation
- Project showcase with carousel
- Contact form
- Animated statistics counter

## Tech Stack

- **React** - UI framework
- **Three.js** - 3D graphics and interactive sphere
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Type Animation** - Typing animation effect
- **React CountUp** - Number scrolling animation
- **React Scroll** - Smooth scrolling

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── assets/          # Images and static resources
├── components/      # React components
│   ├── About.js
│   ├── Banner.js
│   ├── Contact.js
│   ├── Header.js
│   ├── Nav.js
│   ├── Work.js
│   └── TechStack.js
├── App.js
├── index.css
├── index.js
└── variants.js      # Framer Motion animation variants
```

## Customization

### Update Personal Information

In `Banner.js`, update your name and roles:
```javascript
<h1>Your Name</h1>
<TypeAnimation 
  sequence={[
    'Your Role 1',
    2000,
    'Your Role 2',
    2000,
  ]}
/>
```

### Modify Projects

Update project information in `Work.js`:
```javascript
const projects = [
  {
    id: 1,
    title: 'Project Title',
    subtitle: 'Project Subtitle',
    description: 'Project description',
    // ...
  },
];
```

### Color Theme

Modify theme colors in `tailwind.config.js`:
```javascript
colors: {
  primary: '#0a0a0a',
  accent: '#B809C3',  // Change accent color
},
```

### 3D Tech Stack Sphere

Customize technologies in `TechStack.js`:
```javascript
const technologies = [
  { name: 'React', position: [x, y, z] },
  // Add more technologies...
];
```

## Required Assets

Prepare the following assets in the `src/assets/` folder:
- `avatar.svg` - Your avatar
- `logo.svg` - Website logo
- `site-bg.jpg` - Background image
- `about.png` - About section background
- `portfolio-img1.png` - Project image 1
- `portfolio-img2.png` - Project image 2
- `portfolio-img3.png` - Project image 3

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify
1. Run `npm run build`
2. Drag the `build` folder to Netlify

## License

MIT License - Feel free to use and modify!

## Contributing

Pull requests are welcome!

---

Built with React and Three.js