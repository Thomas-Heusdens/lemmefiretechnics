import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToFormations: () => void;
}

export default function Hero({ onScrollToContact, onScrollToFormations }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/hero-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-red-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-24 pt-28 pb-12 flex flex-col items-center text-center">
        
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="inline-block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-full text-red-400 text-xs md:text-sm font-semibold backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              Formation et Éducation Incendie Professionnelle
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <span className="text-white mb-2">Maîtrisez l'Art de la </span>
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
              Sécurité Incendie
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Des formations spécifiques pour pompiers et civils, basées sur une expertise concrète du terrain. J'interviens partout en Belgique avec des programmes privés sur mesure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12 justify-center w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <button
              onClick={onScrollToFormations}
              className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-red-900/50 hover:shadow-red-900/70"
            >
              <span>Voir les formations</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onScrollToContact}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-300 border border-white/10 hover:border-white/30"
            >
              Contactez-moi
            </button>
          </div>
        </div>
          <div className="w-full md:w-auto bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-red-900/30 md:border-none rounded-xl md:rounded-none p-4 md:p-0 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            <div className="grid grid-cols-3 gap-2 md:flex md:gap-8 divide-x divide-red-900/30 md:divide-x-0">
              
              <div className="flex flex-col md:flex-row items-center md:space-x-3 px-1 md:px-0">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-red-600/20 rounded-lg flex items-center justify-center shrink-0 mb-1 md:mb-0">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl md:mt-0 mt-1 md:text-2xl font-bold text-white leading-none md:leading-normal">20+</div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-gray-400">Expérience</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:space-x-3 px-1 md:px-0">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-red-600/20 rounded-lg flex items-center justify-center shrink-0 mb-1 md:mb-0">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl md:mt-0 mt-1 md:text-2xl font-bold text-white leading-none md:leading-normal">500+</div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-gray-400">Étudiants</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:space-x-3 px-1 md:px-0">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-red-600/20 rounded-lg flex items-center justify-center shrink-0 mb-1 md:mb-0">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl md:mt-0 mt-1 md:text-2xl font-bold text-white leading-none md:leading-normal">10+</div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-gray-400">Brevets</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}