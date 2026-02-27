// src/pages/artisan/settings/index.jsx
import { useState } from 'react';
import { 
  Bell, Lock, Globe, Moon, Sun, CreditCard,
  Shield, Users, Mail, Smartphone, Save
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: {
      nouvellesDemandes: true,
      rappelsRendezVous: true,
      messages: true,
      promotions: false
    },
    push: {
      nouvellesDemandes: true,
      rappelsRendezVous: true,
      messages: true
    },
    sms: {
      rappelsRendezVous: true,
      urgent: true
    }
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'securite', label: 'Sécurité', icon: Lock },
    { id: 'paiement', label: 'Paiement', icon: CreditCard },
    { id: 'confidentialite', label: 'Confidentialité', icon: Shield }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et configurations</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Onglet Général */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences générales</h3>
              
              {/* Langue */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Langue</p>
                  <p className="text-sm text-gray-500">Choisissez votre langue préférée</p>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>Français</option>
                  <option>Anglais</option>
                  <option>Arabe</option>
                </select>
              </div>

              {/* Fuseau horaire */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Fuseau horaire</p>
                  <p className="text-sm text-gray-500">Paris (GMT+1)</p>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>Paris (GMT+1)</option>
                  <option>Londres (GMT)</option>
                  <option>New York (GMT-5)</option>
                </select>
              </div>

              {/* Mode sombre */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Mode sombre</p>
                  <p className="text-sm text-gray-500">Activer le thème sombre</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Format de date */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Format de date</p>
                  <p className="text-sm text-gray-500">JJ/MM/AAAA</p>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>JJ/MM/AAAA</option>
                  <option>MM/JJ/AAAA</option>
                  <option>AAAA-MM-JJ</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications Email</h3>
              <div className="space-y-3">
                {Object.entries(notifications.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setNotifications({
                        ...notifications,
                        email: { ...notifications.email, [key]: !value }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications Push</h3>
              <div className="space-y-3">
                {Object.entries(notifications.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setNotifications({
                        ...notifications,
                        push: { ...notifications.push, [key]: !value }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications SMS</h3>
              <div className="space-y-3">
                {Object.entries(notifications.sms).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setNotifications({
                        ...notifications,
                        sms: { ...notifications.sms, [key]: !value }
                      })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Onglet Sécurité */}
        {activeTab === 'securite' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Mot de passe</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Changer le mot de passe
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Authentification à deux facteurs</h3>
              <p className="text-sm text-gray-600 mb-3">
                Renforcez la sécurité de votre compte avec l'authentification à deux facteurs
              </p>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Activer la 2FA
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sessions actives</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Chrome sur Windows</p>
                    <p className="text-sm text-gray-500">Paris, France • Dernière activité il y a 5 min</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Actuelle
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Safari sur iPhone</p>
                    <p className="text-sm text-gray-500">Paris, France • Dernière activité il y a 2h</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm">
                    Déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton de sauvegarde global */}
        <div className="pt-6 mt-6 border-t border-gray-200 flex justify-end">
          <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Save className="h-4 w-4" />
            <span>Enregistrer les modifications</span>
          </button>
        </div>
      </div>
    </div>
  );
}