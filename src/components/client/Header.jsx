import React from 'react';
import { Bell, Plus } from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';

export default function Header({ title, subtitle }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 40,
            flexWrap: 'wrap',
            gap: 20,
            animation: 'fadeUp 0.55s ease both'
        }}>
            <div>
                <h1 style={{
                    fontFamily: font.sora,
                    fontWeight: 900,
                    fontSize: 36,
                    letterSpacing: -1,
                    color: C.navy,
                    marginBottom: 10
                }}>
                    {title}
                </h1>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#fff', padding: '8px 16px', borderRadius: 14,
                    boxShadow: '0 4px 15px rgba(26,58,92,.05)',
                }}>
                    <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: C.orange,
                        animation: 'pulse-dot 2s infinite'
                    }} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: C.slate }}>
                        {subtitle}
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
                <button style={{
                    width: 52, height: 52, borderRadius: 18, background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid #e2e8f0', cursor: 'pointer', color: C.navy,
                    boxShadow: '0 4px 15px rgba(26,58,92,.04)', transition: 'all .25s',
                }}>
                    < Bell size={20} />
                </button>
                <button style={{
                    padding: '0 24px', height: 52, borderRadius: 18, background: C.orange,
                    display: 'flex', alignItems: 'center', gap: 10, border: 'none',
                    color: '#fff', fontFamily: font.sora, fontWeight: 800, fontSize: 15,
                    cursor: 'pointer', transition: 'all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: `0 10px 20px ${C.orange}33`
                }}>
                    <Plus size={20} strokeWidth={3} />
                    Nouveau Projet
                </button>
            </div>
        </div>
    );
}
