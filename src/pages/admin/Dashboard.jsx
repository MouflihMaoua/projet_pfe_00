import React from 'react';
import { cn } from '../../utils/cn';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { Users, Shield, Calendar, AlertCircle, BarChart3, Search, Settings } from 'lucide-react';
import NotificationBell from '../../components/ui/NotificationBell';

const AdminHome = () => (
    <div className="space-y-10 fade-up">
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
                { label: 'Utilisateurs', value: '1.2k', icon: Users, color: 'text-blue-500 bg-blue-50' },
                { label: 'Artisans', value: '450', icon: Shield, color: 'text-orange-500 bg-orange-50' },
                { label: 'Réservations', value: '8.4k', icon: Calendar, color: 'text-green-500 bg-green-50' },
                { label: 'Alertes', value: '12', icon: AlertCircle, color: 'text-red-500 bg-red-50' },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.color)}>
                        <stat.icon size={24} />
                    </div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-brand-dark">{stat.value}</p>
                </div>
            ))}
        </div>

        {/* Moderation Queue */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-brand-dark">Artisans en attente de validation</h2>
                <button className="text-sm font-bold text-brand-orange hover:underline">Tout voir</button>
            </div>
            <div className="divide-y divide-gray-50">
                {[1, 2, 3].map(i => (
                    <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-6">
                            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-bold text-gray-400">ID</div>
                            <div>
                                <h4 className="font-bold text-brand-dark text-lg">Artisan #{i * 1532}</h4>
                                <p className="text-sm text-gray-500">Inscrit il y a {i}h • Dossier complet</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-bold text-xs hover:bg-green-600 transition-all">Valider</button>
                            <button className="px-6 py-2.5 bg-gray-50 text-gray-400 rounded-xl font-bold text-xs hover:bg-red-50 hover:text-red-500 transition-all">Refuser</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-brand-offwhite">
            <Sidebar role="admin" />

            <div className="pl-72">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-40">
                    <div className="flex items-center space-x-3">
                        <BarChart3 className="text-brand-orange" />
                        <h1 className="text-xl font-bold text-brand-dark">Panel Administration</h1>
                    </div>

                    <div className="flex items-center space-x-8">
                        <NotificationBell />
                        <div className="flex items-center space-x-4 pl-8 border-l border-gray-100">
                            <div className="text-right">
                                <p className="text-sm font-bold text-brand-dark">Directeur Admin</p>
                                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Contrôle Total</p>
                            </div>
                            <div className="w-12 h-12 bg-brand-dark text-white rounded-2xl flex items-center justify-center font-bold">AD</div>
                        </div>
                    </div>
                </header>

                <main className="p-12 max-w-[1400px] mx-auto">
                    <Routes>
                        <Route path="/" element={<AdminHome />} />
                        <Route path="/utilisateurs" element={<div className="text-2xl font-bold">Gestion des comptes</div>} />
                        <Route path="/artisans" element={<div className="text-2xl font-bold">Validation des artisans</div>} />
                        <Route path="/reservations" element={<div className="text-2xl font-bold">Suivi des flux</div>} />
                        <Route path="*" element={<Navigate to="" />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
