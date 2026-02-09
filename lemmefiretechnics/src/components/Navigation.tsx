import { useState, useEffect, useRef } from 'react';
import { Flame, ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isFormationOpen, setIsFormationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if we are in any formations sub-route
  const isFormationsActive = location.pathname.includes('/formations') || location.pathname.includes('/formation/');

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFormationOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsFormationOpen(false);
      }
    };
    const handleScroll = () => {
      if (isFormationOpen) setIsFormationOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFormationOpen]);

  // Helper to handle navigation
  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsFormationOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO SECTION */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('/')}>
            <div className="relative">
              <Flame className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="currentColor" />
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-50"></div>
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent truncate">
              LEMME FIRE TECHNICS
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('/')}
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
              }`}
            >
              ACCUEIL
            </button>

            {/* DESKTOP DROPDOWN */}
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setIsFormationOpen(!isFormationOpen)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  isFormationsActive ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                }`}
              >
                <span>FORMATIONS</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${isFormationOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {isFormationOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-gray-900 border border-red-900/30 rounded-lg shadow-xl shadow-black/50 overflow-hidden"
                >
                  <button
                    onClick={() => handleNavClick('/formations/firefighter')}
                    className="w-full text-center px-4 py-3 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-colors border-b border-gray-800"
                  >
                    POMPIERS
                  </button>
                  <button
                    onClick={() => handleNavClick('/formations/civilian')}
                    className="w-full text-center px-4 py-3 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                  >
                    CIVILS
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/gallery')}
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/gallery' ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
              }`}
            >
              GALERIE
            </button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-red-500 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-red-900/30 backdrop-blur-xl animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-8 flex flex-col items-center space-y-6">
            
            <button
              onClick={() => handleNavClick('/')}
              className={`text-lg font-medium tracking-wide transition-colors ${
                location.pathname === '/' ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              ACCUEIL
            </button>

            <div className="w-12 h-px bg-gray-800/80"></div>

            <div className="flex flex-col items-center space-y-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">
                Formations
              </span>
              
              <button
                onClick={() => handleNavClick('/formations/firefighter')}
                className={`text-lg font-medium transition-colors ${
                  location.pathname.includes('firefighter') ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                }`}
              >
                POMPIERS
              </button>
              
              <button
                onClick={() => handleNavClick('/formations/civilian')}
                className={`text-lg font-medium transition-colors ${
                  location.pathname.includes('civilian') ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                }`}
              >
                CIVILS
              </button>
            </div>

            <div className="w-12 h-px bg-gray-800/80"></div>

            <button
              onClick={() => handleNavClick('/gallery')}
              className={`text-lg font-medium tracking-wide transition-colors ${
                location.pathname === '/gallery' ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              GALERIE
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}