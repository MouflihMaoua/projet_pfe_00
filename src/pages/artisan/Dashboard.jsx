import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { Bell, Search, DollarSign, Star, Briefcase, ThumbsUp, TrendingUp, ChevronRight, MessageSquare, Calendar } from 'lucide-react';
import NotificationBell from '../../components/ui/NotificationBell';
import StatusBadge from '../../components/ui/StatusBadge';


const ArtisanHome = () => (
    <div className="space-y-12 fade-up">
        {/* Revenue Section - Premium Orange Gradient */}
        <div className="bg-brand-orange rounded-[3.5rem] p-12 md:p-16 text-white relative overflow-hidden shadow-premium bg-grain">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] animate-mesh-pulse" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-end gap-12">
                <div className="space-y-4">
                    <p className="text-white/70 font-black uppercase tracking-[0.2em] text-xs">Revenus ce mois</p>
                    <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter shadow-sm">12,500 <span className="text-3xl font-bold opacity-60">DH</span></h1>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl w-fit px-6 py-3 rounded-2xl border border-white/20">
                        <div className="p-1 bg-emerald-400 rounded-full"><TrendingUp size={14} className="text-white" /></div>
                        <span className="text-sm font-black text-emerald-300 tracking-wide">+18.5%</span>
                        <span className="text-xs text-white/50 font-bold">vs mois dernier</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none px-10 py-5 bg-white text-brand-orange rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-brand-navy hover:text-white transition-all duration-500 active:scale-95">Retirer fonds</button>
                    <button className="flex-1 lg:flex-none px-10 py-5 bg-brand-navy/20 text-white rounded-2xl font-black uppercase tracking-widest text-xs backdrop-blur-xl border border-white/10 hover:bg-brand-navy transition-all active:scale-95">Historique</button>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { label: 'Demandes', value: '08', icon: Briefcase, color: 'text-brand-orange' },
                { label: 'Note moyenne', value: '4.9', icon: Star, color: 'text-yellow-400' },
                { label: 'Réponse', value: '98%', icon: MessageSquare, color: 'text-blue-400' },
            ].map((stat, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-premium flex items-center gap-8 group"
                >
                    <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center bg-gray-50 group-hover:bg-brand-navy transition-all duration-500", stat.color)}>
                        <stat.icon size={32} className="group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-4xl font-black text-brand-navy font-heading leading-none">{stat.value}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
                <div className="flex justify-between items-center px-4">
                    <h2 className="text-3xl font-bold font-heading text-brand-navy">Demandes en attente</h2>
                    <Link to="/dashboard/artisan/demandes" className="text-xs font-black uppercase tracking-widest text-brand-orange hover:translate-x-1 transition-transform inline-flex items-center">
                        Voir tout <ChevronRight size={14} className="ml-1" />
                    </Link>
                </div>

                <div className="space-y-6">
                    {[1, 2].map((item) => (
                        <div key={item} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8 hover:border-brand-orange/20 transition-all group">
                            <div className="flex items-center gap-8 w-full">
                                <div className="relative">
                                    <img src={`https://i.pravatar.cc/150?u=${item}`} className="w-24 h-24 rounded-[2.5rem] object-cover shadow-lg group-hover:scale-105 transition-transform duration-500" alt="Client" />
                                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-md border border-gray-50">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-2xl text-brand-navy font-heading mb-1">Karim Bennani</h4>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">Plomberie • Maarif, Casablanca</p>
                                    <div className="flex flex-wrap gap-4">
                                        <span className="flex items-center gap-2 text-xs font-black bg-gray-50 text-gray-500 px-4 py-2 rounded-xl">
                                            <Calendar size={14} className="text-brand-orange" /> DEMAIN, 10:00
                                        </span>
                                        <span className="flex items-center gap-2 text-xs font-black bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-xl">
                                            URGENTE
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-10 py-5 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-orange transition-all duration-300 active:scale-95">Accepter</button>
                                <button className="flex-1 md:flex-none px-10 py-5 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-50 hover:text-red-500 transition-colors">Décliner</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                <h2 className="text-3xl font-bold font-heading text-brand-navy px-4">Aperçu Profil</h2>
                <div className="bg-brand-navy p-12 rounded-[4rem] text-white text-center relative overflow-hidden group bg-grain shadow-premium">
                    <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-brand-orange/20 rounded-full blur-[80px]" />

                    <div className="relative inline-block mb-8">
                        <div className="w-36 h-36 rounded-[3.5rem] p-1.5 bg-gradient-to-tr from-brand-orange to-orange-300 group-hover:rotate-6 transition-transform duration-700">
                            <img src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=400" className="w-full h-full rounded-[3rem] object-cover border-4 border-brand-navy" alt="Artisan" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-10 h-10 rounded-[1.5rem] border-[6px] border-brand-navy shadow-lg" />
                    </div>

                    <h3 className="text-3xl font-bold font-heading mb-2 leading-none">Ahmed Mansouri</h3>
                    <p className="text-sm text-brand-orange font-black uppercase tracking-[0.2em] mb-10">Artisan Pro Expert</p>

                    <div className="grid grid-cols-3 gap-4 mb-12 py-8 border-y border-white/10">
                        <div><p className="text-2xl font-black font-heading mb-1 leading-none">124</p><p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Avis</p></div>
                        <div><p className="text-2xl font-black font-heading mb-1 leading-none">850</p><p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Jobs</p></div>
                        <div><p className="text-2xl font-black font-heading mb-1 leading-none">15</p><p className="text-[10px] text-white/30 uppercase font-black tracking-widest">EXP</p></div>
                    </div>

                    <Link to="/dashboard/artisan/profil" className="block w-full py-5 bg-white text-brand-navy rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-brand-orange hover:text-white transition-all shadow-xl active:scale-95 leading-none">
                        Modifier profil
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const ArtisanRequests = () => (
    <div className="space-y-8 fade-up">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-4xl font-black font-heading text-brand-navy tracking-tighter">Mes Demandes</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Gérez vos interventions en attente</p>
            </div>
            <div className="flex gap-4">
                <button className="px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-navy hover:text-white transition-all">Filtrer</button>
                <button className="px-8 py-4 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-navy/20">Exporter</button>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-premium flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-brand-orange/20 transition-all group">
                    <div className="flex items-center gap-8 w-full">
                        <img src={`https://i.pravatar.cc/150?u=${item}`} className="w-24 h-24 rounded-[2.5rem] object-cover shadow-lg" alt="Client" />
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-black text-2xl text-brand-navy font-heading">Client #{item}042</h4>
                                <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-[9px] font-black uppercase rounded-full">Nouveau</span>
                            </div>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">Installation Chauffe-eau • Maarif, Casablanca</p>
                            <div className="flex gap-4">
                                <span className="flex items-center gap-2 text-[10px] font-black bg-gray-50 text-gray-500 px-5 py-2.5 rounded-xl">
                                    <Calendar size={14} className="text-brand-orange" /> 14 MARS, 09:30
                                </span>
                                <span className="flex items-center gap-2 text-[10px] font-black bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-xl uppercase tracking-widest">
                                    CONFIRMÉ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto">
                        <button className="flex-1 lg:flex-none px-10 py-5 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-orange transition-all duration-300">Détails</button>
                        <button className="flex-1 lg:flex-none px-10 py-5 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-navy border border-transparent hover:border-gray-200 transition-all">Message</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ArtisanMessages = () => (
    <div className="h-[calc(100vh-180px)] bg-white rounded-[4rem] shadow-premium border border-gray-100 overflow-hidden flex flex-col lg:flex-row fade-up">
        {/* Sidebar Messages */}
        <div className="w-full lg:w-96 border-r border-gray-50 flex flex-col">
            <div className="p-10 border-b border-gray-50">
                <h2 className="text-2xl font-black font-heading text-brand-navy mb-6">Discussions</h2>
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input type="text" placeholder="Rechercher..." className="w-full h-14 pl-14 pr-6 bg-gray-50 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-brand-navy transition-all" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={cn("p-6 rounded-[2.5rem] flex items-center gap-5 cursor-pointer transition-all", i === 1 ? "bg-brand-navy text-white shadow-xl shadow-brand-navy/20" : "hover:bg-gray-50")}>
                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-14 h-14 rounded-2xl object-cover" alt="User" />
                        <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-black font-heading truncate">Karim B.</h4>
                                <span className={cn("text-[9px] font-black uppercase", i === 1 ? "text-white/40" : "text-gray-300")}>14:20</span>
                            </div>
                            <p className={cn("text-xs truncate", i === 1 ? "text-white/60" : "text-gray-400 font-medium")}>Est-ce que vous seriez disponible...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Empty Chat State */}
        <div className="flex-grow hidden lg:flex flex-col items-center justify-center bg-gray-50/30 p-20 bg-grain">
            <div className="w-32 h-32 bg-white rounded-[3rem] shadow-premium flex items-center justify-center mb-10 translate-y-[-20%]">
                <MessageSquare size={44} className="text-brand-orange animate-mesh-pulse" />
            </div>
            <h3 className="text-2xl font-black font-heading text-brand-navy mb-3">Votre messagerie pro</h3>
            <p className="text-gray-400 font-bold max-w-sm text-center">Sélectionnez une conversation pour commencer à échanger avec vos clients.</p>
        </div>
    </div>
);

const ArtisanReviews = () => (
    <div className="space-y-12 fade-up">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-4xl font-black font-heading text-brand-navy tracking-tighter">Ma Réputation</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Ce que vos clients disent de vous</p>
            </div>
            <div className="flex items-center gap-6 bg-white px-8 py-5 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                    <span className="text-2xl font-black text-brand-navy leading-none">4.9</span>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">128 Avis au total</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-premium relative group hover:border-brand-orange/20 transition-all">
                    <div className="flex items-center gap-6 mb-8">
                        <img src={`https://i.pravatar.cc/150?u=${i + 20}`} className="w-16 h-16 rounded-[1.5rem] object-cover" alt="User" />
                        <div>
                            <h4 className="font-black font-heading text-lg text-brand-navy">Client Nom</h4>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Il y a {i} jours</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />)}
                        </div>
                    </div>
                    <p className="text-gray-500 font-medium italic leading-relaxed text-sm">"Service incroyable, Ahmed a été très professionnel et a réglé mon problème de fuite en moins de 30 minutes. Je recommande fortement !"</p>
                </div>
            ))}
        </div>
    </div>
);

