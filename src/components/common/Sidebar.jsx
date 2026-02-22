import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    User,
    Star,
    Users,
    CheckCircle,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../utils/cn';

const Sidebar = ({ role, isMobileOpen = false, onMobileClose = () => {} }) => {
    const location = useLocation();
    const logout = useAuthStore(state => state.logout);

    const menuItems = {
        client: [
            { name: 'Vue d\'ensemble', icon: LayoutDashboard, path: '/dashboard/client' },
            { name: 'Mes Missions', icon: Calendar, path: '/dashboard/client/missions' },
            { name: 'Discussions', icon: MessageSquare, path: '/dashboard/client/messages' },
            { name: 'Profil Client', icon: User, path: '/dashboard/client/profil' },
        ],
        artisan: [
            { name: 'Espace Pro', icon: LayoutDashboard, path: '/dashboard/artisan' },
            { name: 'Mes Demandes', icon: Calendar, path: '/dashboard/artisan/demandes' },
            { name: 'Réputation', icon: Star, path: '/dashboard/artisan/avis' },
            { name: 'Messages', icon: MessageSquare, path: '/dashboard/artisan/messages' },
            { name: 'Éditer Profil', icon: User, path: '/dashboard/artisan/profil' },
        ],
        admin: [
            { name: 'Console Admin', icon: LayoutDashboard, path: '/admin' },
            { name: 'Utilisateurs', icon: Users, path: '/admin/utilisateurs' },
            { name: 'Artisans', icon: CheckCircle, path: '/admin/artisans' },
            { name: 'Réservations', icon: Calendar, path: '/admin/reservations' },
            { name: 'Modération', icon: Star, path: '/admin/avis' },
        ]
    };

    const currentMenu = menuItems[role] || [];

    return (
        <>
            {/* Mobile overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onMobileClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div
                className={cn(
                    "w-80 h-screen bg-brand-navy fixed left-0 top-0 text-white flex flex-col border-r border-white/10 z-50 transition-transform duration-300 ease-out overflow-hidden",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0"
                )}
            >
            {/* Mesh Gradient Effect - positioned behind content */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-15%] left-[-20%] w-[400px] h-[400px] bg-brand-orange/25 rounded-full blur-[100px] animate-mesh-pulse" />
                <div className="absolute bottom-[-15%] right-[-20%] w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[80px]" />
            </div>

            {/* Mobile close button - fixed position */}
            <button
                onClick={onMobileClose}
                className="lg:hidden absolute top-6 right-6 p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all z-20"
            >
                <X size={20} />
            </button>

            {/* Scrollable content */}
            <div className="relative z-10 flex flex-col flex-1 min-h-0 overflow-y-auto p-10 pt-8">
            {/* Logo */}
            <div className="mb-14 relative z-10 pr-12 lg:pr-0">
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-brand-orange to-orange-400 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-orange/30 group-hover:rotate-12 transition-transform duration-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    </div>
                    <div>
                        <span className="font-heading text-2xl font-black tracking-tighter block leading-none">Artisan<span className="text-brand-orange">Connect</span></span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Dashboard</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-grow space-y-2 relative z-10">
                {currentMenu.map((item, i) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                to={item.path}
                                onClick={onMobileClose}
                                className={cn(
                                    "flex items-center justify-between p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                                    isActive
                                        ? "bg-white text-brand-navy shadow-lg shadow-black/10"
                                        : "text-white/50 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors transition-transform duration-500",
                                        isActive ? "bg-brand-navy/5" : "bg-white/5 group-hover:bg-brand-orange group-hover:scale-110"
                                    )}>
                                        <Icon size={18} className={cn(isActive ? "text-brand-navy" : "text-white group-hover:text-white")} />
                                    </div>
                                    <span className="font-black tracking-[0.1em] text-[11px] uppercase">{item.name}</span>
                                </div>
                                {isActive && (
                                    <div className="w-1.5 h-1.5 bg-brand-orange rounded-full shadow-[0_0_10px_#FF6B35]" />
                                )}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="pt-8 border-t border-white/10 relative z-10">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 w-full p-5 rounded-[2rem] text-white/30 hover:bg-red-500 hover:text-white hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 font-black uppercase tracking-[0.2em] text-[10px]"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                        <LogOut size={18} />
                    </div>
                    <span>Déconnexion</span>
                </button>
            </div>
            </div>
        </div>
        </>
    );
};

export default Sidebar;
