// src/pages/artisan/profil/index.jsx
import { useState } from 'react';
import { 
  User, MapPin, Phone, Mail, Clock, Award, 
  Camera, Edit2, Save, X, Star, Briefcase, DollarSign 
} from 'lucide-react';
import UploadPhotoModal from '../../../components/profil/UploadPhotoModal';

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [profile, setProfile] = useState({
    nom: "Ahmed Benani",
    metier: "Plombier - Chauffagiste",
    email: "ahmed.benani@example.com",
    telephone: "06 12 34 56 78",
    adresse: "12 rue de Paris, 75001 Paris",
    bio: "Artisan plombier avec 10 ans d'expérience. Spécialiste en installation de chauffe-eau et dépannage d'urgence.",
    zoneIntervention: ["Paris Centre", "Paris 1er", "Paris 2ème", "Paris 3ème"],
    tarifHoraire: 45,
    tarifDeplacement: 0,
    deplacementGratuit: true,
    numeroCIN: "",
    carteCINRecto: null,
    carteCINVerso: null,
    experiences: [
      { annee: "2020-2024", poste: "Plombier indépendant", description: "Création de ma propre entreprise" },
      { annee: "2015-2020", poste: "Plombier chez BTP Services", description: "Interventions résidentielles" }
    ],
    certifications: ["CAP Plomberie", "Certification Gaz", "Habitation Électrique"]
  });

  const [newZone, setNewZone] = useState('');

  const handleAddZone = () => {
    if (newZone && !profile.zoneIntervention.includes(newZone)) {
      setProfile({
        ...profile,
        zoneIntervention: [...profile.zoneIntervention, newZone]
      });
      setNewZone('');
    }
  };

  const handleRemoveZone = (zone) => {
    setProfile({
      ...profile,
      zoneIntervention: profile.zoneIntervention.filter(z => z !== zone)
    });
  };

  const handlePhotoUpload = () => {
    setShowPhotoModal(true);
  };

  const handlePhotoSuccess = (file) => {
    setProfile({
      ...profile,
      photoProfil: file
    });
    setShowPhotoModal(false);
  };

  return (
    <div className="p-6">
      {/* Header avec bouton d'édition */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profil professionnel</h1>
          <p className="text-gray-600">Gérez votre profil et votre vitrine</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="h-4 w-4" />
            <span>Modifier le profil</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="h-4 w-4" />
              <span>Enregistrer</span>
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              <span>Annuler</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche - Photo et infos principales */}
        <div className="space-y-6">
          {/* Photo de profil */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              {isEditing && (
                <button 
                  onClick={handlePhotoUpload}
                  className="absolute bottom-4 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{profile.nom}</h2>
            <p className="text-gray-600">{profile.metier}</p>
            
            {/* Note rapide */}
            <div className="flex items-center justify-center space-x-1 mt-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">4.8</span>
              <span className="text-sm text-gray-500">(24 avis)</span>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Coordonnées</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{profile.telephone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.adresse}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">À propos</h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-3"
                rows="4"
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </div>

          {/* Zones d'intervention */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Zones d'intervention</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.zoneIntervention.map((zone, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center"
                >
                  {zone}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveZone(zone)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newZone}
                  onChange={(e) => setNewZone(e.target.value)}
                  placeholder="Ajouter une zone..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  onClick={handleAddZone}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            )}
          </div>

          {/* Tarifs */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Tarifs</h3>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-50 p-4 rounded-lg flex-1">
                <p className="text-sm text-gray-600">Tarif horaire</p>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={profile.tarifHoraire}
                      onChange={(e) => setProfile({...profile, tarifHoraire: parseInt(e.target.value) || 0})}
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      min="0"
                      step="10"
                    />
                    <span className="text-2xl font-bold text-gray-900">DH</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{profile.tarifHoraire} DH</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex-1">
                <p className="text-sm text-gray-600">Déplacement</p>
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="deplacement-gratuit"
                        checked={profile.deplacementGratuit}
                        onChange={(e) => setProfile({...profile, deplacementGratuit: e.target.checked, tarifDeplacement: e.target.checked ? 0 : profile.tarifDeplacement || 50})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="deplacement-gratuit" className="text-sm text-gray-700">Gratuit</label>
                    </div>
                    {!profile.deplacementGratuit && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={profile.tarifDeplacement}
                          onChange={(e) => setProfile({...profile, tarifDeplacement: parseInt(e.target.value) || 0})}
                          className="w-24 px-2 py-1 border border-gray-300 rounded"
                          min="0"
                          step="10"
                        />
                        <span className="text-lg font-bold text-gray-900">DH</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    {profile.deplacementGratuit ? 'Gratuit' : `${profile.tarifDeplacement} DH`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Expérience */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Expérience</h3>
            <div className="space-y-4">
              {profile.experiences.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <p className="font-medium text-gray-900">{exp.poste}</p>
                  <p className="text-sm text-gray-500">{exp.annee}</p>
                  <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Carte d'identité */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Carte d'identité</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro CIN</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.numeroCIN}
                    onChange={(e) => setProfile({...profile, numeroCIN: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="AB123456"
                  />
                ) : (
                  <p className="text-gray-900">{profile.numeroCIN || 'Non renseigné'}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recto</label>
                  {isEditing ? (
                    <UploadPhotoModal
                      onUploadSuccess={(file) => setProfile({...profile, carteCINRecto: file})}
                      acceptedFileTypes={['image/jpeg', 'image/png', 'application/pdf']}
                      maxFileSize={5 * 1024 * 1024}
                    />
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      {profile.carteCINRecto ? (
                        <p className="text-sm text-green-600">✓ Fichier uploadé</p>
                      ) : (
                        <p className="text-sm text-gray-500">Aucun fichier</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Verso</label>
                  {isEditing ? (
                    <UploadPhotoModal
                      onUploadSuccess={(file) => setProfile({...profile, carteCINVerso: file})}
                      acceptedFileTypes={['image/jpeg', 'image/png', 'application/pdf']}
                      maxFileSize={5 * 1024 * 1024}
                    />
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      {profile.carteCINVerso ? (
                        <p className="text-sm text-green-600">✓ Fichier uploadé</p>
                      ) : (
                        <p className="text-sm text-gray-500">Aucun fichier</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>

      {/* Modal Upload Photo */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Uploader une photo de profil</h3>
            <UploadPhotoModal
              onUploadSuccess={handlePhotoSuccess}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              maxFileSize={2 * 1024 * 1024}
            />
            <button
              onClick={() => setShowPhotoModal(false)}
              className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}