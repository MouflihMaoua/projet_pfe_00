import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/assets/logo_app.png" alt="7rayfi" className="w-12 h-12" />
                            <span className="font-bold text-2xl tracking-tight">
                                7rayfi<span className="text-brand-orange">fi</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            La plateforme n°1 au Maroc pour trouver des artisans qualifiés en un clic.
                            Qualité, confiance et transparence garanties.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Liens Rapides</h3>
                        <ul className="space-y-4">
                            <li><Link to="/recherche" className="text-gray-400 hover:text-brand-orange transition-colors">Trouver un artisan</Link></li>
                            <li><Link to="/inscription" className="text-gray-400 hover:text-brand-orange transition-colors">Devenir Artisan</Link></li>
                            <li><Link to="/#how-it-works" className="text-gray-400 hover:text-brand-orange transition-colors">Comment ça marche</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-brand-orange transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Métiers</h3>
                        <ul className="space-y-4">
                            <li><Link to="/recherche?cat=plomberie" className="text-gray-400 hover:text-brand-orange transition-colors">Plomberie</Link></li>
                            <li><Link to="/recherche?cat=electricite" className="text-gray-400 hover:text-brand-orange transition-colors">Électricité</Link></li>
                            <li><Link to="/recherche?cat=menuiserie" className="text-gray-400 hover:text-brand-orange transition-colors">Menuiserie</Link></li>
                            <li><Link to="/recherche?cat=peinture" className="text-gray-400 hover:text-brand-orange transition-colors">Peinture</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <MapPin size={20} className="text-brand-orange shrink-0" />
                                <span>Casablanca, Maroc</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Phone size={20} className="text-brand-orange shrink-0" />
                                <span>+212 5 22 00 00 00</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Mail size={20} className="text-brand-orange shrink-0" />
                                <span>contact@7rayfi.ma</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
                    <p>© 2024 7rayfi. Tous droits réservés.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-brand-orange transition-colors">Mentions légales</a>
                        <a href="#" className="hover:text-brand-orange transition-colors">Confidentialité</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
