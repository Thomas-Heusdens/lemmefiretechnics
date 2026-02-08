import { useRef, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import FormationsList from './components/FormationsList';
import FormationDetail from './components/FormationDetail';
import LevelDetail from './components/LevelDetail';
import Formations from './components/Formations';

type PageType = 'home' | 'gallery' | 'formations' | 'formation-detail' | 'level-detail';

interface FormationLevelData {
  id: string;
  name: string;
  formationName: string;
  description: string;
  duration: string;
  sessionsPerWeek: number;
  level: number | null;
  imageUrl: string;
  goals?: string;
  competencies?: string[];
  galleryUrls?: string[];
  videoUrl?: string;
}
function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [formationsCategory, setFormationsCategory] = useState<'civilian' | 'firefighter' | null>(null);
  const [selectedFormationId, setSelectedFormationId] = useState<string | null>(null);
  const [selectedLevelData, setSelectedLevelData] = useState<FormationLevelData | null>(null);
  
  const formationsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleEnrollFromLevel = () => {
    setSelectedLevelData(null);
    
    setSelectedFormationId(null);
    setFormationsCategory(null);
    
    setCurrentPage('home');
    setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigate = (page: PageType, type?: 'civilian' | 'firefighter') => {
    setCurrentPage(page);
    if (type) {
      setFormationsCategory(type);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFormations = () => {
    formationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectFormation = (formationId: string) => {
    setSelectedFormationId(formationId);
    setCurrentPage('formation-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLevel = (levelData: FormationLevelData) => {
    setSelectedLevelData(levelData);
    setCurrentPage('level-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFormations = () => {
    setSelectedFormationId(null);
    setCurrentPage('formations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFormationsList = () => {
    setFormationsCategory(null);
    setSelectedFormationId(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseLevelDetail = () => {
    setSelectedLevelData(null);
    setCurrentPage('formation-detail');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === 'home' ? (
        <>
          <Hero 
            onScrollToContact={scrollToContact} 
            onScrollToFormations={scrollToFormations} 
          />
          <WhatWeDo />
          <Formations 
            ref={formationsRef} 
            onCategorySelect={(category) => handleNavigate('formations', category)}
          />
          <div ref={contactRef}>
            <Contact />
          </div>
        </>
      ) : currentPage === 'gallery' ? (
        <Gallery />
      ) : currentPage === 'formations' && formationsCategory ? (
        <FormationsList
          category={formationsCategory}
          onSelectFormation={handleSelectFormation}
          onBack={handleBackToFormationsList}
        />
      ) : currentPage === 'formation-detail' && selectedFormationId ? (
        <FormationDetail
          formationId={selectedFormationId}
          onSelectLevel={(levelData) => {
            handleSelectLevel({
              id: levelData.id,
              name: levelData.name,
              formationName: levelData.formationName,
              description: levelData.description,
              duration: levelData.duration,
              sessionsPerWeek: levelData.sessions_per_week,
              level: levelData.level,
              imageUrl: levelData.image_url,
              goals: levelData.goals,
              competencies: levelData.competencies,
              galleryUrls: levelData.gallery_urls,
              videoUrl: levelData.video_url,
            });
          }}
          onBack={handleBackToFormations}
        />
      ) : currentPage === 'level-detail' && selectedLevelData ? (
        <LevelDetail
          levelName={selectedLevelData.name}
          formationName={selectedLevelData.formationName}
          description={selectedLevelData.description}
          duration={selectedLevelData.duration}
          sessionsPerWeek={selectedLevelData.sessionsPerWeek}
          level={selectedLevelData.level}
          imageUrl={selectedLevelData.imageUrl}
          goals={selectedLevelData.goals}
          competencies={selectedLevelData.competencies}
          galleryUrls={selectedLevelData.galleryUrls}
          videoUrl={selectedLevelData.videoUrl}
          onClose={handleCloseLevelDetail}
          onEnroll={handleEnrollFromLevel}
        />
      ) : null}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;