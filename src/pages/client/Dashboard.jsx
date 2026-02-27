import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Navigate, Routes, Route, useLocation } from 'react-router-dom';
// Navbar removed for dashboard (sidebar is primary navigation)
import Sidebar from '../../components/dashboard/Sidebar_Modern';
import ToastContainer from '../../components/layout/ToastContainer';
import ProfilPage from '../particulier/ProfilView_Modern';
import {
  Search, Calendar, MessageSquare, ChevronRight, Star, Wrench,
  CheckCircle2, Clock, ArrowUpRight, MapPin, Sparkles, TrendingUp,
  Bell, MoreHorizontal, Phone, Send, Paperclip, Smile,
} from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import { useToast } from '../../hooks/useToast';

/* ════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════ */
const C = {
  navy:     '#0F1C2E',
  navyMid:  '#162236',
  navyLight:'#1E3A5F',
  orange:   '#F97316',
  orangeLt: '#FB923C',
  bg:       '#F4F6FA',
  surface:  '#FFFFFF',
  border:   '#EEF2F7',
  borderMd: '#E2E8F0',
  text1:    '#0F1C2E',
  text2:    '#526070',
  text3:    '#9BAFBF',
  green:    '#22C55E',
  blue:     '#3B82F6',
  amber:    '#F59E0B',
  red:      '#EF4444',
};

