/**
 * MessagesView - Vue Discussions
 * Liste des conversations avec artisans
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare } from 'lucide-react';

const conversations = [
    { id: 1, nom: 'Ahmed M.', message: 'Je serai là à l\'heure...', time: '10:05', active: true },
    { id: 2, nom: 'Youssef A.', message: 'Le devis est prêt', time: '09:30', active: false },
    { id: 3, nom: 'Said B.', message: 'Merci pour votre confiance', time: 'Hier', active: false },
];

const MessagesView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-12rem)]">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col lg:flex-row h-full">
            {/* Liste des conversations */}
            <div className="w-full lg:w-96 border-r border-[#E2E8F0] flex flex-col">
                <div className="p-6 border-b border-[#E2E8F0]">
                    <h2 className="text-xl font-bold text-[#1C1917] mb-4">Discussions</h2>
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F4F6FA] border border-transparent focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none text-sm"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {conversations.map((c) => (
                        <div
                            key={c.id}
                            className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-colors ${
                                c.active ? 'bg-[#1C2333] text-white' : 'hover:bg-[#F4F6FA]'
                            }`}
                        >
                            <img
                                src={`https://i.pravatar.cc/100?u=${c.id + 40}`}
                                alt={c.nom}
                                className="w-12 h-12 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold truncate">{c.nom}</p>
                                    <span className={`text-xs ${c.active ? 'text-white/50' : 'text-[#64748B]'}`}>
                                        {c.time}
                                    </span>
                                </div>
                                <p className={`text-sm truncate ${c.active ? 'text-white/70' : 'text-[#64748B]'}`}>
                                    {c.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Zone de chat vide */}
            <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-[#F4F6FA]/30 p-12">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-6">
                    <MessageSquare size={48} className="text-[#F97316]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1917] mb-2">Sélectionnez un artisan</h3>
                <p className="text-[#64748B] text-center max-w-sm">
                    Commencez à discuter de vos projets avec nos experts qualifiés.
                </p>
            </div>
        </div>
    </motion.div>
);

export default MessagesView;
