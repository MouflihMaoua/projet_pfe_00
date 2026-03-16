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
import { supabase } from '../../../services/supabaseClient';
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
  numeroCIN: '',
  carteCINRecto: null,
  carteCINVerso: null,
  experiences: [],
  photoProfil: '',
  ville: '',
  codePostal: '',
  disponibilite: true,
  anneeExperience: '',
  sexe: '',
  note: 0,
  nombreAvis: 0,
};

function safeArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function normalizeUploadValue(file) {
  if (!file) return '';
  if (typeof file === 'string') return file;
  if (file.publicUrl) return file.publicUrl;
  if (file.url) return file.url;
  if (file.path) return file.path;
  if (file.fullPath) return file.fullPath;
  return '';
}

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [profile, setProfile] = useState(emptyProfile);
  const [initialProfile, setInitialProfile] = useState(emptyProfile);
  const [newZone, setNewZone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError || !sessionData?.session?.user) {
          setError('Utilisateur non connecté.');
          setLoading(false);
          return;
        }

        const user = sessionData.session.user;

        const { data, error: artisanError } = await supabase
          .from('artisan')
          .select('*')
          .eq('id_artisan', user.id)
          .maybeSingle();

        if (artisanError) throw artisanError;

        if (!data) {
          setError("Aucun profil artisan n'a été trouvé.");
          setLoading(false);
          return;
        }

        const normalizedProfile = {
          id_artisan: data.id_artisan ?? '',
          nom: `${data.prenom_artisan ?? ''} ${data.nom_artisan ?? ''}`.trim(),
          metier: data.metier ?? '',
          email: data.email_artisan ?? user.email ?? '',
          telephone: data.telephone_artisan ?? '',
          adresse: data.localisation ?? '',
          bio: data.description ?? '',
          tarifHoraire: Number(data.tarif_horaire ?? 0),
          tarifDeplacement: Number(data.tarif_deplacement ?? 0),
          deplacementGratuit:
            typeof data.deplacement_gratuit === 'boolean'
              ? data.deplacement_gratuit
              : Number(data.tarif_deplacement ?? 0) === 0,
          numeroCIN: data.cin ?? '',
          carteCINRecto: data.carte_cin_recto ?? null,
          carteCINVerso: data.carte_cin_verso ?? null,
          experiences: safeArray(data.experiences),
          photoProfil: data.photo_profil ?? '',
          ville: data.ville ?? '',
          codePostal: data.code_postale_artisan ?? '',
          disponibilite: data.disponibilite ?? true,
          anneeExperience: data.annee_experience ?? '',
          sexe: data.sexe ?? '',
          note: Number(data.note_moyenne ?? 0),
          nombreAvis: Number(data.nombre_avis ?? 0),
        };

        setProfile(normalizedProfile);
        setInitialProfile(normalizedProfile);
      } catch (err) {
        console.error('Erreur chargement profil:', err);
        setError(err.message || 'Erreur lors du chargement du profil.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  


  const handlePhotoUpload = () => {
    setShowPhotoModal(true);
  };

  const handleCINRectoSuccess = useCallback((file) => {
    const value = normalizeUploadValue(file);
    setProfile((prev) => ({
      ...prev,
      carteCINRecto: value,
    }));
  }, []);

  const handleCINVersoSuccess = useCallback((file) => {
    const value = normalizeUploadValue(file);
    setProfile((prev) => ({
      ...prev,
      carteCINVerso: value,
    }));
  }, []);

  const handlePhotoSuccess = useCallback((file) => {
    const value = normalizeUploadValue(file);
    setProfile((prev) => ({
      ...prev,
      photoProfil: value,
    }));
    setShowPhotoModal(false);
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      const [prenom = '', ...rest] = (profile.nom || '').trim().split(' ');
      const nomFamille = rest.join(' ');

      const payload = {
        nom_artisan: nomFamille || prenom || '',
        prenom_artisan: nomFamille ? prenom : '',
        metier: profile.metier,
        email_artisan: profile.email,
        telephone_artisan: profile.telephone,
        localisation: profile.adresse,
        description: profile.bio,
        tarif_horaire: Number(profile.tarifHoraire || 0),
        tarif_deplacement: Number(profile.tarifDeplacement || 0),
        deplacement_gratuit: !!profile.deplacementGratuit,
        cin: profile.numeroCIN,
        carte_cin_recto: profile.carteCINRecto || null,
        carte_cin_verso: profile.carteCINVerso || null,
        experiences: profile.experiences,
        photo_profil: profile.photoProfil || null,
        ville: profile.ville,
        code_postale_artisan: profile.codePostal,
        disponibilite: profile.disponibilite,
        annee_experience:
          profile.anneeExperience === '' ? null : Number(profile.anneeExperience),
        sexe: profile.sexe,
      };

      const { error: updateError } = await supabase
        .from('artisan')
        .update(payload)
        .eq('id_artisan', profile.id_artisan);

      if (updateError) throw updateError;

      setInitialProfile(profile);
      setIsEditing(false);
    } catch (err) {
      console.error('Erreur sauvegarde profil:', err);
      setError(err.message || "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error && !profile.id_artisan) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 border border-red-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil professionnel</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Enregistrer...' : 'Enregistrer'}</span>
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              <span>Annuler</span>
            </button>
          </div>
        )}
      </div>

      {error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche - Photo et infos principales */}
        <div className="space-y-6">
          {/* Photo de profil */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="relative inline-block">
              {profile.photoProfil ? (
                <img
                  src={profile.photoProfil}
                  alt={profile.nom || 'Profil'}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
              )}

              {isEditing && (
                <button
                  onClick={handlePhotoUpload}
                  className="absolute bottom-4 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3 text-left">
                <input
                  type="text"
                  value={profile.nom}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, nom: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Nom complet"
                />
                <input
                  type="text"
                  value={profile.metier}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, metier: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Métier"
                />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.nom || 'Non renseigné'}
                </h2>
                <p className="text-gray-600">{profile.metier || 'Non renseigné'}</p>
              </>
            )}

            {/* Note rapide */}
            <div className="flex items-center justify-center space-x-1 mt-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{profile.note || 0}</span>
              <span className="text-sm text-gray-500">({profile.nombreAvis || 0} avis)</span>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Coordonnées</h3>

            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profile.telephone}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, telephone: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Téléphone"
                />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={profile.adresse}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, adresse: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Adresse / localisation"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{profile.telephone || 'Non renseigné'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{profile.email || 'Non renseigné'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{profile.adresse || 'Non renseigné'}</span>
                </div>
              </div>
            )}
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
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, bio: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3"
                rows="4"
              />
            ) : (
              <p className="text-gray-700">
                {profile.bio || 'Aucune description renseignée.'}
              </p>
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
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          tarifHoraire: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      min="0"
                      step="10"
                    />
                    <span className="text-2xl font-bold text-gray-900">DH</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    {profile.tarifHoraire || 0} DH
                  </p>
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
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            deplacementGratuit: e.target.checked,
                            tarifDeplacement: e.target.checked
                              ? 0
                              : prev.tarifDeplacement || 50,
                          }))
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="deplacement-gratuit"
                        className="text-sm text-gray-700"
                      >
                        Gratuit
                      </label>
                    </div>

                    {!profile.deplacementGratuit && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={profile.tarifDeplacement}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              tarifDeplacement: parseInt(e.target.value) || 0,
                            }))
                          }
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
                    {profile.deplacementGratuit
                      ? 'Gratuit'
                      : `${profile.tarifDeplacement || 0} DH`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Expérience */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Expérience</h3>

            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={JSON.stringify(profile.experiences, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setProfile((prev) => ({ ...prev, experiences: parsed }));
                    } catch {
                      // ignore invalid json while typing
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 font-mono text-sm"
                  rows="8"
                  placeholder='[{"annee":"2020-2024","poste":"Plombier","description":"..."}]'
                />
                <p className="text-xs text-gray-500">
                  Modifiez au format JSON.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {profile.experiences.length > 0 ? (
                  profile.experiences.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <p className="font-medium text-gray-900">{exp.poste || 'Sans titre'}</p>
                      <p className="text-sm text-gray-500">{exp.annee || ''}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {exp.description || ''}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Aucune expérience renseignée</p>
                )}
              </div>
            )}
          </div>


          {/* Carte d'identité */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Carte d'identité</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro CIN
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.numeroCIN}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, numeroCIN: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="AB123456"
                  />
                ) : (
                  <p className="text-gray-900">{profile.numeroCIN || 'Non renseigné'}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recto
                  </label>
                  {isEditing ? (
                    <UploadPhotoModal
                      onUploadSuccess={handleCINRectoSuccess}
                      acceptedFileTypes={['image/jpeg', 'image/png', 'application/pdf']}
                      maxFileSize={5 * 1024 * 1024}
                    />
                  ) : (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        {profile.carteCINRecto ? (
                          <img
                            src={profile.carteCINRecto}
                            alt="CIN Recto"
                            className="w-full h-32 object-cover"
                          />
                        ) : (
                          <div className="h-32 flex items-center justify-center bg-gray-50">
                            <p className="text-sm text-gray-500">Aucun fichier</p>
                          </div>
                        )}
                      </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verso
                  </label>
                  {isEditing ? (
                    <UploadPhotoModal
                      onUploadSuccess={handleCINVersoSuccess}
                      acceptedFileTypes={['image/jpeg', 'image/png', 'application/pdf']}
                      maxFileSize={5 * 1024 * 1024}
                    />
                  ) : (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {profile.carteCINVerso ? (
                        <img
                          src={profile.carteCINVerso}
                          alt="CIN Verso"
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="h-32 flex items-center justify-center bg-gray-50">
                          <p className="text-sm text-gray-500">Aucun fichier</p>
                        </div>
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