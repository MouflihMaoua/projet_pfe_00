import { useState } from "react";
import { Star } from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────
const ARTISAN = {
  id: 7, nom: "El Amrani", prenom: "Youssef",
  ville: "Casablanca", metier_principal: "Plomberie / Électricité",
  missions_total: 342, membre_depuis: "Mars 2022",
};

const AVIS = [
  { id:1, client:"Sara El Fassi",     note:5, service:"Plomberie",    date:"20 Fév 2026", commentaire:"Travail absolument impeccable ! Youssef a résolu ma fuite d'eau en 45 minutes chrono. Très professionnel, propre et honnête sur les tarifs. Je recommande les yeux fermés.", tags:["Travail soigné ✨","Ponctuel ⏰","Prix raisonnable 💰"], avatar:"S", color:"#f97316", reponse:null },
  { id:2, client:"Omar Kettani",       note:4, service:"Électricité",  date:"12 Fév 2026", commentaire:"Bon travail dans l'ensemble. Petit retard de 20 minutes mais il a prévenu. La qualité de l'installation est vraiment bonne, tout fonctionne parfaitement.", tags:["Travail soigné ✨","Conseille bien 💡"], avatar:"O", color:"#3b82f6", reponse:"Merci Omar ! Je m'excuse pour le retard, il y avait un embouteillage sur la route. Ravi que l'installation vous donne satisfaction." },
  { id:3, client:"Leila Benmoussa",    note:5, service:"Plomberie",    date:"5 Fév 2026",  commentaire:"Deuxième fois que je fais appel à Youssef. Toujours aussi sérieux et efficace. Il prend le temps d'expliquer ce qu'il fait, c'est très rassurant.", tags:["À recommander ✅","Propre 🧹","Conseille bien 💡"], avatar:"L", color:"#22c55e", reponse:null },
  { id:4, client:"Amine Tribak",       note:5, service:"Carrelage",    date:"28 Jan 2026", commentaire:"Excellent artisan. Le carrelage de ma salle de bain est parfait, les joints sont nets. Il a terminé le travail en 2 jours comme prévu. Très satisfait.", tags:["Travail soigné ✨","Ponctuel ⏰"], avatar:"A", color:"#a855f7", reponse:"Merci Amine, c'est un plaisir de travailler avec des clients aussi disponibles. N'hésitez pas pour vos futurs travaux !" },
  { id:5, client:"Rachida Oujdi",      note:3, service:"Peinture",     date:"15 Jan 2026", commentaire:"Service correct mais le rendu de la peinture n'était pas exactement la couleur demandée. Le travail est propre mais j'attendais mieux pour le prix.", tags:[], avatar:"R", color:"#eab308", reponse:"Bonjour Rachida, je suis désolé que la couleur ne corresponde pas tout à fait à vos attentes. Je reste disponible pour corriger cela gratuitement si vous le souhaitez." },
  { id:6, client:"Karim Bennani",      note:5, service:"Plomberie",    date:"8 Jan 2026",  commentaire:"Intervention urgente le dimanche matin, Youssef a répondu en 30 minutes et était là en 1 heure. Problème résolu rapidement. Vraiment top !", tags:["Disponible 24h 🌙","Rapide ⚡","À recommander ✅"], avatar:"K", color:"#f97316", reponse:null },
  { id:7, client:"Fatima Zahraoui",    note:4, service:"Électricité",  date:"2 Jan 2026",  commentaire:"Très bonne prestation. Youssef est compétent et explique bien. Je retire une étoile car le délai de réponse initial était un peu long.", tags:["Travail soigné ✨","Conseille bien 💡"], avatar:"F", color:"#ec4899", reponse:null },
  { id:8, client:"Hassan Moussaoui",   note:5, service:"Peinture",     date:"20 Déc 2025", commentaire:"Magnifique travail de peinture dans mon salon. Youssef a proposé des conseils de couleurs très pertinents. Résultat au-delà de mes espérances.", tags:["Travail soigné ✨","Conseille bien 💡","Prix raisonnable 💰"], avatar:"H", color:"#6366f1", reponse:"Merci Hassan ! Ce fut un plaisir de travailler sur ce projet. Votre salon est vraiment beau maintenant." },
];

const HISTORIQUE_SCORE = [
  { mois:"Sep", score:4.3, nb:3 },
  { mois:"Oct", score:4.5, nb:5 },
  { mois:"Nov", score:4.6, nb:4 },
  { mois:"Déc", score:4.7, nb:6 },
  { mois:"Jan", score:4.8, nb:7 },
  { mois:"Fév", score:4.8, nb:8 },
];

