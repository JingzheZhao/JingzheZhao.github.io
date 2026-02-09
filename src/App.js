import React from 'react';
// components
import Banner from './components/Banner';
import Header from './components/Header';
import Nav from './components/Nav';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';

const App = () => {
  return (
    <div className='relative overflow-hidden'>
      {/* Deep ocean glow background effects */}
      <div className='fixed inset-0 -z-10'>
        {/* Main gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#132a45] to-[#1a3a5a]'></div>

        {/* Animated glowing orbs */}
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
        <div className='absolute top-2/3 left-2/3 w-80 h-80 bg-accent-teal/10 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>

        {/* Grid background */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]'></div>
      </div>

      <Header />
      <Banner />
      <Nav />
      <About />
      <Work />
      <Contact />
    </div>
  );
};

export default App;