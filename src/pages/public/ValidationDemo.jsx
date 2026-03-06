import React from 'react';
import { Link } from 'react-router-dom';
import ValidationForm from '../../components/common/ValidationForm';

/**
 * Page de démonstration du système de validation
 */
const ValidationDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Retour à l'accueil
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Système de Validation React
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Démonstration d'un système de validation complet utilisant uniquement React et useState, 
            sans aucune librairie externe.
          </p>
        </div>

        {/* Caractéristiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">✅ Validation en temps réel</h3>
            <p className="text-gray-600 text-sm">
              Les champs sont validés lors de la saisie avec un feedback visuel immédiat
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">🚫 Blocage de la soumission</h3>
            <p className="text-gray-600 text-sm">
              Le formulaire ne peut être soumis que si toutes les validations sont passées
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">📝 Messages d'erreur clairs</h3>
            <p className="text-gray-600 text-sm">
              Des messages d'erreur spécifiques et utiles sous chaque champ
            </p>
          </div>
        </div>

        {/* Formulaire de démonstration */}
        <div className="max-w-2xl mx-auto">
          <ValidationForm />
        </div>

        {/* Documentation */}
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation du système</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔧 Fonctionnalités principales</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Validation des champs en temps réel avec useState</li>
                <li>Vérification au moment du submit</li>
                <li>Affichage dynamique des erreurs</li>
                <li>Blocage de l'envoi si des erreurs existent</li>
                <li>Feedback visuel (couleurs des champs)</li>
                <li>Messages de succès</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📋 Types de validation implémentés</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>Nom/Prénom :</strong> Lettres uniquement, minimum 2 caractères</li>
                <li><strong>Email :</strong> Format email valide</li>
                <li><strong>Téléphone :</strong> Format français ou marocain</li>
                <li><strong>Âge :</strong> Numérique, entre 18 et 120 ans</li>
                <li><strong>Mot de passe :</strong> 8+ caractères, majuscule, minuscule, chiffre, caractère spécial</li>
                <li><strong>Confirmation :</strong> Doit correspondre au mot de passe</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🎯 États gérés par useState</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><code>formData</code> : Valeurs du formulaire</li>
                <li><code>errors</code> : Erreurs de validation</li>
                <li><code>isSubmitting</code> : État de soumission</li>
                <li><code>submitSuccess</code> : Succès de la soumission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationDemo;
