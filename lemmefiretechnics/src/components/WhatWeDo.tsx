import { Flame, Shield, Target, Lightbulb } from 'lucide-react';

export default function WhatWeDo() {
  return (
    <section className="py-12 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Ce Qu'on </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Offre
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Des programmes de formation complets alliant connaissances théoriques et expérience pratique pour vous préparer aux défis réels de la sécurité incendie.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-8">
          <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden group">
            <img
                src="https://images.pexels.com/photos/6519876/pexels-photo-6519876.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fire training exercise"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Formation Pratique</h3>
                <p className="text-gray-300">Mises en situation réelles et expérience pratique sur le terrain.</p>
            </div>
        </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-gray-800/50 rounded-xl border border-red-900/20 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Instruction par des Experts</h4>
                <p className="text-gray-400">
                  Apprenez aux côtés de pompiers chevronnés possédant des décennies d'expérience concrète en extinction d'incendie et en opérations de sauvetage.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-800/50 rounded-xl border border-red-900/20 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">La Sécurité avant Tout</h4>
                <p className="text-gray-400">
                  Toutes les formations suivent des protocoles de sécurité stricts et les meilleures pratiques du secteur pour garantir un environnement d'apprentissage sûr.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-800/50 rounded-xl border border-red-900/20 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Programmes Sur Mesure</h4>
                <p className="text-gray-400">
                  Des parcours de formation personnalisés, aussi bien pour les professionnels souhaitant évoluer que pour les civils débutant leur carrière dans les services d'incendie.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <h3 className="text-3xl font-bold text-white">
              Développer des Compétences qui{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Sauvent des Vies
              </span>
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              Notre programme complet couvre tout, du comportement de base du feu et de la prévention aux techniques de sauvetage avancées et aux procédures d'intervention d'urgence. Chaque session est conçue pour renforcer la confiance et les compétences grâce à un développement progressif des acquis.
            </p>
            <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-xl border border-red-600/30">
              <Lightbulb className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Apprentissage Continu</h4>
                <p className="text-gray-400">
                  Restez à jour avec les dernières techniques, les équipements et les normes de sécurité dans le domaine en constante évolution de la sécurité incendie et de l'intervention d'urgence.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden group order-1 lg:order-2">
            <img
                src="https://images.pexels.com/photos/280076/pexels-photo-280076.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Firefighter equipment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Équipement Professionnel</h3>
                <p className="text-gray-300">Formez-vous avec des équipements et outils aux normes de l'industrie</p>
            </div>
        </div>
        </div>
      </div>
    </section>
  );
}