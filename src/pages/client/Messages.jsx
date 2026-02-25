import React, { useState } from 'react';
import { Send, Phone, Search, MoreHorizontal, Paperclip, Smile } from 'lucide-react';
import { COLORS as C, FONTS as font } from '../../constants/theme';
import Avatar from '../../components/ui/Avatar';

const chats = [
  { id: 1, name: 'Ahmed Mansouri', job: 'Plombier',    last: 'Je serai là à 10h préc...', time: '10:05', unread: 2, online: true  },
  { id: 2, name: 'Youssef Alami',  job: 'Électricien', last: 'Le devis est prêt, je v...', time: 'Hier',  unread: 0, online: true  },
  { id: 3, name: 'Said Benali',    job: 'Menuisier',   last: 'Merci pour votre con...',    time: 'Lun',   unread: 0, online: false },
];

const mockMessages = {
  1: [
    { from: 'them', text: 'Bonjour Karim ! Je confirme pour demain.',  time: '09:45' },
    { from: 'me',   text: 'Super ! Durée estimée des travaux ?',        time: '09:47' },
    { from: 'them', text: 'Environ 2h. Je serai là à 10h précise 👍',  time: '10:05' },
  ],
  2: [
    { from: 'them', text: 'Bonjour, voici le devis préparé.',           time: 'Hier' },
    { from: 'me',   text: 'Merci, je vous reviens demain.',             time: 'Hier' },
  ],
  3: [
    { from: 'them', text: 'Voici le devis pour la menuiserie.',         time: 'Lun'  },
    { from: 'me',   text: 'Je le regarde et reviens vers vous.',        time: 'Lun'  },
  ],
};

