import { Flame, Mail, Instagram, Phone, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import hook

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize hook

  const handleLinkClick = (path: string, hash?: string) => {
    navigate(path);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-black border-t border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* BRANDING */}
          <div>
            <div className="flex items-center space-x-2 md:space-x-3 mb-4">
              <div className="relative flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Lemme Fire Technics Logo" 
                  className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10" 
                />
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-50"></div>
              </div>
              <span className="text-base md:text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent truncate">
                LEMME FIRE TECHNICS
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('/')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/formations/firefighter')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  {t('home_formations.pro.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/formations/civilian')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  {t('home_formations.civil.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/gallery')}
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  {t('nav.gallery')}
                </button>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contact.title_end')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:david.leemans@fire.brussels"
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                >
                  david.leemans@fire.brussels
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className='flex flex-col items-start'>
            <h3 className="text-white font-semibold mb-4">{t('footer.follow_us')}</h3>
            <a
              href="https://www.instagram.com/lemmefiretechnics/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mb-2 items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg text-white text-sm transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@Lemmefiretechnics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg text-white text-sm transition-all duration-300"
            >
              <Youtube className="w-5 h-5" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-red-900/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} LEMME FIRE TECHNICS. {t('footer.copyright')}
            </p>
            <p className="text-gray-500 text-sm">
                {t('footer.created_by')}{' '}
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