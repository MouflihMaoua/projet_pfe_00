import React, { useState } from 'react';
import {
    Camera, MapPin, Phone, Mail, ShieldCheck, Edit3,
    Lock, Bell, CreditCard, ChevronRight, CheckCircle2,
    User, Mail as MailIcon, Key, Hash, X, Save
} from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import ClientLayout from '../../components/client/ClientLayout';
import Avatar from '../../components/ui/Avatar';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: 'Bennani',
        prenom: 'Maroua',
        email: 'maroua.b@gmail.com',
        telephone: '+212 6 12 34 56 78',
        ville: 'Casablanca',
        code_postale: '20000',
        mot_de_passe: '********'
    });

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <ClientLayout activeId="profile">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                {/* Profile Hero Section */}
                <div style={{
                    background: '#fff', borderRadius: 32, overflow: 'hidden',
                    border: '1px solid #E2E8F0', marginBottom: 40,
                    boxShadow: '0 20px 50px rgba(26,58,92,0.03)'
                }}>
                    <div style={{
                        height: 200,
                        background: `linear-gradient(135deg, ${C.navy} 0%, #0F2A43 100%)`,
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,107,53,0.1)', filter: 'blur(60px)' }} />
                    </div>

                    <div style={{
                        padding: '0 40px 40px',
                        position: 'relative',
                        marginTop: -60,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 24
                    }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
                            <div style={{ position: 'relative', zIndex: 10 }}>
                                <div style={{
                                    width: 140, height: 140, borderRadius: 36,
                                    padding: 6, background: '#fff',
                                    boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                                }}>
                                    <Avatar name={`${formData.prenom} ${formData.nom}`} size={128} radius={32} />
                                </div>
                                <button style={{
                                    position: 'absolute', bottom: 10, right: -5,
                                    width: 38, height: 38, borderRadius: 12, background: C.orange,
                                    border: '4px solid #fff', color: '#fff', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,107,53,0.3)'
                                }}>
                                    <Camera size={18} />
                                </button>
                            </div>

                            <div style={{ paddingBottom: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                                    <h2 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 32, color: C.navy, letterSpacing: -1 }}>
                                        {formData.prenom} {formData.nom}
                                    </h2>
                                    <div style={{ background: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <ShieldCheck size={14} /> VÉRIFIÉ
                                    </div>
                                </div>
                                <p style={{ fontWeight: 700, fontSize: 16, color: C.slate, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <MapPin size={18} color={C.orange} /> {formData.ville}, Maroc • <span style={{ color: C.orange }}>Membre Gold</span>
                                </p>
                            </div>
                        </div>

                        {!isEditing && (
                            <div style={{ display: 'flex', gap: 12, paddingBottom: 10 }}>
                                <button onClick={() => setIsEditing(true)} style={{
                                    padding: '14px 28px', borderRadius: 18, background: C.navy,
                                    color: '#fff', display: 'flex', alignItems: 'center',
                                    gap: 10, fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer',
                                    boxShadow: `0 10px 20px ${C.navy}33`
                                }}>
                                    <Edit3 size={18} /> Modifier le profil
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div style={{
                        background: '#fff', borderRadius: 32, padding: 48,
                        border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                            <div>
                                <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 24, color: C.navy, marginBottom: 8 }}>Modification du profil</h3>
                                <p style={{ color: C.slate, fontWeight: 600, fontSize: 14 }}>Mettez à jour vos informations personnelles (Utilisateur & Particulier)</p>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => setIsEditing(false)} style={{
                                    padding: '12px 20px', borderRadius: 14, background: '#F1F5F9',
                                    color: C.slate, border: 'none', fontWeight: 800, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 8
                                }}>
                                    <X size={18} /> Annuler
                                </button>
                                <button onClick={handleSave} style={{
                                    padding: '12px 24px', borderRadius: 14, background: C.orange,
                                    color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    boxShadow: `0 8px 20px ${C.orange}44`
                                }}>
                                    <Save size={18} /> Enregistrer
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                            <EditField label="Prénom" value={formData.prenom} icon={User} onChange={v => setFormData(p => ({ ...p, prenom: v }))} />
                            <EditField label="Nom" value={formData.nom} icon={User} onChange={v => setFormData(p => ({ ...p, nom: v }))} />
                            <EditField label="Email" value={formData.email} icon={MailIcon} type="email" onChange={v => setFormData(p => ({ ...p, email: v }))} />
                            <EditField label="Téléphone" value={formData.telephone} icon={Phone} type="tel" onChange={v => setFormData(p => ({ ...p, telephone: v }))} />
                            <EditField label="Ville" value={formData.ville} icon={MapPin} onChange={v => setFormData(p => ({ ...p, ville: v }))} />
                            <EditField label="Code Postal" value={formData.code_postale} icon={Hash} onChange={v => setFormData(p => ({ ...p, code_postale: v }))} />
                            <EditField label="Mot de passe" value={formData.mot_de_passe} icon={Key} type="password" onChange={v => setFormData(p => ({ ...p, mot_de_passe: v }))} />
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            <div style={{ background: '#fff', borderRadius: 32, padding: 40, border: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.navy }}>
                                        <MailIcon size={20} />
                                    </div>
                                    <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 20, color: C.navy }}>Informations personnelles</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                    <ProfileField label="Nom complet" value={`${formData.prenom} ${formData.nom}`} />
                                    <ProfileField label="Adresse Email" value={formData.email} verified />
                                    <ProfileField label="Téléphone" value={formData.telephone} verified />
                                    <ProfileField label="Ville / Code Postal" value={`${formData.ville} (${formData.code_postale})`} />
                                </div>
                            </div>

                            <div style={{ background: '#fff', borderRadius: 32, padding: 40, border: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.navy }}>
                                        <MapPin size={20} />
                                    </div>
                                    <h3 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 20, color: C.navy }}>Mes adresses</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <AddressCard type="Domicile" address="15 Rue Ghandi, Appt 4, Casablanca" active />
                                    <AddressCard type="Bureau" address="Technopark, Bureau 402, Casablanca" />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            <div style={{ background: '#fff', borderRadius: 32, padding: 32, border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontFamily: font.sora, fontWeight: 800, fontSize: 18, color: C.navy, marginBottom: 24 }}>Paramètres</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <SettingItem icon={Lock} label="Sécurité" sub="Mot de passe, 2FA" />
                                    <SettingItem icon={Bell} label="Notifications" sub="Push, Email, SMS" />
                                    <SettingItem icon={CreditCard} label="Paiement" sub="Cartes, Facturation" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ClientLayout>
    );
}

