import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';

interface HeroProps {
  onScrollToContact: () => void;
}

export default function Hero({ onScrollToContact }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/hero-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-red-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-full text-red-400 text-sm font-semibold backdrop-blur-sm">
              Formation et Éducation Incendie Professionnelle
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Maîtrisez l'Art de la</span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent">
              Sécurité Incendie
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Des programmes de formation animés par des experts, conçus pour les pompiers professionnels à la recherche de techniques avancées ainsi que pour les civils souhaitant rejoindre les services de secours. Apprenez grâce à une expérience du terrain et une formation pratique concrète.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={onScrollToContact}
              className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-red-900/50"
            >
              <span>Commencez Votre Parcours</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-300 border border-white/20">
              Voir les Programmes
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-red-900/30">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-sm text-gray-400">Années d'Expérience</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Étudiants Formés</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Formations Certifiées</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </div>
  );
}