/* ════════════════════════════════════════
   STYLES INJECTION
════════════════════════════════════════ */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    ::selection { background: #F9731620; color: ${C.orange}; }

    .d3 { font-family: 'DM Sans', system-ui, sans-serif; background: ${C.bg}; min-height: 100vh; color: ${C.text1}; }
    .d3-display { font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: -0.035em; }
    .d3-mono-num { font-family: 'Bricolage Grotesque', sans-serif; font-feature-settings: "tnum"; }

    /* scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${C.borderMd}; border-radius: 99px; }

    /* card */
    .d3-card {
      background: ${C.surface};
      border: 1px solid ${C.border};
      border-radius: 18px;
      box-shadow: 0 1px 2px rgba(15,28,46,0.04), 0 6px 20px rgba(15,28,46,0.04);
      transition: box-shadow 0.22s ease;
    }
    .d3-card.hoverable:hover {
      box-shadow: 0 4px 8px rgba(15,28,46,0.05), 0 18px 40px rgba(15,28,46,0.09);
    }

    /* buttons */
    .d3-btn {
      font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 13px;
      border: none; cursor: pointer; display: inline-flex; align-items: center;
      justify-content: center; gap: 6px; transition: all 0.2s ease;
      user-select: none; white-space: nowrap; text-decoration: none;
    }
    .d3-btn:active { transform: scale(0.96) !important; }
    .d3-btn-orange {
      background: linear-gradient(135deg, ${C.orange}, ${C.orangeLt});
      color: #fff; border-radius: 11px;
      box-shadow: 0 3px 12px ${C.orange}38;
    }
    .d3-btn-orange:hover { transform: translateY(-1px); box-shadow: 0 7px 20px ${C.orange}50; }
    .d3-btn-dark { background: ${C.navy}; color: #fff; border-radius: 11px; }
    .d3-btn-dark:hover { background: ${C.navyLight}; transform: translateY(-1px); }
    .d3-btn-outline {
      background: transparent; color: ${C.text2}; border-radius: 10px;
      border: 1px solid ${C.borderMd};
    }
    .d3-btn-outline:hover { background: ${C.bg}; color: ${C.text1}; border-color: ${C.text3}; }
    .d3-btn-ghost { background: transparent; color: ${C.text2}; border-radius: 10px; border: none; }
    .d3-btn-ghost:hover { background: ${C.bg}; color: ${C.text1}; }

    /* input */
    .d3-input {
      width: 100%; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
      background: ${C.bg}; border: 1.5px solid ${C.border}; border-radius: 11px;
      padding: 0 14px; outline: none; color: ${C.text1}; transition: all 0.18s;
      height: 46px;
    }
    .d3-input::placeholder { color: ${C.text3}; font-weight: 400; }
    .d3-input:focus { border-color: ${C.orange}; background: #fff; box-shadow: 0 0 0 3px ${C.orange}14; }

    /* label */
    .d3-label { font-size: 11px; font-weight: 700; color: ${C.text3}; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 7px; }

    /* layout */
    .d3-layout { padding-top: 0; padding-left: 280px; margin-left: 15px; min-height: 100vh; }
    @media (max-width: 1024px) { .d3-layout { padding-left: 0; margin-left: 0; } }

    /* page-in animations */
    @keyframes pageIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    .d3-page { animation: pageIn 0.48s cubic-bezier(0.22,1,0.36,1) both; }
    .d3-d1 { animation-delay: 0.04s; }
    .d3-d2 { animation-delay: 0.10s; }
    .d3-d3 { animation-delay: 0.16s; }
    .d3-d4 { animation-delay: 0.22s; }
    .d3-d5 { animation-delay: 0.28s; }
    .d3-d6 { animation-delay: 0.34s; }

    /* responsive helpers */
    @media (max-width: 860px) { .d3-2col { grid-template-columns: 1fr !important; } }
    @media (max-width: 700px) { .d3-4col { grid-template-columns: 1fr 1fr !important; } }
    @media (max-width: 480px) { .d3-2col-sm { grid-template-columns: 1fr !important; } }
  `}</style>
);

/* ════════════════════════════════════════
   TINY ATOMS
════════════════════════════════════════ */
const Tag = ({ children, color = C.orange, bg }) => (
  <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'3px 10px', borderRadius:'99px', background: bg || `${color}14`, color, fontSize:'11px', fontWeight:700, letterSpacing:'0.04em', whiteSpace:'nowrap' }}>
    {children}
  </span>
);

const Dot = ({ color = C.green, size = 9 }) => (
  <span style={{ width:size, height:size, borderRadius:'50%', background:color, display:'inline-block', flexShrink:0 }} />
);

const SectionHead = ({ eyebrow, title, action }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'18px' }}>
    <div>
      {eyebrow && <p style={{ fontSize:'10px', fontWeight:700, color:C.orange, textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:'3px' }}>{eyebrow}</p>}
      <h2 className="d3-display" style={{ fontSize:'1.2rem', fontWeight:700, color:C.text1, letterSpacing:'-0.025em' }}>{title}</h2>
    </div>
    {action && (
      <Link to={action.to} className="d3-btn d3-btn-ghost" style={{ height:'34px', padding:'0 12px', fontSize:'12px', gap:'4px' }}>
        {action.label} <ArrowUpRight size={13} />
      </Link>
    )}
  </div>
);

/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
const ClientHome = () => {
  const stats = [
    { label:'Réservations',  value:'2',  note:'cette semaine', Icon:Calendar,     color:C.orange, bg:`${C.orange}12` },
    { label:'Prochains RDV', value:'1',  note:'demain 10h',    Icon:Clock,        color:C.blue,   bg:`${C.blue}12`   },
    { label:'Messages',      value:'5',  note:'non lus',       Icon:MessageSquare,color:C.green,  bg:`${C.green}12`  },
    { label:'Travaux finis', value:'12', note:'+3 ce mois',    Icon:CheckCircle2, color:'#8B5CF6',bg:'#8B5CF614'     },
  ];

  const reservations = [
    { name:'Ahmed Mansouri', job:'Plombier',    city:'Maarif',   date:'Demain · 10:00',   status:'confirmé',   rating:4.9, img:'https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=80&h=80&fit=crop&crop=face' },
    { name:'Youssef Alami',  job:'Électricien', city:'Gauthier', date:'25 Juin · 14:30', status:'en attente', rating:4.7, img:'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=80&h=80&fit=crop&crop=face' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>

      {/* ── HERO ── */}
      <div className="d3-page" style={{
        background:`linear-gradient(135deg, ${C.navy} 0%, #1B3154 55%, ${C.navyMid} 100%)`,
        borderRadius:'22px', padding:'clamp(28px, 5vw, 44px)',
        position:'relative', overflow:'hidden',
        boxShadow:`0 20px 56px -10px ${C.navy}55`,
      }}>
        {/* bg decoration */}
        <div style={{ position:'absolute', top:'-90px', right:'-70px', width:'380px', height:'380px', background:`radial-gradient(circle, ${C.orange}22 0%, transparent 60%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'15%', width:'260px', height:'260px', background:`radial-gradient(circle, ${C.blue}16 0%, transparent 60%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.035) 1.5px, transparent 1.5px)', backgroundSize:'26px 26px', pointerEvents:'none' }} />

        <div style={{ position:'relative', display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', gap:'28px' }}>
          {/* Text */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:`${C.orange}22`, border:`1px solid ${C.orange}38`, borderRadius:'99px', padding:'4px 13px', marginBottom:'18px' }}>
              <Sparkles size={11} color={C.orange} fill={C.orange} />
              <span style={{ fontSize:'11px', fontWeight:700, color:C.orange, letterSpacing:'0.1em', textTransform:'uppercase' }}>2 réservations actives</span>
            </div>
            <h1 className="d3-display" style={{ fontSize:'clamp(1.7rem, 3.8vw, 2.6rem)', fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:'12px' }}>
              Bonjour, <span style={{ color:C.orange }}>Karim</span> 👋
            </h1>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.5)', lineHeight:1.7, maxWidth:'440px', marginBottom:'26px' }}>
              Vous avez <strong style={{ color:'rgba(255,255,255,0.88)', fontWeight:600 }}>2 réservations</strong> cette semaine.
              Trouvez votre prochain expert facilement.
            </p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              <Link to="/recherche" className="d3-btn d3-btn-orange" style={{ height:'46px', padding:'0 22px', fontSize:'14px', textDecoration:'none' }}>
                <Wrench size={15} /> Trouver un artisan <ChevronRight size={14} />
              </Link>
              <Link to="/dashboard/particulier/missions"
                style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'7px', height:'46px', padding:'0 22px', borderRadius:'11px', border:'1px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.82)', fontSize:'14px', fontWeight:600, background:'rgba(255,255,255,0.08)', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
                <Calendar size={15} /> Mes rendez-vous
              </Link>
            </div>
          </div>

          {/* Floating stat cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {[
              { val:'12', label:'Travaux finis',  emoji:'✓', color:C.orange },
              { val:'4.9', label:'Note moyenne',  emoji:'★', color:C.amber  },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay:0.14 + i*0.1, duration:0.48, ease:[0.22,1,0.36,1] }}
                style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'15px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'12px', minWidth:'140px' }}>
                <div style={{ width:'36px', height:'36px', background:'rgba(255,255,255,0.1)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>{item.emoji}</div>
                <div>
                  <p className="d3-display" style={{ fontSize:'1.55rem', fontWeight:800, color:item.color, lineHeight:1, letterSpacing:'-0.04em' }}>{item.val}</p>
                  <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', marginTop:'2px' }}>{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="d3-page d3-d1 d3-4col" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'14px' }}>
        {stats.map((s, i) => {
          const Icon = s.Icon;
          return (
            <motion.div key={i} className="d3-card hoverable" whileHover={{ y:-3 }} style={{ padding:'20px', cursor:'default' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
                <div style={{ width:'40px', height:'40px', borderRadius:'11px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={19} color={s.color} />
                </div>
                <TrendingUp size={12} color={C.green} />
              </div>
              <p className="d3-mono-num" style={{ fontSize:'2.1rem', fontWeight:800, color:C.text1, lineHeight:1, letterSpacing:'-0.04em' }}>{s.value}</p>
              <p style={{ fontSize:'13px', fontWeight:600, color:C.text1, marginTop:'5px' }}>{s.label}</p>
              <p style={{ fontSize:'11px', color:C.text3, marginTop:'2px' }}>{s.note}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ── LOWER GRID ── */}
      <div className="d3-page d3-d2 d3-2col" style={{ display:'grid', gridTemplateColumns:'1fr 308px', gap:'18px', alignItems:'start' }}>

        {/* Reservations list */}
        <div className="d3-card">
          <div style={{ padding:'20px 22px 16px', borderBottom:`1px solid ${C.border}` }}>
            <SectionHead eyebrow="À venir" title="Réservations récentes" action={{ label:'Voir tout', to:'/dashboard/particulier/missions' }} />
          </div>
          {reservations.map((r, i) => (
            <motion.div key={i} whileHover={{ backgroundColor:'#FFFAF7' }}
              style={{ padding:'16px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'14px', borderBottom: i < reservations.length-1 ? `1px solid ${C.border}` : 'none', cursor:'pointer', transition:'background 0.15s' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', flex:1, minWidth:0 }}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <img src={r.img} alt={r.name} style={{ width:'48px', height:'48px', borderRadius:'13px', objectFit:'cover', display:'block' }} />
                  <Dot color={C.green} size={11} style={{ position:'absolute', bottom:'-2px', right:'-2px', border:`2px solid ${C.surface}` }} />
                  <span style={{ position:'absolute', bottom:'-2px', right:'-2px', width:'11px', height:'11px', borderRadius:'50%', background:C.green, border:`2px solid ${C.surface}`, display:'block' }} />
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'4px' }}>
                    <p style={{ fontWeight:700, fontSize:'14px', color:C.text1 }}>{r.name}</p>
                    <span style={{ display:'flex', alignItems:'center', gap:'3px', fontSize:'11px', color:C.amber, fontWeight:600 }}>
                      <Star size={10} fill={C.amber} color={C.amber} /> {r.rating}
                    </span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                    <span style={{ fontSize:'12px', color:C.orange, fontWeight:600, display:'flex', alignItems:'center', gap:'3px' }}><Wrench size={10}/>{r.job}</span>
                    <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:C.borderMd }} />
                    <span style={{ fontSize:'12px', color:C.text3, display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10}/>{r.city}</span>
                    <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:C.borderMd }} />
                    <span style={{ fontSize:'12px', color:C.text3, display:'flex', alignItems:'center', gap:'3px' }}><Calendar size={10}/>{r.date}</span>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
                <StatusBadge status={r.status} />
                <button className="d3-btn d3-btn-ghost" style={{ height:'32px', width:'32px', padding:0, borderRadius:'9px' }}>
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {/* Rating card */}
          <div className="d3-card" style={{ overflow:'hidden' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg, ${C.orange}, ${C.amber})` }} />
            <div style={{ padding:'18px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
                <p className="d3-display" style={{ fontSize:'15px', fontWeight:700, color:C.text1 }}>Avis à donner</p>
                <div style={{ background:`${C.amber}14`, padding:'5px 7px', borderRadius:'9px', display:'flex', alignItems:'center' }}>
                  <Star size={14} color={C.amber} fill={C.amber} />
                </div>
              </div>
              <div style={{ background:C.bg, borderRadius:'13px', padding:'14px', marginBottom:'14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                  <img src="https://i.pravatar.cc/80?u=said99" alt="Said" style={{ width:'38px', height:'38px', borderRadius:'10px', objectFit:'cover' }} />
                  <div>
                    <p style={{ fontWeight:700, fontSize:'13px', color:C.text1 }}>Said Benali</p>
                    <p style={{ fontSize:'11px', color:C.text3 }}>Menuisier · Terminé hier</p>
                  </div>
                </div>
                <p style={{ fontSize:'12px', color:C.text2, lineHeight:1.55, marginBottom:'10px' }}>Comment s'est passée la prestation ?</p>
                <div style={{ display:'flex', gap:'4px' }}>
                  {[1,2,3,4,5].map(n => (
                    <motion.span key={n} whileHover={{ scale:1.25 }} whileTap={{ scale:0.88 }} style={{ cursor:'pointer', display:'flex' }}>
                      <Star size={20} color={C.amber} fill={n <= 4 ? C.amber : 'transparent'} />
                    </motion.span>
                  ))}
                </div>
              </div>
              <button className="d3-btn d3-btn-orange" style={{ width:'100%', height:'42px', borderRadius:'11px' }}>
                <Star size={13} fill="#fff" /> Laisser un avis
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="d3-card" style={{ padding:'16px 18px' }}>
            <p style={{ fontSize:'10px', fontWeight:700, color:C.text3, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'10px' }}>Raccourcis</p>
            {[
              { Icon:Search,       label:'Trouver un artisan',  to:'/recherche',                            color:C.orange },
              { Icon:MessageSquare,label:'Mes discussions',      to:'/dashboard/particulier/messages',       color:C.blue   },
              { Icon:Bell,         label:'Notifications',        to:'#',                                     color:C.amber  },
            ].map((item, i) => {
              const Icon = item.Icon;
              return (
                <Link key={i} to={item.to}
                  style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'11px', padding:'9px 10px', borderRadius:'10px', color:C.text1, transition:'background 0.14s', marginBottom: i < 2 ? '2px' : 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bg}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width:'30px', height:'30px', borderRadius:'9px', background:`${item.color}12`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={14} color={item.color} />
                  </div>
                  <span style={{ fontSize:'13px', fontWeight:600 }}>{item.label}</span>
                  <ChevronRight size={13} color={C.text3} style={{ marginLeft:'auto' }} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   MISSIONS
════════════════════════════════════════ */
const ClientMissions = () => {
  const [filter, setFilter] = useState('tous');
  const tabs = [
    { key:'tous',       label:'Tous' },
    { key:'confirmé',   label:'Confirmés' },
    { key:'en attente', label:'En attente' },
    { key:'terminé',    label:'Terminés' },
  ];
  const all = [
    { name:'Ahmed Mansouri', job:'Plomberie',  city:'Maarif, Casablanca',   date:'Demain · 10:00',   status:'confirmé',   rating:4.9, n:48, price:'350 MAD', img:'https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=80&h=80&fit=crop&crop=face' },
    { name:'Youssef Alami',  job:'Électricité',city:'Gauthier, Casablanca', date:'25 Juin · 14:30',  status:'en attente', rating:4.7, n:31, price:'280 MAD', img:'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=80&h=80&fit=crop&crop=face' },
  ];
  const list = filter === 'tous' ? all : all.filter(m => m.status === filter);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
      {/* Header */}
      <div className="d3-page" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <p style={{ fontSize:'10px', fontWeight:700, color:C.orange, textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:'3px' }}>Suivi</p>
          <h1 className="d3-display" style={{ fontSize:'1.7rem', fontWeight:800, color:C.text1 }}>Mes Missions</h1>
        </div>
        <div style={{ display:'flex', background:C.surface, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'4px', gap:'4px' }}>
          {tabs.map(t => (
            <motion.button key={t.key} whileTap={{ scale:0.95 }} onClick={() => setFilter(t.key)}
              style={{ padding:'6px 14px', borderRadius:'9px', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:600, transition:'all 0.18s', background: filter === t.key ? C.navy : 'transparent', color: filter === t.key ? '#fff' : C.text2, boxShadow: filter === t.key ? `0 2px 8px ${C.navy}28` : 'none' }}>
              {t.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <AnimatePresence mode="popLayout">
        {list.map((m, i) => (
          <motion.div key={m.name} layout
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.98 }}
            transition={{ duration:0.32, ease:[0.22,1,0.36,1], delay: i*0.06 }}
            className="d3-card hoverable" style={{ padding:'18px 22px', display:'flex', alignItems:'center', gap:'18px', flexWrap:'wrap' }}>
            <img src={m.img} alt={m.name} style={{ width:'60px', height:'60px', borderRadius:'14px', objectFit:'cover', flexShrink:0 }} />
            <div style={{ flex:1, minWidth:'200px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'5px', flexWrap:'wrap' }}>
                <p className="d3-display" style={{ fontSize:'15px', fontWeight:700, color:C.text1 }}>{m.name}</p>
                <StatusBadge status={m.status} />
              </div>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
                <span style={{ fontSize:'12px', color:C.orange, fontWeight:600, display:'flex', alignItems:'center', gap:'3px' }}><Wrench size={11}/>{m.job}</span>
                <span style={{ fontSize:'12px', color:C.text3, display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={11}/>{m.city}</span>
                <span style={{ fontSize:'12px', color:C.text3, display:'flex', alignItems:'center', gap:'3px' }}><Calendar size={11}/>{m.date}</span>
                <span style={{ fontSize:'12px', color:C.amber, fontWeight:600, display:'flex', alignItems:'center', gap:'3px' }}><Star size={11} fill={C.amber} color={C.amber}/>{m.rating} ({m.n})</span>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
              <div style={{ textAlign:'right', marginRight:'4px' }}>
                <p style={{ fontSize:'10px', color:C.text3, marginBottom:'1px' }}>Devis</p>
                <p className="d3-display" style={{ fontSize:'15px', fontWeight:700, color:C.text1 }}>{m.price}</p>
              </div>
              <button className="d3-btn d3-btn-dark" style={{ height:'38px', padding:'0 16px', fontSize:'13px' }}>Gérer</button>
              <button className="d3-btn d3-btn-outline" style={{ height:'38px', width:'38px', padding:0 }}><MessageSquare size={14}/></button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {list.length === 0 && (
        <div className="d3-card" style={{ padding:'44px', textAlign:'center' }}>
          <div style={{ width:'52px', height:'52px', background:C.bg, borderRadius:'15px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
            <Calendar size={22} color={C.text3} />
          </div>
          <p style={{ fontWeight:700, fontSize:'15px', color:C.text1, marginBottom:'6px' }}>Aucune mission</p>
          <p style={{ fontSize:'13px', color:C.text3 }}>Aucune mission dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════
   MESSAGES
════════════════════════════════════════ */
const ClientMessages = () => {
  const [sel, setSel] = useState(0);
  const [msg, setMsg] = useState('');
  const convs = [
    { name:'Ahmed Mansouri', job:'Plombier',    last:'Je serai là à 10h précise 👍',       time:'10:05', unread:2, online:true  },
    { name:'Youssef Alami',  job:'Électricien', last:'Le devis est prêt, je vous envoie.', time:'Hier',  unread:0, online:true  },
    { name:'Said Benali',    job:'Menuisier',   last:'Merci pour votre confiance !',        time:'Lun',   unread:0, online:false },
  ];
  const chat = [
    { from:'them', text:'Bonjour Karim ! Je confirme pour demain.',           time:'09:45' },
    { from:'me',   text:'Super ! Durée estimée des travaux ?',                time:'09:47' },
    { from:'them', text:'Environ 2h. Je serai là à 10h précise 👍',           time:'10:05' },
  ];
  const c = convs[sel];

  return (
    <div className="d3-page">
      <div className="d3-card" style={{ display:'grid', gridTemplateColumns:'272px 1fr', overflow:'hidden', height:'560px' }}>

        {/* List pane */}
        <div style={{ borderRight:`1px solid ${C.border}`, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'14px 12px', borderBottom:`1px solid ${C.border}` }}>
            <p className="d3-display" style={{ fontSize:'15px', fontWeight:700, color:C.text1, marginBottom:'10px' }}>Discussions</p>
            <div style={{ position:'relative' }}>
              <Search size={13} style={{ position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:C.text3 }} />
              <input className="d3-input" placeholder="Rechercher..." style={{ paddingLeft:'30px', height:'36px', fontSize:'12px', borderRadius:'9px' }} />
            </div>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'6px' }}>
            {convs.map((cv, i) => (
              <motion.div key={i} whileHover={{ backgroundColor: sel === i ? undefined : C.bg }} onClick={() => setSel(i)}
                style={{ padding:'9px 10px', borderRadius:'11px', display:'flex', alignItems:'center', gap:'9px', cursor:'pointer', background: sel === i ? C.navy : 'transparent', marginBottom:'2px', transition:'background 0.15s' }}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <img src={`https://i.pravatar.cc/80?u=conv${i}`} alt={cv.name} style={{ width:'40px', height:'40px', borderRadius:'11px', objectFit:'cover' }} />
                  {cv.online && <span style={{ position:'absolute', bottom:'-1px', right:'-1px', width:'10px', height:'10px', borderRadius:'50%', background:C.green, border:`2px solid`, borderColor: sel === i ? C.navy : C.surface, display:'block' }} />}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'2px' }}>
                    <p style={{ fontSize:'13px', fontWeight:700, color: sel === i ? '#fff' : C.text1 }}>{cv.name}</p>
                    <span style={{ fontSize:'10px', color: sel === i ? 'rgba(255,255,255,0.3)' : C.text3 }}>{cv.time}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <p style={{ fontSize:'11px', color: sel === i ? 'rgba(255,255,255,0.4)' : C.text3, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', maxWidth:'115px' }}>{cv.last}</p>
                    {cv.unread > 0 && <span style={{ background:C.orange, color:'#fff', fontSize:'10px', fontWeight:700, borderRadius:'99px', padding:'1px 6px' }}>{cv.unread}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat pane */}
        <div style={{ display:'flex', flexDirection:'column', background:`${C.bg}50` }}>
          {/* Header */}
          <div style={{ padding:'12px 18px', borderBottom:`1px solid ${C.border}`, background:C.surface, display:'flex', alignItems:'center', gap:'11px' }}>
            <div style={{ position:'relative' }}>
              <img src={`https://i.pravatar.cc/80?u=conv${sel}`} alt={c.name} style={{ width:'38px', height:'38px', borderRadius:'10px', objectFit:'cover' }} />
              {c.online && <span style={{ position:'absolute', bottom:'-1px', right:'-1px', width:'10px', height:'10px', borderRadius:'50%', background:C.green, border:`2px solid ${C.surface}`, display:'block' }} />}
            </div>
            <div>
              <p style={{ fontWeight:700, fontSize:'14px', color:C.text1 }}>{c.name}</p>
              <p style={{ fontSize:'11px', color:C.green, fontWeight:600, display:'flex', alignItems:'center', gap:'4px' }}>
                <Dot color={C.green} size={7} /> En ligne · {c.job}
              </p>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', gap:'6px' }}>
              <button className="d3-btn d3-btn-outline" style={{ height:'34px', width:'34px', padding:0, borderRadius:'9px' }}><Phone size={13}/></button>
              <button className="d3-btn d3-btn-outline" style={{ height:'34px', width:'34px', padding:0, borderRadius:'9px' }}><MoreHorizontal size={13}/></button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'18px', display:'flex', flexDirection:'column', gap:'10px' }}>
            {chat.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: i*0.07, duration:0.28 }}
                style={{ display:'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth:'66%', padding:'10px 14px', fontSize:'13px', lineHeight:1.55,
                  borderRadius: m.from === 'me' ? '15px 15px 4px 15px' : '15px 15px 15px 4px',
                  background: m.from === 'me' ? `linear-gradient(135deg, ${C.orange}, ${C.orangeLt})` : C.surface,
                  color: m.from === 'me' ? '#fff' : C.text1,
                  border: m.from !== 'me' ? `1px solid ${C.border}` : 'none',
                  boxShadow: m.from === 'me' ? `0 4px 12px ${C.orange}28` : `0 1px 4px rgba(15,28,46,0.06)`,
                }}>
                  {m.text}
                  <p style={{ fontSize:'10px', opacity:0.55, marginTop:'4px', textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding:'11px 14px', borderTop:`1px solid ${C.border}`, background:C.surface, display:'flex', gap:'7px', alignItems:'center' }}>
            <button className="d3-btn d3-btn-ghost" style={{ height:'38px', width:'38px', padding:0, borderRadius:'10px', flexShrink:0 }}><Paperclip size={14}/></button>
            <input className="d3-input" placeholder="Écrire un message..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && setMsg('')} style={{ height:'40px', borderRadius:'10px', flex:1 }} />
            <button className="d3-btn d3-btn-ghost" style={{ height:'38px', width:'38px', padding:0, borderRadius:'10px', flexShrink:0 }}><Smile size={14}/></button>
            <motion.button whileHover={{ scale:1.06 }} whileTap={{ scale:0.93 }} className="d3-btn d3-btn-orange" style={{ height:'40px', width:'40px', padding:0, borderRadius:'10px', flexShrink:0 }} onClick={() => setMsg('')}>
              <Send size={14}/>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   PROFIL
