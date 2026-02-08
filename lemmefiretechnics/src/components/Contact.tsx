import { forwardRef, useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Loader2, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';

interface FormationOption {
  id: string;
  name: string;
  category: 'civilian' | 'firefighter';
}

const Contact = forwardRef<HTMLDivElement>((_, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    specific_formation: '',
    message: '',
  });

  const [availableFormations, setAvailableFormations] = useState<FormationOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const { data, error } = await supabase
          .from('formations')
          .select('id, name, category')
          .order('name');
        
        if (error) throw error;
        if (data) setAvailableFormations(data);
      } catch (err) {
        console.error('Error fetching formations:', err);
      }
    };

    fetchFormations();
  }, []);

  const getFilteredFormations = () => {
    if (formData.program === 'professional') {
      return availableFormations.filter(f => f.category === 'firefighter');
    }
    if (formData.program === 'civilian') {
      return availableFormations.filter(f => f.category === 'civilian');
    }
    return [];
  };

  const filteredFormations = getFilteredFormations();
  const showSpecificDropdown = (formData.program === 'professional' || formData.program === 'civilian') && filteredFormations.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'program') {
        newData.specific_formation = '';
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      program: formData.program === 'professional' ? 'Pompiers Professionnels' : formData.program === 'civilian' ? 'Civils' : 'Général',
      specific_formation: formData.specific_formation || 'Non spécifié',
      message: formData.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', program: '', specific_formation: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-12 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            <span className="text-white">Prenez </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            Des questions sur nos programmes de formation ? Envoyez-moi un message et je vous répondrais dès que possible.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* LEFT SIDE: Info & Image */}
          <div className="flex flex-col h-full space-y-8">
            <div className="flex-shrink-0">
              <h3 className="text-2xl text-center md:text-left font-bold text-white mb-6">Mes Coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">E-mail</div>
                    <a href="mailto:contact@lemmefiretechnics.com" className="text-white hover:text-red-400 transition-colors">
                      contact@lemmefiretechnics.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Téléphone</div>
                    <a href="tel:+32456789012" className="text-white hover:text-red-400 transition-colors">
                      +32 (456) 789-012
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Lieu de Formation</div>
                    <p className="text-white">
                      Partout en Belgique
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-64 lg:h-full rounded-2xl overflow-hidden group">
              <img
                  src="https://images.pexels.com/photos/280076/pexels-photo-280076.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Firefighter equipment"
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-red-900/30 h-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600"
                    placeholder="jean@exemple.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600"
                    placeholder="+32 456 789 012"
                  />
                </div>
              </div>

              {/* PRIMARY DROPDOWN */}
              <div className="relative">
                <label htmlFor="program" className="block text-sm font-medium text-gray-300 mb-2">
                  Intéressé(e) par *
                </label>
                <div className="relative">
                    <select
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer"
                    >
                    <option value="">Sélectionnez un programme</option>
                    <option value="professional">Pompiers Professionnels</option>
                    <option value="civilian">Formation pour Civils</option>
                    <option value="general">Demande Générale</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* SECONDARY DROPDOWN */}
              {showSpecificDropdown && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <label htmlFor="specific_formation" className="block text-sm font-medium text-red-400 mb-2">
                    Quelle formation spécifique? *
                    </label>
                    <div className="relative">
                        <select
                        id="specific_formation"
                        name="specific_formation"
                        required
                        value={formData.specific_formation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-red-900/50 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer shadow-lg shadow-red-900/10"
                        >
                        <option value="">-- Choisir une formation --</option>
                        {filteredFormations.map((formation) => (
                            <option key={formation.id} value={formation.name}>
                            {formation.name}
                            </option>
                        ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 pointer-events-none" />
                    </div>
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors resize-none placeholder-gray-600"
                  placeholder="Parlez-nous de vos objectifs de formation..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-600/20 border border-green-500/50 rounded-lg animate-in fade-in">
                  <p className="text-green-400 text-sm">Merci ! Votre message a bien été envoyé. Nous vous recontacterons bientôt.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-600/20 border border-red-500/50 rounded-lg animate-in fade-in">
                  <p className="text-red-400 text-sm">Une erreur est survenue. Veuillez réessayer ou nous envoyer un e-mail directement.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-700 disabled:to-gray-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-red-900/50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer le Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;