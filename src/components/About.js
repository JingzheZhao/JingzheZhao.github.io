import React, { useState } from 'react';
// countup
import CountUp from 'react-countup';
// intersection observer hook
import { useInView } from 'react-intersection-observer';
// motion
import { motion } from 'framer-motion';
// variant
import { fadeIn } from '../variants';
// icons
import { FaGraduationCap, FaBriefcase, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  // State for expandable items
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Timeline data
  const timelineData = [
    {
      id: 1,
      type: 'education',
      year: '2024 - 2026',
      title: 'Georgia Institute of Technology',
      subtitle: 'Master of Science in Computer Science',
      location: 'Atlanta, GA',
      description: []
    },
    {
      id: 2,
      type: 'work',
      year: '2024 - Present',
      title: 'Junior Designer | Computational R&D',
      subtitle: 'Janet Rosenberg & Studio (JRS)',
      location: 'Toronto, ON',
      description: [
        'Designed, maintained, and optimized internal Grasshopper tools to automate modeling workflows, enhance design efficiency, and improve data consistency across projects.',
        'Collaborated on computational design R&D, developing reusable scripts and testing new procedural methods to support project teams in concept generation and performance analysis.',
        'Supported project visualization through Rhino and Grasshopper modeling and D5 Render visualization, ensuring technical precision and high-quality presentation outputs.'
      ]
    },
    {
      id: 3,
      type: 'work',
      year: '2024',
      title: 'Teaching Assistant',
      subtitle: 'University of Toronto',
      location: 'Toronto, ON',
      description: [
        'Assisted the professor in a master\'s level software class, focusing on computational design methods using Grasshopper and ArcGIS, introducing algorithmic modeling and spatial data processing concepts.',
        'Supported students in debugging scripts, optimizing workflows, and understanding software logic applied to design automation.',
        'Graded assignments and provided feedback emphasizing code readability, modular design, and computational efficiency.'
      ]
    },
    {
      id: 4,
      type: 'work',
      year: '2023 - 2024',
      title: 'Research Assistant',
      subtitle: 'Centre for Landscape Research',
      location: 'Toronto, ON',
      description: [
        'Managed content updates and publishing workflows across departments, ensuring information accuracy and visual consistency throughout the research website.',
        'Designed and customized web pages using HTML and CSS, improving layout structure, accessibility, and responsive behavior across devices.',
        'Performed regular website audits to detect broken links, outdated materials, and usability issues, recommending improvements for better performance and reliability.'
      ]
    },
    {
      id: 5,
      type: 'education',
      year: '2022 - 2024',
      title: 'University of Toronto',
      subtitle: 'Master of Landscape Architecture',
      location: 'Toronto, ON',
      description: []
    },
    {
      id: 6,
      type: 'work',
      year: '2023',
      title: 'Landscape Architecture Intern',
      subtitle: 'SCAPE Landscape Architecture DPC',
      location: 'San Francisco Bay Area',
      description: [
        'Created data-driven 3D models and analytical visualizations in Rhino to inform sustainable site design.',
        'Used parametric tools and automation scripts to accelerate modeling and visualization workflows.',
        'Collaborated in multidisciplinary teams to integrate environmental data and design systems thinking into large-scale projects.'
      ]
    },
    {
      id: 7,
      type: 'work',
      year: '2021 - 2022',
      title: 'Landscape Architecture Intern',
      subtitle: 'PMA + Plasma Studio',
      location: 'Beijing, China',
      description: [
        'Implemented custom Grasshopper scripts to automate site analysis and generative design processes, improving design accuracy and iteration speed.',
        'Built analytical models and data visualization diagrams to support design decisions and communicate spatial logic.',
        'Collaborated with cross-functional teams to integrate computational methods into urban-scale projects.'
      ]
    },
    {
      id: 8,
      type: 'education',
      year: '2020 - 2021',
      title: 'Cornell University',
      subtitle: 'Master of Landscape Architecture',
      location: 'Ithaca, NY',
      description: []
    },
    {
      id: 9,
      type: 'education',
      year: '2019 - 2020',
      title: 'University of Sydney',
      subtitle: 'Master of Urban Design',
      location: 'Sydney, Australia',
      description: []
    },
    {
      id: 10,
      type: 'education',
      year: '2012 - 2015',
      title: 'York University',
      subtitle: 'Bachelor of Arts, Urban Studies',
      location: 'Toronto, ON',
      description: []
    }
  ];

  return (
    <section className='py-16 lg:py-24' id='about' ref={ref}>
      <div className='container mx-auto px-4'>
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className='h2 text-accent mb-16 text-center lg:text-left lg:pl-20'>Education & Experience</h2>
        </motion.div>

        <div className='relative max-w-5xl mx-auto'>
          {/* Timeline line - Left side */}
          <div className='absolute left-0 lg:left-20 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-teal'></div>

          {/* Timeline items */}
          <div className='space-y-6'>
            {timelineData.map((item, index) => {
              const isExpanded = expandedItems[item.id];
              const isEducation = item.type === 'education';
              const hasDescription = item.description.length > 0;

              return (
                <motion.div
                  key={item.id}
                  variants={fadeIn('right', 0.05 * index)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.3 }}
                  className='flex gap-6 lg:gap-8'
                >
                  {/* Year label - Left side */}
                  <div className='hidden lg:flex flex-none w-24 items-start justify-end pt-6 pr-8'>
                    <span className='text-sm font-primary text-gradient glow-text text-right'>
                      {item.year}
                    </span>
                  </div>

                  {/* Content card - Fixed height */}
                  <div className='flex-1 ml-8 lg:ml-0'>
                    {/* Mobile year label */}
                    <div className='lg:hidden mb-2'>
                      <span className='text-xs font-primary text-gradient'>
                        {item.year}
                      </span>
                    </div>

                    <div
                      className={`relative p-6 pb-12 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${isExpanded ? 'h-auto' : 'min-h-[160px]'} ${
                        isEducation
                          ? 'bg-accent-cyan/5 border border-accent-cyan/30 hover:border-accent-cyan/60 hover:shadow-glow-cyan'
                          : 'bg-accent-purple/5 border border-accent-purple/30 hover:border-accent-purple/60 hover:shadow-glow-purple'
                      }`}
                    >
                      {/* Icon - Top right */}
                      <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
                        isEducation ? 'bg-accent-cyan text-primary-deep' : 'bg-accent-purple text-primary-deep'
                      }`}>
                        {isEducation ? <FaGraduationCap /> : <FaBriefcase />}
                      </div>

                      {/* Title */}
                      <h3 className='text-xl font-primary font-semibold mb-2 text-text-primary pr-14'>
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <p className={`text-base mb-1 ${
                        isEducation ? 'text-accent-cyan' : 'text-accent-purple'
                      }`}>
                        {item.subtitle}
                      </p>

                      {/* Location */}
                      <p className='text-sm text-text-secondary mb-4'>
                        {item.location}
                      </p>

                      {/* View more button for work experience */}
                      {hasDescription && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className='absolute bottom-4 left-6 text-sm text-gradient hover:opacity-80 transition-opacity flex items-center gap-2'
                        >
                          {isExpanded ? (
                            <>
                              Show less <FaChevronUp className='text-xs' />
                            </>
                          ) : (
                            <>
                              View more <FaChevronDown className='text-xs' />
                            </>
                          )}
                        </button>
                      )}

                      {/* Expanded description */}
                      {hasDescription && isExpanded && (
                        <ul className='space-y-2 text-text-secondary text-sm mt-2'>
                          {item.description.map((desc, idx) => (
                            <li key={idx} className='flex items-start'>
                              <span className='mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-teal flex-shrink-0'></span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;