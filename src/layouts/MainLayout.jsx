import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-brand-offwhite">
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
