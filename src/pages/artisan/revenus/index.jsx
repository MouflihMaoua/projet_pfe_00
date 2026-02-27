// src/pages/artisan/revenus/index.jsx
import { useState } from 'react';
import { Search, Filter, Download, TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3, PieChart, FileText, Eye } from 'lucide-react';

export default function RevenusPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('mois');
  const [searchTerm, setSearchTerm] = useState('');

  // Données fictives pour les statistiques
  const stats = {
    totalRevenus: 45600,
    revenusMois: 12400,
    revenusAnnee: 156000,
    croissance: 12.5,
    interventions: 23,
    panierMoyen: 539
  };

  // Données pour les graphiques
  const revenusMensuels = [
    { mois: 'Jan', montant: 8500 },
    { mois: 'Fév', montant: 9200 },
    { mois: 'Mar', montant: 10800 },
    { mois: 'Avr', montant: 12400 },
    { mois: 'Mai', montant: 11600 },
    { mois: 'Jun', montant: 13200 }
  ];

  const revenusParService = [
    { service: 'Plomberie', montant: 18500, pourcentage: 40 },
    { service: 'Électricité', montant: 14200, pourcentage: 31 },
    { service: 'Chauffage', montant: 8900, pourcentage: 20 },
    { service: 'Autres', montant: 4000, pourcentage: 9 }
  ];

  const transactions = [
    {
      id: 1,
      numero: "INT-2024-001",
      client: "Sophie Martin",
      service: "Plomberie",
      montant: 1200,
      date: "2024-01-20",
      statut: "payé",
      methode: "Carte bancaire",
      commission: 60
    },
    {
      id: 2,
      numero: "INT-2024-002",
      client: "Thomas Bernard",
      service: "Électricité",
      montant: 2500,
      date: "2024-01-19",
      statut: "payé",
      methode: "Espèces",
      commission: 0
    },
    {
      id: 3,
      numero: "INT-2024-003",
      client: "Julie Dubois",
      service: "Chauffage",
      montant: 800,
      date: "2024-01-18",
      statut: "en_attente",
      methode: "Virement",
      commission: 40
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.numero.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'payé': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'impayé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenus</h1>
          <p className="text-gray-600">Analysez vos revenus et performances financières</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="semaine">Cette semaine</option>
            <option value="mois">Ce mois</option>
            <option value="trimestre">Ce trimestre</option>
            <option value="annee">Cette année</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${stats.croissance > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.croissance > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(stats.croissance)}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalRevenus.toLocaleString()} DH</h3>
          <p className="text-gray-600 text-sm">Total des revenus</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.revenusMois.toLocaleString()} DH</h3>
          <p className="text-gray-600 text-sm">Ce mois-ci</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-orange-600 text-sm">+15.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.interventions}</h3>
          <p className="text-gray-600 text-sm">Interventions</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-purple-600 text-sm">+5.7%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.panierMoyen} DH</h3>
          <p className="text-gray-600 text-sm">Panier moyen</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Graphique des revenus mensuels */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus mensuels</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {revenusMensuels.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-600 rounded-t-lg relative group cursor-pointer hover:bg-blue-700 transition-colors"
                     style={{ height: `${(data.montant / Math.max(...revenusMensuels.map(d => d.montant))) * 100}%` }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.montant.toLocaleString()} DH
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.mois}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Graphique des revenus par service */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus par service</h3>
          <div className="space-y-3">
            {revenusParService.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ 
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index] 
                  }}></div>
                  <span className="text-sm text-gray-700">{data.service}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${data.pourcentage}%`,
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index] 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    {data.montant.toLocaleString()} DH
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Transactions récentes</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Numéro</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Montant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Commission</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Méthode</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.numero}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.client}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.service}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{transaction.montant} DH</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.commission} DH</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.methode}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.statut)}`}>
                      {transaction.statut}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune transaction trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
