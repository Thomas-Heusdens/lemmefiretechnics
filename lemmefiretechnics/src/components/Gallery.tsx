import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type GalleryImage = {
  url: string;
  title: string;
  category: string;
};

const CAT_TRAINING = 'Entraînement';
const CAT_EQUIPMENT = 'Équipement';
const CAT_FACILITY = 'Installations';
const CAT_ALL = 'tout';

const galleryImages: GalleryImage[] = [
  {
    url: 'https://images.pexels.com/photos/3867340/pexels-photo-3867340.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Exercice à Feu Réel',
    category: CAT_TRAINING,
  },
  {
    url: 'https://images.pexels.com/photos/6519876/pexels-photo-6519876.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Exercice en Équipe',
    category: CAT_TRAINING,
  },
  {
    url: 'https://images.pexels.com/photos/280076/pexels-photo-280076.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Vérification Matériel',
    category: CAT_EQUIPMENT,
  },
  {
    url: 'https://images.pexels.com/photos/2459439/pexels-photo-2459439.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Briefing Sécurité',
    category: CAT_TRAINING,
  },
  {
    url: 'https://images.pexels.com/photos/7551616/pexels-photo-7551616.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Centre de Formation',
    category: CAT_FACILITY,
  },
  {
    url: 'https://images.pexels.com/photos/6346777/pexels-photo-6346777.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Techniques Avancées',
    category: CAT_TRAINING,
  },
  {
    url: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Opérations de Sauvetage',
    category: CAT_TRAINING,
  },
  {
    url: 'https://images.pexels.com/photos/4391484/pexels-photo-4391484.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Coordination d\'Équipe',
    category: CAT_TRAINING,
  },
  {
    url: 'https://images.pexels.com/photos/618923/pexels-photo-618923.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Formation Véhicule',
    category: CAT_EQUIPMENT,
  },
  {
    url: 'https://images.pexels.com/photos/3867346/pexels-photo-3867346.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Opérations Nocturnes',
    category: CAT_TRAINING,
  },
  {
    url: 'https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Préparation Équipement',
    category: CAT_EQUIPMENT,
  },
  {
    url: 'https://images.pexels.com/photos/2459442/pexels-photo-2459442.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Compétences Pratiques',
    category: CAT_TRAINING,
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>(CAT_ALL);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const categories = [CAT_ALL, CAT_TRAINING, CAT_EQUIPMENT, CAT_FACILITY];

  const filteredImages = filter === CAT_ALL
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            <span className="text-white">Galerie </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Photos
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            Découvrez nos sessions de formation pratique, nos installations de pointe et le dévouement
            de nos étudiants et instructeurs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${
                filter === category
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white border border-white/5'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square border border-white/10 shadow-md shadow-black/50"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-white font-semibold text-lg mb-1 truncate">{image.title}</h3>
                <span className="inline-block px-2 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-xs font-medium">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-auto h-auto max-w-5xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="block w-auto h-auto max-h-[85vh] max-w-full object-contain" 
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10 pointer-events-none"></div>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-red-600 backdrop-blur-sm text-white rounded-full transition-all duration-300 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left z-10">
              <h3 className="text-white font-bold text-xl md:text-3xl mb-2 drop-shadow-md">
                {selectedImage.title}
              </h3>
              <span className="inline-block px-3 py-1 bg-red-600/60 backdrop-blur-md border border-red-500/30 rounded-full text-white text-xs md:text-sm font-medium shadow-sm">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}