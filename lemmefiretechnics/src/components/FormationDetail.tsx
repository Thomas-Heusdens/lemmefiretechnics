import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight, Lock, Clock, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Import translation hook
import SEO from './SEO';

// Updated Interfaces to match DB Schema
interface FormationLevel {
  id: string;
  formation_id: string;
  display_order: number;
  sessions_per_week: number;
  image_url: string;
  gallery_urls?: string[];
  video_url: string;
  // Multilingual Fields
  name_fr: string; name_nl: string;
  description_fr: string; description_nl: string;
  duration_fr: string; duration_nl: string;
  goals_fr: string; goals_nl: string;
  competencies_fr: string[]; competencies_nl: string[];
}

interface Formation {
  id: string;
  category: string;
  image_url: string;
  brevet_id: string;
  // Multilingual Fields
  name_fr: string; name_nl: string;
  description_fr: string; description_nl: string;
}

interface Brevet {
  id: string;
  // Multilingual Fields
  name_fr: string; name_nl: string;
  description_fr: string; description_nl: string;
}

interface FormationDetailProps {
  formationId: string;
  onSelectLevel: (levelData: any) => void; 
  onBack: () => void;
}

export default function FormationDetail({ formationId, onSelectLevel, onBack }: FormationDetailProps) {
  const [formation, setFormation] = useState<Formation | null>(null);
  const [levels, setLevels] = useState<FormationLevel[]>([]);
  const [brevet, setBrevet] = useState<Brevet | null>(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0]; // 'fr' or 'nl'

  // Helper to get translated content safely
  const getContent = (obj: any, field: string) => {
    if (!obj) return '';
    const val = obj[`${field}_${currentLang}`];
    return val || obj[`${field}_fr`]; // Fallback to French
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: formationData, error: formationError } = await supabase
          .from('formations')
          .select('*')
          .eq('id', formationId)
          .maybeSingle();

        if (formationError) throw formationError;

        if (formationData) {
          setFormation(formationData);

          const { data: levelsData, error: levelsError } = await supabase
            .from('formation_levels')
            .select('*')
            .eq('formation_id', formationId)
            .order('display_order', { ascending: true });
          
          if (levelsError) throw levelsError;
          if (levelsData) setLevels(levelsData);

          if (formationData.brevet_id) {
            const { data: brevetData } = await supabase
              .from('brevets')
              .select('*')
              .eq('id', formationData.brevet_id)
              .maybeSingle();
            
            if (brevetData) setBrevet(brevetData);
          }
        }
      } catch (error) {
        console.error('Erreur chargement formation:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formationId]);

  const changeLevel = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentLevelIndex((prev) => Math.min(levels.length - 1, prev + 1));
      } else {
        setCurrentLevelIndex((prev) => Math.max(0, prev - 1));
      }
      setIsAnimating(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
        <p className="text-gray-400 font-medium">{t('common.loading', 'Chargement...')}</p>
      </div>
    );
  }

  if (!formation) return null;

  const currentLevel = levels[currentLevelIndex];
  const hasMultipleLevels = levels.length > 1;

  // Prepare dynamic data for current level
  const levelName = getContent(currentLevel, 'name');
  const levelDesc = getContent(currentLevel, 'description');
  const levelDuration = getContent(currentLevel, 'duration');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20">
      <SEO 
        title={getContent(formation, 'name')} 
        description={getContent(formation, 'description')}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <button
          onClick={onBack}
          className="group mb-12 text-gray-400 hover:text-white transition-colors flex items-center space-x-2 font-medium"
        >
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-red-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span>{t('formation_detail.back_formations', 'Retour aux formations')}</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          
          {/* COLONNE GAUCHE : INFO GÉNÉRALES */}
          <div className="space-y-4 md:space-y-8">
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={formation.image_url}
                alt={getContent(formation, 'name')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider mb-2 border border-red-400/30">
                  {formation.category === 'firefighter' 
                    ? t('common.pro', 'Professionnel') 
                    : t('common.civilian', 'Civil')}
                </div>
                <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
                  {getContent(formation, 'name')}
                </h1>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg md:text-2xl text-center md:text-left font-bold text-white mb-4">
                {t('formation_detail.about_course', 'À propos de ce cursus')}
              </h3>
              <p className="text-gray-300 text-center md:text-left text-base md:text-lg leading-relaxed">
                {getContent(formation, 'description')}
              </p>
            </div>

            {brevet && (
              <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-red-900/30 rounded-2xl flex items-start gap-5 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-red-600/20 transition-all"></div>
                <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-500">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-red-400 font-bold tracking-wide text-xs mb-1">
                    {t('formation_detail.brevet_required', 'Brevet Applicable')}
                  </h4>
                  <div className="text-xl font-bold text-white mb-1">
                    {getContent(brevet, 'name')}
                  </div>
                  <p className="text-sm text-gray-400">
                    {getContent(brevet, 'description')}
                  </p>
                </div>
              </div>
            )}

            {levels.length === 0 && (
               <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all">
                 {t('formation_detail.contact_us', "Nous contacter pour plus d'infos")}
               </button>
            )}
          </div>

          {/* COLONNE DROITE : CAROUSEL DES NIVEAUX */}
          {currentLevel && (
            <div className="relative w-full">
              <div className="group bg-gray-900 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative h-full">
                
                {/* 1. IMAGE SECTION */}
                <div className="relative h-56 sm:h-72 shrink-0 overflow-hidden bg-gray-800">
                  <div 
                    key={currentLevel.image_url} 
                    className={`w-full h-full transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                  >
                    <img
                      src={currentLevel.image_url}
                      alt={levelName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                  
                  {hasMultipleLevels && (
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-black/40 backdrop-blur-md border border-white/20 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-bold text-xs md:text-lg shadow-lg z-20">
                      <span className="text-white">{currentLevelIndex + 1}</span>
                      <span className="text-white/60 text-[10px] md:text-sm ml-1">/ {levels.length}</span>
                    </div>
                  )}

                  {/* MOBILE NAV ARROWS */}
                  {hasMultipleLevels && (
                    <div className="md:hidden absolute inset-0 flex justify-between items-center px-2 z-10 pointer-events-none">
                      <button 
                        onClick={() => changeLevel('prev')} 
                        disabled={currentLevelIndex === 0}
                        className="pointer-events-auto p-2 bg-black/30 backdrop-blur-sm rounded-full disabled:opacity-0 transition-opacity"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button 
                        onClick={() => changeLevel('next')} 
                        disabled={currentLevelIndex === levels.length - 1}
                        className="pointer-events-auto p-2 bg-black/30 backdrop-blur-sm rounded-full disabled:opacity-0 transition-opacity"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. CONTENT SECTION */}
                <div className="flex-1 p-5 md:p-8 flex flex-col relative">
                  
                  {/* DESKTOP NAV ARROWS */}
                  {hasMultipleLevels && (
                    <>
                      <button 
                        onClick={() => changeLevel('prev')} 
                        disabled={currentLevelIndex === 0}
                        className="hidden md:flex absolute left-0 top-0 bottom-0 w-16 items-center justify-center bg-gradient-to-r from-black/50 to-transparent hover:from-black/70 transition-all disabled:hidden group/nav z-10"
                      >
                        <ChevronLeft className="w-10 h-10 text-white/50 group-hover/nav:text-white group-hover/nav:scale-110 transition-all" />
                      </button>
                      <button 
                        onClick={() => changeLevel('next')} 
                        disabled={currentLevelIndex === levels.length - 1}
                        className="hidden md:flex absolute right-0 top-0 bottom-0 w-16 items-center justify-center bg-gradient-to-l from-black/50 to-transparent hover:from-black/70 transition-all disabled:hidden group/nav z-10"
                      >
                        <ChevronRight className="w-10 h-10 text-white/50 group-hover/nav:text-white group-hover/nav:scale-110 transition-all" />
                      </button>
                    </>
                  )}

                  <div className={`flex-1 transition-all duration-300 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <h3 className="text-white text-xl md:text-3xl font-bold leading-tight mb-3 text-center px-4 md:px-8">
                      {levelName}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed text-center max-w-lg mx-auto px-2 md:px-0">
                      {levelDesc}
                    </p>

                    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                      <div className="flex flex-col items-center p-2 md:p-4 bg-white/5 rounded-xl border border-white/5">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-red-500 mb-1 md:mb-2" />
                        <span className="text-[10px] md:text-xs text-gray-500 uppercase font-semibold mb-0.5">{t('formation_detail.duration', 'Durée')}</span>
                        <span className="text-white font-bold text-xs md:text-base text-center">{levelDuration}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-4 bg-white/5 rounded-xl border border-white/5">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-red-500 mb-1 md:mb-2" />
                        <span className="text-[10px] md:text-xs text-gray-500 uppercase font-semibold mb-0.5">{t('formation_detail.sessions', 'Séances')}</span>
                        <span className="text-white font-bold text-xs md:text-base text-center">{currentLevel.sessions_per_week}/sem</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-4 bg-white/5 rounded-xl border border-white/5">
                        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-red-500 mb-1 md:mb-2" />
                        <span className="text-[10px] md:text-xs text-gray-500 uppercase font-semibold mb-0.5">{t('formation_detail.module', 'Module')}</span>
                        <span className="text-white font-bold text-xs md:text-base text-center">{currentLevel.display_order}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => formation && onSelectLevel({ 
                        // Spread full object to pass ALL localized fields (fr/nl)
                        ...currentLevel, 
                        
                        // Pass parent info
                        formationName: getContent(formation, 'name'),
                        
                        // Map legacy fields for compatibility
                        level: currentLevel.display_order,
                        imageUrl: currentLevel.image_url,
                        videoUrl: currentLevel.video_url,
                        galleryUrls: currentLevel.gallery_urls,
                        sessionsPerWeek: currentLevel.sessions_per_week
                    })}
                    className="w-full py-3 md:py-4 bg-red-600 hover:bg-red-700 text-white text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/20 hover:shadow-red-900/40 hover:-translate-y-1 relative z-20 active:scale-95"
                  >
                    {t('formation_detail.view_program', "VOIR LE PROGRAMME & S'INSCRIRE")}
                  </button>
                </div>

                {hasMultipleLevels && (
                  <div className="absolute bottom-0 left-0 right-0 flex h-1 md:h-1.5 z-20">
                    {levels.map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 transition-all duration-500 ${
                          index === currentLevelIndex 
                            ? 'bg-red-600 shadow-[0_-4px_10px_rgba(220,38,38,0.5)]' 
                            : 'bg-gray-800'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}