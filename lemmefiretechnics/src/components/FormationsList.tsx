import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, Lock, Loader2, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Updated Interface to match DB (with _fr and _nl)
interface Formation {
  id: string;
  category: string;
  image_url: string;
  has_levels: boolean;
  brevet_id: string;
  // Dynamic fields
  name_fr: string;
  name_nl: string;
  description_fr: string;
  description_nl: string;
}

interface Brevet {
  id: string;
  name_fr: string;
  name_nl: string;
  description_fr: string;
  description_nl: string;
}

interface FormationsListProps {
  category: 'civilian' | 'firefighter';
  onSelectFormation: (formationId: string) => void;
  onBack: () => void;
}

export default function FormationsList({ category, onSelectFormation, onBack }: FormationsListProps) {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [brevets, setBrevets] = useState<Record<string, Brevet>>({});
  const [loading, setLoading] = useState(true);
  
  const { t, i18n } = useTranslation();
  
  // Extract simple language code ('fr' or 'nl')
  const currentLang = i18n.language.split('-')[0]; 

  // Helper to get dynamic content safely
  const getContent = (obj: any, field: string) => {
    if (!obj) return '';
    const val = obj[`${field}_${currentLang}`];
    return val || obj[`${field}_fr`]; // Fallback to FR if NL is missing
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: formationsData } = await supabase
          .from('formations')
          .select('*')
          .eq('category', category)
          .order('name_fr'); // Default order

        if (formationsData) {
          setFormations(formationsData);

          const brevetsSet = new Set(
            formationsData.filter(f => f.brevet_id).map(f => f.brevet_id)
          );

          if (brevetsSet.size > 0) {
            const { data: brevetsData } = await supabase
              .from('brevets')
              .select('*')
              .in('id', Array.from(brevetsSet));

            if (brevetsData) {
              const brevetsMap = Object.fromEntries(
                brevetsData.map(b => [b.id, b])
              );
              setBrevets(brevetsMap);
            }
          }
        }
      } catch (error) {
        console.error('Error loading formations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
        <div className="text-gray-400 font-medium">{t('common.loading', 'Chargement...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <button
          onClick={onBack}
          className="group mb-12 text-gray-400 hover:text-white transition-colors flex items-center space-x-2 font-medium"
        >
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-red-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span>{t('formations_list.back_home', "Retour à l'accueil")}</span>
        </button>

        <div className="text-center mb-8 md:mb-16 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="text-white">{t('formations_list.title_prefix', 'Formations')} </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {category === 'civilian' 
                ? t('formations_list.title_civilian', 'Civiles') 
                : t('formations_list.title_firefighter', 'Pompiers')}
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {category === 'civilian'
              ? t('formations_list.desc_civilian', 'Acquérez les fondamentaux essentiels et préparez-vous efficacement.')
              : t('formations_list.desc_firefighter', 'Des modules de perfectionnement technique avancés pour les pros.')}
          </p>
        </div>

        {formations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {formations.map((formation) => (
              <div
                key={formation.id}
                className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-red-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/10 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={formation.image_url}
                    alt={getContent(formation, 'name')}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-90"></div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                     {category === 'civilian' 
                        ? t('common.civilian', 'Civil') 
                        : t('common.pro', 'Pro')}
                  </div>
                </div>

                <div className="p-4 md:p-6 flex flex-col flex-grow relative">
                  <h3 className="text-xl md:text-2xl text-center md:text-left font-bold text-white mb-1 md:mb-3">
                    {getContent(formation, 'name')}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 md:mb-6 text-center md:text-left line-clamp-3 leading-relaxed flex-grow">
                    {getContent(formation, 'description')}
                  </p>

                  {formation.brevet_id && brevets[formation.brevet_id] && (
                    <div className="mb-4 md:mb-6 p-3 bg-red-950/30 border border-red-900/30 rounded-lg flex items-start gap-3">
                      <Lock className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-red-400 font-bold tracking-wide mb-0.5">
                          {t('formations_list.brevet_required', 'Brevet Applicable')}
                        </div>
                        <div className="text-sm text-red-200 font-medium leading-tight">
                          {getContent(brevets[formation.brevet_id], 'name')}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <div onClick={() => onSelectFormation(formation.id)} className="w-full cursor-pointer py-3 bg-white/5 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center group/btn border border-white/5 hover:border-red-500">
                      <span className="mr-2">{t('formations_list.see_details', 'Voir les détails')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-white/5">
            <p className="text-gray-400 text-lg">{t('formations_list.no_formations', 'Aucune formation disponible.')}</p>
            <button 
              onClick={onBack}
              className="mt-4 text-red-500 hover:text-red-400 font-medium"
            >
              {t('formations_list.back_home', "Retour à l'accueil")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}