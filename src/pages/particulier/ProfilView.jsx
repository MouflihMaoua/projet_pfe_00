/**
 * ProfilParticulier.jsx
 * Page Profil Particulier — ArtisanConnect
 * Cohérente avec le dashboard existant (même palette, même sidebar)
 * Auto-contenu : inline styles uniquement, aucune dépendance CSS externe
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  Layout, Calendar, MessageSquare, Heart, Star, Settings,
  Zap, LogOut, User, MapPin, Lock, Shield, Camera,
  Eye, EyeOff, Edit3, Check, X, Trash2, Clock,
  CheckCircle2, AlertTriangle, ChevronRight, Upload,
  Bell, Plus, TrendingUp, Save
} from 'lucide-react';

/* ─── TOKENS ─────────────────────────────────────────────────────── */
const C = {
  navy:       '#1C2333',
  navyHero:   '#1E2D40',
  bg:         '#F4F6FA',
  orange:     '#F97316',
  orangeHov:  '#EA6C0A',
  white:      '#FFFFFF',
  text:       '#1C1917',
  muted:      '#64748B',
  border:     '#E2E8F0',
  success:    '#10B981',
  error:      '#EF4444',
  disabled:   '#CBD5E1',
  cardBg:     '#FFFFFF',
};
const font = {
  sora:   "'Sora','Segoe UI',system-ui,sans-serif",
  nunito: "'Nunito','Segoe UI',system-ui,sans-serif",
};

/* ─── GOOGLE FONTS ───────────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Nunito:wght@400;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${C.bg};font-family:${font.nunito};color:${C.text}}
    input,textarea,select{outline:none;font-family:${font.nunito}}
    button{cursor:pointer;font-family:${font.nunito}}

    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
    @keyframes slideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

    .fade-up{animation:fadeUp .5s ease both}
    .fade-up-1{animation-delay:.06s}
    .fade-up-2{animation-delay:.12s}
    .fade-up-3{animation-delay:.18s}
    .fade-up-4{animation-delay:.24s}
    .fade-up-5{animation-delay:.30s}
    .fade-up-6{animation-delay:.36s}

    .card-hover{transition:box-shadow .35s,transform .35s}
    .card-hover:hover{box-shadow:0 16px 48px rgba(28,35,51,.13)!important;transform:translateY(-3px)}

    .nav-btn{transition:background .2s,color .2s}
    .nav-btn:hover{background:rgba(255,255,255,.08)!important;color:#fff!important}

    .avatar-overlay{transition:opacity .3s}
    .avatar-wrap:hover .avatar-overlay{opacity:1!important}
    .avatar-wrap:hover .cam-icon{transform:scale(1)!important;opacity:1!important}

    .input-field:focus{border-color:${C.orange}!important;box-shadow:0 0 0 3px ${C.orange}22!important}
    .input-field.valid{border-color:${C.success}!important}
    .input-field.invalid{border-color:${C.error}!important}

    .btn-primary{transition:background .2s,transform .2s,box-shadow .2s}
    .btn-primary:hover{background:${C.orangeHov}!important;transform:translateY(-2px);box-shadow:0 8px 24px ${C.orange}44!important}
    .btn-primary:active{transform:scale(.97)}

    .btn-ghost{transition:background .2s,border-color .2s}
    .btn-ghost:hover{background:#F1F5F9!important}

    .btn-danger{transition:background .2s,color .2s}
    .btn-danger:hover{background:${C.error}!important;color:#fff!important}

    .activity-dot{transition:transform .25s}
    .activity-row:hover .activity-dot{transform:scale(1.5)}
    .activity-row:hover .activity-title{color:${C.orange}!important}

    .modal-backdrop{animation:fadeUp .2s ease}
    .modal-box{animation:scaleIn .25s cubic-bezier(.34,1.56,.64,1) both}

    .strength-bar{transition:width .5s ease,background .5s ease}

    .error-msg{animation:shake .35s ease,slideIn .25s ease}

    .pill-badge{background:linear-gradient(135deg,${C.orange},#FBBF24);
      color:#fff;font-weight:900;font-size:11px;letter-spacing:1.5px;
      text-transform:uppercase;padding:4px 14px;border-radius:20px;
      display:inline-flex;align-items:center;gap:5px;
      box-shadow:0 4px 14px ${C.orange}44}
  `}</style>
);

/* ─── TOAST ──────────────────────────────────────────────────────── */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);
  return { toasts, show };
};

