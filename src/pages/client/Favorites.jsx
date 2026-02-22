import React from 'react';
import { Star, MapPin, Trash2, ChevronRight } from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import ClientLayout from '../../components/client/ClientLayout';
import Header from '../../components/client/Header';
import Avatar from '../../components/ui/Avatar';

export default function Favorites() {
    const favorites = [
        { id: 1, name: 'Ahmed Mansouri', job: 'Plombier', rating: 4.9, reviews: 124, city: ' Tunis' },
        { id: 2, name: 'Sarah Ben Ali', job: 'Peintre', rating: 4.8, reviews: 89, city: 'Ariana' },
        { id: 3, name: 'Karim Dridi', job: 'Électricien', rating: 4.7, reviews: 56, city: 'Sfax' },
    ];

    return (
        <ClientLayout activeId="favorites">
            <Header title="Artisans favoris" subtitle="Retrouvez rapidement vos professionnels préférés" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {favorites.map(artisan => (
                    <div key={artisan.id} style={{
                        background: '#fff', borderRadius: 28, padding: 24, border: '1px solid #E2E8F0',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.02)', position: 'relative',
                        transition: 'transform 0.3s ease', cursor: 'pointer'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <button style={{
                            position: 'absolute', top: 20, right: 20, background: '#FFF4EF',
                            border: 'none', width: 36, height: 36, borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: C.orange, cursor: 'pointer'
                        }}>
                            <Trash2 size={18} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                            <Avatar name={artisan.name} size={64} radius={18} />
                            <div>
                                <h4 style={{ fontWeight: 900, fontSize: 17, color: C.navy }}>{artisan.name}</h4>
                                <p style={{ fontWeight: 700, fontSize: 13, color: C.slate }}>{artisan.job}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                                <span style={{ fontWeight: 800, fontSize: 13, color: C.navy }}>{artisan.rating}</span>
                                <span style={{ fontWeight: 600, fontSize: 12, color: C.slate }}>({artisan.reviews})</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.slate }}>
                                <MapPin size={16} />
                                <span style={{ fontWeight: 700, fontSize: 13 }}>{artisan.city}</span>
                            </div>
                        </div>

                        <button style={{
                            width: '100%', padding: '14px', borderRadius: 16,
                            background: C.navy, color: '#fff', border: 'none',
                            fontWeight: 800, fontSize: 14, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                        }}>
                            Réserver à nouveau <ChevronRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ClientLayout>
    );
}
