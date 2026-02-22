import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
});

const Login = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            // Simulation appel API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simuler une réponse selon l'email pour tester les différents dashboards
            let role = 'client';
            if (data.email.includes('artisan')) role = 'artisan';
            if (data.email.includes('admin')) role = 'admin';

            const mockUser = { id: '1', name: 'User Test', email: data.email, role };
            const mockToken = 'fake-jwt-token';

            setAuth(mockUser, mockToken);
            toast.success('Bienvenue ! Connexion réussie.');

            const redirectPath = role === 'admin' ? '/admin' :
                role === 'artisan' ? '/dashboard/artisan' :
                    '/dashboard/client';
            navigate(redirectPath);
        } catch (error) {
            toast.error('Identifiants incorrects');
        }
    };

    return (
        <div className="min-h-screen flex bg-brand-offwhite">
            {/* Côté gauche - Décoratif */}
            <div className="hidden lg:flex lg:w-1/2 bg-brand-dark relative items-center justify-center p-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-20">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-brand-orange rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-40 left-20 w-80 h-80 bg-brand-orange rounded-full blur-[150px]"></div>
                </div>

                <div className="relative z-10 text-white max-w-lg">
                    <Link to="/" className="flex items-center space-x-2 mb-20 group">
                        <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-orange/40 group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <span className="font-bold text-3xl tracking-tight">Artisan<span className="text-brand-orange">Connect</span></span>
                    </Link>

                    <h2 className="text-5xl font-bold leading-tight mb-8">
                        Accédez à votre espace professionnel.
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Gérez vos réservations, communiquez avec vos clients et développez votre activité en toute simplicité.
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-3xl font-bold text-brand-orange">10k+</p>
                            <p className="text-gray-500">Utilisateurs actifs</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-brand-orange">4.9</p>
                            <p className="text-gray-500">Note moyenne</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Côté droit - Formulaire */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="mb-12 text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-brand-dark mb-4">Connexion</h1>
                        <p className="text-gray-500">Heureux de vous revoir ! Veuillez entrer vos identifiants.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-dark mb-2">Adresse Email</label>
                            <div className={`flex items-center px-4 py-4 bg-white rounded-2xl border ${errors.email ? 'border-red-500' : 'border-gray-100'} shadow-sm focus-within:border-brand-orange transition-all`}>
                                <Mail size={20} className="text-gray-400 mr-3" />
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="exemple@mail.com"
                                    className="bg-transparent border-none outline-none w-full text-brand-dark"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500 ml-2">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-brand-dark">Mot de passe</label>
                                <a href="#" className="text-sm font-semibold text-brand-orange hover:underline">Oublié ?</a>
                            </div>
                            <div className={`flex items-center px-4 py-4 bg-white rounded-2xl border ${errors.password ? 'border-red-500' : 'border-gray-100'} shadow-sm focus-within:border-brand-orange transition-all`}>
                                <Lock size={20} className="text-gray-400 mr-3" />
                                <input
                                    {...register('password')}
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-transparent border-none outline-none w-full text-brand-dark"
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500 ml-2">{errors.password.message}</p>}
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-orange transition-all flex items-center justify-center group shadow-xl shadow-brand-dark/10"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Se connecter
                                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="relative py-4 flex items-center">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="px-4 text-xs text-gray-400 font-bold uppercase tracking-widest">OU</span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        <button type="button" className="w-full bg-white border border-gray-100 text-brand-dark py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google" />
                            Continuer avec Google
                        </button>
                    </form>

                    <p className="mt-10 text-center text-gray-500">
                        Pas encore de compte ?{' '}
                        <Link to="/inscription" className="text-brand-orange font-bold hover:underline">Créer un compte</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
