import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useTranslation } from 'react-i18next';
import { Coffee, User, Mail, Lock, ChevronRight, ChevronLeft } from 'lucide-react';
import LanguageToggle from '../../components/Common/LanguageToggle';
import bgImage from '../../assets/images/background.png';

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  
  const isRTL = i18n.language === 'ar';
  const [isLogin, setIsLogin] = useState(location.state?.mode !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        if (isLogin) {
            await loginWithEmail(email, password);
        } else {
            await signupWithEmail(email, password);
        }
        navigate(-1);
    } catch (err) {
        setError(err.message || (isRTL ? "فشل العملية. يرجى المحاولة مرة أخرى." : "Operation failed. Please try again."));
    } finally {
        setLoading(false);
    }
  };

  const socialLogin = async () => {
    try {
        await loginWithGoogle();
        navigate(-1);
    } catch (err) {
        setError(isRTL ? "فشل تسجيل الدخول عبر جوجل." : "Google login failed.");
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-start p-6 md:p-12 font-sans overflow-hidden relative pt-6 md:pt-10">
      <div className="fixed inset-0 z-0">
         <img src={bgImage} className="w-full h-full object-cover opacity-40 brightness-75 transition-opacity duration-1000" />
         <div className="absolute inset-0 bg-coffee-dark/50 backdrop-blur-2xl" />
      </div>

      <header className="relative w-full p-6 md:p-10 z-[60] flex items-center justify-between mb-4 mt-2 max-w-7xl mx-auto">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all active:scale-95">
                {isRTL ? <ChevronRight size={20} className="text-white" /> : <ChevronLeft size={20} className="text-white" />}
            </button>
            <LanguageToggle />
         </div>
         
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full primary-gradient shadow-xl shadow-caramel/20 flex items-center justify-center">
               <Coffee size={18} className="text-coffee-dark" />
            </div>
            <span className="font-black uppercase tracking-tighter text-lg md:text-xl text-white hidden md:inline">{t('COFFEE HUB')}</span>
         </div>
         <div className="w-10 md:w-24" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full z-[50] pb-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-[420px] bg-white/5 border border-white/10 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] shadow-2xl relative z-20 space-y-8"
        >
        <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {isLogin ? t('hello_again') : t('join_club')}
            </h2>
            <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-loose">
                {isLogin ? t('welcome_back') : t('unlock_exclusive')}
            </p>
        </div>

        {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
                <div className="space-y-1.5">
                    <div className="relative group">
                        <User className={`absolute top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                        <input 
                            required 
                            type="text" 
                            placeholder={t('full_name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none ${isRTL ? 'text-right pr-12' : 'text-left pl-12'}`}
                        />
                    </div>
                </div>
            )}
            <div className="space-y-1.5">
                <div className="relative group">
                    <Mail className={`absolute top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                    <input 
                        required 
                        type="email" 
                        placeholder={t('email_address')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none ${isRTL ? 'text-right pr-12' : 'text-left pl-12'}`}
                    />
                </div>
            </div>
            <div className="space-y-1.5">
                <div className="relative group">
                    <Lock className={`absolute top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                    <input 
                        required 
                        type="password" 
                        placeholder={t('secure_password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none ${isRTL ? 'text-right pr-12' : 'text-left pl-12'}`}
                    />
                </div>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 primary-gradient text-coffee-dark rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
                {loading ? t('processing') : (isLogin ? t('login') : t('signup'))}
            </button>
        </form>

        <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative z-10 px-4 bg-transparent text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">{t('or')}</span>
        </div>

        <div className="space-y-3">
            <button 
                onClick={socialLogin}
                className={`w-full py-4 bg-white/5 border border-white/10 text-white/40 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
                <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>
                <span>{t('google_continue')}</span>
            </button>
        </div>

        <div className="text-center relative z-20">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[9px] md:text-[10px] font-black uppercase tracking-[.4em] text-white/40 hover:text-caramel transition-all cursor-pointer px-4 py-2"
            >
                {isLogin ? t('no_account') : t('already_member')}
            </button>
        </div>
      </motion.div>
    </div>
  </div>
);
};

export default LoginPage;
