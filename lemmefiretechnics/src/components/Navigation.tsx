import { useState } from 'react';
import { Flame, ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'gallery';
  onNavigate: (page: 'home' | 'gallery') => void;
  onScrollToSection?: (section: string) => void;
}

export default function Navigation({ currentPage, onNavigate, onScrollToSection }: NavigationProps) {
  const [isFormationOpen, setIsFormationOpen] = useState(false);

  const handleFormationClick = (type: 'firefighters' | 'civilians') => {
    setIsFormationOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => onScrollToSection?.(type), 100);
    } else {
      onScrollToSection?.(type);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="relative">
              <Flame className="w-10 h-10 text-red-600" fill="currentColor" />
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-50"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              LEMME FIRE TECHNICS
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
              }`}
            >
              ACCEUIL
            </button>

            <div className="relative">
              <button
                onClick={() => setIsFormationOpen(!isFormationOpen)}
                onMouseEnter={() => setIsFormationOpen(true)}
                className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors"
              >
                <span>FORMATIONS</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isFormationOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFormationOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-64 bg-gray-900 border border-red-900/30 rounded-lg shadow-xl overflow-hidden"
                  onMouseLeave={() => setIsFormationOpen(false)}
                >
                  <button
                    onClick={() => handleFormationClick('firefighters')}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-colors border-b border-gray-800"
                  >
                    Secteur Professionnel
                  </button>
                  <button
                    onClick={() => handleFormationClick('civilians')}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                  >
                    Secteur Civil
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('gallery')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'gallery' ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
              }`}
            >
              GALLERIE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}