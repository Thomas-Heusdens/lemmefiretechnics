import { useEffect, useState } from 'react';
import { X, FileText, Download, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Brevet {
  id: string;
  name: string;
  description: string,
  category: string;
  pdf_url: string;
}

interface BrevetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrevetsModal({ isOpen, onClose }: BrevetsModalProps) {
  const [loading, setLoading] = useState(true);
  const [groupedBrevets, setGroupedBrevets] = useState<Record<string, Brevet[]>>({});
  const [selectedPdf, setSelectedPdf] = useState<Brevet | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Fetch Brevets from Supabase
  useEffect(() => {
    if (isOpen && Object.keys(groupedBrevets).length === 0) {
      const fetchBrevets = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('brevets')
            .select('*')
            .order('category', { ascending: true })
            .order('name', { ascending: true });

          if (error) throw error;

          if (data) {
            const grouped = data.reduce((acc, brevet) => {
              const cat = brevet.category || 'Autres';
              if (!acc[cat]) acc[cat] = [];
              acc[cat].push(brevet);
              return acc;
            }, {} as Record<string, Brevet[]>);
            setGroupedBrevets(grouped);
          }
        } catch (err) {
          console.error('Error fetching brevets:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchBrevets();
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedPdf(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={handleClose}
      ></div>

      <div className="relative w-full max-w-5xl h-[85vh] bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-800 bg-gray-900">
          <div className="flex items-center space-x-3">
            {selectedPdf ? (
              <button 
                onClick={() => setSelectedPdf(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Retour</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                <h3 className="text-lg md:text-xl font-bold text-white">Mes Certifications</h3>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative bg-gray-950">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              <p className="text-gray-400">Chargement des brevets...</p>
            </div>
          ) : selectedPdf ? (
            // PDF VIEW
            <div className="w-full h-full flex flex-col">
              <div className="px-6 py-3 bg-gray-900/50 border-b border-gray-800 flex justify-between items-center text-sm">
                <span className="text-white font-medium truncate max-w-[200px] md:max-w-md">
                  {selectedPdf.name}
                </span>
                <a 
                  href={selectedPdf.pdf_url} 
                  download 
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Télécharger</span>
                </a>
              </div>
              <iframe 
                src={`${selectedPdf.pdf_url}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full bg-white"
                title="PDF Viewer"
              />
            </div>
          ) : (
            // LIST VIEW
            <div className="h-full overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-800">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(groupedBrevets).map(([category, items]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-lg font-bold text-red-500 border-b border-red-900/30 pb-2 mb-4 top-0 bg-gray-950 z-10">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {items.map((brevet) => (
                        <button
                          key={brevet.id}
                          onClick={() => setSelectedPdf(brevet)}
                          className="w-full group flex items-start p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-gray-800 transition-all text-left"
                        >
                          <FileText className="w-5 h-5 text-gray-500 group-hover:text-red-500 mt-0.5 mr-3 transition-colors shrink-0" />
                          <div>
                            <div className="text-sm md:text-base text-gray-300 group-hover:text-white font-medium transition-colors">
                              {brevet.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {brevet.description || 'Voir le certificat'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Trust Badge */}
              <div className="mt-8 md:mt-12 p-4 md:p-6 bg-blue-900/10 border border-blue-900/30 rounded-xl flex items-start gap-4">
                <div className="p-2 bg-blue-600/20 rounded-lg shrink-0">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Authenticité garantie</h4>
                  <p className="text-xs md:text-sm text-gray-400">
                    Tous les brevets présentés ici sont des copies numériques conformes aux originaux.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}