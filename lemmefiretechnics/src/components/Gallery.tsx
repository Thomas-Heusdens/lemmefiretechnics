import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import SEO from './SEO';

type GalleryImage = {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
};

type Category = {
  id: string;
  label: string;
};

// Standard Fisher-Yates shuffle algorithm for truly random mixing
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Static images (Legacy)
const STATIC_IMAGES: GalleryImage[] = [
  {
    id: 'static-1',
    url: '/materiel/burned_helmet.webp',
    title: 'Casque Brulé',
    category: 'equipment',
  },
  {
    id: 'static-2',
    url: '/materiel/camion.jpeg',
    title: 'Camion Pompier',
    category: 'equipment',
  },
  {
    id: 'static-3',
    url: '/materiel/helmet.jpg',
    title: 'Casque Pompier',
    category: 'equipment',
  },
  {
    id: 'static-4',
    url: '/materiel/materiel_1.jpeg',
    title: 'Préparation des Bonbonnes d\'Oxigen',
    category: 'equipment',
  },
  {
    id: 'static-5',
    url: '/materiel/materiel_2.webp',
    title: 'Tronçonneuse',
    category: 'equipment',
  },
  {
    id: 'static-6',
    url: '/materiel/materiel_3.jpeg',
    title: 'Pompe pour Voiture',
    category: 'equipment',
  },
  {
    id: 'static-7',
    url: '/groupe/talk_1.webp',
    title: 'Coupe Bois',
    category: 'equipment',
  },
  {
    id: 'static-8',
    url: '/materiel/materiel_5.jpeg',
    title: 'Coupe Voiture',
    category: 'equipment',
  },
  {
    id: 'static-9',
    url: '/materiel/materiel_6.jpeg',
    title: 'Casque & Veste Pompier',
    category: 'equipment',
  },
  {
    id: 'static-10',
    url: '/materiel/materiel_7.jpeg',
    title: 'Cône',
    category: 'equipment',
  },
  {
    id: 'static-11',
    url: '/materiel/materiel_8.jpeg',
    title: 'Sac de Pompier',
    category: 'equipment',
  },
];

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const getContent = (obj: any, field: string) => {
    if (!obj) return '';
    return obj[`${field}_${currentLang}`] || obj[`${field}_fr`];
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);

        const { data: formations } = await supabase
          .from('formations')
          .select('id, image_url, name_fr, name_nl, image_desc_fr, image_desc_nl');

        const { data: levels } = await supabase
          .from('formation_levels')
          .select('id, image_url, name_fr, name_nl, image_desc_fr, image_desc_nl, formation_id');

        const { data: extras } = await supabase
          .from('level_images')
          .select('id, image_url, description_fr, description_nl, level_id'); 

        let dynamicImages: GalleryImage[] = [];
        
        // Build dynamic categories from formations
        const dynamicCategories: Category[] = [
          { id: 'all', label: t('gallery.cat_all', 'Tout') },
          { id: 'equipment', label: t('gallery.cat_equipment', 'Équipement') }
        ];

        if (formations) {
          formations.forEach((f: any) => {
            // ONLY add formation to our filters, skip adding its image to prevent duplicates
            dynamicCategories.push({
              id: f.id,
              label: getContent(f, 'name')
            });
          });
        }
        
        setCategories(dynamicCategories);

        // Map levels to their parent formations for fast lookup
        const levelToFormation: Record<string, string> = {};

        if (levels) {
          levels.forEach((l: any) => {
            if (l.formation_id) {
              levelToFormation[l.id] = l.formation_id;
            }

            if (l.image_url) {
              dynamicImages.push({
                id: `level-${l.id}`,
                url: l.image_url,
                title: getContent(l, 'name'),
                description: getContent(l, 'image_desc'),
                category: l.formation_id, 
              });
            }
          });
        }

        if (extras) {
          extras.forEach((e: any) => {
            const parentFormationId = levelToFormation[e.level_id];
            if (e.image_url && parentFormationId) {
              dynamicImages.push({
                id: `extra-${e.id}`,
                url: e.image_url,
                title: t('gallery.extra_image_title', 'Galerie'),
                description: getContent(e, 'description'),
                category: parentFormationId, 
              });
            }
          });
        }
        
        // Combine all images
        const allImages = [...STATIC_IMAGES, ...dynamicImages];
        
        // Bulletproof Deduplication: Ensure no two images have the exact same URL
        const uniqueImages = Array.from(new Map(allImages.map(img => [img.url, img])).values());
        
        // Apply the shuffle algorithm to the clean list
        const mixedImages = shuffleArray(uniqueImages);
        
        setImages(mixedImages);

      } catch (error) {
        console.error("Error loading gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [currentLang, t]);

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);

  // Helper to get the translated name for the image badge
  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20">
      <SEO 
        title={t('seo.gallery.title')} 
        description={t('seo.gallery.description')} 
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            <span className="text-white">{t('gallery.title_start', 'Galerie')} </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {t('gallery.title_end', 'Photos')}
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            {t('gallery.subtitle', 'Découvrez nos sessions de formation pratique et nos équipements.')}
          </p>
        </div>

        {/* DYNAMIC FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square border border-white/10 shadow-md shadow-black/50"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-white font-semibold text-lg mb-1 truncate">{image.title}</h3>
                <span className="inline-block px-2 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-xs font-medium uppercase truncate max-w-full">
                  {getCategoryLabel(image.category)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-auto h-auto max-w-6xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row bg-gray-900 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="flex-1 relative flex items-center justify-center bg-black">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-h-[60vh] md:max-h-[90vh] w-full object-contain" 
                  loading="lazy"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
            </div>

            {/* Info Sidebar */}
            <div className="w-full md:w-80 bg-gray-900 p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
                <h3 className="text-white font-bold text-xl md:text-2xl mb-4 leading-tight">
                    {selectedImage.title}
                </h3>
                
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider">
                        {getCategoryLabel(selectedImage.category)}
                    </span>
                </div>

                {selectedImage.description && (
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedImage.description}
                    </p>
                )}
            </div>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 backdrop-blur-md text-white rounded-full transition-all duration-300 z-20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}