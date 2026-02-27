import React from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, Star, Hammer, MapPin as Pin, Trophy, Users, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollText from '../../components/ui/ScrollText';

const Home = () => {
    return (
        <div className="bg-brand-offwhite min-h-screen font-sans">
            {/* Hero Section - Dark Navy with Grid Pattern */}
            <section className="relative min-h-[90vh] bg-brand-dark flex flex-col items-center justify-center pt-20 overflow-hidden bg-grid-pattern">
                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-7xl font-bold text-white leading-[1.1] mb-6 max-w-4xl mx-auto">
                            Transformez vos idées en <span className="text-brand-orange">réalité</span> avec les meilleurs artisans du Maroc.
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Plus de 2400 artisans vérifiés à votre service. Devis gratuits, intervention rapide, satisfaction garantie.
                        </p>
                    </motion.div>
                </div>
            </section>

           

            {/* Scroll Text Animation Section */}
            <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 tracking-tight"
                        >
                            Explorez l'<span className="text-brand-orange">excellence</span> artisanale marocaine
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-500 text-lg"
                        >
                            Des experts passionnés qui transfornt chaque projet en chef-d'œuvre
                        </motion.p>
                    </div>
                    
                    <ScrollText className="mb-20" />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                            Prêt à donner vie à votre projet ?
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Rejoignez des milliers de Marocains qui font confiance à nos artisans pour réaliser leurs rêves
                        </p>
                        <Link 
                            to="/recherche-artisan"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-full font-bold hover:bg-brand-orange/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Trouver mon artisan dès maintenant
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 tracking-tight"
                        >
                            Comment ça <span className="text-brand-orange">marche</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-500 text-lg"
                        >
                            Trouvez et collaborez avec des artisans qualifiés en 4 étapes simples
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Étape 1: Chercher Artisan */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative group"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 h-full border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Numéro d'étape */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                    1
                                </div>
                                
                                {/* Icône */}
                                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Search size={32} className="text-brand-orange" />
                                </div>
                                
                                {/* Contenu */}
                                <h3 className="text-xl font-bold text-brand-dark mb-3">Chercher Artisan</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Parcourez notre réseau d'artisans vérifiés et trouvez le professionnel parfait pour votre projet
                                </p>
                                
                                {/* Lien */}
                                <Link 
                                    to="/recherche-artisan"
                                    className="inline-flex items-center gap-2 text-brand-orange font-semibold mt-4 hover:gap-3 transition-all"
                                >
                                    Commencer la recherche
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Étape 2: Discuter */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative group"
                        >
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 h-full border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Numéro d'étape */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                    2
                                </div>
                                
                                {/* Icône */}
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <MessageSquare size={32} className="text-green-600" />
                                </div>
                                
                                {/* Contenu */}
                                <h3 className="text-xl font-bold text-brand-dark mb-3">Discuter</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Échangez directement avec les artisans, décrivez vos besoins et obtenez des devis personnalisés
                                </p>
                                
                                
                            </div>
                        </motion.div>

                        {/* Étape 3: Facturation */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative group"
                        >
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 h-full border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Numéro d'étape */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                    3
                                </div>
                                
                                {/* Icône */}
                                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Briefcase size={32} className="text-purple-600" />
                                </div>
                                
                                {/* Contenu */}
                                <h3 className="text-xl font-bold text-brand-dark mb-3">Facturation</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Suivez vos paiements, recevez des factures claires et bénéficiez d'un système de paiement sécurisé
                                </p>
                                
                                
                            </div>
                        </motion.div>

                        {/* Étape 4: Donner un avis */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative group"
                        >
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 h-full border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Numéro d'étape */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                    4
                                </div>
                                
                                {/* Icône */}
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Star size={32} className="text-brand-orange" />
                                </div>
                                
                                {/* Contenu */}
                                <h3 className="text-xl font-bold text-brand-dark mb-3">Donner un avis</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Partagez votre expérience, notez les artisans et aidez la communauté à faire les meilleurs choix
                                </p>
                                
                               
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-brand-offwhite">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1581244276891-83393a8ba21d?auto=format&fit=crop&q=80&w=1000"
                                className="rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/3]"
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
                
                    {/* CTA Global */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center mt-16"
                    >
                        <div className="bg-gradient-to-r from-brand-orange to-orange-600 rounded-2xl p-8 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Prêt à commencer votre projet ?
                            </h3>
                            <p className="text-white/90 mb-6">
                                Rejoignez des milliers de clients qui ont trouvé leur artisan idéal
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    to="/recherche-artisan"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-brand-orange rounded-full font-bold hover:bg-gray-50 transition-all"
                                >
                                    <Search size={20} />
                                    Trouver un artisan
                                </Link>
                                <Link 
                                    to="/inscription"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        </div>
                    </motion.div>
            </section>
        </div>
    );
};

export default Home;