const ToastContainer = ({ toasts }) => (
  <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        background: t.type === 'success' ? '#ECFDF5' : t.type === 'warning' ? '#FFFBEB' : '#FEF2F2',
        color: t.type === 'success' ? '#065F46' : t.type === 'warning' ? '#92400E' : '#991B1B',
        border: `1.5px solid ${t.type === 'success' ? '#A7F3D0' : t.type === 'warning' ? '#FDE68A' : '#FECACA'}`,
        padding: '12px 20px', borderRadius: 14, fontWeight: 700, fontSize: 13,
        boxShadow: '0 8px 28px rgba(0,0,0,.12)', animation: 'slideIn .3s ease',
        maxWidth: 320,
      }}>
        {t.msg}
      </div>
    ))}
  </div>
);

/* ─── AVATAR PLACEHOLDER ─────────────────────────────────────────── */
const Avatar = ({ name, size = 44, radius = '50%', style = {}, src = null }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  if (src) return (
    <img src={src} alt={name} style={{ width: size, height: size, borderRadius: radius, objectFit: 'cover', ...style }} />
  );
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: `hsl(${hue},52%,48%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: font.sora, fontWeight: 900, fontSize: size * 0.3,
      userSelect: 'none', flexShrink: 0, ...style,
    }}>
      {initials}
    </div>
  );
};

/* ─── FLOATING INPUT ─────────────────────────────────────────────── */
const FloatingInput = ({ label, value, onChange, type = 'text', error, valid, disabled, readOnly, rightEl }) => {
  const [focused, setFocused] = useState(false);
  const floated = focused || value;
  const cls = error ? 'invalid' : valid ? 'valid' : '';
  return (
    <div style={{ position: 'relative', marginBottom: 4 }}>
      <label style={{
        position: 'absolute', left: 14, pointerEvents: 'none', zIndex: 2,
        top: floated ? 8 : '50%', transform: floated ? 'none' : 'translateY(-50%)',
        fontSize: floated ? 10 : 14, fontWeight: floated ? 900 : 700,
        color: focused ? C.orange : C.muted,
        transition: 'all .2s', letterSpacing: floated ? 0.8 : 0, textTransform: floated ? 'uppercase' : 'none',
      }}>
        {label}
      </label>
      <input
        type={type} value={value} onChange={onChange}
        disabled={disabled} readOnly={readOnly}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className={`input-field ${cls}`}
        style={{
          width: '100%', paddingTop: floated ? 22 : 14, paddingBottom: floated ? 8 : 14,
          paddingLeft: 14, paddingRight: rightEl ? 44 : 14,
          border: `1.5px solid ${error ? C.error : valid ? C.success : focused ? C.orange : C.border}`,
          borderRadius: 12, fontSize: 14, fontWeight: 700, color: C.text,
          background: readOnly || disabled ? '#F8FAFC' : C.white,
          transition: 'border-color .2s, box-shadow .2s',
        }}
      />
      {rightEl && (
        <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
          {rightEl}
        </div>
      )}
      {error && (
        <p className="error-msg" style={{ fontSize: 11, color: C.error, fontWeight: 700, marginTop: 4, paddingLeft: 4 }}>
          {error}
        </p>
      )}
      {valid && !error && (
        <p style={{ fontSize: 11, color: C.success, fontWeight: 700, marginTop: 4, paddingLeft: 4 }}>
          ✓ Valide
        </p>
      )}
    </div>
  );
};

/* ─── PASSWORD STRENGTH BAR ──────────────────────────────────────── */
const PasswordStrengthBar = ({ password }) => {
  const score = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const levels = [
    { label: '', color: C.border, w: '0%' },
    { label: 'Faible',    color: C.error,   w: '25%' },
    { label: 'Moyen',     color: '#F59E0B',  w: '50%' },
    { label: 'Fort',      color: C.orange,   w: '75%' },
    { label: 'Très Fort', color: C.success,  w: '100%' },
  ];
  const lvl = levels[score];
  if (!password) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ height: 6, background: '#F1F5F9', borderRadius: 10, overflow: 'hidden' }}>
        <div className="strength-bar" style={{ height: '100%', width: lvl.w, background: lvl.color, borderRadius: 10 }} />
      </div>
      <p style={{ fontSize: 11, fontWeight: 800, color: lvl.color, marginTop: 4 }}>{lvl.label}</p>
    </div>
  );
};

/* ─── CARD WRAPPER ───────────────────────────────────────────────── */
const Card = ({ children, className = '', style = {} }) => (
  <div className={`card-hover ${className}`} style={{
    background: C.cardBg, borderRadius: 28, padding: '28px 30px',
    boxShadow: '0 2px 16px rgba(28,35,51,.07)', border: `1px solid ${C.border}`,
    ...style,
  }}>
    {children}
  </div>
);

const CardHeader = ({ icon: Icon, title, editBtn }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: `${C.orange}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} color={C.orange} />
      </div>
      <h2 style={{ fontFamily: font.sora, fontWeight: 800, fontSize: 16, color: C.navy }}>{title}</h2>
    </div>
    {editBtn}
  </div>
);