════════════════════════════════════════ */
// Voir ProfilPage.jsx pour la nouvelle page de profil avec upload photo

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */
const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, removeToast } = useToast();
  const location = useLocation();

  const getTitle = () => {
    const p = location.pathname.replace('/dashboard/particulier', '') || '/';
    switch (p) {
      case '/missions': return 'Mes missions';
      case '/messages': return 'Discussions';
      case '/profil': return 'Mon profil';
      case '/':
      case '':
      default: return "Vue d'ensemble";
    }
  };

  return (
    <div className="d3">
      <Styles />
      <Sidebar role="client" isMobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <div className="d3-layout">
        <main style={{ padding:'clamp(16px, 3vw, 28px)', maxWidth:'1300px', margin:'0 auto' }}>
          {/* Internal header - minimal */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <h1 style={{ margin:0, fontSize:'1.25rem', fontWeight:800 }}>{getTitle()}</h1>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ textAlign:'right', marginRight:8 }}>
                <div style={{ fontSize:13, fontWeight:800 }}>Karim Bennani</div>
                <div style={{ fontSize:12, color:'#F97316' }}>Client</div>
              </div>
              <div style={{ width:40, height:40, borderRadius:10, background:'linear-gradient(135deg,#FB923C,#F97316)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800 }}>KB</div>
            </div>
          </div>

          <Routes>
            <Route index element={<ClientHome />} />
            <Route path="missions" element={<ClientMissions />} />
            <Route path="messages" element={<ClientMessages />} />
            <Route path="profil" element={<ProfilPage />} />
            <Route path="*" element={<Navigate to="" />} />
          </Routes>
        </main>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ClientDashboard;