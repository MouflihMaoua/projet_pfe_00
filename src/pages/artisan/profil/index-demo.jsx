import { useState, useEffect, useCallback } from 'react';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Camera,
  Edit2,
  Save,
  X,
  Star,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import UploadPhotoModal from '../../../components/profil/UploadPhotoModal';
import { profileService } from '../../../services/profileService-demo';

const emptyProfile = {
  id_artisan: '',
  nom: '',
  metier: '',
  email: '',
  telephone: '',
  adresse: '',
  bio: '',
  tarifHoraire: 0,
  tarifDeplacement: 0,
  deplacementGratuit: true,
  note: 0,
  nombreAvis: 0,
  anneesExperience: 0,
  disponibilite: 'Disponible',
  photo: null,
  createdAt: '',
  updatedAt: '',
};

export default function ArtisanProfile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(emptyProfile);

  // Charger le profil avec le service démo
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simuler un utilisateur connecté
      const mockUserId = 'artisan-demo-123';
      
      // Utiliser le service de profil démo
      const profileResult = await profileService.getUserProfile(mockUserId);
      
      if (!profileResult || profileResult.type !== 'artisan') {
        setError("Aucun profil artisan trouvé");
        return;
      }

      // Transformer les données pour le format attendu
      const transformedProfile = {
        id_artisan: profileResult.data.id,
        nom: `${profileResult.data.prenom} ${profileResult.data.nom}`,
        metier: profileResult.data.metier,
        email: profileResult.data.email,
        telephone: profileResult.data.telephone,
        adresse: profileResult.data.localisation || '',
        bio: profileResult.data.description || '',
        tarifHoraire: 250,
        tarifDeplacement: 50,
        deplacementGratuit: false,
        note: parseFloat(profileResult.data.note_moyenne) || 4.8,
        nombreAvis: profileResult.data.missions_completees || 25,
        anneesExperience: profileResult.data.annee_experience || 10,
        disponibilite: profileResult.data.disponibilite || 'Disponible',
        photo: profileResult.data.photo_profil,
        createdAt: profileResult.data.created_at || new Date().toISOString(),
        updatedAt: profileResult.data.last_sign_in_at || new Date().toISOString(),
      };

      setProfile(transformedProfile);
      setEditForm(transformedProfile);
    } catch (err) {
      console.error('Erreur chargement profil:', err);
      setError(err.message || 'Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsEditing(false);
      
      // Simuler la sauvegarde avec le service démo
      await profileService.updateArtisanProfile(profile.id_artisan, {
        nom: editForm.nom.split(' ')[1] || '',
        prenom: editForm.nom.split(' ')[0] || '',
        metier: editForm.metier,
        email: editForm.email,
        telephone: editForm.telephone,
        description: editForm.bio,
        localisation: editForm.adresse,
        disponibilite: editForm.disponibilite,
        annee_experience: editForm.anneesExperience
      });

      setProfile(editForm);
      alert('Profil mis à jour avec succès !');
    } catch (err) {
      console.error('Erreur sauvegarde profil:', err);
      alert('Erreur lors de la sauvegarde du profil');
    }
  };

  const handlePhotoUpload = async (file) => {
    try {
      const photoUrl = await profileService.uploadProfilePhoto(file, profile.id_artisan, 'artisan');
      setProfile(prev => ({ ...prev, photo: photoUrl }));
      setShowUploadModal(false);
      alert('Photo de profil mise à jour !');
    } catch (err) {
      console.error('Erreur upload photo:', err);
      alert('Erreur lors de l\'upload de la photo');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !profile.id_artisan) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 border border-red-200">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Erreur</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profil Artisan</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
              {isEditing ? 'Enregistrer' : 'Modifier'}
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt="Photo de profil"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.nom}
                      onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-blue-600 focus:outline-none"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">{profile.nom}</h2>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.metier}
                      onChange={(e) => setEditForm({ ...editForm, metier: e.target.value })}
                      className="text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.metier}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.telephone}
                      onChange={(e) => setEditForm({ ...editForm, telephone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.telephone}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.adresse}
                      onChange={(e) => setEditForm({ ...editForm, adresse: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.adresse || 'Non spécifiée'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Biographie</h2>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-gray-700">{profile.bio || 'Aucune biographie renseignée'}</p>
              )}
            </div>

            {/* Experience Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Expérience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Années d'expérience</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.anneesExperience}
                      onChange={(e) => setEditForm({ ...editForm, anneesExperience: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.anneesExperience} ans</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
                  {isEditing ? (
                    <select
                      value={editForm.disponibilite}
                      onChange={(e) => setEditForm({ ...editForm, disponibilite: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="Disponible">Disponible</option>
                      <option value="Occupé">Occupé</option>
                      <option value="Non disponible">Non disponible</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profile.disponibilite}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Rating Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Note moyenne</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="font-semibold">{profile.note}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nombre d'avis</span>
                  <span className="font-semibold">{profile.nombreAvis}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Missions complétées</span>
                  <span className="font-semibold">{profile.nombreAvis}</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tarifs</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarif horaire</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.tarifHoraire}
                      onChange={(e) => setEditForm({ ...editForm, tarifHoraire: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-blue-600">{profile.tarifHoraire} DH/h</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarif de déplacement</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.tarifDeplacement}
                      onChange={(e) => setEditForm({ ...editForm, tarifDeplacement: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">{profile.tarifDeplacement} DH</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditForm(profile);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Enregistrer les modifications
            </button>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <UploadPhotoModal
            onClose={() => setShowUploadModal(false)}
            onUpload={handlePhotoUpload}
          />
        )}
      </div>
    </div>
  );
}
