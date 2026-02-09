import { forwardRef } from 'react';
import { Users, GraduationCap, CheckCircle } from 'lucide-react';

interface FormationsProps {
  onCategorySelect: (category: 'civilian' | 'firefighter') => void;
}

const Formations = forwardRef<HTMLDivElement, FormationsProps>(({ onCategorySelect }, ref) => {
  return (
    <section ref={ref} className="py-16 md:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold md:mb-4 mb-2">
            <span className="text-white">Ce Que </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              J'offre
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            Choisissez le programme adapté à votre niveau d'expérience et à vos objectifs de carrière.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* --- PROFESSIONAL FIREFIGHTERS CARD --- */}
          <div
            id="firefighters"
            className="relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-red-900/30 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/30 transition-all duration-500"></div>

            <div className="relative p-6 md:p-8">
              
              <div className="flex flex-row md:flex-col items-center md:items-start md:mb-6 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-4 md:mr-0 md:mb-6 shrink-0">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white">Formations pour Pompiers</h3>
              </div>

              <p className="text-gray-400 text-center md:text-left mb-6 text-sm md:text-base leading-relaxed">
                Des modules techniques, du perfectionnement à l'expertise avancée, destinés aux pompiers expérimentés désireux d'évoluer et d'optimiser leurs compétences opérationnelles.
              </p>

              <div className="relative h-40 md:h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6346777/pexels-photo-6346777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional firefighter training"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-300">Techniques de sauvetage avancées</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-300">Commandement et gestion</span>
                </div>
              </div>
              
              <button
                onClick={() => onCategorySelect('firefighter')}
                className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/50 text-sm md:text-base"
              >
                Voir les formations
              </button>
            </div>
          </div>

          {/* --- CIVILIAN TRAINING CARD --- */}
          <div
            id="civilians"
            className="relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-red-900/30 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl group-hover:bg-orange-600/30 transition-all duration-500"></div>

            <div className="relative p-6 md:p-8">
              
              <div className="flex flex-row md:flex-col items-center md:items-start md:mb-6 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mr-4 md:mr-0 md:mb-6 shrink-0">
                  <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white">Formation pour Civils</h3>
              </div>

              <p className="text-gray-400 text-center md:text-left mb-6 text-sm md:text-base leading-relaxed">
                Des programmes fondamentaux complets conçus pour les futurs aspirants pompiers ainsi que pour les entreprises souhaitant répondre à leurs obligations légales.
              </p>

              <div className="relative h-40 md:h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2459439/pexels-photo-2459439.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Civilian fire safety training"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-300">Fondamentaux incendie</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-300">Conditionnement physique</span>
                </div>
              </div>
              <button
                onClick={() => onCategorySelect('civilian')}
                className="w-full py-3 md:py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-orange-900/50 text-sm md:text-base"
              >
                Voir les formations
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Formations.displayName = 'Formations';

export default Formations;