const ArtisanSettings = () => (
    <div className="max-w-4xl mx-auto space-y-12 fade-up">
        <div>
            <h2 className="text-4xl font-black font-heading text-brand-navy tracking-tighter">Paramètres</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Gérez votre profil public et vos préférences</p>
        </div>

        <div className="bg-white rounded-[4rem] border border-gray-100 shadow-premium overflow-hidden">
            <div className="p-16 space-y-12">
                <div className="flex items-center gap-10">
                    <div className="relative group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=200" className="w-40 h-40 rounded-[3rem] object-cover ring-8 ring-gray-50 shadow-2xl transition-all group-hover:brightness-50" alt="Profile" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <span className="text-white text-[10px] font-black uppercase tracking-widest">Modifier</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black font-heading text-brand-navy mb-2">Photo de profil</h3>
                        <p className="text-xs text-gray-400 font-bold max-w-xs leading-relaxed uppercase tracking-widest">Format JPG ou PNG recommandé. Max 2Mo.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Nom complet</label>
                        <input type="text" defaultValue="Ahmed Mansouri" className="w-full h-16 px-8 rounded-2xl bg-gray-50 border border-transparent focus:border-brand-navy outline-none font-bold text-brand-navy transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Professionnel</label>
                        <input type="email" defaultValue="ahmed@plomberie.ma" className="w-full h-16 px-8 rounded-2xl bg-gray-50 border border-transparent focus:border-brand-navy outline-none font-bold text-brand-navy transition-all" />
                    </div>
                </div>

                <button className="px-12 py-6 bg-brand-navy text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-brand-navy/30 hover:bg-brand-orange hover:shadow-brand-orange/30 transition-all duration-500">
                    Enregistrer les modifications
                </button>
            </div>
        </div>
    </div>
);