/* ─── EDIT / SAVE BUTTONS ────────────────────────────────────────── */
const EditButton = ({ editing, onEdit, onSave, onCancel }) => editing ? (
  <div style={{ display: 'flex', gap: 8 }}>
    <button className="btn-primary" onClick={onSave} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: C.orange, color: '#fff', border: 'none',
      padding: '8px 18px', borderRadius: 12, fontWeight: 900, fontSize: 13,
      boxShadow: `0 4px 16px ${C.orange}44`,
    }}>
      <Save size={15} /> Sauvegarder
    </button>
    <button className="btn-ghost" onClick={onCancel} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: '#F1F5F9', color: C.muted, border: 'none',
      padding: '8px 16px', borderRadius: 12, fontWeight: 800, fontSize: 13,
    }}>
      <X size={15} /> Annuler
    </button>
  </div>
) : (
  <button className="btn-ghost" onClick={onEdit} style={{
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'transparent', color: C.orange,
    border: `1.5px solid ${C.orange}`, padding: '7px 16px',
    borderRadius: 12, fontWeight: 800, fontSize: 13,
    transition: 'background .2s',
  }}
    onMouseEnter={e => { e.currentTarget.style.background = `${C.orange}12`; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
  >
    <Edit3 size={14} /> Modifier
  </button>
);

/* ─── MODAL BASE ─────────────────────────────────────────────────── */
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(28,35,51,.55)',
      backdropFilter: 'blur(6px)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{
        background: C.white, borderRadius: 28, padding: '32px 32px 28px',
        maxWidth: 480, width: '100%',
        boxShadow: '0 32px 80px rgba(28,35,51,.25)',
      }}>
        {children}
      </div>
    </div>
  );
};

/* ─── UPLOAD PHOTO MODAL ─────────────────────────────────────────── */
const UploadPhotoModal = ({ open, onClose, onSave, toast }) => {
  const [preview, setPreview] = useState(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast('❌ Format non supporté. PNG, JPG ou WEBP uniquement.', 'error'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast('❌ Fichier trop lourd (max 5 MB).', 'error'); return;
    }
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 18, color: C.navy }}>
          📸 Changer la photo de profil
        </h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.muted }}>
          <X size={22} />
        </button>
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          border: `2px dashed ${drag ? C.orange : C.border}`,
          borderRadius: 20, padding: '32px 20px', textAlign: 'center', cursor: 'pointer',
          background: drag ? `${C.orange}08` : '#FAFAFA',
          transition: 'border-color .2s, background .2s', marginBottom: 24,
        }}>
        <Upload size={28} color={drag ? C.orange : C.muted} style={{ margin: '0 auto 10px' }} />
        <p style={{ fontWeight: 800, fontSize: 14, color: drag ? C.orange : C.text }}>
          {drag ? 'Relâchez pour uploader' : 'Glissez une image ici'}
        </p>
        <p style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>ou cliquez pour parcourir</p>
        <p style={{ fontSize: 11, color: C.disabled, marginTop: 6 }}>PNG, JPG, WEBP — max 5 MB</p>
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files[0])} />
      </div>

      {/* Preview */}
      {preview && (
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src={preview} alt="preview" style={{
            width: 110, height: 110, borderRadius: '50%', objectFit: 'cover',
            border: `3px solid ${C.orange}`, boxShadow: `0 8px 28px ${C.orange}44`,
          }} />
          <p style={{ fontSize: 12, color: C.muted, marginTop: 8, fontWeight: 700 }}>Aperçu de la photo</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onClose} className="btn-ghost" style={{
          flex: 1, padding: '12px', borderRadius: 14, fontWeight: 800,
          background: '#F1F5F9', color: C.muted, border: 'none',
        }}>
          Annuler
        </button>
        <button className="btn-primary" disabled={!preview} onClick={() => { if (preview) { onSave(preview); onClose(); } }}
          style={{
            flex: 1, padding: '12px', borderRadius: 14, fontWeight: 900,
            background: preview ? C.orange : C.disabled, color: '#fff', border: 'none',
            boxShadow: preview ? `0 4px 16px ${C.orange}44` : 'none',
          }}>
          Enregistrer
        </button>
      </div>
    </Modal>
  );
};

