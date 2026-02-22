import React from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialRole = 'client' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden animate-spring">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#1A3A5C] transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-10">
                    <h2 className="text-3xl font-['Sora'] font-black text-[#1A3A5C] mb-2">Bienvenue</h2>
                    <p className="text-slate-500 font-medium mb-8">Connectez-vous pour continuer sur ArtisanConnect.</p>

                    <form className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#1A3A5C]">Email</label>
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/5 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#1A3A5C]">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/5 transition-all font-medium"
                            />
                        </div>

                        <button className="w-full py-4 bg-[#FF6B35] text-white rounded-2xl font-['Sora'] font-black shadow-lg shadow-[#FF6B35]/20 hover:shadow-[#FF6B35]/40 transition-all mt-4">
                            Se connecter
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500 font-bold text-sm">
                            Pas encore de compte ? <span className="text-[#FF6B35] cursor-pointer">S'inscrire</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
