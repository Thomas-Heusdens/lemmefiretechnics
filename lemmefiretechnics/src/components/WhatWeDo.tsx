import { Flame, Lightbulb, ChevronLeft, ChevronRight, ShieldCheck, Crosshair } from 'lucide-react';
import { useState } from 'react';
import BrevetsModal from './BrevetsModal';

const chinaImages = [
  "/china.webp",
  "/China2.webp",
  "/china_group.webp",
];

export default function WhatWeDo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % chinaImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + chinaImages.length) % chinaImages.length);
  };

  return (
    <section className="py-10 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight">
            <span className="text-white">Qui Je </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Suis
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            David Leemans, pompier depuis 2006. Fort d'un passé militaire, je mets aujourd'hui deux décennies d'expertise de terrain au service de votre formation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-8">
          <div className="relative h-80 md:h-[500px] lg:h-full rounded-2xl overflow-hidden group shadow-2xl shadow-black/50">
            <img
                src="https://images.pexels.com/photos/6519876/pexels-photo-6519876.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fire training exercise"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          </div>

          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            
            <div className="flex items-start space-x-5 p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-red-900/10 hover:border-red-600/30 hover:bg-gray-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/20">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Expertise & Engagement au Quotidien</h4>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  Actuellement Adjudant à la caserne d'Uccle (Bruxelles), j'assure la fonction de chef de section grâce à mon expérience de terrain. Passionné par l’évolution de notre métier, je poursuis ma formation d’Officier (OFF1).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-5 p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-red-900/10 hover:border-red-600/30 hover:bg-gray-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Une Qualification Certifiée</h4>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  La transmission du savoir ne s'improvise pas. Je détiens{' '}
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-red-400 font-semibold hover:text-red-300 hover:underline transition-all cursor-pointer focus:outline-none"
                  >
                    l'ensemble des brevets
                  </button>
                  {' '}et qualifications pédagogiques nécessaires pour garantir un enseignement conforme aux normes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-5 p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-red-900/10 hover:border-red-600/30 hover:bg-gray-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/20">
                <Crosshair className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Spécialisation & Maîtrise Technique</h4>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  Spécialiste du Secours Technique et de la Lutte Contre l'Incendie (LCI), je possède une expertise approfondie validée par mes brevets supérieurs.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <h3 className="text-2xl text-center md:text-left md:text-4xl font-bold text-white leading-tight">
              Une expertise sans frontières:{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mt-2">
                Mon expérience en Chine
              </span>
            </h3>
            <p className="text-sm text-center md:text-left md:text-base text-gray-400 leading-relaxed">
              Transmettre n'est pas seulement une profession pour moi, c'est une mission qui m'a conduit bien au-delà de nos frontières. J'ai eu l'opportunité unique d'être sollicité pour dispenser des formations de haut niveau en Chine.
              <br /><br />
              Cette expérience internationale fut un véritable catalyseur : Adaptabilité extrême, partage de techniques de pointe et confirmation de l'universalité de notre métier.
            </p>
            <div className="flex items-start space-x-5 p-6 bg-gradient-to-r from-red-900/10 to-orange-900/10 rounded-xl border border-red-600/20">
              <Lightbulb className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Expertise Technique Exportée</h4>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  Ma mission en Chine s'est concentrée sur le <strong>Sauvetage Technique Lourd</strong> et les protocoles de <strong>Lutte Contre l'Incendie (LCI)</strong> en milieu urbain dense.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-80 md:h-[450px] lg:h-full rounded-2xl overflow-hidden group order-1 lg:order-2 bg-gray-800 shadow-2xl shadow-black/50">
            <div className="absolute inset-0 w-full h-full">
              {chinaImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Experience China ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                </div>
              ))}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-0 top-0 bottom-0 w-12 md:w-16 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors z-10 group/btn touch-manipulation"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover/btn:text-white transition-colors" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-0 top-0 bottom-0 w-12 md:w-16 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors z-10 group/btn touch-manipulation"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover/btn:text-white transition-colors" />
            </button>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
              {chinaImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-red-600 w-8' : 'bg-white/40 hover:bg-white w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      <BrevetsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </section>
  );
}