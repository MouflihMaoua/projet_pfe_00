import { useState } from "react";
import { Star, MapPin, Phone, Mail, Briefcase, Calendar, Award, MessageSquare } from 'lucide-react';
import { useParams } from 'react-router-dom';

// ─── DATA SIMULÉE (à remplacer par API) ─────────────────────────────────
const MOCK_ARTISANS = {
  7: {
    id: 7,
    nom: "El Amrani",
    prenom: "Youssef",
    email: "youssef.elamrani@example.com",
    telephone: "06 12 34 56 78",
    ville: "Casablanca",
    metier_principal: "Plomberie / Électricité",
    bio: "Artisan plombier-électricien avec 8 ans d'expérience. Spécialiste en installation, dépannage et rénovation. Disponible 24/7 pour les urgences.",
    missions_total: 342,
    membre_depuis: "Mars 2022",
    tarif_horaire: 350,
    zone_intervention: ["Casablanca Centre", "Ain Sebaa", "Sidi Maârouf", "Maârif"],
    certifications: ["CAP Plomberie", "Certification Électrique", "Permis d'intervention"],
    disponibilites: {
      lundi: "08:00-18:00",
      mardi: "08:00-18:00", 
      mercredi: "08:00-18:00",
      jeudi: "08:00-18:00",
      vendredi: "08:00-18:00",
      samedi: "09:00-14:00",
      dimanche: "Fermé"
    }
  }
};

const MOCK_AVIS_PUBLICS = {
  7: [
    { id:1, client:"Sara El Fassi", note:5, service:"Plomberie", date:"20 Fév 2026", commentaire:"Travail absolument impeccable ! Youssef a résolu ma fuite d'eau en 45 minutes chrono. Très professionnel, propre et honnête sur les tarifs.", avatar:"S", color:"#f97316", reponse:"Merci Sara ! C'est toujours un plaisir de travailler avec des clients comme vous." },
    { id:2, client:"Omar Kettani", note:4, service:"Électricité", date:"12 Fév 2026", commentaire:"Bon travail dans l'ensemble. Petit retard de 20 minutes mais il a prévenu. La qualité de l'installation est vraiment bonne.", avatar:"O", color:"#3b82f6", reponse:"Merci Omar pour votre compréhension. Je ferai attention la prochaine fois !" },
    { id:3, client:"Leila Benmoussa", note:5, service:"Plomberie", date:"5 Fév 2026", commentaire:"Deuxième fois que je fais appel à Youssef. Toujours aussi sérieux et efficace. Il prend le temps d'expliquer ce qu'il fait.", avatar:"L", color:"#22c55e", reponse:null }
  ]
};

// ─── COMPOSANTS UTILITAIRES ───────────────────────────────────────────
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
  if (score >= 4.8 && total >= 50) return { label:"Élite ⚡", color:"#d4a853" };
  if (score >= 4.5 && total >= 20) return { label:"Expert 🏆", color:"#a855f7" };
  if (score >= 4.0 && total >= 10) return { label:"Fiable ✓", color:"#22c55e" };
  return { label:"Nouveau 🌱", color:"#3b82f6" };
}

