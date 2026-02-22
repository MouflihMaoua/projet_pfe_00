import React, { useState, useEffect } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';

const NAV_LINKS = [
    { href: '#how-it-works', label: 'Comment ça marche' },
    { href: '#categories', label: 'Catégories' },
    { href: '#testimonials', label: 'Avis clients' },
    { href: '#/dashboard', label: 'Tableau de Bord' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false); // Keep mobile state

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: scrolled ? '0.75rem 0' : '1.5rem 0',
            background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(26, 58, 92, 0.08)' : '1px solid transparent',
            boxShadow: scrolled ? '0 10px 30px rgba(26, 58, 92, 0.05)' : 'none',
        }}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#" style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    fontSize: '1.5rem', fontWeight: 800, color: scrolled ? '#1A3A5C' : '#fff',
                    letterSpacing: '-0.03em'
                }}>
                    <div style={{
                        width: '40px', height: '40px', background: '#FF6B35',
                        borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(255,107,53,0.3)'
                    }}>
                        <Briefcase size={22} color="#fff" />
                    </div>
                    <span style={{ transition: 'color 0.3s ease' }}>Artisan<span style={{ color: '#FF6B35' }}>Connect</span></span>
                </a>

                {/* Nav Links */}
                <nav className="hidden lg:flex" style={{ gap: '2.5rem' }}>
                    {NAV_LINKS.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            style={{
                                color: scrolled ? 'rgba(26,58,92,0.8)' : 'rgba(255,255,255,0.85)',
                                fontWeight: 700, fontSize: '0.95rem',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                padding: '0.5rem 0'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#FF6B35';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = scrolled ? 'rgba(26,58,92,0.8)' : 'rgba(255,255,255,0.85)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTAs */}
                <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <a href="#/auth" style={{
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                        Se connecter
                    </a>
                    <a href="#/auth?role=artisan" style={{
                        background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)',
                        color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                        padding: '0.6rem 1.4rem', borderRadius: 999,
                        boxShadow: '0 4px 18px rgba(255,107,53,0.38)',
                        transition: 'all 0.25s ease',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,53,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(255,107,53,0.38)'; }}
                    >
                        Je suis artisan
                    </a>
                </div>

                {/* ── Mobile Toggle ── */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileOpen(o => !o)}
                    style={{ color: '#fff', padding: '0.4rem', borderRadius: 8, background: 'rgba(255,255,255,0.1)' }}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            {isMobileOpen && (
                <div style={{
                    position: 'absolute', top: '100%', left: 0, width: '100%',
                    background: 'rgba(13,27,42,0.98)', backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    padding: '1.5rem 1.5rem 2rem',
                    display: 'flex', flexDirection: 'column', gap: '1.2rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}>
                    {NAV_LINKS.map(l => (
                        <a key={l.href} href={l.href} onClick={() => setIsMobileOpen(false)}
                            style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '1.05rem' }}
                        >{l.label}</a>
                    ))}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0.3rem 0' }} />
                    <a href="#/auth" onClick={() => setIsMobileOpen(false)}
                        style={{ color: '#FF6B35', fontWeight: 700, fontSize: '1.05rem' }}>
                        Se connecter
                    </a>
                    <a href="#/auth?role=artisan" onClick={() => setIsMobileOpen(false)}
                        style={{
                            background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)',
                            color: '#fff', fontWeight: 700, borderRadius: 12,
                            padding: '0.9rem', textAlign: 'center', fontSize: '1rem',
                        }}>
                        Je suis artisan
                    </a>
                </div>
            )}
        </nav>
    );
}


