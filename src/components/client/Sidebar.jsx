import React from 'react';
import {
    Layout, Calendar, MessageSquare, Heart, Star, Settings,
    LogOut, Zap, User
} from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import Avatar from '../ui/Avatar';

const NAV_ITEMS = [
    { name: 'Tableau de bord', id: 'dashboard', icon: Layout, path: '#/dashboard' },
    { name: 'Mes réservations', id: 'reservations', icon: Calendar, path: '#/dashboard/reservations' },
    { name: 'Mes messages', id: 'messages', icon: MessageSquare, path: '#/dashboard/messages' },
    { name: 'Artisans favoris', id: 'favorites', icon: Heart, path: '#/dashboard/favorites' },
    { name: 'Mes avis donnés', id: 'reviews', icon: Star, path: '#/dashboard/reviews' },
    { name: 'Mon profil', id: 'profile', icon: User, path: '#/dashboard/profile' },
    { name: 'Paramètres', id: 'settings', icon: Settings, path: '#/dashboard/settings' },
];

export default function Sidebar({ activeId }) {
    return (
        <aside style={{
            width: 280, background: C.navy, color: '#fff',
            display: 'flex', flexDirection: 'column',
            position: 'fixed', height: '100vh', zIndex: 50,
            boxShadow: '4px 0 30px rgba(0,0,0,.25)',
        }}>
            {/* Logo */}
            <div style={{ padding: '36px 28px 20px' }}>
                <a href="#" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: `linear-gradient(135deg,${C.orange},${C.orangeLight})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 6px 20px ${C.orange}44`, transform: 'rotate(3deg)',
                        }}>
                            <Zap size={20} fill="#fff" color="#fff" />
                        </div>
                        <h2 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 20, fontStyle: 'italic', letterSpacing: -0.5, color: '#fff' }}>
                            Artisan<span style={{ color: C.orange }}>Connect</span>
                        </h2>
                    </div>
                </a>

                {/* Nav */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {NAV_ITEMS.map(({ name, id, icon: Icon, path }) => {
                        const active = activeId === id;
                        return (
                            <a key={id} href={path}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '12px 18px', borderRadius: 18, border: 'none', cursor: 'pointer',
                                    background: active ? 'rgba(255,255,255,.12)' : 'transparent',
                                    color: active ? '#fff' : 'rgba(255,255,255,.4)',
                                    fontFamily: font.nunito, fontWeight: 800, fontSize: 14,
                                    letterSpacing: 0.2, position: 'relative', textAlign: 'left',
                                    transition: 'all .2s',
                                    textDecoration: 'none'
                                }}>
                                {active && (
                                    <div style={{
                                        position: 'absolute', left: 0, top: 8, bottom: 8,
                                        width: 3, background: C.orange, borderRadius: '0 4px 4px 0',
                                        boxShadow: `2px 0 12px ${C.orange}`,
                                    }} />
                                )}
                                <Icon size={18} color={active ? C.orange : undefined} style={{ flexShrink: 0 }} />
                                {name}
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* Profile Section (Bottom) */}
            <div style={{ marginTop: 'auto', padding: '0 20px 28px' }}>
                <a href="#/dashboard/profile" style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: 'rgba(255,255,255,.03)',
                        borderRadius: '24px',
                        padding: '12px 14px',
                        border: '1px solid rgba(255,255,255,.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,.03)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)';
                        }}
                    >
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                padding: 2,
                                borderRadius: 14,
                                background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)',
                            }}>
                                <Avatar name="Maroua B" size={40} radius={12} />
                            </div>
                            <div style={{
                                position: 'absolute', bottom: -1, right: -1,
                                width: 12, height: 12, background: '#10B981',
                                border: '2px solid #1A3A5C', borderRadius: '50%',
                                boxShadow: '0 0 10px rgba(16,185,129,0.4)'
                            }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontWeight: 800, fontSize: 13, color: '#fff', marginBottom: 2 }}>Maroua Bennani</p>
                            <div style={{
                                display: 'inline-flex', padding: '2px 8px', borderRadius: 6,
                                background: 'rgba(255,107,53,0.15)', color: C.orange,
                                fontSize: 9, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase'
                            }}>
                                Gold Member
                            </div>
                        </div>
                        <div style={{
                            width: 32, height: 32, borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'rgba(255,255,255,0.2)'
                        }}>
                            <LogOut size={16} />
                        </div>
                    </div>
                </a>
            </div>
        </aside>
    );
}