// ─── BADGE CONFIG ────────────────────────────────────────────────
function getBadge(score, total) {
  if (score >= 4.8 && total >= 50) return { label:"Élite ⚡", color:"#d4a853", bg:"rgba(212,168,83,.12)", border:"rgba(212,168,83,.35)", desc:"Top 5% des artisans" };
  if (score >= 4.5 && total >= 20) return { label:"Expert 🏆", color:"#a855f7", bg:"rgba(168,85,247,.12)", border:"rgba(168,85,247,.35)", desc:"Artisan hautement qualifié" };
  if (score >= 4.0 && total >= 10) return { label:"Fiable ✓",  color:"#22c55e", bg:"rgba(34,197,94,.12)",  border:"rgba(34,197,94,.35)",  desc:"Artisan de confiance" };
  return                                 { label:"Nouveau 🌱", color:"#3b82f6", bg:"rgba(59,130,246,.12)", border:"rgba(59,130,246,.35)", desc:"Artisan en progression" };
}

// ─── HELPERS ─────────────────────────────────────────────────────
const avg = (arr) => arr.length ? (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1) : "0.0";
const pct = (val, total) => total ? Math.round((val/total)*100) : 0;

function Stars({ note, size=14 }) {
  return (
    <span className="inline-flex gap-1">
      {[1,2,3,4,5].map(i=>(
        <span key={i}
          className="cursor-default transition-all duration-200 inline-block"
          style={{
            fontSize: size,
            color: note>=i ? "#f59e0b" : "#e5e7eb",
          }}
        >★</span>
      ))}
    </span>
  );
}

function Badge({ score, total }) {
  const b = getBadge(score, total);
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" 
         style={{ background: b.bg, borderColor: b.border }}>
      <span className="text-lg">
        {score>=4.8&&total>=50?"⚡":score>=4.5&&total>=20?"🏆":score>=4.0&&total>=10?"✓":"🌱"}
      </span>
      <div>
        <div className="text-sm font-bold" style={{ color: b.color }}>{b.label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{b.desc}</div>
      </div>
    </div>
  );
}

// ─── SCORE RING ───────────────────────────────────────────────────
function ScoreRing({ score }) {
  const pct = ((score-1)/4)*100;
  const r=52, circ=2*Math.PI*r;
  const dashOffset = circ - (pct/100)*circ;
  const color = score>=4.5?"#f59e0b":score>=4?"#22c55e":score>=3?"#3b82f6":"#ef4444";
  return (
    <div className="relative w-32 h-32 flex-shrink-0">
      <svg width="130" height="130" className="transform -rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#374151" strokeWidth="8"/>
        <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{filter:`drop-shadow(0 0 8px ${color}80)`}}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-black tracking-tighter font-mono" 
             style={{ color, animation: "countUp 0.5s ease" }}>
          {score}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">/ 5.0</div>
      </div>
    </div>
  );
}

