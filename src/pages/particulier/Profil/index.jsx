// ============================================================
// pages/particulier/Profil/index.jsx
// Page principale "Profil Client" — ArtisanConnect
// ============================================================

import React, { useState } from "react";
import NavbarParticulier from "../../../components/client/NavbarParticulier";
import Sidebar from "../../../components/layout/Sidebar";
import ToastContainer from "../../../components/layout/ToastContainer";
import ProfilHero from "../../../components/profil/ProfilHero";
import InfoPersonnellesCard from "../../../components/profil/InfoPersonnellesCard";
import AdresseCard from "../../../components/profil/AdresseCard";
import SecuriteCard from "../../../components/profil/SecuriteCard";
import ResumeCompteCard from "../../../components/profil/ResumeCompteCard";
import ActiviteRecenteCard from "../../../components/profil/ActiviteRecenteCard";
import DangerZoneCard from "../../../components/profil/DangerZoneCard";
import UploadPhotoModal from "../../../components/profil/UploadPhotoModal";
import DeleteAccountModal from "../../../components/profil/DeleteAccountModal";
import { mockUser, mockStats, mockActivite } from "../../../data/profilMock";
import { useToast } from "../../../hooks/useToast";

const ProfilClient = () => {
  const [user, setUser]                     = useState(mockUser);
  const [isHeroEditing, setIsHeroEditing]   = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { toasts, removeToast, toast } = useToast();

  const handleHeroEdit   = () => setIsHeroEditing(true);
  const handleHeroSave   = () => { setIsHeroEditing(false); toast.success("Profil mis à jour avec succès !"); };
  const handleHeroCancel = () => { setIsHeroEditing(false); toast.warning("Modifications annulées."); };

  const handleAvatarSave = (file, preview) => {
    setUser((prev) => ({ ...prev, avatar: preview }));
    toast.success("Photo de profil mise à jour !");
  };

  const handleCardSuccess = (message) => toast.success(message || "Modifications enregistrées !");

  const handleDeleteAccount = () => toast.error("Compte supprimé. Redirection...");

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <NavbarParticulier userName={user.prenom + ' ' + user.nom} userStatus="Client Or" />
      
      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">

            <ProfilHero
              user={user}
              isEditing={isHeroEditing}
              onEdit={handleHeroEdit}
              onSave={handleHeroSave}
              onCancel={handleHeroCancel}
              onAvatarClick={() => setShowPhotoModal(true)}
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
                <ResumeCompteCard user={user} stats={mockStats} />
                <ActiviteRecenteCard activites={mockActivite} />
                <DangerZoneCard onDeleteClick={() => setShowDeleteModal(true)} />
              </div>
            </div>

          </div>
        </main>
        </div>
      </div>

      <UploadPhotoModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onSave={handleAvatarSave}
      />

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ProfilClient;