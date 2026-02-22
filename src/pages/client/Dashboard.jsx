import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { Bell, Search, Settings, Calendar, MessageSquare, User, Home as HomeIcon, ChevronRight, Star, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import NotificationBell from '../../components/ui/NotificationBell';
import StatusBadge from '../../components/ui/StatusBadge';

const ClientHome = () => (
    <div className="space-y-8 lg:space-y-12 fade-up">
        {/* Welcome Card - Premium Navy with Glass Effect */}
        <div className="bg-brand-navy rounded-[2rem] lg:rounded-[3.5rem] p-8 md:p-12 lg:p-16 text-white relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(26,58,92,0.4)] bg-grain">
            {/* Mesh Gradient Decorations */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[120px] animate-mesh-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-brand-orange/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                <div className="max-w-2xl text-center lg:text-left">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 lg:mb-6 leading-tight">
                            Ravi de vous revoir, <span className="text-brand-orange">Karim</span> 👋
                        </h1>
                        <p className="text-white/60 text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Vous avez <span className="text-white font-bold">2 réservations actives</span> pour cette semaine. Besoin d'un autre expert ?
                        </p>
                        <div className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
                            <Link to="/recherche" className="inline-flex items-center px-10 py-5 bg-brand-orange text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-brand-orange/90 transition-all shadow-xl shadow-brand-orange/30 group active:scale-95">
                                Trouver un artisan
                                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/dashboard/client/missions" className="inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all active:scale-95">
                                Mes rendez-vous
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="hidden xl:grid grid-cols-1 gap-4">
                    <div className="glass-card-dark p-8 rounded-[2.5rem] text-center w-48">
                        <p className="text-5xl font-black font-heading text-brand-orange mb-2">12</p>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Travaux Finis</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
            {[
                { label: 'Réservations', value: 2, icon: Calendar, color: 'text-brand-orange' },
                { label: 'Prochains RDV', value: 1, icon: HomeIcon, color: 'text-blue-400' },
                { label: 'Messages', value: 5, icon: MessageSquare, color: 'text-emerald-400' },
            ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-premium flex items-center gap-4 lg:gap-6 group cursor-default hover:shadow-[0_20px_50px_-15px_rgba(26,58,92,0.12)] hover:border-gray-200/80 transition-all duration-300"
                >
                    <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center bg-gray-50 group-hover:bg-brand-navy transition-all duration-500", stat.color)}>
                        <Icon size={32} className="group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-4xl font-black text-brand-navy font-heading">{stat.value}</p>
                    </div>
                </motion.div>
                );
            })}
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-0 sm:px-4">
                    <h2 className="text-2xl lg:text-3xl font-bold font-heading text-brand-navy">Réservations récentes</h2>
                    <Link to="/dashboard/client/missions" className="text-xs font-black uppercase tracking-widest text-brand-orange hover:translate-x-1 transition-transform inline-flex items-center">
                        Voir tout <ChevronRight size={14} className="ml-1" />
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] lg:rounded-[3.5rem] border border-gray-100 shadow-premium overflow-hidden hover:shadow-[0_20px_50px_-15px_rgba(26,58,92,0.15)] transition-shadow duration-300">
                    <div className="divide-y divide-gray-50">
                        {[
                            { artisan: 'Ahmed Mansouri', job: 'Plombier', date: 'Demain à 10:00', status: 'confirmé', image: 'https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=100' },
                            { artisan: 'Youssef Alami', job: 'Électricien', date: '25 Juin 2024', status: 'en attente', image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=100' },
                        ].map((res, i) => (
                            <div key={i} className="p-6 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-all group">
                                <div className="flex items-center gap-4 lg:gap-8 min-w-0 flex-1">
                                    <div className="relative">
                                        <img src={res.image} className="w-20 h-20 rounded-3xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500" alt={res.artisan} />
                                        <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md">
                                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl text-brand-navy font-heading mb-1">{res.artisan}</p>
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest flex items-center">
                                            <span className="text-brand-orange mr-2">{res.job}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full mx-3" />
                                            {res.date}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge status={res.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                <h2 className="text-2xl lg:text-3xl font-bold font-heading text-brand-navy px-0 sm:px-4">Avis à donner</h2>
                <div className="bg-white p-8 lg:p-12 rounded-[2rem] lg:rounded-[3.5rem] border border-gray-100 shadow-premium text-center bg-grain relative overflow-hidden hover:shadow-[0_20px_50px_-15px_rgba(26,58,92,0.15)] transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange/50 to-orange-300/50" />

                    <div className="w-24 h-24 bg-brand-orange/5 text-brand-orange rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <Star size={40} className="fill-brand-orange group-hover:scale-110 transition-transform" />
                    </div>

                    <h3 className="text-xl font-bold text-brand-navy mb-4 font-heading">Expérience avec Said</h3>
                    <p className="text-gray-400 font-medium mb-10 leading-relaxed px-2">
                        Votre avis est précieux pour Said et pour la communauté ArtisanConnect.
                    </p>

                    <button className="w-full py-5 bg-brand-navy text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-brand-orange transition-all shadow-xl active:scale-95 leading-none">
                        Laisser un avis
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const ClientMissions = () => (
    <div className="space-y-8 lg:space-y-12 fade-up">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div>
                <h2 className="text-2xl lg:text-4xl font-black font-heading text-brand-navy tracking-tighter">Mes Missions</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Suivez vos travaux en cours et terminés</p>
            </div>
            <div className="flex gap-3 flex-wrap">
                <button className="px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-navy hover:text-white transition-all">Tous</button>
                <button className="px-8 py-4 bg-brand-orange text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-orange/20">En cours</button>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
            {[1, 2].map((i) => (
                <div key={i} className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[3.5rem] border border-gray-100 shadow-premium flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 lg:gap-8 group hover:border-brand-orange/20 hover:shadow-[0_20px_50px_-15px_rgba(26,58,92,0.15)] transition-all duration-300">
                    <div className="flex items-center gap-8 w-full">
                        <img src={`https://images.unsplash.com/photo-${i === 1 ? '1540324155974-7523202daa3f' : '1558222218-b7b54eede3f3'}?w=200`} className="w-28 h-28 rounded-[2.5rem] object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500" alt="Artisan" />
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h4 className="font-black text-2xl text-brand-navy font-heading">{i === 1 ? 'Ahmed Mansouri' : 'Youssef Alami'}</h4>
                                <StatusBadge status={i === 1 ? 'confirmé' : 'en attente'} />
                            </div>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">{i === 1 ? 'Plomberie • Maarif' : 'Électricité • Gauthier'}</p>
                            <div className="flex gap-6">
                                <span className="flex items-center gap-2 text-[10px] font-black bg-gray-50 text-gray-500 px-5 py-2.5 rounded-xl uppercase tracking-widest">
                                    <Calendar size={14} className="text-brand-orange" /> {i === 1 ? 'Demain, 10:00' : '25 Juin, 14:30'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-10 py-5 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-orange transition-all duration-300">Gérer</button>
                        <button className="flex-1 md:flex-none px-10 py-5 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-navy border border-transparent hover:border-gray-200 transition-all">Chat</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ClientMessages = () => (
    <div className="min-h-[400px] lg:min-h-[calc(100vh-200px)] bg-white rounded-[2rem] lg:rounded-[4rem] shadow-premium border border-gray-100 overflow-hidden flex flex-col lg:flex-row fade-up">
        {/* Sidebar */}
        <div className="w-full lg:w-96 border-r border-gray-100 flex flex-col bg-white">
            <div className="p-6 lg:p-10 border-b border-gray-50">
                <h2 className="text-2xl font-black font-heading text-brand-navy mb-6">Discussions</h2>
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input type="text" placeholder="Rechercher..." className="w-full h-14 pl-14 pr-6 bg-gray-50 rounded-2xl text-[11px] font-bold outline-none border border-transparent focus:border-brand-navy focus:bg-white transition-all" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className={cn("p-6 rounded-[2.5rem] flex items-center gap-5 cursor-pointer transition-all", i === 1 ? "bg-brand-navy text-white shadow-2xl" : "hover:bg-gray-50")}>
                        <img src={`https://i.pravatar.cc/150?u=${i + 40}`} className="w-14 h-14 rounded-2xl object-cover" alt="User" />
                        <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-black font-heading truncate">Ahmed M.</h4>
                                <span className={cn("text-[9px] font-black uppercase", i === 1 ? "text-white/40" : "text-gray-300")}>10:05</span>
                            </div>
                            <p className={cn("text-xs truncate", i === 1 ? "text-white/60" : "text-gray-400 font-medium")}>Je serai là à l'heure...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Empty State */}
        <div className="flex-grow hidden lg:flex flex-col items-center justify-center bg-gray-50/20 p-20 bg-grain">
            <div className="w-32 h-32 bg-white rounded-[3.5rem] shadow-premium flex items-center justify-center mb-10">
                <MessageSquare size={44} className="text-brand-orange animate-mesh-pulse" />
            </div>
            <h3 className="text-2xl font-black font-heading text-brand-navy mb-3">Sélectionnez un artisan</h3>
            <p className="text-gray-400 font-bold max-w-sm text-center">Commencez à discuter de vos projets avec nos experts qualifiés.</p>
        </div>
    </div>
);

const ClientSettings = () => (
    <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 fade-up">
        <h2 className="text-2xl lg:text-4xl font-black font-heading text-brand-navy tracking-tighter">Mon Profil</h2>
        <div className="bg-white rounded-[2rem] lg:rounded-[4rem] border border-gray-100 shadow-premium overflow-hidden hover:shadow-[0_20px_50px_-15px_rgba(26,58,92,0.15)] transition-shadow duration-300">
            <div className="p-6 lg:p-16 space-y-8 lg:space-y-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-10">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" className="w-40 h-40 rounded-[3rem] object-cover ring-8 ring-gray-50 shadow-2xl" alt="Profile" />
                    <div>
                        <h3 className="text-2xl font-black font-heading text-brand-navy mb-2">Karim Bennani</h3>
                        <p className="text-[10px] text-brand-orange font-black uppercase tracking-[0.3em]">Client Premium</p>
                        <button className="mt-4 px-6 py-2.5 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-xl hover:bg-brand-navy hover:text-white transition-all">Changer la photo</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Nom Complet</label>
                        <input type="text" defaultValue="Karim Bennani" className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-navy focus:ring-4 focus:ring-brand-orange/10 outline-none font-bold text-brand-navy transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Numéro de Téléphone</label>
                        <input type="text" defaultValue="+212 6 12 34 56 78" className="w-full h-16 px-8 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-navy focus:ring-4 focus:ring-brand-orange/10 outline-none font-bold text-brand-navy transition-all" />
                    </div>
                </div>

                <button className="px-12 py-6 bg-brand-navy text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-brand-navy/30 hover:bg-brand-orange transition-all duration-500">
                    Mettre à jour mon profil
                </button>
            </div>
        </div>
    </div>
);

const ClientDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const renderContent = () => {
        if (pathname.endsWith('/missions')) return <ClientMissions />;
        if (pathname.endsWith('/messages')) return <ClientMessages />;
        if (pathname.endsWith('/profil')) return <ClientSettings />;
        if (pathname === '/dashboard/client' || pathname === '/dashboard/client/' || pathname.endsWith('/client')) return <ClientHome />;
        return <Navigate to="/dashboard/client" replace />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-offwhite via-white to-gray-50/50 font-sans selection:bg-brand-orange selection:text-white">
            <Sidebar role="client" isMobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-80 min-h-screen flex flex-col">
                <header className="h-20 lg:h-28 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_3px_rgba(26,58,92,0.04)] flex items-center justify-between px-4 md:px-8 lg:px-16 sticky top-0 z-30 gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-3 rounded-2xl bg-gray-50 hover:bg-brand-navy hover:text-white text-brand-navy transition-all"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center bg-gray-50/80 px-4 lg:px-8 py-3 lg:py-4 rounded-2xl flex-1 max-w-xl border-2 border-gray-100 focus-within:bg-white focus-within:border-brand-orange/40 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-brand-orange/5 transition-all group">
                        <Search size={22} className="text-gray-400 mr-4 group-focus-within:text-brand-orange transition-colors" />
                        <input type="text" placeholder="Rechercher un service, un artisan..." className="bg-transparent border-none outline-none text-xs font-bold text-brand-navy w-full placeholder:text-gray-300" />
                    </div>

                    <div className="flex items-center space-x-4 lg:space-x-12 shrink-0">
                        <NotificationBell />

                        <div className="flex items-center gap-4 lg:gap-6 pl-4 lg:pl-10 border-l border-gray-100/80">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-brand-navy font-heading tracking-tight leading-none mb-1">Karim Bennani</p>
                                <p className="text-[10px] text-brand-orange font-black uppercase tracking-[0.2em] leading-none">Client Or</p>
                            </div>
                            <Link to="/dashboard/client/profil" className="relative group">
                                <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-tr from-brand-orange to-orange-300 group-hover:rotate-6 transition-transform">
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                                        className="w-full h-full rounded-xl object-cover bg-white shadow-inner"
                                        alt="Avatar"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[4px] border-white shadow-lg" />
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-8 lg:p-16 max-w-[1600px] mx-auto w-full flex-1">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default ClientDashboard;
