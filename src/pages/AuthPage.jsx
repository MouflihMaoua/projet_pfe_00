import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Mail, Star, Lock, Eye, EyeOff, User, Tools, Check, Calendar, MessageSquare, Phone, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';
import { COLORS as C } from '../constants/theme';
import { InputField, SelectField } from '../components/auth/AuthFields';

/* ─────────────────────────────────────────────────────────────────
   ICONS (SVG placeholders if not in lucide or custom)
───────────────────────────────────────────────────────────────── */
const icons = {
    google: (
        <svg viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    ),
    facebook: (
        <svg viewBox="0 0 24 24" style={{ width: 18, height: 18 }} fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    ),
};

/* ─────────────────────────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────────────────────────── */
const VILLES = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kénitra', 'Tétouan'];
const MÉTIERS = ['Plombier', 'Électricien', 'Peintre', 'Menuisier', 'Maçon', 'Carreleur', 'Serrurier', 'Climatisation', 'Jardinage', 'Déménagement'];

const validateLogin = (f, v) => {
    if (f === 'email') { if (!v) return 'Email requis'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Format invalide'; }
    if (f === 'pwd') { if (!v) return 'Mot de passe requis'; if (v.length < 6) return 'Minimum 6 caractères'; }
    return '';
};
const validateReg = (f, v, all, role) => {
    if (f === 'nom') { if (!v) return 'Nom requis'; }
    if (f === 'email') { if (!v) return 'Email requis'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Format invalide'; }
    if (f === 'tel') { if (!v) return 'Téléphone requis'; if (!/^(\+212|0)[5-7]\d{8}$/.test(v.replace(/\s/g, ''))) return 'Format marocain invalide'; }
    if (f === 'ville') { if (!v) return 'Ville requise'; }
    if (f === 'mdp') { if (!v) return 'Mot de passe requis'; if (v.length < 8) return 'Minimum 8 caractères'; }
    if (f === 'confirm') { if (!v) return 'Confirmation requise'; if (v !== (all || {}).mdp) return 'Mots de passe différents'; }
    if (role === 'artisan') {
        if (f === 'metier') { if (!v) return 'Métier requis'; }
        if (f === 'exp') { if (!v) return 'Expérience requise'; }
    }
    return '';
};

/* ─────────────────────────────────────────────────────────────────
   LEFT PANEL - Premium Navy with Grain & Mesh
───────────────────────────────────────────────────────────────── */
function LeftPanel() {
    return (
        <div className="h-full bg-brand-navy relative overflow-hidden flex flex-col justify-between p-16 bg-grain">
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-brand-orange/20 rounded-full blur-[100px] animate-mesh-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]" />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-orange-400 flex items-center justify-center shadow-xl shadow-brand-orange/30">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-heading text-3xl font-black text-white tracking-tighter leading-none">
                            Artisan<span className="text-brand-orange">Connect</span>
                        </div>
                        <div className="text-[10px] font-black tracking-[0.3em] text-white/30 mt-1 uppercase">Plateforme Certifiée</div>
                    </div>
                </div>
                <p className="text-white/50 text-lg font-medium leading-relaxed max-w-xs">
                    Rejoignez le premier réseau marocain d'artisans qualifiés et de clients exigeants.
                </p>
            </div>

            <div className="relative z-10 py-12">
                <div className="glass-card-dark p-10 rounded-[3rem] border-white/10 relative overflow-hidden">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center">
                            <ShieldCheck size={32} className="text-brand-orange" />
                        </div>
                        <div>
                            <h3 className="font-heading text-xl font-bold text-white mb-1">Qualité Garantie</h3>
                            <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Profils vérifiés par nos experts</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            "Interventions sécurisées",
                            "Devis gratuits & immédiats",
                            "Paiement à la livraison"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/60 text-sm font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-6">
                {[
                    { v: '2k+', l: 'Artisans' },
                    { v: '18', l: 'Villes' },
                    { v: '4.9★', l: 'Avis' },
                ].map(({ v, l }) => (
                    <div key={l} className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                        <div className="font-heading text-xl font-black text-brand-orange leading-none mb-1">{v}</div>
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">{l}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function AuthPage({ initialRole = 'client' }) {
    const navigate = useNavigate();
    const [role, setRole] = useState(initialRole);
    const [tab, setTab] = useState('login');
    const [showP1, setShowP1] = useState(false);
    const formRef = useRef(null);

    /* ── Login ─────────────────────────────────────────────────── */
    const [lf, setLf] = useState({ email: '', pwd: '' });
    const [le, setLe] = useState({});
    const [lt, setLt] = useState({});

    const submitLogin = e => {
        e.preventDefault();
        navigate(role === 'artisan' ? '/dashboard/artisan' : '/dashboard/client');
    };

    /* ── Register ──────────────────────────────────────────────── */
    const [rf, setRf] = useState({ nom: '', email: '', tel: '', ville: '', mdp: '', confirm: '', metier: '', exp: '', desc: '' });
    const [re, setRe] = useState({});
    const [rt, setRt] = useState({});

    const rChange = (f, v) => setRf(p => ({ ...p, [f]: v }));

    const calcProgress = () => {
        const base = ['nom', 'email', 'tel', 'ville', 'mdp', 'confirm'];
        const extra = role === 'artisan' ? ['metier', 'exp'] : [];
        const all = [...base, ...extra];
        const filled = all.filter(f => rf[f]);
        return Math.round((filled.length / all.length) * 100);
    };

    const submitReg = e => {
        e.preventDefault();
        navigate(role === 'artisan' ? '/dashboard/artisan' : '/dashboard/client');
    };

    useEffect(() => { formRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }, [tab]);

    const pct = calcProgress();

    return (
        <div className="min-h-screen bg-brand-offwhite font-sans selection:bg-brand-orange selection:text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="hidden lg:block lg:col-span-5 h-screen sticky top-0">
                    <LeftPanel />
                </div>

                <div ref={formRef} className="lg:col-span-7 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
                    <div className="w-full max-w-xl space-y-12">
                        {/* Header & Back Button */}
                        <div className="flex justify-between items-center">
                            <Link to="/" className="inline-flex items-center gap-2 group">
                                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-brand-navy group-hover:text-white transition-all">
                                    <ArrowLeft size={16} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-navy transition-colors">Retour</span>
                            </Link>

                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Maroc</span>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black font-heading text-brand-navy tracking-tighter leading-tight">
                                {tab === 'login' ? 'Bienvenue à nouveau.' : 'Créez votre futur.'}
                            </h2>
                            <p className="text-gray-400 font-bold max-w-sm">
                                {tab === 'login'
                                    ? "Connectez-vous pour accéder à votre espace personnalisé."
                                    : "Rejoignez la plus grande communauté d'artisans au Maroc."}
                            </p>
                        </div>

                        {/* Switchers Section */}
                        <div className="space-y-6">
                            {/* Tab Switcher */}
                            <div className="bg-gray-50 p-1.5 rounded-3xl flex items-center max-w-sm">
                                {[['login', 'Connexion'], ['register', 'Inscription']].map(([v, l]) => (
                                    <button
                                        key={v}
                                        onClick={() => setTab(v)}
                                        className={cn(
                                            "flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                                            tab === v ? "bg-white text-brand-navy shadow-lg" : "text-gray-400 hover:text-brand-navy"
                                        )}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>

                            {/* Role Switcher */}
                            <div className="flex gap-4">
                                {[
                                    { v: 'client', l: 'Particulier', ic: icons.person },
                                    { v: 'artisan', l: 'Artisan', ic: icons.tools }
                                ].map(({ v, l, ic }) => (
                                    <button
                                        key={v}
                                        onClick={() => setRole(v)}
                                        className={cn(
                                            "flex-1 p-6 rounded-[2.5rem] border-2 transition-all duration-500 text-left relative overflow-hidden group",
                                            role === v
                                                ? "border-brand-navy bg-brand-navy text-white shadow-2xl"
                                                : "border-gray-100 hover:border-brand-navy/30 bg-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                                            role === v ? "bg-white/10" : "bg-gray-50 group-hover:bg-brand-navy group-hover:text-white"
                                        )}>
                                            {ic}
                                        </div>
                                        <p className="font-black font-heading text-lg tracking-tight">{l}</p>
                                        {role === v && <div className="absolute top-4 right-4 text-brand-orange animate-bounce"><icons.check /></div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="bg-gray-50 p-10 md:p-14 rounded-[4rem] relative overflow-hidden group">
                            <div className="absolute top-[-20%] right-[-20%] w-[200px] h-[200px] bg-brand-orange/5 rounded-full blur-[60px]" />

                            {tab === 'login' ? (
                                <form onSubmit={submitLogin} className="space-y-8 relative z-10">
                                    <InputField
                                        label="ADRESSE EMAIL"
                                        type="email"
                                        placeholder="mohammed@alami.ma"
                                        className="bg-white"
                                    />
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">MOT DE PASSE</label>
                                            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:translate-x-1 transition-transform">Oublié ?</a>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showP1 ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full h-16 px-6 rounded-2xl bg-white border border-transparent focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/5 outline-none font-bold placeholder:text-gray-300 transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowP1(!showP1)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-navy transition-colors"
                                            >
                                                {showP1 ? <icons.eyeOff /> : <icons.eye />}
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full h-20 bg-brand-navy text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-orange transition-all duration-500 shadow-xl active:scale-95 leading-none">
                                        Se connecter
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={submitReg} className="space-y-6 relative z-10">
                                    <InputField label="NOM COMPLET" placeholder="Mohammed Alami" className="bg-white" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField label="EMAIL" type="email" placeholder="mohammed@alami.ma" className="bg-white" />
                                        <InputField label="TÉLÉPHONE" type="tel" placeholder="06XXXXXXXX" className="bg-white" />
                                    </div>
                                    <SelectField label="VILLE" options={VILLES} className="bg-white" />
                                    {role === 'artisan' && (
                                        <div className="grid grid-cols-2 gap-6">
                                            <SelectField label="MÉTIER" options={MÉTIERS} className="bg-white" />
                                            <InputField label="EXPÉRIENCE" placeholder="Ex: 5 ans" className="bg-white" />
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField label="MOT DE PASSE" type="password" placeholder="••••••••" className="bg-white" />
                                        <InputField label="CONFIRMATION" type="password" placeholder="••••••••" className="bg-white" />
                                    </div>
                                    <button type="submit" className="w-full h-20 bg-brand-navy text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-orange transition-all duration-500 shadow-xl active:scale-95 leading-none">
                                        Créer mon compte
                                    </button>
                                </form>
                            )}

                            {/* Social Auth */}
                            <div className="mt-12 space-y-8 relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="flex-1 h-px bg-gray-100" />
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Ou continuer avec</span>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center gap-4 hover:border-brand-navy/20 hover:shadow-lg transition-all text-xs font-black text-brand-navy">
                                        <icons.google /> Google
                                    </button>
                                    <button className="h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center gap-4 hover:border-blue-500/20 hover:shadow-lg transition-all text-xs font-black text-brand-navy">
                                        <icons.facebook /> Facebook
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar (Only for Register) */}
                        {tab === 'register' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Complétion du profil</span>
                                    <span className="text-xs font-black text-brand-navy">{pct}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        className="h-full bg-brand-orange"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
