import React from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, Star, Hammer, MapPin as Pin, Trophy, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-brand-offwhite min-h-screen font-sans">
            {/* Hero Section - Dark Navy with Grid Pattern */}
            <section className="relative min-h-[90vh] bg-brand-dark flex flex-col items-center justify-center pt-20 overflow-hidden bg-grid-pattern">
                {/* Visual Orbs for depth */}
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-7xl font-bold text-white leading-[1.1] mb-6 max-w-4xl mx-auto">
                            Trouvez l'artisan idéal pour vos <span className="text-brand-orange">travaux</span>.
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Plombiers, électriciens, peintres... Des centaines d'experts qualifiés à travers le Maroc, prêts à intervenir.
                        </p>
                    </motion.div>

                    {/* Capsule Search Bar - Matching the Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-4xl bg-white rounded-full p-2 flex flex-col md:flex-row items-center shadow-2xl"
                    >
                        {/* Specialty Section */}
                        <div className="flex-1 flex items-center px-8 py-4 border-r border-gray-100 group">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <Hammer size={20} className="text-brand-orange" />
                            </div>
                            <div className="text-left flex-grow">
                                <label className="block text-[10px] font-bold text-blue-900/40 uppercase tracking-widest mb-1">Spécialité</label>
                                <input
                                    type="text"
                                    placeholder="Que cherchez-vous ?"
                                    className="w-full bg-transparent border-none outline-none text-brand-dark font-bold placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="flex-1 flex items-center px-8 py-4 group">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <MapPin size={20} className="text-brand-orange" />
                            </div>
                            <div className="text-left flex-grow">
                                <label className="block text-[10px] font-bold text-blue-900/40 uppercase tracking-widest mb-1">Localisation</label>
                                <select className="w-full bg-transparent border-none outline-none text-brand-dark font-bold cursor-pointer appearance-none">
                                    <option>Toutes les villes</option>
                                    <option>Casablanca</option>
                                    <option>Rabat</option>
                                    <option>Marrakech</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="bg-brand-dark text-white h-16 w-16 md:w-20 rounded-full flex items-center justify-center hover:bg-brand-orange transition-all shadow-lg active:scale-95 shrink-0 ml-auto">
                            <Search size={28} />
                        </button>
                    </motion.div>

                    {/* Stats Icons - Matching the Image bottom */}
                    <div className="grid grid-cols-3 gap-12 mt-20 w-full max-w-4xl border-t border-white/5 pt-12">
                        <div className="text-center group">
                            <div className="mb-4 flex justify-center">
                                <Hammer size={32} className="text-brand-orange group-hover:rotate-12 transition-transform" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-brand-orange mb-2">2400</h3>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Artisans Qualifiés</p>
                        </div>
                        <div className="text-center group border-x border-white/5 px-4">
                            <div className="mb-4 flex justify-center">
                                <Star size={32} className="text-brand-orange group-hover:scale-125 transition-transform" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-brand-orange mb-2">15,000</h3>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Projets Réussis</p>
                        </div>
                        <div className="text-center group">
                            <div className="mb-4 flex justify-center">
                                <Pin size={32} className="text-brand-orange group-hover:bounce transition-transform" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-brand-orange mb-2">18</h3>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Villes Couvertes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 tracking-tight">Services les plus demandés</h2>
                        <p className="text-gray-500 text-lg">Choisissez le domaine d'expertise dont vous avez besoin pour votre projet.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'Plomberie', icon: '🚰' },
                            { name: 'Électricité', icon: '⚡' },
                            { name: 'Menuiserie', icon: '🪚' },
                            { name: 'Peinture', icon: '🎨' },
                            { name: 'Clim', icon: '❄️' },
                            { name: 'Maçonnerie', icon: '🧱' },
                        ].map((cat, i) => (
                            <div key={i} className="p-8 rounded-[2.5rem] bg-gray-50 hover:bg-white border border-transparent hover:border-brand-orange/20 hover:shadow-2xl transition-all group cursor-pointer text-center">
                                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                                <h4 className="font-bold text-brand-dark group-hover:text-brand-orange">{cat.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-brand-offwhite">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1581244276891-83393a8ba21d?auto=format&fit=crop&q=80&w=1000"
                                className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
                                alt="Quality work"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">Pourquoi choisir <span className="text-brand-orange">ArtisanConnect</span> ?</h2>
                            <div className="space-y-6">
                                {[
                                    { title: 'Vérification Rigoureuse', desc: 'Chaque artisan passe un entretien et une vérification de ses références.' },
                                    { title: 'Garantie Satisfaction', desc: 'Nous assurons le suivi de vos travaux du début à la fin.' },
                                    { title: 'Paiement Sécurisé', desc: 'Libérez les fonds uniquement quand vous êtes satisfait du résultat.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                                            <ShieldCheck size={20} className="text-brand-orange" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-brand-dark mb-1">{item.title}</h3>
                                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
