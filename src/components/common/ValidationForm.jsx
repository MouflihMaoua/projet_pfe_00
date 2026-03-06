import React, { useState } from 'react';

/**
 * Système de validation React pur sans librairie externe
 * Utilise useState pour gérer les erreurs et la validation
 */

const ValidationForm = () => {
  // États pour gérer les valeurs du formulaire et les erreurs
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    age: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fonctions de validation pour chaque champ
  const validateField = (name, value) => {
    const error = {};

    switch (name) {
      case 'nom':
        if (!value || value.trim().length < 2) {
          error.nom = 'Le nom doit contenir au moins 2 caractères';
        } else if (/\d/.test(value)) {
          error.nom = 'Le nom ne doit pas contenir de chiffres';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
          error.nom = 'Le nom contient des caractères invalides';
        }
        break;

      case 'prenom':
        if (!value || value.trim().length < 2) {
          error.prenom = 'Le prénom doit contenir au moins 2 caractères';
        } else if (/\d/.test(value)) {
          error.prenom = 'Le prénom ne doit pas contenir de chiffres';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
          error.prenom = 'Le prénom contient des caractères invalides';
        }
        break;

      case 'email':
        if (!value || value.trim().length === 0) {
          error.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error.email = 'L\'email n\'est pas valide';
        }
        break;

      case 'telephone':
        if (!value || value.trim().length === 0) {
          error.telephone = 'Le téléphone est requis';
        } else {
          const cleanPhone = value.replace(/[\s.-]/g, '');
          if (!/^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$|^(?:(?:\+|00)212|0)[5-9](?:[\s.-]?\d{2}){4}$/.test(cleanPhone)) {
            error.telephone = 'Le numéro de téléphone n\'est pas valide (format FR/MA)';
          }
        }
        break;

      case 'password':
        if (!value || value.length < 8) {
          error.password = 'Le mot de passe doit contenir au moins 8 caractères';
        } else if (!/[A-Z]/.test(value)) {
          error.password = 'Le mot de passe doit contenir au moins une majuscule';
        } else if (!/[a-z]/.test(value)) {
          error.password = 'Le mot de passe doit contenir au moins une minuscule';
        } else if (!/\d/.test(value)) {
          error.password = 'Le mot de passe doit contenir au moins un chiffre';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error.password = 'Le mot de passe doit contenir au moins un caractère spécial';
        }
        break;

      case 'confirmPassword':
        if (!value || value !== formData.password) {
          error.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        break;

      case 'age':
        if (!value) {
          error.age = 'L\'âge est requis';
        } else if (isNaN(value) || value < 18) {
          error.age = 'Vous devez avoir au moins 18 ans';
        } else if (value > 120) {
          error.age = 'Âge invalide';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validation de tout le formulaire
  const validateForm = () => {
    const newErrors = {};

    // Valider chaque champ
    Object.keys(formData).forEach(field => {
      const fieldError = validateField(field, formData[field]);
      if (Object.keys(fieldError).length > 0) {
        Object.assign(newErrors, fieldError);
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestionnaire de changement pour les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mettre à jour les données du formulaire
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Valider le champ en temps réel (optionnel)
    const fieldError = validateField(name, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (Object.keys(fieldError).length > 0) {
        newErrors[name] = fieldError[name];
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  // Gestionnaire de soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialiser le succès
    setSubmitSuccess(false);
    
    // Valider le formulaire
    const isValid = validateForm();
    
    if (!isValid) {
      console.log('Formulaire invalide:', errors);
      return;
    }

    // Si le formulaire est valide, procéder à la soumission
    setIsSubmitting(true);
    
    try {
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Données soumises:', formData);
      setSubmitSuccess(true);
      
      // Réinitialiser le formulaire après succès
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        age: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour vérifier si un champ a une erreur
  const hasError = (fieldName) => {
    return errors[fieldName] && errors[fieldName].length > 0;
  };

  // Fonction pour obtenir la classe CSS en fonction de l'erreur
  const getFieldClassName = (fieldName) => {
    const baseClass = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors";
    
    if (hasError(fieldName)) {
      return `${baseClass} border-red-500 focus:ring-red-500 bg-red-50`;
    }
    
    if (formData[fieldName] && !hasError(fieldName)) {
      return `${baseClass} border-green-500 focus:ring-green-500 bg-green-50`;
    }
    
    return `${baseClass} border-gray-300 focus:ring-blue-500`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulaire de Validation</h2>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✅ Formulaire soumis avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={getFieldClassName('nom')}
            placeholder="Entrez votre nom"
          />
          {hasError('nom') && (
            <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
          )}
        </div>

        {/* Champ Prénom */}
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom *
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className={getFieldClassName('prenom')}
            placeholder="Entrez votre prénom"
          />
          {hasError('prenom') && (
            <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>
          )}
        </div>

        {/* Champ Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={getFieldClassName('email')}
            placeholder="exemple@email.com"
          />
          {hasError('email') && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Champ Téléphone */}
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone *
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className={getFieldClassName('telephone')}
            placeholder="06 12 34 56 78"
          />
          {hasError('telephone') && (
            <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
          )}
        </div>

        {/* Champ Âge */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Âge *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={getFieldClassName('age')}
            placeholder="25"
          />
          {hasError('age') && (
            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
          )}
        </div>

        {/* Champ Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={getFieldClassName('password')}
            placeholder="••••••••"
          />
          {hasError('password') && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          {formData.password && !hasError('password') && (
            <p className="mt-1 text-sm text-green-600">✓ Mot de passe valide</p>
          )}
        </div>

        {/* Champ Confirmation mot de passe */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={getFieldClassName('confirmPassword')}
            placeholder="••••••••"
          />
          {hasError('confirmPassword') && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
          {formData.confirmPassword && !hasError('confirmPassword') && (
            <p className="mt-1 text-sm text-green-600">✓ Les mots de passe correspondent</p>
          )}
        </div>

        {/* Bouton de soumission */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                En cours...
              </span>
            ) : (
              'Soumettre le formulaire'
            )}
          </button>
        </div>

        {/* Affichage des erreurs globales */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <strong>Erreurs à corriger :</strong>
            <ul className="mt-2 list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default ValidationForm;
