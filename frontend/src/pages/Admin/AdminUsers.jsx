import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Phone, Mail, MoreHorizontal, UserX, MessageCircle, ChevronRight, Search, Filter, ShieldCheck, UserCheck, UserMinus, AtSign, Calendar, MapPin, UserSquare, X } from 'lucide-react';
import dataCenter from '../../data/dataCenter';
import { useTranslation } from 'react-i18next';

const AdminUsers = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [users, setUsers] = useState(dataCenter.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const toggleUserStatus = (id) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                return { ...user, status: user.status === 'active' ? 'disabled' : 'active' };
            }
            return user;
        }));
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            user.phone.includes(searchTerm);
        const matchesFilter = filterType === 'all' || user.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className={`space-y-10 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                        {t('users_management')}
                    </h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                        {t('manage_users_desc')}
                    </p>
                </div>
                <div className={`flex flex-wrap gap-4 w-full md:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="relative flex-1 md:w-80">
                        <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-white/20 ${isRTL ? 'right-4' : 'left-4'}`} />
                        <input
                            type="text"
                            placeholder={t('search_users_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full bg-white/5 border border-white/10 rounded-2xl p-4 transition-all focus:border-caramel/50 outline-none text-sm font-bold ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className={`flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl w-fit ${isRTL ? 'flex-row-reverse' : ''}`}>
                {['all', 'account', 'guest'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilterType(tab)}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${filterType === tab ? 'bg-caramel text-coffee-dark shadow-lg shadow-caramel/20 scale-[1.05]' : 'text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {t(tab)}
                    </button>
                ))}
            </div>

            {/* Users Table / Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredUsers.map((user, idx) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`p-6 bg-white/5 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl relative overflow-hidden group hover:bg-white/10 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                        >
                            {/* Accent Background */}
                            <div className={`absolute top-0 bottom-0 w-1 transition-all ${isRTL ? 'right-0' : 'left-0'} ${user.status === 'disabled' ? 'bg-red-500' : user.type === 'guest' ? 'bg-white/20' : 'bg-caramel'}`} />

                            <div className={`flex flex-col sm:flex-row gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                                <div className="space-y-4 flex-shrink-0 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-caramel transition-transform group-hover:scale-110">
                                        <div className="relative">
                                            {user.type === 'account' ? <UserSquare size={32} /> : <Users size={32} />}
                                            {user.status === 'disabled' && (
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#121212] flex items-center justify-center">
                                                    <X size={8} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                                        <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{t(user.status || 'active')}</span>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className={`flex justify-between items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className="space-y-1">
                                            <h3 className="text-xl md:text-2xl font-black text-white leading-none">{user.name}</h3>
                                            <p className="text-[10px] font-black text-caramel/60 uppercase tracking-widest leading-none">{user.id}</p>
                                        </div>
                                        <div className={`flex flex-col items-end gap-1 ${isRTL ? 'items-start' : 'items-end'}`}>
                                            <span className="px-2 py-0.5 bg-caramel text-coffee-dark font-black text-[9px] uppercase tracking-widest rounded-md">{t(user.type)}</span>
                                            {user.joined && <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">{user.joined}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                                        <div className={`flex items-center gap-3 text-white/60 group/contact ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover/contact:text-caramel group-hover/contact:bg-caramel/10 transition-colors">
                                                <Phone size={14} />
                                            </div>
                                            <span className="text-xs font-bold truncate">{user.phone}</span>
                                        </div>
                                        {user.email && (
                                            <div className={`flex items-center gap-3 text-white/60 group/contact ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover/contact:text-caramel group-hover/contact:bg-caramel/10 transition-colors">
                                                    <Mail size={14} />
                                                </div>
                                                <span className="text-xs font-bold truncate">{user.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className={`pt-4 border-t border-white/5 flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <a
                                            href={`https://wa.me/${user.phone.replace(/\+/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}
                                        >
                                            <MessageCircle size={14} />
                                            <span>WhatsApp</span>
                                        </a>
                                        <button
                                            onClick={() => toggleUserStatus(user.id)}
                                            className={`flex flex-shrink-0 items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${user.status === 'disabled'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 hover:bg-emerald-500/20'
                                                    : 'bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500/20'
                                                }`}
                                        >
                                            {user.status === 'disabled' ? <UserCheck size={14} /> : <UserMinus size={14} />}
                                            <span className="hidden sm:inline-block">
                                                {user.status === 'disabled' ? t('activate') : t('disable')}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {filteredUsers.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center opacity-20 space-y-4">
                    <UserX size={80} strokeWidth={1} />
                    <p className="font-black uppercase tracking-widest text-xs md:text-sm">{t('no_users_match')}</p>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