const ArtisanDashboard = () => {
    return (
        <div className="min-h-screen bg-brand-offwhite font-sans selection:bg-brand-orange selection:text-white">
            <Sidebar role="artisan" />

            <div className="pl-80">
                <header className="h-28 bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 flex items-center justify-between px-16 sticky top-0 z-40">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 bg-emerald-500/10 px-8 py-3.5 rounded-2xl border border-emerald-500/20">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">En ligne</span>
                        </div>

                        <div className="relative hidden xl:block">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input type="text" placeholder="Rechercher un dossier, un client..." className="w-96 h-14 pl-16 pr-8 bg-gray-50/50 rounded-2xl text-[11px] font-bold outline-none border border-transparent focus:border-brand-navy focus:bg-white transition-all underline-offset-4" />
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        <div className="flex gap-4">
                            <button className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all duration-500">
                                <DollarSign size={20} />
                            </button>
                            <NotificationBell />
                        </div>

                        <div className="flex items-center gap-6 pl-10 border-l border-gray-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-brand-navy font-heading tracking-tight mb-0.5">Ahmed Mansouri</p>
                                <p className="text-[9px] text-brand-orange font-black uppercase tracking-[0.3em]">Expert Plomberie</p>
                            </div>
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=100"
                                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-50 shadow-xl"
                                    alt="Avatar"
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-16 max-w-[1600px] mx-auto min-h-[calc(100vh-112px)]">
                    <Routes>
                        <Route path="/" element={<ArtisanHome />} />
                        <Route path="/demandes" element={<ArtisanRequests />} />
                        <Route path="/messages" element={<ArtisanMessages />} />
                        <Route path="/avis" element={<ArtisanReviews />} />
                        <Route path="/profil" element={<ArtisanSettings />} />
                        <Route path="*" element={<Navigate to="" />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default ArtisanDashboard;
