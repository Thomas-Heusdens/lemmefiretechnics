import { useRef, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // <--- 1. IMPORT THIS
import SEO from './components/SEO';               // <--- 2. IMPORT THIS

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

// --- HOME COMPONENT ---
function Home() {
  const { t } = useTranslation(); // <--- 3. Initialize hook for Home translations
  const location = useLocation();
  const formationsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash === '#contact') {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#formations') {
      formationsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const scrollToFormations = () => {
    formationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();
  const handleCategorySelect = (category: 'civilian' | 'firefighter') => {
     navigate(`/formations/${category}`);
  };

  return (
    <>
      <SEO 
        title="Lemme Fire Technics" 
        description={t('seo.home.description')} 
      />
      <Hero 
        onScrollToContact={scrollToContact} 
        onScrollToFormations={scrollToFormations} 
      />
      <WhatWeDo />
      <Formations 
        ref={formationsRef} 
        onCategorySelect={handleCategorySelect}
      />
      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 5. INSERT GLOBAL FALLBACK SEO HERE 
          This ensures every page has at least a basic title/image if you forget to add specific ones.
      */}
      <SEO 
        title="Lemme Fire Technics" 
        description="Formation et éducation professionnelles à la sécurité incendie pour les pompiers et les civils."
        image="/og-default.jpg"
      />

      <Navigation />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/formations/:category" element={<FormationsListWrapper />} />
          <Route path="/formation/:formationId" element={<FormationDetailWrapper />} />
          <Route path="/formation/:formationId/level/:levelId" element={<LevelDetailWrapper />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

// --- WRAPPERS ---
function FormationsListWrapper() {
  const { category } = useParams<{ category: 'civilian' | 'firefighter' }>();
  const navigate = useNavigate();

  // Guard clause: if category is invalid, go home
  if (category !== 'civilian' && category !== 'firefighter') {
     useEffect(() => { navigate('/'); }, [navigate]);
     return null;
  }

  return (
    <FormationsList
      category={category}
      onSelectFormation={(id) => navigate(`/formation/${id}`)}
      onBack={() => navigate('/')}
    />
  );
}

function FormationDetailWrapper() {
  const { formationId } = useParams<{ formationId: string }>();
  const navigate = useNavigate();

  if (!formationId) return null;

  return (
    <FormationDetail
      formationId={formationId}
      onSelectLevel={(levelData) => {
          navigate(`/formation/${formationId}/level/${levelData.level}`, { state: levelData });
      }}
      onBack={() => navigate(-1)} 
    />
  );
}

function LevelDetailWrapper() {
   const { state } = useLocation(); 
   const navigate = useNavigate();

   if (!state) {
       useEffect(() => { navigate(-1); }, [navigate]);
       return null; 
   }

   const handleEnroll = () => {
       navigate('/#contact'); 
   };

   return (
    <div className="pt-20"> 
       <LevelDetail
          {...state}
          onClose={() => navigate(-1)}
          onEnroll={handleEnroll}
       />
    </div>
   );
}

export default App;