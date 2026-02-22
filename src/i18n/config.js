import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    fr: {
        translation: {
            "welcome": "Bienvenue sur ArtisanConnect",
            "search_placeholder": "Quel artisan cherchez-vous ?",
            "find_artisan": "Trouver un artisan",
            "categories": "Catégories",
            "login": "Connexion",
            "register": "Inscription",
            "logout": "Déconnexion",
            // ... more translations to come
        }
    },
    ar: {
        translation: {
            "welcome": "مرحبًا بكم في ArtisanConnect",
            "search_placeholder": "عن أي حرفي تبحث؟",
            "find_artisan": "البحث عن حرفي",
            "categories": "الفئات",
            "login": "تسجيل الدخول",
            "register": "إنشاء حساب",
            "logout": "تسجيل الخروج",
            // ... more translations to come
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr', // langue par défaut
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
        rtl: {
            ar: true
        }
    });

export default i18n;
