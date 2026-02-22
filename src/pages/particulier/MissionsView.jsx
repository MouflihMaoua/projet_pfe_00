/**
 * MissionsView - Vue Mes Missions
 * Liste des missions/réservations en cours et terminées
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare } from 'lucide-react';

const missions = [
    {
        id: 1,
        artisan: 'Ahmed Mansouri',
        metier: 'Plombier',
        ville: 'Casablanca (Maarif)',
        date: 'Demain, 10:00',
        status: 'confirmé',
        image: 'https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=200',
    },
    {
        id: 2,
        artisan: 'Youssef Alami',
        metier: 'Électricien',
        ville: 'Rabat (Gauthier)',
        date: '25 Fév 2025, 14:30',
        status: 'en attente',
        image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=200',
    },
];

const statusStyles = {
    confirmé: 'bg-[#10B981]/10 text-[#10B981]',
    'en attente': 'bg-[#F97316]/10 text-[#F97316]',
    terminé: 'bg-[#64748B]/10 text-[#64748B]',
};

const MissionsView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div>
                <h1 className="text-3xl font-bold text-[#1C1917]">Mes Missions</h1>
                <p className="text-[#64748B] text-sm mt-1">Suivez vos travaux en cours et terminés</p>
            </div>
            <div className="flex gap-2">
                <button className="px-6 py-3 rounded-2xl bg-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-[#1C2333] hover:text-white transition-colors">
                    Tous
                </button>
                <button className="px-6 py-3 rounded-2xl bg-[#F97316] text-white font-semibold text-sm">
                    En cours
                </button>
            </div>
        </div>

        <div className="space-y-6">
            {missions.map((m, i) => (
                <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-6">
                        <img src={m.image} alt={m.artisan} className="w-24 h-24 rounded-2xl object-cover" />
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-[#1C1917]">{m.artisan}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[m.status]}`}>
                                    {m.status}
                                </span>
                            </div>
                            <p className="text-[#64748B] text-sm mb-2">{m.metier} • {m.ville}</p>
                            <span className="flex items-center gap-2 text-sm text-[#64748B]">
                                <Calendar size={16} className="text-[#F97316]" /> {m.date}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 rounded-2xl bg-[#1C2333] text-white font-semibold text-sm hover:bg-[#F97316] transition-colors">
                            Gérer
                        </button>
                        <button className="px-6 py-3 rounded-2xl bg-[#F4F6FA] text-[#64748B] font-semibold text-sm hover:bg-[#E2E8F0] transition-colors flex items-center gap-2">
                            <MessageSquare size={18} /> Chat
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

export default MissionsView;
