import React, { useState, useEffect } from 'react';
import AuthPage from '../pages/AuthPage';
import ArtisanProfile from '../pages/ArtisanProfile';
import ClientDashboard from '../pages/client/Dashboard';
import ClientReservations from '../pages/client/Reservations';
import ClientMessages from '../pages/client/Messages';
import ClientFavorites from '../pages/client/Favorites';
import ClientProfile from '../pages/client/Profile';
import ClientReviews from '../pages/client/Reviews';
import ClientSettings from '../pages/client/Settings';

const Router = ({ children }) => {
    const getHashInfo = () => {
        const raw = decodeURIComponent(window.location.hash);
        const [hashPath, queryStr] = raw.split('?');
        const params = new URLSearchParams(queryStr || '');
        return { path: hashPath, role: params.get('role') || 'particulier' };
    };

    const [hashInfo, setHashInfo] = useState(getHashInfo);

    useEffect(() => {
        const onHashChange = () => setHashInfo(getHashInfo());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const renderRoute = () => {
        const { path, role } = hashInfo;

        if (path === '#/auth' || path === '#auth') {
            return <AuthPage initialRole={role} />;
        }

        if (path === '#/profile' || path === '#profile') {
            return <ArtisanProfile />;
        }

        // Professional Client Dashboard Routing
        if (path.startsWith('#/dashboard')) {
            switch (path) {
                case '#/dashboard/reservations': return <ClientReservations />;
                case '#/dashboard/messages': return <ClientMessages />;
                case '#/dashboard/favorites': return <ClientFavorites />;
                case '#/dashboard/profile': return <ClientProfile />;
                case '#/dashboard/reviews': return <ClientReviews />;
                case '#/dashboard/settings': return <ClientSettings />;
                case '#/dashboard':
                default: return <ClientDashboard />;
            }
        }

        return children;
    };

    return renderRoute();
};

export default Router;
