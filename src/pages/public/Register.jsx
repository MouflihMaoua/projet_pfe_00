import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Mail, Lock, UserPlus, ArrowRight, ArrowLeft, CheckCircle2, Upload, Camera, MapPin, Phone, Wrench } from 'lucide-react';
import toast from 'react-hot-toast';
import logoApp from '/assets/logo_app.png';

const VILLES = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kénitra', 'Tétouan'];
const MÉTIERS = ['Plombier', 'Peintre', 'Électricienne', 'Femme de ménage', 'Technicien Climatisation Certifié'];
const DISTANCES = ['<10km', '20km', '30km', '>30km'];
const SEXES = ['Homme', 'Femme'];

const Register = () => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null); // 'client' or 'artisan'
    const [photoFile, setPhotoFile] = useState(null);
    const [aExperience, setAExperience] = useState(false);
    const navigate = useNavigate();

    // États pour gérer les valeurs du formulaire et les erreurs
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        sexe: '',
        ville: '',
        codePostal: '',
        description: '',
        metier: '',
        distance: '',
        aExperience: false,
        anneesExperience: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fonctions de validation pour chaque champ
    const validateField = (name, value) => {
        const error = {};

        switch (name) {
            case 'nom':
                if (!value || value.trim().length < 2) {
                    error.nom = 'Le nom doit contenir au moins 2 caractères';
                } else if (/\d/.test(value)) {
                    error.nom = 'Le nom ne doit pas contenir de chiffres';
                } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
                    error.nom = 'Le nom contient des caractères invalides';
                }
                break;

            case 'prenom':
                if (!value || value.trim().length < 2) {
                    error.prenom = 'Le prénom doit contenir au moins 2 caractères';
                } else if (/\d/.test(value)) {
                    error.prenom = 'Le prénom ne doit pas contenir de chiffres';
                } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
                    error.prenom = 'Le prénom contient des caractères invalides';
                }
                break;

            case 'email':
                if (!value || value.trim().length === 0) {
                    error.email = 'L\'email est requis';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error.email = 'L\'email n\'est pas valide';
                }
                break;

            case 'telephone':
                if (!value || value.trim().length === 0) {
                    error.telephone = 'Le téléphone est requis';
                } else {
                    const cleanPhone = value.replace(/[\s.-]/g, '');
                    if (!/^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$|^(?:(?:\+|00)212|0)[5-9](?:[\s.-]?\d{2}){4}$/.test(cleanPhone)) {
                        error.telephone = 'Le numéro de téléphone n\'est pas valide (format FR/MA)';
                    }
                }
                break;

            case 'password':
                if (!value || value.trim().length === 0) {
                    error.password = 'Le mot de passe est requis';
                } else if (value.length < 8) {
                    error.password = 'Le mot de passe doit contenir au moins 8 caractères';
                } else if (!/[A-Z]/.test(value)) {
                    error.password = 'Le mot de passe doit contenir au moins une majuscule';
                } else if (!/[a-z]/.test(value)) {
                    error.password = 'Le mot de passe doit contenir au moins une minuscule';
                } else if (!/\d/.test(value)) {
                    error.password = 'Le mot de passe doit contenir au moins un chiffre';
                } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    error.password = 'Le mot de passe doit contenir au moins un caractère spécial';
                }
                break;

            case 'confirmPassword':
                if (!value || value.trim().length === 0) {
                    error.confirmPassword = 'La confirmation du mot de passe est requise';
                } else if (value !== formData.password) {
                    error.confirmPassword = 'Les mots de passe ne correspondent pas';
                }
                break;

            case 'sexe':
                if (!value) {
                    error.sexe = 'Sexe requis';
                }
                break;

            case 'ville':
                if (!value || value.trim().length === 0) {
                    error.ville = 'Ville requise';
                }
                break;

            case 'codePostal':
                if (!value || value.trim().length < 4) {
                    error.codePostal = 'Code postal requis (min 4 caractères)';
                } else if (!/^\d+$/.test(value)) {
                    error.codePostal = 'Le code postal ne doit contenir que des chiffres';
                }
                break;

            case 'description':
                if (!value || value.trim().length < 10) {
                    error.description = 'Description requise (min 10 caractères)';
                }
                break;

            case 'metier':
                if (role === 'artisan' && (!value || value.trim().length === 0)) {
                    error.metier = 'Métier requis';
                }
                break;

            case 'distance':
                if (role === 'artisan' && (!value || value.trim().length === 0)) {
                    error.distance = 'Distance requise';
                }
                break;

            case 'anneesExperience':
                if (aExperience && (!value || value < 0 || value > 50)) {
                    error.anneesExperience = 'Veuillez entrer un nombre d\'années valide (0-50)';
                }
                break;

            default:
                break;
        }

        return error;
    };

    // Validation de tout le formulaire
    const validateForm = () => {
        const newErrors = {};

        // Valider chaque champ
        Object.keys(formData).forEach(field => {
            const fieldError = validateField(field, formData[field]);
            if (Object.keys(fieldError).length > 0) {
                Object.assign(newErrors, fieldError);
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestionnaire de changement pour les inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Gérer les checkboxes et radios
        const fieldValue = type === 'checkbox' || type === 'radio' ? checked : value;
        
        // Mettre à jour les données du formulaire
        setFormData(prev => ({
            ...prev,
            [name]: fieldValue
        }));

        // Valider le champ en temps réel
        const fieldError = validateField(name, fieldValue);
        setErrors(prev => {
            const newErrors = { ...prev };
            if (Object.keys(fieldError).length > 0) {
                newErrors[name] = fieldError[name];
            } else {
                delete newErrors[name];
            }
            return newErrors;
        });
    };

    // Gestionnaire de soumission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Valider le formulaire
        const isValid = validateForm();
        
        if (!isValid) {
            return;
        }

        // Si le formulaire est valide, procéder à la soumission
        setIsSubmitting(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Compte créé avec succès !');
            navigate('/connexion');
        } catch (error) {
            toast.error("Erreur lors de l'inscription");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fonction pour vérifier si un champ a une erreur
    const hasError = (fieldName) => {
        return errors[fieldName] && errors[fieldName].length > 0;
    };

    // Fonction pour obtenir la classe CSS en fonction de l'erreur
    const getFieldClassName = (fieldName) => {
        if (hasError(fieldName)) {
            return 'border-red-500';
        }
        return 'border-transparent focus:border-brand-orange';
    };

    // Fonction pour valider l'étape 2 avant de passer à l'étape 3
    const validateStep2 = () => {
        const requiredFields = ['nom', 'prenom', 'email', 'telephone', 'sexe', 'description'];
        
        // Champs supplémentaires pour les artisans
        if (role === 'artisan') {
            requiredFields.push('metier');
        }

        // Vérifier si tous les champs requis sont remplis
        const missingFields = requiredFields.filter(field => {
            const value = formData[field];
            return !value || (typeof value === 'string' && value.trim() === '');
        });

        if (missingFields.length > 0) {
            // Afficher un message d'erreur
            const fieldNames = {
                nom: 'Nom',
                prenom: 'Prénom', 
                email: 'Email',
                telephone: 'Téléphone',
                sexe: 'Sexe',
                description: 'Description',
                metier: 'Métier'
            };

            const missingFieldNames = missingFields.map(field => fieldNames[field] || field);
            toast.error(`Veuillez remplir les champs obligatoires: ${missingFieldNames.join(', ')}`);
            
            // Mettre le focus sur le premier champ manquant
            const firstMissingField = document.querySelector(`[name="${missingFields[0]}"]`);
            if (firstMissingField) {
                firstMissingField.focus();
                firstMissingField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return false;
        }

        return true;
    };

    // Fonction pour valider l'étape 3 avant de passer à l'étape 4
    const validateStep3 = () => {
        const requiredFields = ['ville', 'codePostal'];
        
        // Champs supplémentaires pour les artisans
        if (role === 'artisan') {
            requiredFields.push('distance');
        }

        // Vérifier si tous les champs requis sont remplis
        const missingFields = requiredFields.filter(field => {
            const value = formData[field];
            return !value || (typeof value === 'string' && value.trim() === '');
        });

        if (missingFields.length > 0) {
            // Afficher un message d'erreur
            const fieldNames = {
                ville: 'Ville',
                codePostal: 'Code postal',
                distance: 'Distance de déplacement'
            };

            const missingFieldNames = missingFields.map(field => fieldNames[field] || field);
            toast.error(`Veuillez remplir les champs obligatoires: ${missingFieldNames.join(', ')}`);
            
            // Mettre le focus sur le premier champ manquant
            const firstMissingField = document.querySelector(`[name="${missingFields[0]}"]`);
            if (firstMissingField) {
                firstMissingField.focus();
                firstMissingField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return false;
        }

        return true;
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
                            <img src={logoApp} alt="7rayfi" className="w-16 h-16 object-contain" />
                            <span className="font-bold text-xl">7rayfi</span>
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

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Nom</label>
                                            <input
                                                name="nom"
                                                value={formData.nom}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('nom')} focus:bg-white outline-none transition-all shadow-sm`}
                                                placeholder="Alami"
                                            />
                                            {hasError('nom') && <p className="text-xs text-red-500 ml-1">{errors.nom}</p>}
                                            {!hasError('nom') && formData.nom && (
                                                <p className="text-xs text-green-600 ml-1">✓ Nom valide</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Prénom</label>
                                            <input
                                                name="prenom"
                                                value={formData.prenom}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('prenom')} focus:bg-white outline-none transition-all shadow-sm`}
                                                placeholder="Mohammed"
                                            />
                                            {hasError('prenom') && <p className="text-xs text-red-500 ml-1">{errors.prenom}</p>}
                                            {!hasError('prenom') && formData.prenom && (
                                                <p className="text-xs text-green-600 ml-1">✓ Prénom valide</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Email</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('email')} focus:bg-white outline-none transition-all shadow-sm`}
                                                placeholder="mohammed@example.com"
                                            />
                                            {hasError('email') && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                                            {!hasError('email') && formData.email && (
                                                <p className="text-xs text-green-600 ml-1">✓ Email valide</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Téléphone</label>
                                            <input
                                                name="telephone"
                                                type="tel"
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('telephone')} focus:bg-white outline-none transition-all shadow-sm`}
                                                placeholder="06 12 34 56 78"
                                            />
                                            {hasError('telephone') && <p className="text-xs text-red-500 ml-1">{errors.telephone}</p>}
                                            {!hasError('telephone') && formData.telephone && (
                                                <p className="text-xs text-green-600 ml-1">✓ Téléphone valide</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Champ mot de passe avec indicateur de force */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-brand-dark ml-1">Mot de passe</label>
                                        <input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('password')} focus:bg-white outline-none transition-all shadow-sm`}
                                            placeholder="••••••••"
                                        />
                                        {hasError('password') && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
                                        {!hasError('password') && formData.password && (
                                            <div className="text-xs text-green-600 ml-1 space-y-1">
                                                <p>✓ Mot de passe valide</p>
                                                <div className="text-xs text-gray-500 ml-4">
                                                    Doit contenir: 8+ caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-brand-dark ml-1">Confirmer le mot de passe</label>
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('confirmPassword')} focus:bg-white outline-none transition-all shadow-sm`}
                                            placeholder="••••••••"
                                        />
                                        {hasError('confirmPassword') && <p className="text-xs text-red-500 ml-1">{errors.confirmPassword}</p>}
                                        {!hasError('confirmPassword') && formData.confirmPassword && (
                                            <p className="text-xs text-green-600 ml-1">✓ Les mots de passe correspondent</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Sexe</label>
                                            <select
                                                name="sexe"
                                                value={formData.sexe}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('sexe')} focus:bg-white outline-none transition-all shadow-sm`}
                                            >
                                                <option value="">Sélectionner</option>
                                                {SEXES.map(sexe => (
                                                    <option key={sexe} value={sexe}>{sexe}</option>
                                                ))}
                                            </select>
                                            {hasError('sexe') && <p className="text-xs text-red-500 ml-1">{errors.sexe}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Photo de profil</label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        setPhotoFile(e.target.files[0]);
                                                        handleChange(e);
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
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                            className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('description')} focus:bg-white outline-none transition-all shadow-sm resize-none`}
                                            placeholder="Décrivez brièvement votre profil et vos compétences..."
                                        />
                                        {hasError('description') && <p className="text-xs text-red-500 ml-1">{errors.description}</p>}
                                    </div>

                                    {role === 'artisan' && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-brand-dark mb-4">Informations sur le Métier</h3>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-brand-dark ml-1">Métier</label>
                                                <select
                                                    name="metier"
                                                    value={formData.metier}
                                                    onChange={handleChange}
                                                    className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('metier')} focus:bg-white outline-none transition-all shadow-sm`}
                                                >
                                                    <option value="">Sélectionner un métier</option>
                                                    {MÉTIERS.map(metier => (
                                                        <option key={metier} value={metier}>{metier}</option>
                                                    ))}
                                                </select>
                                                {hasError('metier') && <p className="text-xs text-red-500 ml-1">{errors.metier}</p>}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-brand-dark ml-1">Avez-vous de l'expérience ?</label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="aExperience"
                                                            value="true"
                                                            checked={aExperience}
                                                            onChange={(e) => {
                                                                setAExperience(true);
                                                                handleChange({
                                                                    target: {
                                                                        name: 'aExperience',
                                                                        type: 'radio',
                                                                        checked: true
                                                                    }
                                                                });
                                                            }}
                                                            className="w-4 h-4 text-brand-orange border-gray-300 focus:ring-brand-orange"
                                                        />
                                                        <span className="text-gray-700">Oui</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="aExperience"
                                                            value="false"
                                                            checked={!aExperience}
                                                            onChange={(e) => {
                                                                setAExperience(false);
                                                                handleChange({
                                                                    target: {
                                                                        name: 'aExperience',
                                                                        type: 'radio',
                                                                        checked: false
                                                                    }
                                                                });
                                                                handleChange({
                                                                    target: {
                                                                        name: 'anneesExperience',
                                                                        value: ''
                                                                    }
                                                                });
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
                                                        name="anneesExperience"
                                                        type="number"
                                                        value={formData.anneesExperience}
                                                        onChange={handleChange}
                                                        min="0"
                                                        max="50"
                                                        className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('anneesExperience')} focus:bg-white outline-none transition-all shadow-sm`}
                                                        placeholder="Entrez le nombre d'années..."
                                                    />
                                                    {hasError('anneesExperience') && <p className="text-xs text-red-500 ml-1">{errors.anneesExperience}</p>}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (validateStep2()) {
                                            setStep(3);
                                        }
                                    }}
                                    className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold shadow-xl shadow-brand-orange/20 hover:bg-brand-orange/90 transition-all flex items-center justify-center group"
                                >
                                    Continuer vers la disponibilité
                                    <ArrowRight size={20} className="ml-2 group-hover:scale-110 transition-transform" />
                                </button>
                                </form>
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
                                                name="ville"
                                                value={formData.ville}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('ville')} focus:bg-white outline-none transition-all shadow-sm`}
                                            >
                                                <option value="">Sélectionner une ville</option>
                                                {VILLES.map(ville => (
                                                    <option key={ville} value={ville}>{ville}</option>
                                                ))}
                                            </select>
                                            {hasError('ville') && <p className="text-xs text-red-500 ml-1">{errors.ville}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Code postal</label>
                                            <input
                                                name="codePostal"
                                                value={formData.codePostal}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('codePostal')} focus:bg-white outline-none transition-all shadow-sm`}
                                                placeholder="Ex: 20000"
                                            />
                                            {hasError('codePostal') && <p className="text-xs text-red-500 ml-1">{errors.codePostal}</p>}
                                        </div>
                                    </div>
                                    {role === 'artisan' && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Distance de déplacement</label>
                                            <select
                                                name="distance"
                                                value={formData.distance}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('distance')} focus:bg-white outline-none transition-all shadow-sm`}
                                            >
                                                <option value="">Sélectionner une distance</option>
                                                {DISTANCES.map(distance => (
                                                    <option key={distance} value={distance}>{distance}</option>
                                                ))}
                                            </select>
                                            {hasError('distance') && <p className="text-xs text-red-500 ml-1">{errors.distance}</p>}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (validateStep3()) {
                                            setStep(4);
                                        }
                                    }}
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

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Mot de passe</label>
                                            <input
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('password')} focus:bg-white outline-none transition-all shadow-sm`}
                                                placeholder="••••••••"
                                            />
                                            {hasError('password') && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-brand-dark ml-1">Confirmer mot de passe</label>
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${getFieldClassName('confirmPassword')} focus:bg-white outline-none transition-all shadow-sm`}
                                                placeholder="••••••••"
                                            />
                                            {hasError('confirmPassword') && <p className="text-xs text-red-500 ml-1">{errors.confirmPassword}</p>}
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
