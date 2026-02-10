import React, { useState } from 'react';
// motion
import { motion, AnimatePresence } from 'framer-motion';
// variants
import { fadeIn } from '../variants';
// icons
import { FaYoutube, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: 'InstantSim',
      subtitle: 'Real-Time Environment Analysis Platform',
      description: 'ML-powered platform that reduces urban-scale environment analysis from minutes to milliseconds.',
      image: '/assets/portfolio-img1.png', // Replace with your screenshots
      youtubeUrl: 'https://youtu.be/3uCVHuaowtU',
      githubUrl: 'https://github.com/JingzheZhao/InstantSim.git',
      tags: ['PyTorch', 'FastAPI', 'Three.js', 'Docker'],
      color: '#00e5ff' // Cyan
    },
    {
      id: 2,
      title: 'Prison Dogeball',
      subtitle: 'AI Agent with Finite State Machine',
      description: 'Implemented intelligent AI agents using Finite State Machines to compete in Prison Dodgeball.',
      image: '../assets/portfolio-img2.png',
      youtubeUrl: 'https://youtu.be/fcupKPvqHD8',
      githubUrl: 'https://github.com/your-repo-2',
      tags: ['C#', 'Unity', 'FSM', 'Game AI'],
      color: '#a855f7' // Purple
    },
    {
      id: 3,
      title: 'Fuzzy Logic Racetrack',
      subtitle: 'Autonomous Racing with Fuzzy Control',
      description: 'Autonomous racing agent using Fuzzy Logic control systems.',
      image: '../assets/portfolio-img3.png',
      youtubeUrl: 'https://youtu.be/9Ylfl-UTo6A',
      githubUrl: 'https://github.com/your-repo-3',
      tags: ['C#', 'Unity', 'Fuzzy Logic', 'Vehicle Physics'],
      color: '#00ffc8' // Teal
    }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
  };

  // Get visible projects for 3D effect
  const getVisibleProjects = () => {
    const prev = (currentIndex - 1 + projects.length) % projects.length;
    const next = (currentIndex + 1) % projects.length;
    return { prev, current: currentIndex, next };
  };

  const visible = getVisibleProjects();

  return (
    <section className='py-8 lg:py-16 relative overflow-hidden' id='work'>
      <div className='container mx-auto px-4'>
        {/* Title */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.3 }}
          className='text-center mb-8'
        >
          <h2 className='h2 text-accent mb-4'>My Projects</h2>
          <p className='text-text-secondary max-w-2xl mx-auto'>
            Showcasing my latest work in machine learning and full-stack development
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className='relative h-[500px] flex items-center justify-center mb-8' style={{ perspective: '2000px' }}>

          {/* Left Project (Previous) */}
          <motion.div
            key={`left-${visible.prev}`}
            initial={{ opacity: 0, x: -200, rotateY: 45 }}
            animate={{
              opacity: 0.4,
              x: -300,
              rotateY: 45,
              scale: 0.75,
              z: -200
            }}
            exit={{ opacity: 0, x: -400 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='absolute w-[350px] cursor-pointer'
            onClick={prevProject}
            style={{
              transformStyle: 'preserve-3d',
              filter: 'blur(2px)'
            }}
          >
            <div className='relative rounded-2xl overflow-hidden border-2 border-white/20'>
              <img
                src={projects[visible.prev].image}
                alt={projects[visible.prev].title}
                className='w-full h-[350px] object-cover'
              />
            </div>
          </motion.div>

          {/* Center Project (Current) */}
          <motion.div
            key={`center-${visible.current}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
              z: 0
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='relative w-[450px] z-10'
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className='relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105'
              style={{
                borderColor: projects[visible.current].color,
                boxShadow: `0 0 40px ${projects[visible.current].color}66`
              }}
            >
              {/* Image */}
              <img
                src={projects[visible.current].image}
                alt={projects[visible.current].title}
                className='w-full h-[420px] object-cover'
              />

              {/* Gradient Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/50 to-transparent'></div>

              {/* Project Info */}
              <div className='absolute bottom-0 left-0 right-0 p-8'>
                <motion.h3
                  key={`title-${visible.current}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className='text-3xl font-primary font-bold mb-2 text-white'
                >
                  {projects[visible.current].title}
                </motion.h3>

                <motion.p
                  key={`subtitle-${visible.current}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='text-lg mb-3'
                  style={{ color: projects[visible.current].color }}
                >
                  {projects[visible.current].subtitle}
                </motion.p>

                <motion.p
                  key={`desc-${visible.current}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className='text-sm text-text-secondary mb-4 line-clamp-2'
                >
                  {projects[visible.current].description}
                </motion.p>

                {/* Tags */}
                <motion.div
                  key={`tags-${visible.current}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className='flex flex-wrap gap-2 mb-4'
                >
                  {projects[visible.current].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className='px-3 py-1 text-xs rounded-full border'
                      style={{
                        borderColor: projects[visible.current].color,
                        color: projects[visible.current].color,
                        background: `${projects[visible.current].color}22`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  key={`buttons-${visible.current}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className='flex gap-4'
                >
                  <a
                    href={projects[visible.current].youtubeUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105'
                    style={{
                      background: `linear-gradient(135deg, ${projects[visible.current].color}, ${projects[visible.current].color}dd)`,
                      boxShadow: `0 4px 20px ${projects[visible.current].color}66`
                    }}
                  >
                    <FaYoutube />
                    Watch Demo
                  </a>

                  <a
                    href={projects[visible.current].githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 px-6 py-3 rounded-full font-medium border-2 transition-all duration-300 hover:scale-105'
                    style={{
                      borderColor: projects[visible.current].color,
                      color: projects[visible.current].color,
                      background: 'rgba(10, 22, 40, 0.8)'
                    }}
                  >
                    <FaGithub />
                    GitHub
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Project (Next) */}
          <motion.div
            key={`right-${visible.next}`}
            initial={{ opacity: 0, x: 200, rotateY: -45 }}
            animate={{
              opacity: 0.4,
              x: 300,
              rotateY: -45,
              scale: 0.75,
              z: -200
            }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='absolute w-[350px] cursor-pointer'
            onClick={nextProject}
            style={{
              transformStyle: 'preserve-3d',
              filter: 'blur(2px)'
            }}
          >
            <div className='relative rounded-2xl overflow-hidden border-2 border-white/20'>
              <img
                src={projects[visible.next].image}
                alt={projects[visible.next].title}
                className='w-full h-[350px] object-cover'
              />
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className='absolute left-4 lg:left-8 z-20 w-14 h-14 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan flex items-center justify-center transition-all duration-300 hover:bg-accent-cyan hover:scale-110'
            style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)' }}
          >
            <FaChevronLeft className='text-accent-cyan text-xl' />
          </button>

          <button
            onClick={nextProject}
            className='absolute right-4 lg:right-8 z-20 w-14 h-14 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan flex items-center justify-center transition-all duration-300 hover:bg-accent-cyan hover:scale-110'
            style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)' }}
          >
            <FaChevronRight className='text-accent-cyan text-xl' />
          </button>
        </div>

        {/* Indicators */}
        <div className='flex justify-center gap-3 mt-6'>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className='relative transition-all duration-300'
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'scale-125' 
                    : 'scale-100 opacity-50 hover:opacity-75'
                }`}
                style={{
                  background: index === currentIndex
                    ? projects[currentIndex].color
                    : '#94b8c5',
                  boxShadow: index === currentIndex
                    ? `0 0 15px ${projects[currentIndex].color}`
                    : 'none'
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;