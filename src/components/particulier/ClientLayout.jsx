import React from 'react';
import Sidebar from './Sidebar';
import { COLORS as C } from '../../constants/theme';

export default function ClientLayout({ children, activeId }) {
    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <Sidebar activeId={activeId} />
            <main style={{ marginLeft: 280, padding: '48px 60px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
