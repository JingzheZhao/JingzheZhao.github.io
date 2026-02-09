import React, { useEffect, useRef } from 'react';
// icons
import {FaGithub, FaLinkedinIn} from 'react-icons/fa';
import {SiLeetcode} from 'react-icons/si';
// type animation
import {TypeAnimation} from 'react-type-animation';
// motion
import {motion} from 'framer-motion';
// variants
import {fadeIn} from '../variants';

const Banner = () => {
  const containerRef = useRef(null);
  const rotationRef = useRef({ x: 0.3, y: 0 }); // Start with slight X rotation to show 3D
  const autoRotateRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Tech stack tags
    const tags = [
      'Python', 'PyTorch', 'TensorFlow', 'React', 'JavaScript',
      'Node.js', 'Docker', 'FastAPI', 'PostgreSQL', 'Azure',
      'Git', 'NumPy', 'Pandas', 'Three.js'
    ];

    const colors = ['#00e5ff', '#a855f7', '#00ffc8', '#ff6b9d'];

    // Create tag elements
    const tagElements = [];
    tags.forEach((tag, i) => {
      const tagEl = document.createElement('div');
      tagEl.className = 'tag-3d';
      tagEl.textContent = tag;
      tagEl.style.cssText = `
        position: absolute;
        padding: 6px 12px;
        background: rgba(10, 22, 40, 0.95);
        border: 2px solid ${colors[i % colors.length]};
        border-radius: 6px;
        color: white;
        font-size: 13px;
        font-weight: 500;
        font-family: 'Rajdhani', Arial, sans-serif;
        white-space: nowrap;
        pointer-events: none;
        box-shadow: 0 0 15px ${colors[i % colors.length]}88;
        left: 50%;
        top: 50%;
        transform-origin: center center;
      `;
      container.appendChild(tagEl);
      tagElements.push(tagEl);
    });

    const radius = 160;

    // Calculate positions on sphere using Fibonacci sphere
    const positions = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < tags.length; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / tags.length);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push({ x, y, z });
    }

    // Mouse interaction
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - lastMouseRef.current.x;
      const deltaY = e.clientY - lastMouseRef.current.y;

      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.01;

      // Limit X rotation to prevent flipping
      rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    let animationId;
    const animate = () => {
      // Auto-rotate when not dragging
      if (!isDraggingRef.current) {
        autoRotateRef.current += 0.005;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y + autoRotateRef.current;

      // Update each tag position
      positions.forEach((pos, i) => {
        // Apply rotations
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        // Rotate around Y axis
        let x = pos.x * cosY - pos.z * sinY;
        let z = pos.x * sinY + pos.z * cosY;
        let y = pos.y;

        // Rotate around X axis
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;

        // Apply perspective
        const perspective = 600;
        const scale = perspective / (perspective + z2);
        const x2d = x * scale;
        const y2d = y2 * scale;

        // Calculate opacity based on z position (back tags are dimmer)
        const depthRatio = (z2 + radius) / (2 * radius);
        const opacity = 0.3 + (depthRatio * 0.7);

        // Update element
        const tag = tagElements[i];
        tag.style.transform = `translate(-50%, -50%) translate(${x2d}px, ${y2d}px) scale(${scale})`;
        tag.style.opacity = opacity;
        tag.style.zIndex = Math.floor(z2 + radius);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
      // Clean up tag elements
      tagElements.forEach(tag => tag.remove());
    };
  }, []);

  return (
    <section className='min-h-[85vh] lg:min-h-[78vh] flex items-center' id='home'>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'>
          {/* text */}
          <div className='flex-1 font-secondary'>
            <motion.h1
              variants={fadeIn('up', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='text-[40px] font-bold leading-[0.8] lg:text-[100px] mb-4'
            >
              JINGZHE <span className='text-gradient'>ZHAO</span>
            </motion.h1>
            <motion.div
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='mb-6 text-[20px] lg:text-[35px] font-secondary font-semibold uppercase leading-[1]'
            >
              <span className='text-white mr-4'>I am a</span>
              <TypeAnimation
                sequence={[
                  'Software Engineer',
                  2000,
                  'ML Engineer',
                  2000,
                  'AI Engineer',
                  2000,
                ]}
                speed={50}
                className='text-gradient'
                wrapper='span'
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              variants={fadeIn('up', 0.5)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='mb-8 max-w-lg text-text-secondary'
            >
              MSCS student with project based experience in applied machine learning and software systems. Hands on experience building end to end AI driven and data intensive applications through academic and personal projects. Seeking software engineering, machine learning, or AI engineering intern and entry level roles.
            </motion.p>
            {/* socials */}
            <motion.div
              variants={fadeIn('up', 0.6)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='flex text-[24px] gap-x-6 max-w-max'
            >
              <a href='https://www.linkedin.com/in/jingzhezhao' className='hover:text-accent-cyan transition-colors'
                 target='_blank' rel='noopener noreferrer'>
                <FaLinkedinIn/>
              </a>
              <a href='https://github.com/jingzhezhao' className='hover:text-accent-cyan transition-colors' target='_blank' rel='noopener noreferrer'>
                <FaGithub/>
              </a>
              <a href='https://leetcode.com/attax/' className='hover:text-accent-cyan transition-colors'
                 target='_blank' rel='noopener noreferrer'>
                <SiLeetcode/>
              </a>
            </motion.div>
          </div>
          {/* 3D Tech Stack Sphere */}
          <motion.div
              variants={fadeIn('left', 0.5)}
              initial='hidden'
              whileInView={'show'}
              className='hidden lg:flex flex-1 max-w-[320px] lg:max-w-[500px] justify-center items-center'
          >
            <div className='relative w-full h-[450px] flex items-center justify-center'>
              {/* Background glow */}
              <div className='absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-accent-purple/5 to-accent-teal/5 blur-3xl'></div>

              {/* Center sphere visualization */}
              <div className='absolute w-[320px] h-[320px] rounded-full border border-accent-cyan/10'></div>
              <div className='absolute w-[280px] h-[280px] rounded-full border border-accent-purple/10'></div>

              {/* 3D Container - centered */}
              <div
                ref={containerRef}
                className='relative w-[400px] h-[400px] cursor-grab'
              />

              {/* Interaction hint */}
              <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-text-secondary/50'>
                Drag to rotate
              </div>

              {/* Corner decorations */}
              <div className='absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-accent-cyan/20 pointer-events-none'></div>
              <div className='absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-accent-purple/20 pointer-events-none'></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;