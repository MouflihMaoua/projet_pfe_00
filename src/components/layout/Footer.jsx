import React from 'react';
import { ArrowRight, Send } from 'lucide-react';

const LOGO_SVG = (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);

const SOCIAL = [
    { icon: '𝕏', label: 'X' },
    { icon: 'f', label: 'Facebook' },
    { icon: '📸', label: 'Instagram' },
    { icon: 'in', label: 'LinkedIn' },
];

const NAV_COL = [
    { title: 'Navigation', links: ['Accueil', 'Comment ça marche', 'Catégories', 'Je suis artisan'] },
    { title: 'Informations', links: ['À propos', 'Contact', 'Blog', 'Politique de confidentialité'] },
];

const Footer = () => (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {/* CTA Banner */}
        <div style={{
            background: 'linear-gradient(135deg, #1A3A5C 0%, #0D1B2A 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
            <div className="container mx-auto px-6" style={{ padding: '3.5rem 1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
                <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#fff', letterSpacing: '-0.02em' }}>
                        Prêt à trouver votre artisan ?
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
                        Rejoignez plus de 15 000 clients déjà satisfaits.
                    </p>
                </div>
                <a href="#categories" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)',
                    color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                    padding: '0.85rem 1.75rem', borderRadius: 999,
                    boxShadow: '0 8px 24px rgba(255,107,53,0.35)',
                    transition: 'all 0.25s ease',
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(255,107,53,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,53,0.35)'; }}
                >
                    Trouver un artisan <ArrowRight size={16} />
                </a>
            </div>
        </div>

        {/* Main footer */}
        <div className="container mx-auto px-6" style={{ padding: '4rem 1.5rem 3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>

                {/* Brand */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(255,107,53,0.35)',
                        }}>{LOGO_SVG}</div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: '#fff' }}>
                            Artisan<span style={{ color: '#FF6B35' }}>Connect</span>
                        </span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontSize: '0.9rem' }}>
                        La plateforme de référence pour trouver les meilleurs artisans au Maroc. Qualité, confiance et proximité.
                    </p>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {SOCIAL.map(s => (
                            <a key={s.label} href="#" title={s.label} style={{
                                width: 38, height: 38, borderRadius: '50%',
                                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 700,
                                transition: 'all 0.25s ease',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#FF6B35'; e.currentTarget.style.borderColor = '#FF6B35'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >{s.icon}</a>
                        ))}
                    </div>
                </div>

                {/* Nav columns */}
                <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                        Navigation
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><a href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}>Accueil</a></li>
                        <li><a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}>Comment ça marche</a></li>
                        <li><a href="#categories" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}>Catégories</a></li>
                        <li><a href="#/auth?role=artisan" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}>Je suis artisan</a></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                        Informations
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><a href="#/about" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}>À propos</a></li>
                        <li><a href="#/contact" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}>Contact</a></li>
                        <li><a href="#/blog" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}>Blog</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                        Newsletter
                    </h4>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                        Conseils, offres exclusives et nouveautés directement dans votre boîte mail.
                    </p>
                    <form style={{ display: 'flex' }}>
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            style={{
                                flex: 1, background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRight: 'none', color: '#fff',
                                padding: '0.7rem 1rem', borderRadius: '0.75rem 0 0 0.75rem',
                                outline: 'none', fontSize: '0.9rem',
                                fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#FF6B35'}
                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                        <button style={{
                            background: 'linear-gradient(135deg, #FF6B35, #FF9A6C)',
                            color: '#fff', padding: '0.7rem 1rem',
                            borderRadius: '0 0.75rem 0.75rem 0',
                            display: 'flex', alignItems: 'center',
                            transition: 'opacity 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        ><Send size={17} /></button>
                    </form>
                </div>
            </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem 1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem' }}>
                © {new Date().getFullYear()} 7rayfi — Tous droits réservés. Fait avec ❤️ au Maroc.
            </p>
        </div>
    </footer>
);

export default Footer;
