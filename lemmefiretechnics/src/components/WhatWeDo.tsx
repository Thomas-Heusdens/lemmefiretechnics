import { Flame, Shield, Lightbulb, ChevronLeft, ChevronRight, FileText, Download, X, ArrowLeft, ShieldCheck, Crosshair } from 'lucide-react';
import { useEffect, useState } from 'react';

const CERTIFICATE_GROUPS = [
  {
    title: "Commandement & Leadership",
    items: [
      { name: "Brevet OFF1 - Officier", file: "/test.pdf" },
      { name: "Brevet ADJ - Adjudant", file: "/test.pdf" },
      { name: "Gestion de crise niveau 2", file: "/test.pdf" },
    ]
  },
  {
    title: "Techniques Spéciales",
    items: [
      { name: "Instructeur LCI (Lutte Contre l'Incendie)", file: "/test.pdf" },
      { name: "Spécialiste Secours Routier", file: "/test.pdf" },
      { name: "Opérateur GRIMP", file: "/test.pdf" },
    ]
  },
  {
    title: "Pédagogie",
    items: [
      { name: "Formation Pédagogique FOROP 1", file: "/test.pdf" },
      { name: "Coordinateur CFPB", file: "/test.pdf" },
    ]
  }
];

const chinaImages = [
  "https://images.pexels.com/photos/280076/pexels-photo-280076.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://tricountytech.edu/wp-content/uploads/2024/12/Firefighter-EMT-High-School-Square-Image-scaled.jpg",
  "https://images.pexels.com/photos/1046348/pexels-photo-1046348.jpeg?auto=compress&cs=tinysrgb&w=800",
];

export default function WhatWeDo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ name: string; file: string } | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % chinaImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + chinaImages.length) % chinaImages.length);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };
  const handlePdfSelect = (item: { name: string; file: string }) => setSelectedPdf(item);
  const handleBackToList = () => setSelectedPdf(null);

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
                    onClick={openModal}
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

      {/* --- MODAL PDF --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-5xl h-[85vh] bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-800 bg-gray-900">
              <div className="flex items-center space-x-3">
                {selectedPdf ? (
                  <button 
                    onClick={handleBackToList}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm font-medium">Retour</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                    <h3 className="text-lg md:text-xl font-bold text-white">Certifications</h3>
                  </div>
                )}
              </div>
              
              <button 
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-hidden relative bg-gray-950">
              {selectedPdf ? (
                <div className="w-full h-full flex flex-col">
                  <div className="px-6 py-3 bg-gray-900/50 border-b border-gray-800 flex justify-between items-center text-sm">
                    <span className="text-white font-medium truncate max-w-[200px] md:max-w-md">{selectedPdf.name}</span>
                    <a 
                      href={selectedPdf.file} 
                      download 
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Télécharger</span>
                    </a>
                  </div>
                  <iframe 
                    src={`${selectedPdf.file}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full bg-white"
                    title="PDF Viewer"
                  />
                </div>
              ) : (
                <div className="h-full overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-800">
                  <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {CERTIFICATE_GROUPS.map((group, index) => (
                      <div key={index} className="space-y-4">
                        <h4 className="text-lg font-bold text-red-500 border-b border-red-900/30 pb-2 mb-4">
                          {group.title}
                        </h4>
                        <div className="space-y-2">
                          {group.items.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePdfSelect(item)}
                              className="w-full group flex items-start p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-gray-800 transition-all text-left"
                            >
                              <FileText className="w-5 h-5 text-gray-500 group-hover:text-red-500 mt-0.5 mr-3 transition-colors shrink-0" />
                              <div>
                                <div className="text-sm md:text-base text-gray-300 group-hover:text-white font-medium transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Voir le certificat</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 md:mt-12 p-4 md:p-6 bg-blue-900/10 border border-blue-900/30 rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-blue-600/20 rounded-lg shrink-0">
                      <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Authenticité garantie</h4>
                      <p className="text-xs md:text-sm text-gray-400">
                        Tous les brevets sont des copies numériques conformes aux originaux.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}