import { useState, useEffect, useRef } from 'react';
import { Flame, ChevronDown, Menu, X, Globe, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const [isFormationOpen, setIsFormationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Nouvel état pour le dropdown de langue
  const [isLangOpen, setIsLangOpen] = useState(false); 
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Refs pour le dropdown langue
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation(); // Hook de traduction

  const isFormationsActive = location.pathname.includes('/formations') || location.pathname.includes('/formation/');
  const currentLang = i18n.language.split('-')[0].toUpperCase(); // "FR" ou "NL"

  // Fermeture au resize
  useEffect(() => {
    const handleResize = () => setIsMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du click outside (pour les 2 dropdowns)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Dropdown Formations
      if (
        isFormationOpen &&
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setIsFormationOpen(false);
      }

      // Dropdown Langue
      if (
        isLangOpen &&
        langDropdownRef.current && !langDropdownRef.current.contains(target) &&
        langButtonRef.current && !langButtonRef.current.contains(target)
      ) {
        setIsLangOpen(false);
      }
    };

    const handleScroll = () => {
      if (isFormationOpen) setIsFormationOpen(false);
      if (isLangOpen) setIsLangOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFormationOpen, isLangOpen]);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsFormationOpen(false);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
    setIsMobileMenuOpen(false); // Ferme aussi le menu mobile si ouvert
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex items-center space-x-1 md:space-x-3 cursor-pointer" onClick={() => handleNavClick('/')}>
            <div className="relative">
              <Flame className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="currentColor" />
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-50"></div>
            </div>
            <span className="text-base md:text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent truncate">
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
              {t('nav.home')}
            </button>

            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setIsFormationOpen(!isFormationOpen)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  isFormationsActive ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                }`}
              >
                <span>{t('nav.formations')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFormationOpen ? 'rotate-180' : ''}`} />
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
                    {t('nav.firefighters')}
                  </button>
                  <button
                    onClick={() => handleNavClick('/formations/civilian')}
                    className="w-full text-center px-4 py-3 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                  >
                    {t('nav.civilians')}
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
              {t('nav.gallery')}
            </button>

            {/* --- LANGUE DROPDOWN (DESKTOP) --- */}
            <div className="relative ml-4">
              <button
                ref={langButtonRef}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1.5 text-sm font-medium text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-500 bg-white/5 rounded-full px-3 py-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div
                  ref={langDropdownRef}
                  className="absolute top-full right-0 mt-2 w-36 bg-gray-900 border border-white/10 rounded-lg shadow-xl shadow-black/50 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                  <button
                    onClick={() => changeLanguage('fr')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span>Français</span>
                    {currentLang === 'FR' && <Check className="w-3 h-3 text-red-500" />}
                  </button>
                  <button
                    onClick={() => changeLanguage('nl')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-t border-white/5"
                  >
                    <span>Nederlands</span>
                    {currentLang === 'NL' && <Check className="w-3 h-3 text-red-500" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE HAMBURGER + LANGUE */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Langue Mobile (Simplifié) */}
            <button
                onClick={() => changeLanguage(currentLang === 'FR' ? 'nl' : 'fr')}
                className="flex items-center space-x-1 text-xs font-bold text-gray-300 border border-gray-700/50 rounded px-2 py-1"
            >
                {currentLang}
                <span className="text-gray-600">|</span>
                <span className="text-gray-500">{currentLang === 'FR' ? 'NL' : 'FR'}</span>
            </button>

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
            <button onClick={() => handleNavClick('/')} className="text-lg font-medium tracking-wide text-gray-300">
              {t('nav.home')}
            </button>
            <div className="w-12 h-px bg-gray-800/80"></div>
            <div className="flex flex-col items-center space-y-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">{t('nav.formations')}</span>
              <button onClick={() => handleNavClick('/formations/firefighter')} className="text-lg font-medium text-gray-300">
                {t('nav.firefighters')}
              </button>
              <button onClick={() => handleNavClick('/formations/civilian')} className="text-lg font-medium text-gray-300">
                {t('nav.civilians')}
              </button>
            </div>
            <div className="w-12 h-px bg-gray-800/80"></div>
            <button onClick={() => handleNavClick('/gallery')} className="text-lg font-medium tracking-wide text-gray-300">
              {t('nav.gallery')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}