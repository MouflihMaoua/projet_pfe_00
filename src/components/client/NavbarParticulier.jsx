import React, { useState, useEffect } from 'react';
import { Menu, X, Wrench, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { href: '#how-it-works', label: 'Comment ça marche' },
  { href: '#categories', label: 'Catégories' },
  { href: '#testimonials', label: 'Avis clients' },
  { href: '#/dashboard', label: 'Tableau de Bord' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .artisan-nav {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .artisan-nav.scrolled {
          padding: 0.6rem 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border-bottom: 1px solid rgba(249, 115, 22, 0.1);
          box-shadow: 0 4px 30px rgba(28, 35, 51, 0.08);
        }

        .artisan-nav.top {
          padding: 1.4rem 0;
          background: transparent;
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .logo-icon {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #F97316, #fb923c);
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px rgba(249,115,22,0.35);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
        }

        .nav-logo:hover .logo-icon {
          transform: rotate(-6deg) scale(1.08);
          box-shadow: 0 12px 28px rgba(249,115,22,0.5);
        }

        .logo-text {
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          transition: color 0.35s ease;
          white-space: nowrap;
        }

        .logo-text .accent { color: #F97316; }

        /* ── Nav Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          position: relative;
          font-weight: 600;
          font-size: 0.925rem;
          padding: 0.5rem 0.9rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: -0.01em;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%; right: 50%;
          height: 2px;
          background: #F97316;
          border-radius: 99px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          left: 0.9rem; right: 0.9rem;
          opacity: 1;
        }

        /* scrolled state */
        .scrolled .nav-link {
          color: rgba(28, 35, 51, 0.75);
        }
        .scrolled .nav-link:hover,
        .scrolled .nav-link.active {
          color: #F97316;
          background: rgba(249,115,22,0.06);
        }

        /* top (hero) state */
        .top .nav-link {
          color: rgba(255, 255, 255, 0.82);
        }
        .top .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }

        /* ── CTA Buttons ── */
        .btn-login {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 0.925rem;
          padding: 0.55rem 1.3rem;
          border-radius: 99px;
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: -0.01em;
          cursor: pointer;
          border: none;
        }

        .scrolled .btn-login {
          color: #1C2333;
          border: 1.5px solid rgba(28,35,51,0.18);
          background: transparent;
        }
        .scrolled .btn-login:hover {
          background: rgba(28,35,51,0.05);
          border-color: rgba(28,35,51,0.35);
        }

        .top .btn-login {
          color: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
        }
        .top .btn-login:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }

        .btn-artisan {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 0.925rem;
          padding: 0.6rem 1.4rem;
          border-radius: 99px;
          text-decoration: none;
          background: linear-gradient(135deg, #F97316 0%, #fb923c 100%);
          color: #fff;
          box-shadow: 0 4px 18px rgba(249,115,22,0.38);
          transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
          letter-spacing: -0.01em;
          white-space: nowrap;
          display: flex; align-items: center; gap: 0.4rem;
        }

        .btn-artisan:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 28px rgba(249,115,22,0.5);
        }

        .btn-artisan:active {
          transform: translateY(0) scale(0.98);
        }

        /* ── Mobile Toggle ── */
        .mobile-toggle {
          display: none;
          align-items: center; justify-content: center;
          width: 42px; height: 42px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .scrolled .mobile-toggle {
          background: rgba(28,35,51,0.08);
          color: #1C2333;
        }

        .mobile-toggle:hover {
          background: rgba(255,255,255,0.18);
          transform: scale(1.05);
        }

        .scrolled .mobile-toggle:hover {
          background: rgba(28,35,51,0.12);
        }

        @media (max-width: 1024px) {
          .nav-links-wrapper { display: none !important; }
          .cta-wrapper { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }

        /* ── Mobile Drawer ── */
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0;
          width: min(340px, 92vw);
          height: 100vh;
          background: #0D1B2A;
          z-index: 999;
          padding: 5.5rem 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -20px 0 60px rgba(0,0,0,0.4);
          overflow-y: auto;
        }

        .mobile-drawer.open {
          transform: translateX(0);
        }

        .mobile-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 998;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }

        .mobile-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          padding: 0.85rem 1.1rem;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
        }

        .mobile-nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.07);
        }

        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0.75rem 0;
        }

        .mobile-btn-login {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: rgba(255,255,255,0.85);
          padding: 0.9rem 1.1rem;
          border-radius: 12px;
          text-align: center;
          border: 1.5px solid rgba(255,255,255,0.15);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .mobile-btn-login:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }

        .mobile-btn-artisan {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          background: linear-gradient(135deg, #F97316, #fb923c);
          color: #fff;
          padding: 0.95rem;
          border-radius: 14px;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(249,115,22,0.35);
          transition: all 0.25s ease;
          margin-top: 0.25rem;
        }

        .mobile-btn-artisan:hover {
          box-shadow: 0 12px 32px rgba(249,115,22,0.5);
          transform: translateY(-1px);
        }

        .mobile-drawer-header {
          position: absolute;
          top: 1.25rem; right: 1.25rem;
        }

        .close-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }

        .mobile-logo {
          position: absolute;
          top: 1.4rem; left: 1.75rem;
          display: flex; align-items: center; gap: 0.6rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          text-decoration: none;
        }

        .mobile-logo .logo-icon-sm {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #F97316, #fb923c);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(249,115,22,0.35);
        }
      `}</style>

      {/* Backdrop for mobile */}
      <div
        className={`mobile-backdrop ${isMobileOpen ? 'open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`}>
        {/* Drawer Logo */}
        <a href="#" className="mobile-logo" onClick={() => setIsMobileOpen(false)}>
          <div className="logo-icon-sm">
            <Wrench size={18} color="#fff" />
          </div>
          Artisan<span style={{ color: '#F97316' }}>Connect</span>
        </a>

        {/* Close Button */}
        <div className="mobile-drawer-header">
          <button className="close-btn" onClick={() => setIsMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        {NAV_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="mobile-nav-link"
            onClick={() => setIsMobileOpen(false)}
          >
            {link.label}
            <ChevronDown size={16} style={{ transform: 'rotate(-90deg)', opacity: 0.4 }} />
          </a>
        ))}

        <div className="mobile-divider" />

        <a href="#/auth" className="mobile-btn-login" onClick={() => setIsMobileOpen(false)}>
          Se connecter
        </a>
        <a href="#/auth?role=artisan" className="mobile-btn-artisan" onClick={() => setIsMobileOpen(false)}>
          ✦ Je suis artisan
        </a>
      </div>

      {/* Main Navbar */}
      <nav className={`artisan-nav ${scrolled ? 'scrolled' : 'top'}`}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}>

          {/* Logo */}
          <a href="#" className="nav-logo">
            <div className="logo-icon">
              <Wrench size={21} color="#fff" strokeWidth={2.5} />
            </div>
            <span
              className="logo-text"
              style={{ color: scrolled ? '#1C2333' : '#fff' }}
            >
              Artisan<span className="accent">Connect</span>
            </span>
          </a>

          {/* Nav Links */}
          <div className="nav-links-wrapper" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <ul className="nav-links">
              {NAV_LINKS.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className={`nav-link ${activeLink === i ? 'active' : ''}`}
                    onClick={() => setActiveLink(i)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div
            className="cta-wrapper"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
          >
            <a href="#/auth" className="btn-login">
              Se connecter
            </a>
            <a href="#/auth?role=artisan" className="btn-artisan">
              <Wrench size={15} strokeWidth={2.5} />
              Je suis artisan
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </>
  );
}