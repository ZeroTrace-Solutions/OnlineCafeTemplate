import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    // Update document direction based on language
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <button 
      onClick={toggleLanguage}
      className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-xl active:scale-90 transition-all backdrop-blur-md flex items-center space-x-2 space-x-reverse"
    >
      <Globe size={20} className="text-caramel" />
      <span className="text-[10px] font-black uppercase text-white/60">
        {i18n.language === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;
