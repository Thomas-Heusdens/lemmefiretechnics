import { useRef, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import FormationsList from './components/FormationsList';
import FormationDetail from './components/FormationDetail';
import LevelDetail from './components/LevelDetail'; // Note: LevelDetail might need to be a child route or modal
import Formations from './components/Formations';

// --- HOME COMPONENT ---
// We extract Home to keep the Routes clean.
// It handles the scrolling logic internally.
function Home() {
  const location = useLocation();
  const formationsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Handle scroll to section based on URL hash (e.g. /#contact)
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

  // Helper for the Navigation to trigger scroll if we are already on Home
  const navigate = useNavigate();
  const handleCategorySelect = (category: 'civilian' | 'firefighter') => {
     navigate(`/formations/${category}`);
  };

  return (
    <>
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
  // We use useLocation to scroll to top on route change
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation is persistent across all pages */}
      <Navigation />

      <div className="flex-1">
        <Routes>
          {/* 1. HOME PAGE */}
          <Route path="/" element={<Home />} />

          {/* 2. GALLERY PAGE */}
          <Route path="/gallery" element={<Gallery />} />

          {/* 3. FORMATIONS LIST PAGE (e.g. /formations/civilian) */}
          {/* We use a URL parameter :category to catch 'civilian' or 'firefighter' */}
          <Route path="/formations/:category" element={<FormationsListWrapper />} />

          {/* 4. FORMATION DETAIL PAGE (e.g. /formation/123) */}
          <Route path="/formation/:formationId" element={<FormationDetailWrapper />} />

          {/* 5. LEVEL DETAIL (Optional: kept as a modal logic inside FormationDetail or a standalone page) */}
          {/* For better SEO, standalone page is better: /formation/123/level/1 */}
           <Route path="/formation/:formationId/level/:levelId" element={<LevelDetailWrapper />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

// --- WRAPPERS ---
// These simple wrappers extract parameters from the URL and pass them to your existing components
import { useParams } from 'react-router-dom';

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
          // You can pass state via navigation, or just navigate to a URL. 
          // Since LevelDetail needs a lot of data, passing state is easier for now, 
          // BUT for SEO, fetching data by ID in the LevelDetail page is better.
          // For now, let's keep your modal logic or navigate to a new route passing state.
          navigate(`/formation/${formationId}/level/${levelData.level}`, { state: levelData });
      }}
      onBack={() => navigate(-1)} // Go back to previous page
    />
  );
}

function LevelDetailWrapper() {
   // This wrapper retrieves the "state" passed during navigation
   const { state } = useLocation(); 
   const navigate = useNavigate();

   if (!state) {
       // If someone lands here directly without state (e.g. direct link), 
       // you would typically fetch data from DB here using the URL params.
       // For now, let's redirect back if no data.
       useEffect(() => { navigate(-1); }, [navigate]);
       return null; 
   }

   const handleEnroll = () => {
       // Navigate Home and scroll to Contact
       navigate('/#contact'); 
   };

   return (
    <div className="pt-20"> 
       {/* Added padding-top because LevelDetail was fixed/modal, now it might be a page */}
       <LevelDetail
          {...state} // Spread all the data passed (name, description, etc.)
          onClose={() => navigate(-1)}
          onEnroll={handleEnroll}
       />
    </div>
   );
}

export default App;