import { forwardRef } from 'react';
import { Users, GraduationCap, CheckCircle, Clock, Calendar, TrendingUp } from 'lucide-react';

interface FormationsProps {
  onContactClick: () => void;
}

const Formations = forwardRef<HTMLDivElement, FormationsProps>(({ onContactClick }, ref) => {
  return (
    <section ref={ref} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Nos </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Formations
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Choisissez le programme adapté à votre niveau d'expérience et à vos objectifs de carrière.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* PROFESSIONAL FIREFIGHTERS CARD */}
          <div
            id="firefighters"
            className="relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-red-900/30 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/30 transition-all duration-500"></div>

            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">Pompiers Professionnels</h3>
              <p className="text-gray-400 mb-6 text-base leading-relaxed">
                Une formation avancée pour les pompiers expérimentés souhaitant améliorer leurs compétences, apprendre 
                de nouvelles techniques et rester à jour avec les dernières normes de l'industrie.
              </p>

              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6346777/pexels-photo-6346777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional firefighter training"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Techniques de sauvetage avancées et opérations tactiques</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Formation au commandement et gestion d'incidents</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Ateliers sur les équipements spécialisés et technologies</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Crédits de formation continue disponibles</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-black/30 rounded-xl">
                <div className="text-center">
                  <Clock className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Durée</div>
                  <div className="text-white font-semibold">8-12 semaines</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Séances</div>
                  <div className="text-white font-semibold">2x / semaine</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Niveau</div>
                  <div className="text-white font-semibold">Avancé</div>
                </div>
              </div>

              <button
                onClick={onContactClick}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/50"
              >
                S'inscrire
              </button>
            </div>
          </div>

          {/* CIVILIAN TRAINING CARD */}
          <div
            id="civilians"
            className="relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-red-900/30 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl group-hover:bg-orange-600/30 transition-all duration-500"></div>

            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">Formation pour Civils</h3>
              <p className="text-gray-400 mb-6 text-base leading-relaxed">
                Une formation fondamentale complète pour les aspirants pompiers et les civils souhaitant 
                acquérir les compétences essentielles en sécurité incendie et se préparer à une carrière dans les secours.
              </p>

              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2459439/pexels-photo-2459439.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Civilian fire safety training"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Fondamentaux du comportement du feu et prévention</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Techniques de base de lutte contre l'incendie</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Programmes de conditionnement physique</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Orientation de carrière et préparation au recrutement</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-black/30 rounded-xl">
                <div className="text-center">
                  <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Durée</div>
                  <div className="text-white font-semibold">12-16 semaines</div>
                </div>
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Séances</div>
                  <div className="text-white font-semibold">3x / semaine</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Niveau</div>
                  <div className="text-white font-semibold">Débutant</div>
                </div>
              </div>

              <button
                onClick={onContactClick}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-orange-900/50"
              >
                S'inscrire
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