/* ─── DELETE ACCOUNT MODAL ───────────────────────────────────────── */
const DeleteAccountModal = ({ open, onClose }) => {
  const [val, setVal] = useState('');
  const confirmed = val === 'SUPPRIMER';
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: '#FEF2F2',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
        }}>
          <AlertTriangle size={28} color={C.error} />
        </div>
        <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 20, color: C.error, marginBottom: 8 }}>
          Supprimer mon compte
        </h3>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
          Cette action est <strong>irréversible</strong>.<br />
          Toutes vos données seront définitivement perdues.
        </p>
      </div>
      <div style={{ background: '#FEF2F2', borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: `1px solid #FECACA` }}>
        <p style={{ fontSize: 12, color: '#991B1B', fontWeight: 800 }}>
          ⚠️ Cette suppression inclut vos réservations, avis, et historique.
        </p>
      </div>
      <label style={{ fontSize: 13, fontWeight: 800, color: C.text, display: 'block', marginBottom: 8 }}>
        Tapez <code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: 6 }}>SUPPRIMER</code> pour confirmer :
      </label>
      <input
        value={val} onChange={e => setVal(e.target.value)}
        placeholder="SUPPRIMER"
        className="input-field"
        style={{
          width: '100%', padding: '12px 14px', borderRadius: 12, fontSize: 14, fontWeight: 700,
          border: `1.5px solid ${confirmed ? C.error : C.border}`, marginBottom: 20,
          color: C.text, background: C.white,
        }}
      />
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-ghost" onClick={onClose} style={{
          flex: 1, padding: '12px', borderRadius: 14, fontWeight: 800,
          background: '#F1F5F9', color: C.muted, border: 'none',
        }}>Annuler</button>
        <button
          disabled={!confirmed}
          className="btn-danger"
          onClick={() => alert('Compte supprimé (démo)')}
          style={{
            flex: 1, padding: '12px', borderRadius: 14, fontWeight: 900,
            background: confirmed ? '#FEF2F2' : C.disabled,
            color: confirmed ? C.error : '#fff',
            border: `2px solid ${confirmed ? C.error : 'transparent'}`,
            transition: 'all .2s',
          }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Trash2 size={15} /> Supprimer
          </span>
        </button>
      </div>
    </Modal>
  );
};

/* ─── VALIDATION ─────────────────────────────────────────────────── */
const validators = {
  prenom:    v => v.length >= 2 && /^[a-zA-ZÀ-ÿ\s\-]+$/.test(v),
  nom:       v => v.length >= 2 && /^[a-zA-ZÀ-ÿ\s\-]+$/.test(v),
  email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  telephone: v => /^(\+212\s?6\d{2}\s?\d{3}\s?\d{3}|06\d{8}|07\d{8})$/.test(v.replace(/\s/g, '')),
  cin:       v => /^[A-Z]{1,2}\d{5,6}$/.test(v.toUpperCase()),
  ville:     v => v.length >= 2,
  codePostal:v => /^\d{5}$/.test(v),
  password:  v => v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v),
};
const errorMessages = {
  prenom:    'Minimum 2 caractères (lettres uniquement)',
  nom:       'Minimum 2 caractères (lettres uniquement)',
  email:     'Adresse email invalide',
  telephone: 'Format invalide (ex: 06 12 34 56 78)',
  cin:       'Format CIN invalide (ex: AB123456)',
  ville:     'Ville requise (min 2 caractères)',
  codePostal:'Code postal à 5 chiffres',
  password:  'Min 8 car. + 1 majuscule + 1 chiffre + 1 spécial',
};

