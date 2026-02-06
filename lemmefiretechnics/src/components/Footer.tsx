import { Flame, Mail, MapPin, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'gallery') => void;
  onScrollToSection?: (section: string) => void;
}

export default function Footer({ onNavigate, onScrollToSection }: FooterProps) {
  const handleLinkClick = (section: string) => {
    onNavigate('home');
    setTimeout(() => onScrollToSection?.(section), 100);
  };

  return (
    <footer className="bg-black border-t border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Flame className="w-8 h-8 text-red-600" fill="currentColor" />
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-50"></div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                LEMME FIRE TECHNICS
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Formation et éducation professionnelles à la sécurité incendie pour les pompiers et les futurs membres des services de secours.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  Acceuil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('firefighters')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  Fromations pour Professionel
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('civilians')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  Formations pour Civil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  Gallerie
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:contact@lemmefiretechnics.com"
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  contact@lemmefiretechnics.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Fire Safety Training Center
                  <br />
                  1234 Safety Boulevard
                  <br />
                  Brussels, BE 1000
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
            <a
              href="https://www.instagram.com/lemmefiretechnics/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg text-white text-sm transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-red-900/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} LEMME FIRE TECHNICS. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm">
                Créé avec passion par{' '}
                <a 
                    href="https://www.linkedin.com/in/thomas-heusdens-0bba19258/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-500 font-semibold hover:text-red-400 transition-colors"
                >
                    Thomas Heusdens
                </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}