// ─── MINI BAR CHART (score évolution) ────────────────────────────
function ScoreChart({ data }) {
  const max = Math.max(...data.map(d=>d.score));
  const min = Math.min(...data.map(d=>d.score));
  return (
    <div className="flex items-end gap-1.5 h-16 px-1">
      {data.map((d,i)=>{
        const h = ((d.score-min)/(max-min+0.1))*60+10;
        const isLast = i===data.length-1;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="text-xs font-mono font-medium" 
                 style={{ color: isLast ? "#f59e0b" : "#9ca3af" }}>
              {d.score}
            </div>
            <div className="w-full rounded-t-sm transition-all duration-800"
                 style={{
                   height: h,
                   background: isLast ? "linear-gradient(180deg, #f59e0b, #f97316)" : "#374151",
                   border: `1px solid ${isLast ? "#f59e0b33" : "#4b5563"}`,
                   boxShadow: isLast ? "0 0 14px rgba(245,158,11,.3)" : "none",
                 }}/>
            <div className="text-xs text-gray-400 font-mono">{d.mois}</div>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
export default function ReputationArtisanPublic() {
  const [filterNote, setFilterNote] = useState(0);
  const [filterService, setFilterService] = useState("Tous");

  const score = parseFloat(avg(AVIS.map(a=>a.note)));
  const badge = getBadge(score, AVIS.length);
  const services = ["Tous", ...new Set(AVIS.map(a=>a.service))];

  const filtered = AVIS.filter(a => {
    if (filterNote > 0 && a.note !== filterNote) return false;
    if (filterService !== "Tous" && a.service !== filterService) return false;
    return true;
  });

  const ratingBreakdown = [5,4,3,2,1].map(n=>({
    n, count:AVIS.filter(a=>a.note===n).length,
    pct: pct(AVIS.filter(a=>a.note===n).length, AVIS.length),
  }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-lg shadow-lg shadow-brand-orange/20">
              🔨
            </div>
            <div>
              <div className="text-sm font-bold">ArtisanPro</div>
              <div className="text-xs text-gray-500 font-mono">Réputation de l'artisan</div>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Vue publique • Informations vérifiées
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ════════════════════════════════════
            HERO SCORE SECTION
        ════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          {/* Gradient header */}
          <div className="p-7 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br from-brand-orange/5 to-transparent"/>

            <div className="flex items-center gap-6 flex-wrap">

              {/* Score ring */}
              <ScoreRing score={score} />

              {/* Info */}
              <div className="flex-1 min-w-48">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <h2 className="text-xl font-black tracking-tight">
                    {ARTISAN.prenom} {ARTISAN.nom}
                  </h2>
                  <Badge score={score} total={AVIS.length}/>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Stars note={Math.round(score)} size={18}/>
                  <span className="text-sm text-gray-600 ml-1">
                    <strong className="text-gray-900">{AVIS.length}</strong> avis clients
                  </span>
                </div>

                <div className="flex gap-4 flex-wrap text-xs text-gray-600">
                  <span>📍 {ARTISAN.ville}</span>
                  <span>🔧 {ARTISAN.metier_principal}</span>
                  <span>🗓 Membre depuis {ARTISAN.membre_depuis}</span>
                  <span>📊 {ARTISAN.missions_total} missions réalisées</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-0 border-l border-gray-200 pl-5">
                {[
                  {val:pct(AVIS.filter(a=>a.note>=4).length, AVIS.length)+"%", label:"Satisfaction", color:"text-green-600"},
                  {val:AVIS.filter(a=>a.reponse).length+"/"+AVIS.length, label:"Réponses", color:"text-blue-600"},
                ].map((s,i)=>(
                  <div key={s.label} className={`
                    px-4 text-center ${i<1 ? "border-r border-gray-200" : ""}
                  `}>
                    <div className={`text-2xl font-black font-mono ${s.color} tracking-tight`}>{s.val}</div>
                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="p-6">
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono font-semibold mb-3">
              Répartition des notes
            </div>
            {ratingBreakdown.map(r=>(
              <div key={r.n} className={`
                flex items-center gap-3 mb-2 cursor-pointer transition-opacity
                ${filterNote===0||filterNote===r.n ? "opacity-100" : "opacity-40"}
              `} onClick={()=>setFilterNote(filterNote===r.n?0:r.n)}>
                <span className="text-sm text-amber-500 w-6 flex-shrink-0 font-mono font-semibold">
                  {r.n}★
                </span>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-800" 
                       style={{width:r.pct+"%"}}/>
                </div>
                <span className="text-xs font-mono text-gray-500 w-7 text-right">
                  {r.count}
                </span>
                <span className="text-xs text-gray-400 w-8 text-right font-mono">
                  {r.pct}%
                </span>
              </div>
            ))}
            {filterNote>0&&(
              <button onClick={()=>setFilterNote(0)} className="
                mt-2 text-xs text-brand-orange font-semibold bg-transparent border-none cursor-pointer
              ">
                ✕ Réinitialiser filtre
              </button>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════
            FILTRES + AVIS LIST
        ════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

          {/* Filtres bar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">
                Avis clients vérifiés
              </span>
              <span className="text-xs font-mono font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/25 px-2 py-1 rounded-full">
                {filtered.length}
              </span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Filtre par service */}
              {services.map(s=>(
                <button key={s} onClick={()=>setFilterService(s)} className={`
                  px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200
                  ${filterService===s 
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 border border-brand-orange" 
                    : "bg-gray-100 text-gray-600 hover:text-gray-800"
                  }
                `}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Avis */}
          <div>
            {filtered.length===0&&(
              <div className="text-center py-10 text-gray-400">
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-sm">Aucun avis pour ces filtres</div>
              </div>
            )}
            {filtered.map((avis,i)=>(
              <div key={avis.id} className={`
                border-b transition-colors duration-200 hover:bg-gray-50
                ${i<filtered.length-1 ? "border-gray-100" : "border-none"}
              `}>
                <div className="p-5">

                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`
                      w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-base border
                      ${avis.color+"18"} ${avis.color} ${avis.color+"30"}
                    `}>
                      {avis.avatar}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-sm">{avis.client}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200 font-mono">
                          {avis.service}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          {avis.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Stars note={avis.note} size={14}/>
                        <span className={`
                          text-xs font-bold font-mono
                          ${avis.note>=4 ? "text-amber-500" : avis.note===3 ? "text-blue-500" : "text-red-500"}
                        `}>
                          {avis.note}/5
                        </span>
                      </div>
                    </div>

                    {/* Note badge grande */}
                    <div className={`
                      w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center text-lg font-black font-mono border
                      ${avis.note>=4 ? "bg-amber-50 text-amber-500 border-amber-200" : 
                        avis.note===3 ? "bg-blue-50 text-blue-500 border-blue-200" : 
                        "bg-red-50 text-red-500 border-red-200"}
                    `}>
                      {avis.note}
                    </div>
                  </div>

                  {/* Commentaire */}
                  <div className="text-sm text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-4 ml-12 italic">
                    "{avis.commentaire}"
                  </div>

                  {/* Tags */}
                  {avis.tags.length>0&&(
                    <div className="flex gap-2 flex-wrap ml-12 mt-2">
                      {avis.tags.map(tag=>(
                        <span key={tag} className="text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Réponse artisan existante */}
                  {avis.reponse&&(
                    <div className="ml-12 mt-3 p-3 bg-brand-orange/10 border border-brand-orange/20 rounded-lg border-l-3 border-l-brand-orange">
                      <div className="text-xs font-bold text-brand-orange mb-1.5 flex items-center gap-1.5">
                        <span>👷</span> Réponse de {ARTISAN.prenom} {ARTISAN.nom}
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {avis.reponse}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
