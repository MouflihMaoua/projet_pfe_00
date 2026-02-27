// src/pages/artisan/interventions/index.jsx
import { useState } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle, AlertCircle, Play, Pause, Eye, MessageCircle, Star, Navigation } from 'lucide-react';

export default function InterventionsPage() {
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');

  const interventions = [
    {
      id: 1,
      numero: "INT-2024-001",
      client: "Sophie Martin",
      service: "Plomberie",
      description: "Réparation fuite d'eau sous l'évier",
      adresse: "15 Rue Hassan II, Casablanca",
      telephone: "06 12 34 56 78",
      date: "2024-01-20",
      heureDebut: "14:00",
      heureFin: "16:30",
      duree: "2h30",
      statut: "en_cours",
      priorite: "normale",
      technicien: "Moi-même",
      prix: 1200,
      paiement: "en_attente",
      notes: "Client présent sur place",
      progression: 75,
      photosAvant: 2,
      photosApres: 0,
      signature: null
    },
    {
      id: 2,
      numero: "INT-2024-002",
      client: "Thomas Bernard",
      service: "Électricité",
      description: "Installation compteur électrique",
      adresse: "23 Avenue Mohammed V, Rabat",
      telephone: "06 98 76 54 32",
      date: "2024-01-19",
      heureDebut: "10:00",
      heureFin: "12:00",
      duree: "2h00",
      statut: "terminee",
      priorite: "basse",
      technicien: "Moi-même",
      prix: 2500,
      paiement: "payé",
      notes: "Installation réussie",
      progression: 100,
      photosAvant: 3,
      photosApres: 4,
      signature: "signed"
    },
    {
      id: 3,
      numero: "INT-2024-003",
      client: "Julie Dubois",
      service: "Chauffage",
      description: "Panne chaudière - diagnostic",
      adresse: "7 Boulevard Zerktouni, Marrakech",
      telephone: "06 45 67 89 01",
      date: "2024-01-21",
      heureDebut: "08:00",
      heureFin: "11:00",
      duree: "3h00",
      statut: "programmee",
      priorite: "haute",
      technicien: "Moi-même",
      prix: 800,
      paiement: "en_attente",
      notes: "Urgent - pas d'eau chaude",
      progression: 0,
      photosAvant: 0,
      photosApres: 0,
      signature: null
    }
  ];

  const filteredInterventions = interventions.filter(intervention => {
    const matchesSearch = intervention.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'tous' || intervention.statut === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'programmee': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-orange-100 text-orange-800';
      case 'terminee': return 'bg-green-100 text-green-800';
      case 'annulee': return 'bg-red-100 text-red-800';
      case 'pause': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioriteColor = (priorite) => {
    switch (priorite) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'normale': return 'bg-orange-100 text-orange-800';
      case 'basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaiementColor = (paiement) => {
    switch (paiement) {
      case 'payé': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'impayé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDemarrer = (id) => {
    console.log('Intervention démarrée:', id);
    // Démarrer l'intervention
  };

  const handlePause = (id) => {
    console.log('Intervention en pause:', id);
    // Mettre en pause
  };

  const handleTerminer = (id) => {
    console.log('Intervention terminée:', id);
    // Terminer l'intervention
  };

  const handleNavigation = (adresse) => {
    console.log('Navigation vers:', adresse);
    // Ouvrir Google Maps
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Interventions</h1>
        <p className="text-gray-600">Suivi de vos interventions en cours et passées</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une intervention..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="tous">Tous les statuts</option>
            <option value="programmee">Programmées</option>
            <option value="en_cours">En cours</option>
            <option value="terminee">Terminées</option>
            <option value="annulee">Annulées</option>
            <option value="pause">En pause</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </button>
        </div>
      </div>

      {/* Liste des interventions */}
      <div className="grid gap-4">
        {filteredInterventions.map((intervention) => (
          <div key={intervention.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{intervention.numero}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(intervention.statut)}`}>
                    {intervention.statut}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioriteColor(intervention.priorite)}`}>
                    Priorité: {intervention.priorite}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaiementColor(intervention.paiement)}`}>
                    {intervention.paiement}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{intervention.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{intervention.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{intervention.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{intervention.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{intervention.date} - {intervention.heureDebut} à {intervention.heureFin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Durée:</span>
                    <span>{intervention.duree}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-3">{intervention.description}</p>
                
                {intervention.statut === 'en_cours' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium">{intervention.progression}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${intervention.progression}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Prix: <strong>{intervention.prix} DH</strong></span>
                  <span>Photos avant: <strong>{intervention.photosAvant}</strong></span>
                  <span>Photos après: <strong>{intervention.photosApres}</strong></span>
                  {intervention.signature && (
                    <span className="text-green-600">✓ Signé</span>
                  )}
                </div>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedIntervention(intervention)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Détails
                </button>
                
                <button
                  onClick={() => handleNavigation(intervention.adresse)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  GPS
                </button>

                {intervention.statut === 'programmee' && (
                  <button
                    onClick={() => handleDemarrer(intervention.id)}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Démarrer
                  </button>
                )}
                
                {intervention.statut === 'en_cours' && (
                  <>
                    <button
                      onClick={() => handlePause(intervention.id)}
                      className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center justify-center gap-2"
                    >
                      <Pause className="h-4 w-4" />
                      Pause
                    </button>
                    <button
                      onClick={() => handleTerminer(intervention.id)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Terminer
                    </button>
                  </>
                )}

                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contacter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInterventions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune intervention trouvée</p>
        </div>
      )}

      {/* Modal Détails Intervention */}
      {selectedIntervention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedIntervention.numero}</h2>
              <button
                onClick={() => setSelectedIntervention(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XCircle className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations client</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{selectedIntervention.client}</strong></p>
                  <p>{selectedIntervention.adresse}</p>
                  <p>{selectedIntervention.telephone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations intervention</h3>
                <div className="space-y-2 text-sm">
                  <p>Service: <strong>{selectedIntervention.service}</strong></p>
                  <p>Date: <strong>{selectedIntervention.date}</strong></p>
                  <p>Heure: <strong>{selectedIntervention.heureDebut} - {selectedIntervention.heureFin}</strong></p>
                  <p>Durée: <strong>{selectedIntervention.duree}</strong></p>
                  <p>Technicien: <strong>{selectedIntervention.technicien}</strong></p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{selectedIntervention.description}</p>
              {selectedIntervention.notes && (
                <p className="text-sm text-gray-500 mt-2"><strong>Notes:</strong> {selectedIntervention.notes}</p>
              )}
            </div>

            {selectedIntervention.statut === 'en_cours' && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Progression</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Avancement</span>
                      <span className="font-medium">{selectedIntervention.progression}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${selectedIntervention.progression}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Photos</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Avant intervention ({selectedIntervention.photosAvant})</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(selectedIntervention.photosAvant)].map((_, i) => (
                      <div key={i} className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-400">
                        <Eye className="h-6 w-6" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Après intervention ({selectedIntervention.photosApres})</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(selectedIntervention.photosApres)].map((_, i) => (
                      <div key={i} className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-400">
                        <Eye className="h-6 w-6" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-lg font-bold text-gray-900">{selectedIntervention.prix} DH</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaiementColor(selectedIntervention.paiement)}`}>
                  {selectedIntervention.paiement}
                </span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Imprimer
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Envoyer rapport
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
