import React from 'react';
// images
import Image from '../assets/avatar.svg';
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
              className='text-[40px] font-bold leading-[0.8] lg:text-[110px] mb-4'
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
              <a href='https://github.com/jingzhezhao' className='hover:text-accent-cyan transition-colors' target='_blank'>
                <FaGithub/>
              </a>
              <a href='https://leetcode.com/attax/' className='hover:text-accent-cyan transition-colors'
                 target='_blank' rel='noopener noreferrer'>
                <SiLeetcode/>
              </a>
            </motion.div>
          </div>
          {/* image */}
          <motion.div
              variants={fadeIn('left', 0.5)}
            initial='hidden'
            whileInView={'show'}
            className='hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px] justify-center'
          >
            <img src={Image} alt='' className='w-full h-auto'/>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;