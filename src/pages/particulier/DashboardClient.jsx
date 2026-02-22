/**
 * Dashboard Client Particulier - ArtisanConnect
 * Page principale du dashboard pour un client particulier
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Topbar from '../../components/dashboard/Topbar';
import HeroBanner from '../../components/dashboard/HeroBanner';
import StatCard from '../../components/dashboard/StatCard';
import ReservationsList from '../../components/dashboard/ReservationsList';
import ArtisanRecommended from '../../components/dashboard/ArtisanRecommended';
import MissionsView from './MissionsView';
import MessagesView from './MessagesView';
import ProfilView from './ProfilView';

const ClientDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const renderContent = () => {
        if (pathname.endsWith('/missions')) return <MissionsView />;
        if (pathname.endsWith('/messages')) return <MessagesView />;
        if (pathname.endsWith('/profil')) return <ProfilView />;
        if (pathname === '/dashboard/client' || pathname === '/dashboard/client/' || pathname.endsWith('/client')) {
            return <DashboardOverview />;
        }
        return <Navigate to="/dashboard/client" replace />;
    };

    return (
        <div className="min-h-screen bg-[#F4F6FA] flex">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onMenuClick={() => setSidebarOpen(true)}
            />

            <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

/**
 * Vue d'ensemble du dashboard (accueil)
 */
const DashboardOverview = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
    >
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <HeroBanner />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
            <StatCard icon="Calendar" label="Réservations actives" value="2" trend={{ value: '+1', positive: true }} color="orange" />
            <StatCard icon="Heart" label="Artisans favoris" value="8" trend={{ value: '+3', positive: true }} color="green" />
            <StatCard icon="CheckCircle" label="Missions terminées" value="12" trend={{ value: '✓', positive: true }} color="blue" />
            <StatCard icon="Wallet" label="Dépenses ce mois" value="1 450 MAD" trend={null} color="yellow" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
        >
            <div className="lg:col-span-3">
                <ReservationsList />
            </div>
            <div className="lg:col-span-2">
                <ArtisanRecommended />
            </div>
        </motion.div>
    </motion.div>
);

export default ClientDashboard;
