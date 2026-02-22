import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Mail, Lock, UserPlus, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const registerSchema = z.object({
    name: z.string().min(2, 'Nom complet requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

const Register = () => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null); // 'client' or 'artisan'
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Compte créé avec succès !');
            navigate('/connexion');
        } catch (error) {
            toast.error("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="min-h-screen bg-brand-offwhite flex items-center justify-center p-6 py-20">
            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[3rem] shadow-2xl shadow-brand-dark/5 overflow-hidden">

                {/* Progress Sidebar (Desktop) */}
                <div className="hidden lg:block lg:col-span-4 bg-brand-dark p-12 text-white">
                    <div className="space-y-12">
                        {[
                            { id: 1, title: 'Rôle', desc: 'Choisissez votre type de compte' },
                            { id: 2, title: 'Informations', desc: 'Vos coordonnées personnelles' },
                            { id: 3, title: 'Vérification', desc: 'Confirmation de sécurité' },
                        ].map((s) => (
                            <div key={s.id} className={`flex items-start space-x-4 transition-opacity ${step >= s.id ? 'opacity-100' : 'opacity-30'}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${step === s.id ? 'bg-brand-orange text-white' : step > s.id ? 'bg-green-500 text-white' : 'bg-white/10 text-white/50'}`}>
                                    {step > s.id ? <CheckCircle2 size={20} /> : s.id}
                                </div>
                                <div>
                                    <h3 className="font-bold">{s.title}</h3>
                                    <p className="text-sm text-gray-500">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-40">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <span className="font-bold text-xl">ArtisanConnect</span>
                        </Link>
                    </div>
                </div>

                {/* Form Area */}
                <div className="p-8 lg:p-16 lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h1 className="text-4xl font-bold text-brand-dark mb-4">Bienvenue !</h1>
                                    <p className="text-gray-500">Pour commencer, dites-nous qui vous êtes.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => { setRole('client'); setStep(2); }}
                                        className={`p-8 rounded-[2rem] border-2 text-left transition-all group ${role === 'client' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-50 hover:border-brand-orange/20 hover:bg-gray-50'}`}
                                    >
                                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <User size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-dark mb-2">Particulier</h3>
                                        <p className="text-gray-500 text-sm">Je cherche des artisans qualifiés pour mes travaux.</p>
                                    </button>

                                    <button
                                        onClick={() => { setRole('artisan'); setStep(2); }}
                                        className={`p-8 rounded-[2rem] border-2 text-left transition-all group ${role === 'artisan' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-50 hover:border-brand-orange/20 hover:bg-gray-50'}`}
                                    >
                                        <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Briefcase size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-dark mb-2">Artisan</h3>
                                        <p className="text-gray-500 text-sm">Je propose mes services et souhaite développer mon activité.</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center text-sm font-bold text-gray-400 hover:text-brand-orange transition-colors"
                                >
                                    <ArrowLeft size={16} className="mr-2" /> Retour
                                </button>

                                <div>
                                    <h1 className="text-4xl font-bold text-brand-dark mb-2">Information Profil</h1>
                                    <p className="text-gray-500">
                                        Vous créez un compte en tant que <span className="text-brand-orange font-bold uppercase">{role === 'client' ? 'Particulier' : 'Artisan'}</span>.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Nom Complet</label>
                                            <input
                                                {...register('name')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.name ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                placeholder="Jean Dupont"
                                            />
                                            {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Email</label>
                                            <input
                                                {...register('email')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.email ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                placeholder="jean@example.com"
                                            />
                                            {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-brand-dark ml-1">Mot de passe</label>
                                        <input
                                            {...register('password')}
                                            type="password"
                                            className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.password ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                            placeholder="••••••••"
                                        />
                                        {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-brand-dark ml-1">Confirmer mot de passe</label>
                                        <input
                                            {...register('confirmPassword')}
                                            type="password"
                                            className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.confirmPassword ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                            placeholder="••••••••"
                                        />
                                        {errors.confirmPassword && <p className="text-xs text-red-500 ml-1">{errors.confirmPassword.message}</p>}
                                    </div>

                                    <button
                                        disabled={isSubmitting}
                                        className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold shadow-xl shadow-brand-orange/20 hover:bg-brand-orange/90 transition-all flex items-center justify-center group"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Créer mon compte
                                                <UserPlus size={20} className="ml-2 group-hover:scale-110 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="mt-12 text-center text-gray-500 text-sm">
                        Déjà inscrit ?{' '}
                        <Link to="/connexion" className="text-brand-orange font-bold hover:underline">Se connecter</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
