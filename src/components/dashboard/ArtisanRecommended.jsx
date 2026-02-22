/**
 * ArtisanRecommended - Artisans recommandés
 * Photo, métier, ville, note, bouton Contacter
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';

const artisans = [
    {
        id: 1,
        nom: 'Karim El Fassi',
        metier: 'Plombier',
        ville: 'Casablanca',
        note: 4.9,
        avis: 124,
        image: 'https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=100',
    },
    {
        id: 2,
        nom: 'Fatima Zahra Idrissi',
        metier: 'Électricienne',
        ville: 'Rabat',
        note: 4.8,
        avis: 89,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    },
    {
        id: 3,
        nom: 'Omar Tazi',
        metier: 'Menuisier',
        ville: 'Marrakech',
        note: 5.0,
        avis: 67,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
];

const ArtisanRecommended = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden"
    >
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#1C1917]">Artisans Recommandés</h2>
            <Link
                to="/recherche"
                className="text-[#F97316] text-sm font-semibold hover:text-[#EA6C0A] flex items-center gap-1"
            >
                Voir tous <ChevronRight size={16} />
            </Link>
        </div>
        <div className="p-4 space-y-4">
            {artisans.map((artisan, i) => (
                <motion.div
                    key={artisan.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F4F6FA]/50 transition-colors"
                >
                    <img
                        src={artisan.image}
                        alt={artisan.nom}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded-lg bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase mb-1">
                            {artisan.metier}
                        </span>
                        <p className="font-bold text-[#1C1917] truncate">{artisan.nom}</p>
                        <p className="text-sm text-[#64748B]">{artisan.ville}</p>
                        <div className="flex items-center gap-1 mt-1">
                            <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                            <span className="text-sm font-bold text-[#1C1917]">{artisan.note}</span>
                            <span className="text-xs text-[#64748B]">({artisan.avis} avis)</span>
                        </div>
                    </div>
                    <Link
                        to={`/artisan/${artisan.id}`}
                        className="shrink-0 px-4 py-2 rounded-full bg-[#F97316] text-white text-xs font-bold uppercase hover:bg-[#EA6C0A] transition-colors"
                    >
                        Contacter
                    </Link>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

export default ArtisanRecommended;