export default function Messages() {
  const [sel, setSel]     = useState(1);
  const [input, setInput] = useState('');
  const active = chats.find(c => c.id === sel);
  const msgs   = mockMessages[sel] || [];

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────
           STRATEGY: make the outer container use
           100% of whatever height its parent gives,
           then stretch with a min-height fallback.
           The parent (main) must NOT have padding-bottom
           shrinking things — we handle that here.
        ───────────────────────────────────────── */

        /* Override dashboard main padding for this page only */
        .mc-page-reset {
          /* negative margins cancel the parent's padding */
          margin: -28px -24px;          /* undo main padding (28px top/bottom, 24px sides) */
          height: calc(100vh - 64px);   /* full viewport minus navbar */
          display: flex;
          flex-direction: column;
        }

        .mc-root {
          flex: 1;
          display: grid;
          grid-template-columns: 260px 1fr;
          overflow: hidden;
          border-top: 1px solid #EEF2F7;
          background: #fff;
        }

        /* ════ LEFT ════ */
        .mc-left {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #EEF2F7;
          overflow: hidden;
          background: #fff;
        }
        .mc-left-head {
          padding: 16px 14px 10px;
          border-bottom: 1px solid #EEF2F7;
          flex-shrink: 0;
          background: #fff;
        }
        .mc-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }
        .mc-list::-webkit-scrollbar { width: 3px; }
        .mc-list::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 99px; }

        .mc-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 10px; border-radius: 13px;
          cursor: pointer; transition: background 0.15s;
          margin-bottom: 3px;
          border-left: 3px solid transparent;
        }
        .mc-item.sel  { background: #1C2333; border-left-color: #F97316; }
        .mc-item:not(.sel):hover { background: #F8FAFC; }

        .mc-search {
          display: flex; align-items: center; gap: 8px;
          background: #F4F6FA; border: 1.5px solid #EEF2F7;
          border-radius: 10px; padding: 0 12px; height: 38px;
          transition: border-color 0.18s;
        }
        .mc-search:focus-within { border-color: #F97316; background: #fff; }
        .mc-search input {
          border: none; background: transparent; outline: none;
          font-size: 13px; font-weight: 500; color: #0F1C2E; width: 100%;
          font-family: 'DM Sans', sans-serif;
        }
        .mc-search input::placeholder { color: #9BAFBF; }

        /* ════ RIGHT ════ */
        .mc-right {
          display: flex; flex-direction: column;
          overflow: hidden;
          background: #FAFBFF;
        }
        .mc-rhead {
          padding: 10px 16px;
          border-bottom: 1px solid #EEF2F7;
          background: #fff;
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        .mc-body {
          flex: 1;
          overflow-y: auto;
          padding: 14px 16px 14px 29px;
          display: flex; flex-direction: column; gap: 13px;
        }
        .mc-body::-webkit-scrollbar { width: 3px; }
        .mc-body::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 99px; }
        .mc-footer {
          padding: 10px 16px;
          border-top: 1px solid #EEF2F7;
          background: #fff;
          display: flex; align-items: center; gap: 7px;
          flex-shrink: 0;
        }

        /* ── Shared button styles ── */
        .mc-icon-btn {
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid #EEF2F7; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #526070; transition: all 0.15s; flex-shrink: 0;
        }
        .mc-icon-btn:hover { background: #F4F6FA; color: #0F1C2E; }
        .mc-ghost-btn {
          width: 36px; height: 36px; border-radius: 9px;
          border: none; background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #9BAFBF; transition: color 0.15s; flex-shrink: 0;
        }
        .mc-ghost-btn:hover { color: #0F1C2E; }
        .mc-send-btn {
          width: 38px; height: 38px; border-radius: 10px;
          border: none; cursor: pointer; flex-shrink: 0;
          background: linear-gradient(135deg, #F97316, #FB923C); color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 10px #F9731638; transition: all 0.2s;
        }
        .mc-send-btn:hover  { transform: translateY(-1px); box-shadow: 0 6px 16px #F9731650; }
        .mc-send-btn:active { transform: scale(0.93); }

        /* ── Text input ── */
        .mc-text-input {
          flex: 1; height: 40px; padding: 0 14px;
          background: #F4F6FA; border: 1.5px solid #EEF2F7;
          border-radius: 10px; font-size: 13px; font-weight: 500;
          color: #0F1C2E; outline: none;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
        }
        .mc-text-input::placeholder { color: #9BAFBF; }
        .mc-text-input:focus { border-color: #F97316; background: #fff; box-shadow: 0 0 0 3px #F9731614; }

        /* ── Bubbles ── */
        .b-them {
          align-self: flex-start; max-width: 60%;
          padding: 10px 14px; font-size: 13px; line-height: 1.6; color: #0F1C2E;
          background: #fff; border: 1px solid #EEF2F7;
          border-radius: 15px 15px 15px 4px;
          box-shadow: 0 1px 4px rgba(15,28,46,0.06);
        }
        .b-me {
          align-self: flex-end; max-width: 60%;
          padding: 10px 14px; font-size: 13px; line-height: 1.6; color: #fff;
          background: linear-gradient(135deg, #F97316, #FB923C);
          border-radius: 15px 15px 4px 15px;
          box-shadow: 0 4px 12px #F9731628;
        }
        .b-time { font-size: 10px; opacity: 0.5; margin-top: 4px; }

        .unread-badge {
          min-width: 18px; height: 18px; border-radius: 99px;
          background: #F97316; color: #fff;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; padding: 0 4px;
        }

        @media (max-width: 700px) {
          .mc-page-reset { margin: -16px -16px; height: calc(100vh - 64px); }
          .mc-root { grid-template-columns: 1fr; }
          .mc-right { display: none; }
        }
      `}</style>

      {/* Negative-margin wrapper cancels parent padding → fills viewport */}
      <div className="mc-page-reset">
        <div className="mc-root">

          {/* ══ LEFT — conversations ══ */}
          <div className="mc-left">
            <div className="mc-left-head">
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px', fontFamily: 'DM Sans, sans-serif' }}>
                Messagerie
              </p>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#0F1C2E', letterSpacing: '-0.025em', marginBottom: '13px' }}>
                Discussions
              </h2>
              <div className="mc-search">
                <Search size={13} color="#9BAFBF" />
                <input placeholder="Rechercher..." />
              </div>
            </div>

            <div className="mc-list">
              {chats.map(chat => (
                <div key={chat.id} className={`mc-item ${sel === chat.id ? 'sel' : ''}`} onClick={() => setSel(chat.id)}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar name={chat.name} size={44} radius={12} />
                    {chat.online && (
                      <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '11px', height: '11px', borderRadius: '50%', background: '#22C55E', border: `2.5px solid ${sel === chat.id ? '#1C2333' : '#fff'}`, display: 'block' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: sel === chat.id ? '#fff' : '#0F1C2E', fontFamily: 'DM Sans, sans-serif' }}>
                        {chat.name}
                      </p>
                      <span style={{ fontSize: '10px', fontWeight: 500, color: sel === chat.id ? 'rgba(255,255,255,0.35)' : '#9BAFBF', flexShrink: 0, marginLeft: '6px' }}>
                        {chat.time}
                      </span>
                    </div>
                    <p style={{ fontSize: '11px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: sel === chat.id ? 'rgba(255,255,255,0.45)' : (chat.unread > 0 ? '#0F1C2E' : '#9BAFBF'), fontWeight: chat.unread > 0 && sel !== chat.id ? 600 : 400 }}>
                      {chat.last}
                    </p>
                  </div>
                  {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT — chat ══ */}
          <div className="mc-right">
            {/* header */}
            <div className="mc-rhead">
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Avatar name={active?.name} size={40} radius={11} />
                {active?.online && (
                  <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '11px', height: '11px', borderRadius: '50%', background: '#22C55E', border: '2.5px solid #fff', display: 'block' }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '14px', color: '#0F1C2E', fontFamily: 'DM Sans, sans-serif' }}>
                  {active?.name}
                </p>
                <p style={{ fontSize: '11px', color: '#22C55E', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                  En ligne · {active?.job}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                <button className="mc-icon-btn"><Phone size={14} /></button>
                <button className="mc-icon-btn"><MoreHorizontal size={14} /></button>
              </div>
            </div>

            {/* messages */}
            <div className="mc-body">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === 'me' ? 'b-me' : 'b-them'}>
                  {m.text}
                  <p className="b-time" style={{ textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time}</p>
                </div>
              ))}
            </div>

            {/* input */}
            <div className="mc-footer">
              <button className="mc-ghost-btn"><Paperclip size={15} /></button>
              <input
                className="mc-text-input"
                placeholder="Écrire un message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') setInput(''); }}
              />
              <button className="mc-ghost-btn"><Smile size={15} /></button>
              <button className="mc-send-btn" onClick={() => setInput('')}>
                <Send size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}