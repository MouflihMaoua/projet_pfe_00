import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Monitor, Star, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollText from '../components/ui/ScrollText';

const STEPS = [
  { num: '01', icon: Search, title: 'Chercher', desc: "Parcourez notre réseau d'artisans vérifiés et trouvez le professionnel parfait pour votre projet." },
  { num: '02', icon: MessageSquare, title: 'Discuter', desc: "Échangez directement, décrivez vos besoins et obtenez des devis personnalisés rapidement." },
  { num: '03', icon: Monitor, title: 'Facturation', desc: "Suivez vos paiements, recevez des factures claires et bénéficiez d'un paiement sécurisé." },
  { num: '04', icon: Star, title: 'Donner un avis', desc: "Partagez votre expérience et aidez la communauté à faire les meilleurs choix." },
];

const WHY = [
  { icon: ShieldCheck, title: 'Vérification rigoureuse', desc: 'Chaque artisan passe un entretien et une vérification de ses références et compétences.' },
  { icon: Star, title: 'Garantie satisfaction', desc: 'Nous assurons le suivi de vos travaux du début à la fin. Votre satisfaction est notre priorité.' },
  { icon: CreditCard, title: 'Paiement sécurisé', desc: 'Libérez les fonds uniquement quand vous êtes satisfait du résultat final.' },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function Home() {
  return (
    <div style={{ background: '#0d0c0a', color: '#fff', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .btn-p { display:inline-flex;align-items:center;gap:8px;background:#e8723a;color:#fff;border:none;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;text-decoration:none; }
        .btn-p:hover { background:#d4642e;transform:translateY(-1px); }
        .btn-g { display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;border:0.5px solid rgba(255,255,255,0.2);padding:14px 28px;border-radius:100px;font-size:14px;font-weight:400;cursor:pointer;transition:all 0.2s;text-decoration:none; }
        .btn-g:hover { border-color:rgba(255,255,255,0.4);background:rgba(255,255,255,0.05); }
        .how-card { background:#161512;padding:40px 32px;transition:background 0.3s; }
        .how-card:hover { background:#1a1916; }
        @keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scroll2 { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .marquee1 { display:flex;gap:16px;width:max-content;animation:scroll 22s linear infinite; }
        .marquee2 { display:flex;gap:16px;width:max-content;animation:scroll2 28s linear infinite;margin-top:12px; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', background: '#0d0c0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(232,114,58,0.12) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <motion.div {...fade(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,114,58,0.1)', border: '0.5px solid rgba(232,114,58,0.3)', borderRadius: 100, padding: '8px 18px', marginBottom: 36 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8723a', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 12, color: '#e8723a', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 500 }}>Plateforme n°1 au Maroc</span>
        </motion.div>

        <motion.h1 {...fade(0.1)} style={{ fontFamily: 'Syne', fontSize: 'clamp(36px,6vw,76px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 860, margin: '0 auto' }}>
          Trouvez l'artisan <span style={{ color: '#e8723a' }}>idéal</span> pour votre projet
        </motion.h1>

        <motion.p {...fade(0.2)} style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: '#8a877f', maxWidth: 520, lineHeight: 1.7, margin: '24px auto 48px', fontWeight: 300 }}>
          Plus de 2 400 artisans vérifiés à votre service. Devis gratuits, intervention rapide, satisfaction garantie.
        </motion.p>

        <motion.div {...fade(0.3)} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/recherche-artisan" className="btn-p"><Search size={16} />Trouver un artisan</Link>
          <a href="#how-it-works" className="btn-g">Comment ça marche</a>
        </motion.div>

        <motion.div {...fade(0.4)} style={{ display: 'flex', marginTop: 72, border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
          {[['2 400+', 'Artisans vérifiés'], ['98%', 'Satisfaction client'], ['40+', 'Villes au Maroc'], ['15 min', 'Temps de réponse']].map(([n, l], i, arr) => (
            <div key={i} style={{ padding: '20px 36px', textAlign: 'center', borderRight: i < arr.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none' }}>
              <span style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 700, display: 'block' }}>{n}</span>
              <span style={{ fontSize: 12, color: '#8a877f', marginTop: 4, display: 'block' }}>{l}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <section style={{ padding: '80px 0', background: '#161512', borderTop: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 56 }}>
          <span style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#e8723a', fontWeight: 500, display: 'block', marginBottom: 12 }}>Nos métiers</span>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.1 }}>
            Explorez l'<span style={{ color: '#e8723a' }}>excellence</span> artisanale marocaine
          </h2>
        </div>
        {[
          ['Plomberie','Électricité','Menuiserie','Peinture','Carrelage','Climatisation','Maçonnerie','Serrurerie'],
          ['Jardinage','Démolition','Isolation','Ferronnerie','Nettoyage','Toiture','Rénovation','Décoration'],
        ].map((row, ri) => (
          <div key={ri} className={ri === 0 ? 'marquee1' : 'marquee2'} style={{ marginTop: ri > 0 ? 12 : 0 }}>
            {[...row, ...row].map((tag, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: '10px 20px', fontSize: 13, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8723a', flexShrink: 0 }} />{tag}
              </span>
            ))}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 56, padding: '0 24px' }}>
          <Link to="/recherche-artisan" className="btn-p">Trouver mon artisan maintenant <ArrowRight size={16} /></Link>
          <p style={{ fontSize: 13, color: '#8a877f', marginTop: 16 }}>Rejoignez des milliers de Marocains qui nous font confiance</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 24px', background: '#0d0c0a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...fade()} style={{ textAlign: 'center', marginBottom: 72 }}>
            <span style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#e8723a', fontWeight: 500, display: 'block', marginBottom: 12 }}>Processus</span>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700 }}>Comment ça <span style={{ color: '#e8723a' }}>marche</span></h2>
            <p style={{ color: '#8a877f', fontSize: 16, marginTop: 16, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>Trouvez et collaborez avec des artisans qualifiés en 4 étapes simples</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1, background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
            {STEPS.map(({ num, icon: Icon, title, desc }, i) => (
              <motion.div key={i} {...fade(i * 0.1)} className="how-card">
                <div style={{ fontFamily: 'Syne', fontSize: 11, fontWeight: 600, letterSpacing: 2, color: '#e8723a', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {num}<span style={{ flex: 1, height: 0.5, background: 'rgba(232,114,58,0.3)' }} />
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(232,114,58,0.08)', border: '0.5px solid rgba(232,114,58,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <Icon size={22} color="#e8723a" strokeWidth={1.8} />
                </div>
                <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#8a877f', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section style={{ padding: '100px 24px', background: '#f5f2ec' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 80, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1581244276891-83393a8ba21d?auto=format&fit=crop&q=80&w=900" alt="Artisan" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 24 }} />
            <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#fff', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <div style={{ width: 40, height: 40, background: 'rgba(232,114,58,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={18} color="#e8723a" /></div>
              <div><strong style={{ display: 'block', fontSize: 16, color: '#0d0c0a' }}>98% satisfaits</strong><span style={{ fontSize: 12, color: '#8a877f' }}>Parmi nos clients</span></div>
            </div>
          </div>
          <motion.div {...fade()}>
            <span style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#e8723a', fontWeight: 500, display: 'block', marginBottom: 12 }}>Pourquoi nous</span>
            <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#0d0c0a', lineHeight: 1.1 }}>Pourquoi choisir <span style={{ color: '#e8723a' }}>7rayfi</span> ?</h2>
            <p style={{ fontSize: 15, color: '#6b6860', lineHeight: 1.8, margin: '20px 0 40px' }}>Une plateforme construite pour la confiance — chaque étape est conçue pour vous protéger.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {WHY.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: 'rgba(232,114,58,0.08)', border: '0.5px solid rgba(232,114,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color="#e8723a" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 600, color: '#0d0c0a', marginBottom: 4 }}>{title}</h4>
                    <p style={{ fontSize: 13, color: '#6b6860', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 24px', background: '#161512', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <motion.div {...fade()} style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', border: '0.5px solid rgba(232,114,58,0.2)', borderRadius: 24, padding: '64px 48px', position: 'relative', overflow: 'hidden', background: 'rgba(232,114,58,0.03)' }}>
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 400, height: 300, background: 'radial-gradient(circle,rgba(232,114,58,0.15) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>Prêt à démarrer votre projet ?</h2>
          <p style={{ color: '#8a877f', fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>Rejoignez des milliers de clients qui ont trouvé leur artisan idéal sur 7rayfi.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/recherche-artisan" className="btn-p"><Search size={16} />Trouver un artisan</Link>
            <Link to="/inscription" className="btn-g">S'inscrire gratuitement</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}