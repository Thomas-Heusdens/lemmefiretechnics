import { useState, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import Formations from './components/Formations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');
  const formationsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleScrollToSection = (section: string) => {
    if (section === 'contact') {
      contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'firefighters' || section === 'civilians') {
      formationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  };

  const handleNavigate = (page: 'home' | 'gallery') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onScrollToSection={handleScrollToSection}
      />

      {currentPage === 'home' ? (
        <>
          <Hero onScrollToContact={() => handleScrollToSection('contact')} />
          <WhatWeDo />
          <Formations ref={formationsRef} onContactClick={() => handleScrollToSection('contact')} />
          <Contact ref={contactRef} />
        </>
      ) : (
        <Gallery />
      )}

      <Footer onNavigate={handleNavigate} onScrollToSection={handleScrollToSection} />
    </div>
  );
}

export default App;