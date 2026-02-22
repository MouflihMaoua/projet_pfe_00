import React from 'react';
import { Star, MessageSquare, Calendar, ChevronRight, ThumbsUp } from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import ClientLayout from '../../components/client/ClientLayout';
import Header from '../../components/client/Header';
import Avatar from '../../components/ui/Avatar';

export default function Reviews() {
    const reviews = [
        {
            id: 1, artisan: 'Ahmed Mansouri', job: 'Plombier',
            date: '12 Jan 2024', rating: 5,
            comment: 'Excellent travail, très ponctuel et professionnel. Je recommande vivement Ahmed pour tout problème de plomberie.',
            likes: 4
        },
        {
            id: 2, artisan: 'Sarah Ben Ali', job: 'Peintre',
            date: '05 Jan 2024', rating: 4,
            comment: 'Très satisfaite du résultat final. Un peu de retard le premier jour mais le rendu est magnifique.',
            likes: 2
        }
    ];

    return (
        <ClientLayout activeId="reviews">
            <Header title="Mes avis donnés" subtitle="Retrouvez ici toutes les évaluations que vous avez laissées aux artisans" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {reviews.map(review => (
                        <div key={review.id} style={{
                            background: '#fff', borderRadius: 28, padding: 32,
                            border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <Avatar name={review.artisan} size={50} radius={14} />
                                    <div>
                                        <h4 style={{ fontWeight: 800, color: C.navy, fontSize: 16 }}>{review.artisan}</h4>
                                        <p style={{ color: C.slate, fontSize: 13, fontWeight: 700 }}>{review.job} • {review.date}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill={i < review.rating ? '#F59E0B' : 'transparent'} color={i < review.rating ? '#F59E0B' : '#CBD5E1'} />
                                    ))}
                                </div>
                            </div>

                            <p style={{ color: C.navy, fontSize: 15, fontWeight: 600, lineHeight: 1.7, marginBottom: 24 }}>
                                "{review.comment}"
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid #F1F5F9' }}>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <button style={{ background: 'transparent', border: 'none', color: C.slate, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                        <ThumbsUp size={16} /> {review.likes} Utile
                                    </button>
                                    <button style={{ background: 'transparent', border: 'none', color: C.slate, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                        <MessageSquare size={16} /> Modifier
                                    </button>
                                </div>
                                <button style={{ background: 'transparent', border: 'none', color: '#f43f5e', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    {/* Summary Card */}
                    <div style={{ background: C.navy, borderRadius: 32, padding: 32, color: '#fff' }}>
                        <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 20, marginBottom: 24 }}>Résumé des avis</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                            <div style={{ fontSize: 48, fontWeight: 900, fontFamily: font.sora }}>4.8</div>
                            <div>
                                <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={C.orange} color={C.orange} />)}
                                </div>
                                <p style={{ fontSize: 13, fontWeight: 700, opacity: 0.7 }}>Basé sur 12 avis</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <RatingBar stars={5} pct={85} />
                            <RatingBar stars={4} pct={10} />
                            <RatingBar stars={3} pct={5} />
                            <RatingBar stars={2} pct={0} />
                            <RatingBar stars={1} pct={0} />
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}

const RatingBar = ({ stars, pct }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 800, width: 60 }}>{stars} étoiles</span>
        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: C.orange }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, width: 30, textAlign: 'right' }}>{pct}%</span>
    </div>
);
