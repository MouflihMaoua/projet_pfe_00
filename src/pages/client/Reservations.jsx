import React from 'react';
import { Search, Filter, Calendar as CalIcon, MapPin, MoreVertical, Clock } from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import ClientLayout from '../../components/client/ClientLayout';
import Header from '../../components/client/Header';
import Avatar from '../../components/ui/Avatar';

export default function Reservations() {
    const reservations = [
        {
            id: 1, artisan: 'Ahmed Mansouri', job: 'Plombier',
            date: '22 Fév 2024', time: '14:00', price: '120 DT',
            status: 'À venir', color: '#2563EB', bg: '#EFF6FF'
        },
        {
            id: 2, artisan: 'Sarah Ben Ali', job: 'Peintre',
            date: '25 Fév 2024', time: '09:30', price: '350 DT',
            status: 'Confirmé', color: '#059669', bg: '#ECFDF5'
        },
        {
            id: 3, artisan: 'Mourad Kasmi', job: 'Électricien',
            date: '15 Fév 2024', time: '10:00', price: '80 DT',
            status: 'Terminé', color: '#64748B', bg: '#F1F5F9'
        },
    ];

    return (
        <ClientLayout activeId="reservations">
            <Header title="Mes réservations" subtitle="Gérez vos interventions planifiées et passées" />

            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                <div style={{
                    flex: 1, position: 'relative', background: '#fff',
                    borderRadius: 16, display: 'flex', alignItems: 'center',
                    padding: '0 20px', border: '1px solid #E2E8F0'
                }}>
                    <Search size={20} color={C.slate} />
                    <input type="text" placeholder="Rechercher un artisan ou un service..." style={{
                        border: 'none', background: 'transparent', padding: '16px',
                        width: '100%', outline: 'none', fontWeight: 600, fontSize: 14, color: C.navy
                    }} />
                </div>
                <button style={{
                    padding: '0 24px', borderRadius: 16, background: '#fff',
                    border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center',
                    gap: 10, fontWeight: 700, color: C.navy, cursor: 'pointer'
                }}>
                    <Filter size={20} /> Filtres
                </button>
            </div>

            <div style={{ background: '#fff', borderRadius: 28, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                            <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: C.slate, textTransform: 'uppercase' }}>Artisan</th>
                            <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: C.slate, textTransform: 'uppercase' }}>Date & Heure</th>
                            <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: C.slate, textTransform: 'uppercase' }}>Prix</th>
                            <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 800, color: C.slate, textTransform: 'uppercase' }}>Statut</th>
                            <th style={{ padding: '20px 24px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res) => (
                            <tr key={res.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                <td style={{ padding: '20px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <Avatar name={res.artisan} size={40} radius={10} />
                                        <div>
                                            <p style={{ fontWeight: 800, fontSize: 15, color: C.navy }}>{res.artisan}</p>
                                            <p style={{ fontWeight: 700, fontSize: 12, color: C.slate }}>{res.job}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '20px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.navy, fontWeight: 700, fontSize: 14 }}>
                                        <CalIcon size={16} color={C.orange} />
                                        {res.date} <span style={{ color: C.slate, fontWeight: 600 }}>à {res.time}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '20px 24px', fontWeight: 900, fontSize: 15, color: C.navy }}>
                                    {res.price}
                                </td>
                                <td style={{ padding: '20px 24px' }}>
                                    <span style={{
                                        padding: '6px 14px', borderRadius: 10, fontSize: 12,
                                        fontWeight: 800, color: res.color, background: res.bg,
                                        display: 'inline-block'
                                    }}>
                                        {res.status}
                                    </span>
                                </td>
                                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: C.slate }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ClientLayout>
    );
}
