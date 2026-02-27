// src/pages/artisan/devis/index.jsx
import { useState } from 'react';
import { Search, Filter, FileText, Download, Send, Calendar, User, Mail, Phone, MapPin, CheckCircle, Clock, AlertCircle, Edit, Trash2, Eye } from 'lucide-react';

export default function DevisPage() {
  const [selectedDevis, setSelectedDevis] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');

  const devis = [
    {
      id: 1,
      numero: "DEV-2024-001",
      client: "Sophie Martin",
      service: "Plomberie",
      description: "Réparation fuite d'eau cuisine",
      adresse: "15 Rue Hassan II, Casablanca",
      telephone: "06 12 34 56 78",
      email: "sophie.martin@email.com",
      dateCreation: "2024-01-18",
      dateValidite: "2024-01-25",
      montantHT: 1200,
      montantTTC: 1440,
      statut: "envoyé",
      tva: 20,
      delai: "2 jours",
      notes: "Matériaux inclus",
      articles: [
        { description: "Main d'œuvre réparation", quantite: 2, prixUnitaire: 300, total: 600 },
        { description: "Pièces détachées", quantite: 1, prixUnitaire: 600, total: 600 }
      ]
    },
    {
      id: 2,
      numero: "DEV-2024-002",
      client: "Thomas Bernard",
      service: "Électricité",
      description: "Installation compteur électrique",
      adresse: "23 Avenue Mohammed V, Rabat",
      telephone: "06 98 76 54 32",
      email: "thomas.bernard@email.com",
      dateCreation: "2024-01-19",
      dateValidite: "2024-01-26",
      montantHT: 2000,
      montantTTC: 2400,
      statut: "accepté",
      tva: 20,
      delai: "1 jour",
      notes: "Garantie 2 ans",
      articles: [
        { description: "Compteur électrique", quantite: 1, prixUnitaire: 1500, total: 1500 },
        { description: "Installation", quantite: 1, prixUnitaire: 500, total: 500 }
      ]
    },
    {
      id: 3,
      numero: "DEV-2024-003",
      client: "Julie Dubois",
      service: "Chauffage",
      description: "Réparation chaudière",
      adresse: "7 Boulevard Zerktouni, Marrakech",
      telephone: "06 45 67 89 01",
      email: "julie.dubois@email.com",
      dateCreation: "2024-01-20",
      dateValidite: "2024-01-27",
      montantHT: 800,
      montantTTC: 960,
      statut: "brouillon",
      tva: 20,
      delai: "3 heures",
      notes: "Diagnostic inclus",
      articles: [
        { description: "Diagnostic chaudière", quantite: 1, prixUnitaire: 300, total: 300 },
        { description: "Pièces de rechange", quantite: 1, prixUnitaire: 500, total: 500 }
      ]
    }
  ];

  const filteredDevis = devis.filter(devis => {
    const matchesSearch = devis.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         devis.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         devis.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'tous' || devis.statut === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'brouillon': return 'bg-gray-100 text-gray-800';
      case 'envoyé': return 'bg-blue-100 text-blue-800';
      case 'accepté': return 'bg-green-100 text-green-800';
      case 'refusé': return 'bg-red-100 text-red-800';
      case 'expiré': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEnvoyer = (id) => {
    console.log('Devis envoyé:', id);
    // Envoyer le devis par email
  };

  const handleAccepter = (id) => {
    console.log('Devis accepté:', id);
    // Marquer comme accepté
  };

  const handleSupprimer = (id) => {
    console.log('Devis supprimé:', id);
    // Supprimer le devis
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Devis</h1>
          <p className="text-gray-600">Gérez vos devis et estimations</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Nouveau devis
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un devis..."
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
            <option value="brouillon">Brouillons</option>
            <option value="envoyé">Envoyés</option>
            <option value="accepté">Acceptés</option>
            <option value="refusé">Refusés</option>
            <option value="expiré">Expirés</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </button>
        </div>
      </div>

      {/* Liste des devis */}
      <div className="grid gap-4">
        {filteredDevis.map((devis) => (
          <div key={devis.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{devis.numero}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(devis.statut)}`}>
                    {devis.statut}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{devis.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{devis.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{devis.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{devis.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Créé: {devis.dateCreation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Valide jusqu'au: {devis.dateValidite}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-3">{devis.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Montant HT: <strong>{devis.montantHT} DH</strong></span>
                  <span>TVA: <strong>{devis.tva}%</strong></span>
                  <span>Montant TTC: <strong className="text-green-600">{devis.montantTTC} DH</strong></span>
                  <span>Délai: <strong>{devis.delai}</strong></span>
                </div>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedDevis(devis)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Voir
                </button>
                
                {devis.statut === 'brouillon' && (
                  <>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <Edit className="h-4 w-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleEnvoyer(devis.id)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Envoyer
                    </button>
                  </>
                )}
                
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDevis.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun devis trouvé</p>
        </div>
      )}

      {/* Modal Détails Devis */}
      {selectedDevis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedDevis.numero}</h2>
              <button
                onClick={() => setSelectedDevis(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XCircle className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations client</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{selectedDevis.client}</strong></p>
                  <p>{selectedDevis.adresse}</p>
                  <p>{selectedDevis.telephone}</p>
                  <p>{selectedDevis.email}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informations devis</h3>
                <div className="space-y-2 text-sm">
                  <p>Service: <strong>{selectedDevis.service}</strong></p>
                  <p>Date création: <strong>{selectedDevis.dateCreation}</strong></p>
                  <p>Date validité: <strong>{selectedDevis.dateValidite}</strong></p>
                  <p>Délai: <strong>{selectedDevis.delai}</strong></p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{selectedDevis.description}</p>
              {selectedDevis.notes && (
                <p className="text-sm text-gray-500 mt-2"><strong>Notes:</strong> {selectedDevis.notes}</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Détail des articles</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Description</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-900">Quantité</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Prix unitaire</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDevis.articles.map((article, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-sm">{article.description}</td>
                        <td className="px-4 py-2 text-sm text-center">{article.quantite}</td>
                        <td className="px-4 py-2 text-sm text-right">{article.prixUnitaire} DH</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">{article.total} DH</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-sm font-medium text-gray-900">Total HT:</td>
                      <td className="px-4 py-2 text-sm font-medium text-right">{selectedDevis.montantHT} DH</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-sm font-medium text-gray-900">TVA ({selectedDevis.tva}%):</td>
                      <td className="px-4 py-2 text-sm font-medium text-right">{selectedDevis.montantTTC - selectedDevis.montantHT} DH</td>
                    </tr>
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan="3" className="px-4 py-2 text-sm font-bold text-gray-900">Total TTC:</td>
                      <td className="px-4 py-2 text-sm font-bold text-right text-green-600">{selectedDevis.montantTTC} DH</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Télécharger PDF
              </button>
              {selectedDevis.statut === 'brouillon' && (
                <button
                  onClick={() => handleEnvoyer(selectedDevis.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Envoyer au client
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
