import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Home } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',                  label: 'Accueil',           icon: Home   },
  { href: '/recherche-artisan', label: 'Rechercher Artisan', icon: Search },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .nav-link-item { display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:400;color:rgba(255,255,255,0.55);text-decoration:none;transition:all 0.2s;border:0.5px solid transparent; }
        .nav-link-item:hover { color:#fff;background:rgba(255,255,255,0.05); }
        .nav-link-item.active { color:#fff;background:rgba(232,114,58,0.1);border-color:rgba(232,114,58,0.2); }
        .nav-btn-ghost { padding:8px 18px;border-radius:100px;font-size:13px;color:rgba(255,255,255,0.6);background:transparent;border:0.5px solid rgba(255,255,255,0.12);text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif; }
        .nav-btn-ghost:hover { color:#fff;border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.05); }
        .nav-btn-primary { padding:8px 18px;border-radius:100px;font-size:13px;font-weight:500;color:#fff;background:#e8723a;border:none;text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif; }
        .nav-btn-primary:hover { background:#d4642e;transform:translateY(-1px); }
        .mobile-link { display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:10px;font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;font-family:'DM Sans',sans-serif;transition:all 0.2s; }
        .mobile-link:hover,.mobile-link.active { color:#fff;background:rgba(255,255,255,0.05); }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        height: 64, display: 'flex', alignItems: 'center',
        padding: '0 32px', justifyContent: 'space-between',
        fontFamily: "'DM Sans', sans-serif",
        background: scrolled ? 'rgba(13,12,10,0.98)' : 'rgba(13,12,10,0.7)',
        borderBottom: `0.5px solid ${scrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, background: '#e8723a', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/src/assets/logo_app.png" alt="7rayfi" style={{ width: 18, height: 18, objectFit: 'contain' }} />
          </div>
          <span style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>
            7rayfi<span style={{ color: '#e8723a' }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={href} to={href} className={`nav-link-item ${location.pathname === href ? 'active' : ''}`}>
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
          <Link to="/login"    className="nav-btn-ghost">Connexion</Link>
          <Link to="/register" className="nav-btn-primary">S'inscrire</Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: 8, cursor: 'pointer' }}
          className="show-mobile"
        >
          {mobileOpen
            ? <X size={18} color="rgba(255,255,255,0.7)" />
            : <Menu size={18} color="rgba(255,255,255,0.7)" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49,
          background: 'rgba(13,12,10,0.98)', backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid rgba(255,255,255,0.08)',
          padding: '12px 16px 20px',
        }}>
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={href} to={href}
              className={`mobile-link ${location.pathname === href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={16} />{label}
            </Link>
          ))}
          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 4px' }}>
            <Link to="/login"    className="nav-btn-ghost"   style={{ textAlign: 'center', display: 'block' }} onClick={() => setMobileOpen(false)}>Connexion</Link>
            <Link to="/register" className="nav-btn-primary" style={{ textAlign: 'center', display: 'block' }} onClick={() => setMobileOpen(false)}>S'inscrire</Link>
          </div>
        </div>
      )}

      {/* Responsive helper */}
      <style>{`
        @media(max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}