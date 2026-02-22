/**
 * ProfilView - Vue Profil Client
 * Informations et édition du profil
 */
import React from 'react';
import { motion } from 'framer-motion';

const ProfilView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
        <h1 className="text-3xl font-bold text-[#1C1917] mb-8">Mon Profil</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="p-8 space-y-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
                        alt="Profil"
                        className="w-32 h-32 rounded-2xl object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-[#1C1917] mb-1">Karim Bennani</h2>
                        <p className="text-[#F97316] text-sm font-bold uppercase tracking-wider">Client Or</p>
                        <button className="mt-4 px-5 py-2 rounded-xl bg-[#F4F6FA] text-[#64748B] text-sm font-semibold hover:bg-[#E2E8F0] transition-colors">
                            Changer la photo
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[#64748B] text-sm font-medium mb-2">Nom Complet</label>
                        <input
                            type="text"
                            defaultValue="Karim Bennani"
                            className="w-full h-14 px-5 rounded-xl bg-[#F4F6FA] border-2 border-transparent focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none text-[#1C1917] font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-[#64748B] text-sm font-medium mb-2">Téléphone</label>
                        <input
                            type="text"
                            defaultValue="+212 6 12 34 56 78"
                            className="w-full h-14 px-5 rounded-xl bg-[#F4F6FA] border-2 border-transparent focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none text-[#1C1917] font-medium"
                        />
                    </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-[#1C2333] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#F97316] transition-colors">
                    Mettre à jour mon profil
                </button>
            </div>
        </div>
    </motion.div>
);

export default ProfilView;