const ProfileField = ({ label, value, verified }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ fontSize: 12, fontWeight: 800, color: C.slate, textTransform: 'uppercase' }}>{label}</label>
        <div style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: 16, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: C.navy, fontSize: 15 }}>{value}</span>
            {verified && <CheckCircle2 size={16} color="#10B981" />}
        </div>
    </div>
);

const AddressCard = ({ type, address, active }) => (
    <div style={{ padding: 24, borderRadius: 24, border: `2px solid ${active ? C.orange : '#F1F5F9'}`, background: active ? '#FFF9F6' : '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <span style={{ fontSize: 10, fontWeight: 900, color: active ? C.orange : C.slate, display: 'block', marginBottom: 6 }}>{type}</span>
            <p style={{ fontWeight: 800, color: C.navy, fontSize: 14 }}>{address}</p>
        </div>
        <ChevronRight size={20} color={active ? C.orange : C.slate} />
    </div>
);

const SettingItem = ({ icon: Icon, label, sub }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', borderRadius: 20, cursor: 'pointer' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.navy }}>
            <Icon size={20} />
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontWeight: 800, color: C.navy, fontSize: 14 }}>{label}</h4>
            <p style={{ fontSize: 12, color: C.slate, fontWeight: 600 }}>{sub}</p>
        </div>
        <ChevronRight size={18} color="#CBD5E1" />
    </div>
);

const EditField = ({ label, value, icon: Icon, type = 'text', onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label style={{ fontSize: 13, fontWeight: 800, color: C.navy }}>{label}</label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 16, color: C.slate }}>
                <Icon size={18} />
            </div>
            <input
                type={type} value={value} onChange={e => onChange(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: 16, border: '1.5px solid #E2E8F0', outline: 'none', fontWeight: 700, fontSize: 15, color: C.navy }}
            />
        </div>
    </div>
);
