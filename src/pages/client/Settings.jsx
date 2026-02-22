import React, { useState } from 'react';
import {
    Bell, Lock, Shield, Eye, CreditCard, HelpCircle,
    ChevronRight, Globe, Smartphone, LogOut, Check
} from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import ClientLayout from '../../components/client/ClientLayout';
import Header from '../../components/client/Header';

export default function Settings() {
    const [toggles, setToggles] = useState({
        push: true,
        email: true,
        marketing: false,
        twoFactor: false
    });

    const toggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }));

    return (
        <ClientLayout activeId="settings">
            <Header title="Paramètres" subtitle="Personnalisez votre expérience et gérez votre sécurité" />

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* Section: Compte & Sécurité */}
                <div style={{ background: '#fff', borderRadius: 32, padding: 32, border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066FF' }}>
                            <Lock size={20} />
                        </div>
                        <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 18, color: C.navy }}>Sécurité du compte</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <SettingsAction icon={Shield} label="Changer le mot de passe" sub="Mis à jour il y a 3 mois" />
                        <SettingsToggle
                            icon={Smartphone}
                            label="Authentification à deux facteurs"
                            sub="Sécurisez votre compte avec votre téléphone"
                            active={toggles.twoFactor}
                            onToggle={() => toggle('twoFactor')}
                        />
                        <SettingsAction icon={Eye} label="Sessions actives" sub="Gérez les appareils connectés" />
                    </div>
                </div>

                {/* Section: Notifications */}
                <div style={{ background: '#fff', borderRadius: 32, padding: 32, border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFF4EF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.orange }}>
                            <Bell size={20} />
                        </div>
                        <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 18, color: C.navy }}>Préférences de notification</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <SettingsToggle
                            icon={Bell}
                            label="Notifications Push"
                            sub="Alertes instantanées sur vos réservations"
                            active={toggles.push}
                            onToggle={() => toggle('push')}
                        />
                        <SettingsToggle
                            icon={Mail}
                            label="Notifications Email"
                            sub="Récapitulatifs hebdomadaires et factures"
                            active={toggles.email}
                            onToggle={() => toggle('email')}
                        />
                    </div>
                </div>

                {/* Section: Autres */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <SettingsAction icon={Globe} label="Langue de l'application" sub="Français (Maroc)" />
                    <SettingsAction icon={HelpCircle} label="Centre d'aide" sub="FAQ et support client" />
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px',
                        borderRadius: 24, background: '#FFF1F2', border: '1px solid #FFE4E6',
                        color: '#E11D48', cursor: 'pointer', marginTop: 20
                    }}>
                        <LogOut size={20} />
                        <span style={{ fontWeight: 800, fontSize: 16 }}>Se déconnecter</span>
                    </button>
                </div>
            </div>
        </ClientLayout>
    );
}

const SettingsAction = ({ icon: Icon, label, sub }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '20px',
        borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s',
        border: '1px solid transparent'
    }}
        onMouseEnter={e => {
            e.currentTarget.style.background = '#F8FAFC';
            e.currentTarget.style.borderColor = '#E2E8F0';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
        }}
    >
        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.navy }}>
            <Icon size={20} />
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontWeight: 800, color: C.navy, fontSize: 16 }}>{label}</h4>
            <p style={{ fontSize: 13, color: C.slate, fontWeight: 700 }}>{sub}</p>
        </div>
        <ChevronRight size={18} color="#CBD5E1" />
    </div>
);

const SettingsToggle = ({ icon: Icon, label, sub, active, onToggle }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '20px',
        borderRadius: 20, border: '1px solid transparent'
    }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.navy }}>
            <Icon size={20} />
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontWeight: 800, color: C.navy, fontSize: 16 }}>{label}</h4>
            <p style={{ fontSize: 13, color: C.slate, fontWeight: 700 }}>{sub}</p>
        </div>
        <button
            onClick={onToggle}
            style={{
                width: 54, height: 28, borderRadius: 14,
                background: active ? C.orange : '#E2E8F0',
                border: 'none', cursor: 'pointer', position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: 0
            }}
        >
            <div style={{
                position: 'absolute', top: 4, left: active ? 30 : 4,
                width: 20, height: 20, background: '#fff', borderRadius: '50%',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
                {active && <Check size={12} color={C.orange} strokeWidth={4} />}
            </div>
        </button>
    </div>
);