// ════════════════════════════════════════════════════════════════
export default function ProfilArtisanPublic() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('profil');
  
  const artisanId = parseInt(id);
  const artisan = MOCK_ARTISANS[artisanId];
  const avis = MOCK_AVIS_PUBLICS[artisanId] || [];
  
  const score = avis.length > 0 ? (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(1) : "0.0";
  const badge = Badge(score, avis.length);

  if (!artisan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Artisan non trouvé</h2>
          <p className="text-gray-600">Cet artisan n'existe pas ou n'est plus disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-lg shadow-lg shadow-brand-orange/20">
              🔨
            </div>
            <div>
              <div className="text-sm font-bold">Profil Artisan</div>
              <div className="text-xs text-gray-500 font-mono">Informations publiques</div>
            </div>
          </div>
          <div className="text-xs text-green-600 font-semibold bg-green-50 border border-green-200 px-3 py-1 rounded-full">
            Artisan vérifié
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
          <div className="p-8 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-start gap-6 flex-wrap">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {artisan.prenom[0]}{artisan.nom[0]}
              </div>

              {/* Infos principales */}
              <div className="flex-1 min-w-64">
                <h1 className="text-2xl font-black text-gray-900 mb-2">
                  {artisan.prenom} {artisan.nom}
                </h1>
                
                <div className="flex items-center gap-3 mb-3">
                  <Stars note={parseFloat(score)} size={16}/>
                  <span className="text-sm text-gray-600">
                    <strong>{avis.length}</strong> avis • Score <strong>{score}/5</strong>
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ color: badge.color, background: badge.color + '20' }}>
                    {badge.label}
                  </span>
                </div>
                
                <div className="flex gap-4 text-sm text-gray-600 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {artisan.ville}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} /> {artisan.metier_principal}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> Membre depuis {artisan.membre_depuis}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={14} /> {artisan.missions_total} missions
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-semibold hover:bg-brand-orange/90 transition-colors">
                  Contacter l'artisan
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Ajouter aux favoris
                </button>
              </div>
            </div>
          </div>

          {/* Navigation par onglets */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'profil', label: 'Profil', icon: Briefcase },
              { id: 'avis', label: 'Avis clients', icon: Star },
              { id: 'disponibilites', label: 'Disponibilités', icon: Calendar },
              { id: 'contact', label: 'Contact', icon: MessageSquare }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors
                  ${activeTab === tab.id 
                    ? 'text-brand-orange border-b-2 border-brand-orange bg-brand-orange/5' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Onglet Profil */}
          {activeTab === 'profil' && (
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Profil professionnel</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Présentation</label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 leading-relaxed">{artisan.bio}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-900">{artisan.ville}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Métier principal</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Briefcase size={16} className="text-gray-400" />
                    <span className="text-gray-900">{artisan.metier_principal}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone d'intervention</label>
                <div className="flex flex-wrap gap-2">
                  {artisan.zone_intervention.map((zone, index) => (
                    <span key={index} className="px-3 py-1 bg-brand-orange/10 text-brand-orange border border-brand-orange/20 rounded-full text-sm">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artisan.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Award size={20} className="text-brand-orange" />
                      <span className="font-medium text-gray-900">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Onglet Avis */}
          {activeTab === 'avis' && (
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Avis clients vérifiés</h3>
              
              {avis.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-3">⭐</div>
                  <p className="text-sm">Cet artisan n'a pas encore reçu d'avis</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {avis.map((avisItem) => (
                    <div key={avisItem.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border
                          ${avisItem.color + "18"} ${avisItem.color} ${avisItem.color + "30"}
                        `}>
                          {avisItem.avatar}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{avisItem.client}</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {avisItem.service}
                            </span>
                            <span className="text-xs text-gray-400">
                              {avisItem.date}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Stars note={avisItem.note} size={14}/>
                            <span className="text-xs font-bold" style={{ 
                              color: avisItem.note >= 4 ? "#f59e0b" : avisItem.note === 3 ? "#3b82f6" : "#ef4444"
                            }}>
                              {avisItem.note}/5
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 italic mb-3">"{avisItem.commentaire}"</p>

                          {/* Réponse de l'artisan */}
                          {avisItem.reponse && (
                            <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 rounded-lg border-l-3 border-l-brand-orange">
                              <div className="text-xs font-bold text-brand-orange mb-1.5 flex items-center gap-1.5">
                                <span>👷</span> Réponse de {artisan.prenom} {artisan.nom}
                              </div>
                              <div className="text-sm text-gray-600 leading-relaxed">
                                {avisItem.reponse}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Onglet Disponibilités */}
          {activeTab === 'disponibilites' && (
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Disponibilités</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(artisan.disponibilites).map(([jour, heures]) => (
                  <div key={jour} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900 capitalize">{jour}</span>
                    <span className="text-sm text-gray-600">{heures}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Contact */}
          {activeTab === 'contact' && (
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contacter l'artisan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-900">{artisan.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-900">{artisan.telephone}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarif indicatif</label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-lg font-bold text-brand-orange">{artisan.tarif_horaire} MAD/h</span>
                  <span className="text-sm text-gray-600 ml-2">(tarif horaire indicatif)</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-brand-orange text-white rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors">
                  Envoyer un message
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Demander un devis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