const useField = (initial, key) => {
  const [value, setValue] = useState(initial);
  const [touched, setTouch] = useState(false);
  const isValid = validators[key]?.(value) ?? true;
  const error = touched && !isValid ? errorMessages[key] : '';
  return {
    value, onChange: e => { setValue(e.target.value); setTouch(true); },
    valid: touched && isValid, error, reset: () => { setValue(initial); setTouch(false); },
    rawValue: value, isValid,
  };
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 : SIDEBAR
═══════════════════════════════════════════════════════════════════ */
const navItems = [
  { name: 'Accueil',              icon: Layout       },
  { name: 'Mes réservations',     icon: Calendar     },
  { name: 'Mes messages',         icon: MessageSquare},
  { name: 'Artisans favoris',     icon: Heart        },
  { name: 'Évaluations',          icon: Star         },
  { name: 'Paramètres',           icon: Settings     },
];

const Sidebar = ({ active, setActive }) => (
  <aside style={{
    width: 280, background: C.navy, color: '#fff',
    display: 'flex', flexDirection: 'column',
    position: 'fixed', height: '100vh', zIndex: 50,
    boxShadow: '4px 0 32px rgba(0,0,0,.25)',
  }}>
    <div style={{ padding: '36px 24px 20px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `linear-gradient(135deg,${C.orange},#FBBF24)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 20px ${C.orange}44`, transform: 'rotate(3deg)',
        }}>
          <Zap size={20} fill="#fff" color="#fff" />
        </div>
        <h2 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 20, fontStyle: 'italic', letterSpacing: -0.5 }}>
          Artisan<span style={{ color: C.orange }}>Connect</span>
        </h2>
      </div>
      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {navItems.map(({ name, icon: Icon }) => {
          const isActive = active === name;
          return (
            <button key={name} className="nav-btn" onClick={() => setActive(name)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 18px', borderRadius: 16, border: 'none',
              background: isActive ? 'rgba(255,255,255,.1)' : 'transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,.4)',
              fontFamily: font.nunito, fontWeight: 800, fontSize: 14,
              letterSpacing: 0.2, position: 'relative', textAlign: 'left',
            }}>
              {isActive && (
                <div style={{
                  position: 'absolute', left: 0, top: 8, bottom: 8,
                  width: 3, background: C.orange, borderRadius: '0 4px 4px 0',
                  boxShadow: `2px 0 12px ${C.orange}`,
                }} />
              )}
              <Icon size={18} color={isActive ? C.orange : undefined} style={{ flexShrink: 0 }} />
              {name}
            </button>
          );
        })}
      </nav>
    </div>
    {/* User card */}
    <div style={{ marginTop: 'auto', padding: '0 18px 28px' }}>
      <div style={{
        background: 'rgba(255,255,255,.06)', borderRadius: 18, padding: '14px 16px',
        border: '1px solid rgba(255,255,255,.07)',
        display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
      }}>
        <div style={{ position: 'relative' }}>
          <Avatar name="Karim Bennani" size={40} radius={12} />
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 11, height: 11, background: C.success,
            border: '2px solid #1C2333', borderRadius: '50%',
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 900, fontSize: 13, color: '#fff' }}>Karim B.</p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>
            Particulier Or
          </p>
        </div>
        <LogOut size={15} color="rgba(255,255,255,.2)" />
      </div>
    </div>
  </aside>
);

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 : HERO PROFIL
═══════════════════════════════════════════════════════════════════ */
const ProfilHero = ({ photoUrl, setPhotoUrl, toast }) => {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <>
      <div className="fade-up" style={{
        background: `linear-gradient(135deg, ${C.navyHero} 0%, #1C2333 100%)`,
        borderRadius: 32, padding: '40px 44px', marginBottom: 28, position: 'relative', overflow: 'hidden',
      }}>
        {/* Geometric BG decorations */}
        {[
          { w: 220, h: 220, top: -80, right: 60, opacity: .06 },
          { w: 140, h: 140, bottom: -50, right: 220, opacity: .05 },
          { w: 90,  h: 90,  top: 20,   right: 320, opacity: .07 },
        ].map((d, i) => (
          <div key={i} style={{
            position: 'absolute', top: d.top, bottom: d.bottom, right: d.right,
            width: d.w, height: d.h, borderRadius: '50%',
            border: `2px solid rgba(255,255,255,${d.opacity})`,
            background: `rgba(249,115,22,${d.opacity * 0.5})`,
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 32, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
          {/* Avatar + overlay camera */}
          <div className="avatar-wrap" onClick={() => setUploadOpen(true)} style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
            <Avatar name="Karim Bennani" size={110} radius={28}
              src={photoUrl}
              style={{ boxShadow: `0 12px 40px rgba(0,0,0,.4)`, outline: `3px solid ${C.orange}44` }}
            />
            {/* Overlay */}
            <div className="avatar-overlay" style={{
              position: 'absolute', inset: 0, borderRadius: 28,
              background: 'rgba(0,0,0,.55)', opacity: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Camera size={26} color="#fff" className="cam-icon" style={{ transform: 'scale(.7)', opacity: 0, transition: 'all .25s' }} />
            </div>
            {/* Online dot */}
            <div style={{
              position: 'absolute', bottom: 6, right: 6,
              width: 14, height: 14, background: C.success,
              border: '2.5px solid #1E2D40', borderRadius: '50%',
              boxShadow: `0 0 0 3px ${C.success}44`,
            }} />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
              <h1 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 30, color: '#fff', letterSpacing: -1 }}>
                Karim Bennani
              </h1>
              <span className="pill-badge">⭐ Particulier Or</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,.55)', fontSize: 13, fontWeight: 700 }}>
                <Calendar size={13} /> Membre depuis Janvier 2024
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,.55)', fontSize: 13, fontWeight: 700 }}>
                <MapPin size={13} /> Casablanca, Maroc
              </div>
            </div>
          </div>

          {/* Edit button — hero level is cosmetic here, each card has its own */}
          <button className="btn-primary" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: C.orange, color: '#fff', border: 'none',
            padding: '13px 26px', borderRadius: 18, fontFamily: font.sora,
            fontWeight: 900, fontSize: 14, boxShadow: `0 6px 20px ${C.orange}55`,
            alignSelf: 'flex-start',
          }}>
            <Camera size={17} /> Modifier la photo
          </button>
        </div>
      </div>

      <UploadPhotoModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSave={url => { setPhotoUrl(url); toast('📸 Photo de profil modifiée !', 'success'); }}
        toast={toast}
      />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 : INFO PERSONNELLES
═══════════════════════════════════════════════════════════════════ */
const InfoPersonnellesCard = ({ toast }) => {
  const [editing, setEditing] = useState(false);
  const prenom    = useField('Karim',          'prenom');
  const nom       = useField('Bennani',         'nom');
  const email     = useField('karim@email.com', 'email');
  const telephone = useField('06 12 34 56 78',  'telephone');
  const cin       = useField('AB123456',         'cin');

  const fields = [prenom, nom, email, telephone, cin];
  const labels = ['Prénom', 'Nom', 'Email', 'Téléphone', 'CIN'];
  const keys   = ['prenom', 'nom', 'email', 'telephone', 'cin'];

  const handleSave = () => {
    if (fields.every(f => f.isValid)) {
      setEditing(false);
      toast('✅ Profil mis à jour avec succès !', 'success');
    } else {
      toast('❌ Veuillez corriger les erreurs avant de sauvegarder.', 'error');
    }
  };
  const handleCancel = () => { fields.forEach(f => f.reset()); setEditing(false); toast('↩️ Modifications annulées.', 'warning'); };

  return (
    <Card className="fade-up fade-up-2">
      <CardHeader icon={User} title="Informations Personnelles"
        editBtn={<EditButton editing={editing} onEdit={() => setEditing(true)} onSave={handleSave} onCancel={handleCancel} />} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
        {fields.map((f, i) => (
          <div key={keys[i]} style={{ gridColumn: i === 2 ? '1 / -1' : undefined }}>
            <FloatingInput
              label={labels[i]}
              value={f.value}
              onChange={f.onChange}
              readOnly={!editing}
              error={f.error}
              valid={editing && f.valid}
              type={keys[i] === 'email' ? 'email' : 'text'}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 : ADRESSE
═══════════════════════════════════════════════════════════════════ */
const AdresseCard = ({ toast }) => {
  const [editing, setEditing] = useState(false);
  const ville     = useField('Casablanca', 'ville');
  const codePostal = useField('20000',     'codePostal');

  const handleSave = () => {
    if (ville.isValid && codePostal.isValid) {
      setEditing(false); toast('✅ Adresse mise à jour !', 'success');
    } else {
      toast('❌ Veuillez corriger les erreurs.', 'error');
    }
  };
  const handleCancel = () => { ville.reset(); codePostal.reset(); setEditing(false); toast('↩️ Modifications annulées.', 'warning'); };

  return (
    <Card className="fade-up fade-up-3">
      <CardHeader icon={MapPin} title="Adresse & Localisation"
        editBtn={<EditButton editing={editing} onEdit={() => setEditing(true)} onSave={handleSave} onCancel={handleCancel} />} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
        <FloatingInput label="Ville" value={ville.value} onChange={ville.onChange}
          readOnly={!editing} error={ville.error} valid={editing && ville.valid} />
        <FloatingInput label="Code Postal" value={codePostal.value} onChange={codePostal.onChange}
          readOnly={!editing} error={codePostal.error} valid={editing && codePostal.valid} />
      </div>
    </Card>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 : SÉCURITÉ
═══════════════════════════════════════════════════════════════════ */
const SecuriteCard = ({ toast }) => {
  const [editing, setEditing] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [oldPwd, setOldPwd]   = useState('');
  const [newPwd, setNewPwd]   = useState('');
  const [confPwd, setConfPwd] = useState('');

  const newIsValid = validators.password(newPwd);
  const confIsValid = confPwd === newPwd && confPwd.length > 0;

  const eyeBtn = (show, setShow) => (
    <button onClick={() => setShow(!show)} style={{ background: 'none', border: 'none', color: C.muted, display: 'flex' }}>
      {show ? <EyeOff size={17} /> : <Eye size={17} />}
    </button>
  );

  const handleSave = () => {
    if (!oldPwd) { toast('❌ Entrez votre mot de passe actuel.', 'error'); return; }
    if (!newIsValid) { toast('❌ Nouveau mot de passe trop faible.', 'error'); return; }
    if (!confIsValid) { toast('❌ Les mots de passe ne correspondent pas.', 'error'); return; }
    setEditing(false); setOldPwd(''); setNewPwd(''); setConfPwd('');
    toast('🔐 Mot de passe mis à jour !', 'success');
  };

  return (
    <Card className="fade-up fade-up-4">
      <CardHeader icon={Lock} title="Sécurité & Mot de Passe"
        editBtn={
          editing
            ? <EditButton editing onSave={handleSave} onCancel={() => { setEditing(false); setOldPwd(''); setNewPwd(''); setConfPwd(''); toast('↩️ Modifications annulées.', 'warning'); }} />
            : <EditButton editing={false} onEdit={() => setEditing(true)} />
        }
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FloatingInput label="Mot de passe actuel" value={oldPwd} onChange={e => setOldPwd(e.target.value)}
          type={showOld ? 'text' : 'password'} readOnly={!editing}
          rightEl={editing ? eyeBtn(showOld, setShowOld) : null} />
        <FloatingInput label="Nouveau mot de passe" value={newPwd} onChange={e => setNewPwd(e.target.value)}
          type={showNew ? 'text' : 'password'} readOnly={!editing}
          valid={editing && newPwd && newIsValid} error={editing && newPwd && !newIsValid ? errorMessages.password : ''}
          rightEl={editing ? eyeBtn(showNew, setShowNew) : null} />
        {editing && <PasswordStrengthBar password={newPwd} />}
        <FloatingInput label="Confirmer le mot de passe" value={confPwd} onChange={e => setConfPwd(e.target.value)}
          type={showConf ? 'text' : 'password'} readOnly={!editing}
          valid={editing && confIsValid} error={editing && confPwd && !confIsValid ? 'Les mots de passe ne correspondent pas' : ''}
          rightEl={editing ? eyeBtn(showConf, setShowConf) : null} />
      </div>
      {editing && (
        <button className="btn-primary" onClick={handleSave} style={{
          width: '100%', marginTop: 20, padding: '14px', borderRadius: 16,
          background: C.orange, color: '#fff', border: 'none', fontFamily: font.sora,
          fontWeight: 900, fontSize: 14, boxShadow: `0 6px 20px ${C.orange}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Shield size={17} /> Mettre à jour le mot de passe
        </button>
      )}
    </Card>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 : RÉSUMÉ COMPTE (colonne droite)
═══════════════════════════════════════════════════════════════════ */
const statsData = [
  { label: 'Missions terminées',    value: '12', icon: CheckCircle2, color: C.success },
  { label: 'Artisans favoris',      value: '8',  icon: Heart,        color: '#F43F5E' },
  { label: 'Réservations actives',  value: '2',  icon: Clock,        color: C.orange  },
  { label: 'Avis laissés',          value: '7',  icon: Star,         color: '#F59E0B' },
];

const ResumeCompteCard = () => (
  <Card className="fade-up fade-up-2">
    <CardHeader icon={Star} title="Statut du Compte" />
    <div style={{ textAlign: 'center', marginBottom: 22 }}>
      <span className="pill-badge" style={{ fontSize: 13, padding: '8px 22px' }}>⭐ Particulier Or</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
      {statsData.map(({ label, value, icon: Icon, color }) => (
        <div key={label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', borderRadius: 14, background: '#F8FAFC',
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon size={17} color={color} />
            <span style={{ fontSize: 13, fontWeight: 700, color: C.muted }}>{label}</span>
          </div>
          <span style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 20, color: C.navy }}>{value}</span>
        </div>
      ))}
    </div>
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
        <span style={{ color: C.muted }}>Membre depuis</span>
        <span style={{ color: C.text }}>Janvier 2024</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
        <span style={{ color: C.muted }}>Dernière connexion</span>
        <span style={{ color: C.success, fontWeight: 800 }}>Aujourd'hui</span>
      </div>
    </div>
  </Card>
);

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7 : ACTIVITÉ RÉCENTE
═══════════════════════════════════════════════════════════════════ */
const activities = [
  { title: 'Réservation confirmée',  sub: 'Mohamed Alami • Plombier',     time: 'il y a 2h',  dot: C.success },
  { title: 'Avis laissé ★★★★★',    sub: 'Youssef Tazi • Électricien',   time: 'Hier',       dot: '#F59E0B' },
  { title: 'Profil mis à jour',      sub: 'Informations personnelles',    time: 'il y a 3j',  dot: C.orange  },
  { title: 'Nouvelle mission',       sub: 'Peintre • Casablanca',         time: 'il y a 1 sem.',dot: C.muted },
];

const ActiviteRecenteCard = () => (
  <Card className="fade-up fade-up-3">
    <CardHeader icon={Clock} title="Activité Récente" />
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', left: 13, top: 6, bottom: 6,
        width: 2, background: '#F1F5F9', borderRadius: 2,
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {activities.map((a, i) => (
          <div key={i} className="activity-row" style={{ paddingLeft: 40, position: 'relative', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', left: 0, top: 2, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="activity-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: a.dot, boxShadow: `0 0 0 3px #fff` }} />
            </div>
            <p className="activity-title" style={{ fontSize: 13, fontWeight: 800, color: C.navy, transition: 'color .2s' }}>{a.title}</p>
            <p style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginTop: 2 }}>{a.sub}</p>
            <p style={{ fontSize: 10, color: C.disabled, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 3 }}>{a.time}</p>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

/* ═══════════════════════════════════════════════════════════════════
   SECTION 8 : DANGER ZONE
═══════════════════════════════════════════════════════════════════ */
const DangerZoneCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="fade-up fade-up-4" style={{ border: `1.5px solid #FEE2E2`, background: '#FFFBFB' }}>
        <CardHeader icon={AlertTriangle} title="Zone Critique" />
        <p style={{ fontSize: 13, color: C.muted, fontWeight: 600, marginBottom: 18, lineHeight: 1.6 }}>
          La suppression de votre compte est <strong>irréversible</strong>. Toutes vos données, réservations et avis seront définitivement perdus.
        </p>
        <button className="btn-danger" onClick={() => setOpen(true)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', color: C.error,
          border: `2px solid ${C.error}`, padding: '12px 22px',
          borderRadius: 14, fontWeight: 900, fontSize: 14,
          width: '100%', justifyContent: 'center',
          transition: 'all .2s',
        }}>
          <Trash2 size={17} /> Supprimer mon compte
        </button>
      </Card>
      <DeleteAccountModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE PRINCIPALE : ProfilParticulier
═══════════════════════════════════════════════════════════════════ */
export default function ProfilParticulier() {
  const [activeNav, setActiveNav] = useState('Paramètres');
  const [photoUrl, setPhotoUrl]   = useState(null);
  const { toasts, show: toast }   = useToast();

  return (
    <>
      <FontLoader />
      <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: font.nunito }}>
        {/* Sidebar */}
        <Sidebar active={activeNav} setActive={setActiveNav} />

        {/* Main content */}
        <main style={{ flex: 1, marginLeft: 280, padding: '40px 44px', maxWidth: 1400 }}>

          {/* Topbar */}
          <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 4, height: 22, background: C.orange, borderRadius: 2 }} />
                <h1 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 26, color: C.navy, letterSpacing: -0.8 }}>
                  Mon Profil
                </h1>
              </div>
              <p style={{ fontSize: 13, color: C.muted, fontWeight: 700, paddingLeft: 12 }}>
                Gérez vos informations personnelles et la sécurité de votre compte
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: C.white, padding: '8px 16px', borderRadius: 14,
                border: `1px solid ${C.border}`, boxShadow: '0 2px 10px rgba(28,35,51,.06)',
                fontSize: 12, fontWeight: 700, color: C.muted,
              }}>
                <Calendar size={13} color={C.orange} />
                Vendredi 20 Février 2026
              </div>
              <button style={{
                width: 44, height: 44, borderRadius: 14, background: C.white,
                border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', boxShadow: '0 2px 10px rgba(28,35,51,.06)',
              }}>
                <Bell size={19} color={C.navy} />
                <span style={{
                  position: 'absolute', top: 11, right: 11, width: 9, height: 9,
                  background: C.orange, borderRadius: '50%', border: '2px solid #fff',
                }} />
              </button>
            </div>
          </div>

          {/* HERO */}
          <ProfilHero photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} toast={toast} />

          {/* BODY GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

            {/* Colonne gauche */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <InfoPersonnellesCard toast={toast} />
              <AdresseCard toast={toast} />
              <SecuriteCard toast={toast} />
            </div>

            {/* Colonne droite */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <ResumeCompteCard />
              <ActiviteRecenteCard />
              <DangerZoneCard />
            </div>
          </div>

          {/* Bas de page */}
          <div style={{ height: 48 }} />
        </main>
      </div>

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </>
  );
}