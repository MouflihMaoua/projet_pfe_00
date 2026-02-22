import React, { useState } from 'react';
import { Send, Phone, Video, Info, Search } from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import ClientLayout from '../../components/client/ClientLayout';
import Avatar from '../../components/ui/Avatar';

export default function Messages() {
    const [selectedChat, setSelectedChat] = useState(1);

    const chats = [
        { id: 1, name: 'Ahmed Mansouri', lastMsg: 'C\'est parfait pour demain 14h.', time: '10:30', unread: 2 },
        { id: 2, name: 'Sarah Ben Ali', lastMsg: 'Pouvez-vous m\'envoyer une photo ?', time: 'Hier', unread: 0 },
        { id: 3, name: 'Mourad Kasmi', lastMsg: 'Le devis est prêt.', time: 'Lun', unread: 0 },
    ];

    return (
        <ClientLayout activeId="messages">
            <div style={{
                height: 'calc(100vh - 100px)', display: 'grid',
                gridTemplateColumns: '350px 1fr', background: '#fff',
                borderRadius: 28, overflow: 'hidden', border: '1px solid #E2E8F0',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
            }}>
                {/* Conversations List */}
                <div style={{ borderRight: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '32px 24px' }}>
                        <h2 style={{ fontFamily: font.sora, fontWeight: 900, fontSize: 24, color: C.navy, marginBottom: 20 }}>Messages</h2>
                        <div style={{
                            position: 'relative', background: '#F8FAFC',
                            borderRadius: 14, display: 'flex', alignItems: 'center',
                            padding: '0 16px', border: '1px solid #E2E8F0'
                        }}>
                            <Search size={18} color={C.slate} />
                            <input type="text" placeholder="Rechercher..." style={{
                                border: 'none', background: 'transparent', padding: '12px',
                                width: '100%', outline: 'none', fontWeight: 600, fontSize: 13
                            }} />
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {chats.map(chat => (
                            <div key={chat.id}
                                onClick={() => setSelectedChat(chat.id)}
                                style={{
                                    padding: '20px 24px', cursor: 'pointer',
                                    background: selectedChat === chat.id ? '#F8FAFC' : 'transparent',
                                    borderLeft: `4px solid ${selectedChat === chat.id ? C.orange : 'transparent'}`,
                                    transition: 'all 0.2s', display: 'flex', gap: 14
                                }}>
                                <Avatar name={chat.name} size={48} radius={14} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <h4 style={{ fontWeight: 800, fontSize: 14, color: C.navy }}>{chat.name}</h4>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: C.slate }}>{chat.time}</span>
                                    </div>
                                    <p style={{
                                        fontSize: 13, fontWeight: 600, color: chat.unread > 0 ? C.navy : C.slate,
                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                    }}>
                                        {chat.lastMsg}
                                    </p>
                                </div>
                                {chat.unread > 0 && (
                                    <div style={{
                                        width: 18, height: 18, background: C.orange, borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 10, fontWeight: 900, color: '#fff', marginTop: 2
                                    }}>{chat.unread}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <div style={{
                        padding: '24px 32px', borderBottom: '1px solid #F1F5F9',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <Avatar name={chats.find(c => c.id === selectedChat)?.name} size={44} radius={12} />
                            <div>
                                <h4 style={{ fontWeight: 800, fontSize: 16, color: C.navy }}>{chats.find(c => c.id === selectedChat)?.name}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <div style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%' }} />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#10B981' }}>En ligne</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <button style={{ border: '1px solid #E2E8F0', background: 'transparent', width: 40, height: 40, borderRadius: 12, cursor: 'pointer', color: C.slate }}><Phone size={18} /></button>
                            <button style={{ border: '1px solid #E2E8F0', background: 'transparent', width: 40, height: 40, borderRadius: 12, cursor: 'pointer', color: C.slate }}><Video size={18} /></button>
                            <button style={{ border: '1px solid #E2E8F0', background: 'transparent', width: 40, height: 40, borderRadius: 12, cursor: 'pointer', color: C.slate }}><Info size={18} /></button>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div style={{ flex: 1, padding: '32px', background: '#FAFBFF', display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{
                            alignSelf: 'flex-start', background: '#fff', padding: '16px 20px',
                            borderRadius: '0 20px 20px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            maxWidth: '70%', fontWeight: 600, fontSize: 14, color: C.navy, border: '1px solid #E2E8F0'
                        }}>
                            Bonjour Maroua, j'ai bien reçu vos photos. Je peux passer demain à 14h ?
                        </div>
                        <div style={{
                            alignSelf: 'flex-end', background: C.orange, padding: '16px 20px',
                            borderRadius: '20px 20px 0 20px', boxShadow: `0 8px 16px ${C.orange}33`,
                            maxWidth: '70%', fontWeight: 700, fontSize: 14, color: '#fff'
                        }}>
                            C'est parfait pour demain 14h. Merci !
                        </div>
                    </div>

                    {/* Input */}
                    <div style={{ padding: '24px 32px' }}>
                        <div style={{
                            background: '#F8FAFC', borderRadius: 20, padding: '8px 8px 8px 20px',
                            display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #E2E8F0'
                        }}>
                            <input type="text" placeholder="Écrivez votre message..." style={{
                                flex: 1, border: 'none', background: 'transparent', padding: '12px 0',
                                outline: 'none', fontWeight: 600, fontSize: 14
                            }} />
                            <button style={{
                                width: 44, height: 44, background: C.orange, borderRadius: 16, border: 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                                cursor: 'pointer'
                            }}>
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
