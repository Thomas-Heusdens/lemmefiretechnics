import { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Import hook

interface LevelDetailProps {
  // DB Fields (New Multilingual Schema)
  name_fr?: string; name_nl?: string;
  description_fr?: string; description_nl?: string;
  goals_fr?: string; goals_nl?: string;
  competencies_fr?: string[]; competencies_nl?: string[];
  duration_fr?: string; duration_nl?: string;
  
  // Common Fields
  formationName?: string; // Note: passed from parent, might need adjustment later
  sessionsPerWeek: number;
  level: number | null;
  imageUrl: string;
  galleryUrls?: string[];
  videoUrl?: string;
  
  // Legacy Fallbacks (to prevent crashes if parent isn't fully updated)
  levelName?: string;
  description?: string;
  duration?: string;
  goals?: string;
  competencies?: string[];

  onClose: () => void;
  onEnroll: () => void;
}

export default function LevelDetail({
  // Props with defaults or optionals
  formationName,
  sessionsPerWeek,
  level,
  imageUrl,
  galleryUrls,
  videoUrl,
  onClose,
  onEnroll,
  ...props // Spread the rest to handle FR/NL fields easily
}: LevelDetailProps) {
  
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0]; // 'fr' or 'nl'

  // Helper to pick the right language or fallback
  const getContent = (field: string, fallback?: any) => {
    // 1. Try specific language field (e.g. description_nl)
    // @ts-ignore - Dynamic access
    const val = props[`${field}_${currentLang}`];
    if (val) return val;

    // 2. Try French default (e.g. description_fr)
    // @ts-ignore
    if (props[`${field}_fr`]) return props[`${field}_fr`];

    // 3. Fallback to legacy prop (e.g. description)
    // @ts-ignore
    return props[field] || fallback;
  };

  const imagesToUse = (galleryUrls && galleryUrls.length > 0) ? galleryUrls : [imageUrl];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? imagesToUse.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === imagesToUse.length - 1 ? 0 : prev + 1));
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const cleanUrl = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedVideoUrl = videoUrl ? getYoutubeEmbedUrl(videoUrl) : null;

  // Prepare Data using helper
  const title = getContent('name', props.levelName);
  const description = getContent('description');
  const goals = getContent('goals');
  const duration = getContent('duration');
  const competencies = getContent('competencies', []);

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 animate-in fade-in duration-300 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none -z-10"></div>
      
      {/* CLOSE BUTTON */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] p-2 md:p-3 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-300 group shadow-2xl cursor-pointer"
      >
        <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* HEADER */}
      <div className="relative max-w-7xl mx-auto pt-20 md:pt-16 px-5 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 font-bold uppercase tracking-wider text-[10px] md:text-sm backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
              {t('level_detail.certified_badge', 'Formation Certifiante')}
            </div>
            {level && (
              <div className="inline-flex items-center px-3 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md text-white font-semibold text-[10px] md:text-sm">
                {t('level_detail.module', 'Module')} {level}
              </div>
            )}
          </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 md:pb-24 space-y-6 md:space-y-8">
        
        {/* CARD: DESCRIPTION + IMAGES */}
        <div className="bg-gray-900/50 rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="order-2 lg:order-1 lg:w-4/6 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 md:h-8 bg-red-600 rounded-full"></span>
              {t('level_detail.description_title', 'Description')}
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {description}
            </p>
            
            {goals && (
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-900/20 rounded-lg text-red-500 mt-1 flex-shrink-0">
                    <Target className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg mb-2">
                      {t('level_detail.goals_title', 'But de la formation')}
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{goals}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* IMAGE CAROUSEL */}
          <div className="order-1 lg:order-2 lg:w-2/6 relative h-64 sm:h-80 lg:h-auto min-h-[250px] bg-black group border-b lg:border-b-0 lg:border-l border-white/10">
              <div className="absolute inset-0">
                  <img 
                      key={imagesToUse[selectedImageIndex]}
                      src={imagesToUse[selectedImageIndex]} 
                      alt="Gallery" 
                      className="w-full h-full object-cover transition-opacity duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent lg:hidden"></div>
              </div>
              
              {imagesToUse.length > 1 && (
                <>
                  <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-red-600 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100 z-30 cursor-pointer">
                      <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-red-600 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100 z-30 cursor-pointer">
                      <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                      {imagesToUse.map((_, idx) => (
                          <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === selectedImageIndex ? 'w-6 md:w-8 bg-red-600' : 'w-2 bg-white/70'}`} />
                      ))}
                  </div>
                </>
              )}
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* LEFT: COMPETENCIES & VIDEO */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
             {competencies && competencies.length > 0 && (
              <div className="bg-gray-900/30 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/5">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-5 md:h-6 bg-red-600 rounded-full"></span>
                  {t('level_detail.competencies_title', 'Compétences Clés')}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {competencies.map((item: string, i: number) => (
                    <div key={i} className="flex items-center p-3 md:p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-900/50 hover:bg-gray-800/50 transition-all group">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-red-500 mr-3 flex-shrink-0 transition-colors" />
                      <span className="text-sm md:text-base text-gray-300 font-medium group-hover:text-white transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {embedVideoUrl && (
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3 px-2">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                  {t('level_detail.video_title', 'Aperçu Vidéo')}
                </h2>
                <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                  <iframe 
                    src={embedVideoUrl} 
                    title="Formation Video Preview"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS CARD */}
          <div className="relative order-1 lg:order-2">
            <div className="bg-gray-900 border border-red-900/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl shadow-red-900/10 backdrop-blur-xl lg:sticky lg:top-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 border-b border-gray-800 pb-4">
                {t('level_detail.practical_details', 'Détails Pratiques')}
              </h3>
              
              <div className="space-y-4 md:space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm md:text-base text-gray-400 gap-3">
                    <div className="p-1.5 md:p-2 bg-gray-800 rounded-lg"><Clock className="w-4 h-4 md:w-5 md:h-5 text-red-500" /></div>
                    {t('level_detail.duration', 'Durée')}
                  </div>
                  <span className="text-white font-bold text-base md:text-lg">{duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm md:text-base text-gray-400 gap-3">
                    <div className="p-1.5 md:p-2 bg-gray-800 rounded-lg"><Calendar className="w-4 h-4 md:w-5 md:h-5 text-red-500" /></div>
                    {t('level_detail.frequency', 'Fréquence')}
                  </div>
                  <span className="text-white font-bold text-base md:text-lg">
                    {sessionsPerWeek} {t('level_detail.sessions_week', 'sess/sem')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm md:text-base text-gray-400 gap-3">
                    <div className="p-1.5 md:p-2 bg-gray-800 rounded-lg"><ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-red-500" /></div>
                    {t('level_detail.certified', 'Certifié')}
                  </div>
                  <span className="text-white font-bold text-base md:text-lg">{t('common.yes', 'Oui')}</span>
                </div>
              </div>

              <div className="hidden md:block space-y-4 pt-4 border-t border-gray-800">
                <button 
                  onClick={onEnroll}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
                >
                  {t('level_detail.enroll_now', "S'INSCRIRE MAINTENANT")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  {t('level_detail.disclaimer', 'Places limitées. Validation des prérequis requise.')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-xl border-t border-red-900/30 z-40 animate-in slide-in-from-bottom-full">
        <button 
          onClick={onEnroll}
          className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          {t('level_detail.enroll_short', "S'INSCRIRE")}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}