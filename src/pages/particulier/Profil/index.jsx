// ============================================================
// pages/particulier/Profil/index.jsx
// Page principale "Profil Client" — ArtisanConnect
// ============================================================

import React, { useState } from "react";
import ProfileHeader from "../../../components/profil/ProfileHeader";
import ProfileStats from "../../../components/profil/ProfileStats";
import ProfileEditModal from "../../../components/profil/ProfileEditModal";
import InfoPersonnellesCard from "../../../components/profil/InfoPersonnellesCard";
import AdresseCard from "../../../components/profil/AdresseCard";
import SecuriteCard from "../../../components/profil/SecuriteCard";
import ResumeCompteCard from "../../../components/profil/ResumeCompteCard";
import ActiviteRecenteCard from "../../../components/profil/ActiviteRecenteCard";
import DangerZoneCard from "../../../components/profil/DangerZoneCard";
import DeleteAccountModal from "../../../components/profil/DeleteAccountModal";
import { mockUser, mockStats, mockActivite } from "../../../data/profilMock";
import { useToast } from "../../../hooks/useToast";

const ProfilClient = () => {
  const [user, setUser]                     = useState(mockUser);
  const [showEditModal, setShowEditModal]   = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cinFile, setCinFile]              = useState(null);

  const { toasts, removeToast, toast } = useToast();

  const handleAvatarSave = (file, preview) => {
    setUser((prev) => ({ ...prev, avatar: preview }));
    toast.success("Photo de profil mise à jour !");
  };

  const handleCinUpdate = (file) => {
    setCinFile(file);
    toast.success("CIN uploadé avec succès !");
  };

  const handleCardSuccess = (message) => toast.success(message || "Modifications enregistrées !");

  const handleDeleteAccount = () => toast.error("Compte supprimé. Redirection...");

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">

        <ProfileHeader
          user={user}
          onEditClick={() => setShowEditModal(true)}
          onPhotoClick={() => setShowEditModal(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 mt-5">

          {/* Colonne gauche */}
          <div className="space-y-5">
            <InfoPersonnellesCard user={user} onSuccess={handleCardSuccess} />
            <AdresseCard user={user} onSuccess={handleCardSuccess} />
            <SecuriteCard onSuccess={(msg) => toast.success(msg)} />
          </div>

          {/* Colonne droite */}
          <div className="space-y-5">
            <ProfileStats stats={mockStats} />
            <ActiviteRecenteCard activites={mockActivite} />
            <DangerZoneCard onDeleteClick={() => setShowDeleteModal(true)} />
          </div>
        </div>

        <ProfileEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={user}
          onPhotoSave={handleAvatarSave}
          onCinUpdate={handleCinUpdate}
        />

        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
        />

      </div>
    </div>
  );
};

export default ProfilClient;