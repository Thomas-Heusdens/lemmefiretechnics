import { useState } from 'react';
import { X } from 'lucide-react';

// Traduction des catégories pour l'affichage et le filtrage
// Note: J'utilise des constantes pour éviter les erreurs de frappe
const CAT_TRAINING = 'Entraînement';
const CAT_EQUIPMENT = 'Équipement';
const CAT_FACILITY = 'Installations';
const CAT_ALL = 'tout';

const galleryImages = [
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>(CAT_ALL);

  // Mise à jour des catégories disponibles
  const categories = [CAT_ALL, CAT_TRAINING, CAT_EQUIPMENT, CAT_FACILITY];

  const filteredImages = filter === CAT_ALL
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Galerie </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Photos
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez nos sessions de formation pratique, nos installations de pointe et le dévouement
            de nos étudiants et instructeurs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {/* Capitalize first letter */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-red-400 text-sm">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          {/* Note: j'ai ajouté une vérification ici car filteredImages change quand on filtre */}
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[selectedImage]?.url || galleryImages[selectedImage].url}
              alt={filteredImages[selectedImage]?.title || galleryImages[selectedImage].title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-center mt-6">
              <h3 className="text-white font-semibold text-2xl mb-2">
                {filteredImages[selectedImage]?.title || galleryImages[selectedImage].title}
              </h3>
              <p className="text-red-400">
                {filteredImages[selectedImage]?.category || galleryImages[selectedImage].category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}