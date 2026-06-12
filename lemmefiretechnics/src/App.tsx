import { useRef, useEffect, type RefObject } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from './components/SEO';

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
  const { t } = useTranslation();
  const location = useLocation();
  const formationsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const NAV_OFFSET = 80;

  const scrollToRef = (
    ref: RefObject<HTMLDivElement>,
    behavior: ScrollBehavior = 'smooth'
  ) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  useEffect(() => {
    let target: RefObject<HTMLDivElement> | null = null;
    if (location.pathname === '/contact' || location.hash === '#contact') {
      target = contactRef;
    } else if (location.pathname === '/formations' || location.hash === '#formations') {
      target = formationsRef;
    }
    if (!target) return;
    const ref = target;

    // Already-loaded page (e.g. clicking the nav while browsing)
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => scrollToRef(ref, 'smooth'), 100);
      return () => clearTimeout(timer);
    }

    // Fresh load (e.g. a visitor landing here from an ad)
    let lastTop = NaN;
    let ticks = 0;
    const id = setInterval(() => {
      ticks += 1;
      const el = ref.current;
      if (el) {
        const top = Math.max(
          0,
          Math.round(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET)
        );
        window.scrollTo({ top, behavior: 'auto' });
        if (top === lastTop) clearInterval(id);
        lastTop = top;
      }
      if (ticks >= 10) clearInterval(id);
    }, 150);
    return () => clearInterval(id);
  }, [location]);

  const scrollToFormations = () => scrollToRef(formationsRef);
  const scrollToContact = () => scrollToRef(contactRef);

  const navigate = useNavigate();
  const handleCategorySelect = (category: 'civilian' | 'firefighter') => {
     navigate(`/formations/${category}`);
  };

  const pageSeo =
    location.pathname === '/contact'
      ? { title: t('seo.contact.title'), description: t('seo.contact.description') }
      : location.pathname === '/formations'
      ? { title: t('seo.formations.title'), description: t('seo.formations.description') }
      : { title: 'Lemme Fire Technics', description: t('seo.home.description') };

  return (
    <>
      <SEO
        title={pageSeo.title}
        description={pageSeo.description}
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
  const location = useLocation();

  useEffect(() => {
    const isSectionRoute = location.pathname === '/contact' || location.pathname === '/formations';
    if (!location.hash && !isSectionRoute) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

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
          <Route path="/contact" element={<Home />} />
          <Route path="/formations" element={<Home />} />
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
       navigate('/contact');
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