import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Mail, Lock, UserPlus, ArrowRight, ArrowLeft, CheckCircle2, Upload, Camera, MapPin, Phone, Wrench } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const VILLES = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kénitra', 'Tétouan'];
const MÉTIERS = ['Plombier', 'Peintre', 'Électricienne', 'Femme de ménage', 'Technicien Climatisation Certifié'];
const DISTANCES = ['<10km', '20km', '30km', '>30km'];
const SEXES = ['Homme', 'Femme'];

const registerSchema = z.object({
    nom: z.string().min(2, 'Nom requis'),
    prenom: z.string().min(2, 'Prénom requis'),
    email: z.string().email('Email invalide'),
    telephone: z.string().min(10, 'Téléphone requis'),
    sexe: z.string().min(1, 'Sexe requis'),
    ville: z.string().min(1, 'Ville requise'),
    codePostal: z.string().min(4, 'Code postal requis'),
    description: z.string().min(10, 'Description requise (min 10 caractères)'),
    password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

const artisanSchema = registerSchema.extend({
    metier: z.string().min(1, 'Métier requis'),
    distance: z.string().min(1, 'Distance requise'),
    photoProfil: z.any().optional(),
    aExperience: z.boolean().optional(),
    anneesExperience: z.number().optional()
});

const Register = () => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null); // 'client' or 'artisan'
    const [photoFile, setPhotoFile] = useState(null);
    const [aExperience, setAExperience] = useState(false);
    const navigate = useNavigate();

    const schema = role === 'artisan' ? artisanSchema : registerSchema;
    
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm({
        resolver: zodResolver(schema),
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
                            { id: 3, title: 'Disponibilité', desc: 'Votre zone de disponibilité' },
                            { id: 4, title: 'Vérification', desc: 'Confirmation de sécurité' },
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
                                    <h1 className="text-4xl font-bold text-brand-dark mb-2">Informations Personnelles</h1>
                                    <p className="text-gray-500">
                                        Vos informations de base pour créer votre profil.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Nom</label>
                                            <input
                                                {...register('nom')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.nom ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                placeholder="Alami"
                                            />
                                            {errors.nom && <p className="text-xs text-red-500 ml-1">{errors.nom.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Prénom</label>
                                            <input
                                                {...register('prenom')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.prenom ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                placeholder="Mohammed"
                                            />
                                            {errors.prenom && <p className="text-xs text-red-500 ml-1">{errors.prenom.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Email</label>
                                            <input
                                                {...register('email')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.email ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                placeholder="mohammed@example.com"
                                            />
                                            {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Téléphone</label>
                                            <input
                                                {...register('telephone')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.telephone ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                placeholder="06XXXXXXXX"
                                            />
                                            {errors.telephone && <p className="text-xs text-red-500 ml-1">{errors.telephone.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Sexe</label>
                                            <select
                                                {...register('sexe')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.sexe ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                            >
                                                <option value="">Sélectionner</option>
                                                {SEXES.map(sexe => (
                                                    <option key={sexe} value={sexe}>{sexe}</option>
                                                ))}
                                            </select>
                                            {errors.sexe && <p className="text-xs text-red-500 ml-1">{errors.sexe.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Photo de profil</label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        setPhotoFile(e.target.files[0]);
                                                        setValue('photoProfil', e.target.files[0]);
                                                    }}
                                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-brand-orange focus:bg-white outline-none transition-all shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-orange file:text-white hover:file:bg-brand-orange/90"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <Camera size={20} />
                                                </div>
                                            </div>
                                            {photoFile && <p className="text-xs text-green-600 ml-1">Photo sélectionnée: {photoFile.name}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-brand-dark ml-1">Description du profil</label>
                                        <textarea
                                            {...register('description')}
                                            rows={3}
                                            className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.description ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm resize-none`}
                                            placeholder="Décrivez brièvement votre profil et vos compétences..."
                                        />
                                        {errors.description && <p className="text-xs text-red-500 ml-1">{errors.description.message}</p>}
                                    </div>

                                    {role === 'artisan' && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-brand-dark mb-4">Informations sur le Métier</h3>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-brand-dark ml-1">Métier</label>
                                                <select
                                                    {...register('metier')}
                                                    className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.metier ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                >
                                                    <option value="">Sélectionner un métier</option>
                                                    {MÉTIERS.map(metier => (
                                                        <option key={metier} value={metier}>{metier}</option>
                                                    ))}
                                                </select>
                                                {errors.metier && <p className="text-xs text-red-500 ml-1">{errors.metier.message}</p>}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-brand-dark ml-1">Avez-vous de l'expérience ?</label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="experience"
                                                            value="oui"
                                                            checked={aExperience}
                                                            onChange={(e) => {
                                                                setAExperience(true);
                                                                setValue('aExperience', true);
                                                            }}
                                                            className="w-4 h-4 text-brand-orange border-gray-300 focus:ring-brand-orange"
                                                        />
                                                        <span className="text-gray-700">Oui</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="experience"
                                                            value="non"
                                                            checked={!aExperience}
                                                            onChange={(e) => {
                                                                setAExperience(false);
                                                                setValue('aExperience', false);
                                                                setValue('anneesExperience', 0);
                                                            }}
                                                            className="w-4 h-4 text-brand-orange border-gray-300 focus:ring-brand-orange"
                                                        />
                                                        <span className="text-gray-700">Non</span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            {aExperience && (
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-brand-dark ml-1">Nombre d'années d'expérience</label>
                                                    <input
                                                        type="number"
                                                        {...register('anneesExperience', { valueAsNumber: true })}
                                                        min="0"
                                                        max="50"
                                                        className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.anneesExperience ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                        placeholder="Entrez le nombre d'années..."
                                                    />
                                                    {errors.anneesExperience && <p className="text-xs text-red-500 ml-1">{errors.anneesExperience.message}</p>}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold shadow-xl shadow-brand-orange/20 hover:bg-brand-orange/90 transition-all flex items-center justify-center group"
                                >
                                    Continuer vers la disponibilité
                                    <ArrowRight size={20} className="ml-2 group-hover:scale-110 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <button
                                    onClick={() => setStep(2)}
                                    className="flex items-center text-sm font-bold text-gray-400 hover:text-brand-orange transition-colors"
                                >
                                    <ArrowLeft size={16} className="mr-2" /> Retour
                                </button>

                                <div>
                                    <h1 className="text-4xl font-bold text-brand-dark mb-2">Disponibilité</h1>
                                    <p className="text-gray-500">
                                        Indiquez votre zone d'intervention et disponibilité.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Ville</label>
                                            <select
                                                {...register('ville')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.ville ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                            >
                                                <option value="">Sélectionner une ville</option>
                                                {VILLES.map(ville => (
                                                    <option key={ville} value={ville}>{ville}</option>
                                                ))}
                                            </select>
                                            {errors.ville && <p className="text-xs text-red-500 ml-1">{errors.ville.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Code postal</label>
                                            <input
                                                {...register('codePostal')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.codePostal ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                                placeholder="Ex: 20000"
                                            />
                                            {errors.codePostal && <p className="text-xs text-red-500 ml-1">{errors.codePostal.message}</p>}
                                        </div>
                                    </div>
                                    {role === 'artisan' && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Distance de déplacement</label>
                                            <select
                                                {...register('distance')}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.distance ? 'border-red-500' : 'border-transparent focus:border-brand-orange focus:bg-white'} outline-none transition-all shadow-sm`}
                                            >
                                                <option value="">Sélectionner une distance</option>
                                                {DISTANCES.map(distance => (
                                                    <option key={distance} value={distance}>{distance}</option>
                                                ))}
                                            </select>
                                            {errors.distance && <p className="text-xs text-red-500 ml-1">{errors.distance.message}</p>}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold shadow-xl shadow-brand-orange/20 hover:bg-brand-orange/90 transition-all flex items-center justify-center group"
                                >
                                    Continuer vers la sécurité
                                    <ArrowRight size={20} className="ml-2 group-hover:scale-110 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <button
                                    onClick={() => setStep(3)}
                                    className="flex items-center text-sm font-bold text-gray-400 hover:text-brand-orange transition-colors"
                                >
                                    <ArrowLeft size={16} className="mr-2" /> Retour
                                </button>

                                <div>
                                    <h1 className="text-4xl font-bold text-brand-dark mb-2">Sécurité</h1>
                                    <p className="text-gray-500">
                                        Définissez votre mot de passe pour sécuriser votre compte.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
