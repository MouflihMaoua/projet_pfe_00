// ============================================================
// components/layout/Topbar.jsx
// Barre supérieure avec fil d'Ariane, notifications, chip user
// ============================================================

import React from "react";
import { Bell, ChevronRight, Search } from "lucide-react";

/**
 * Topbar
 *
 * Props :
 * @param {object}   user              - Données utilisateur
 * @param {string}   pageTitle         - Titre de la page courante
 * @param {string}   parentPath        - Ex: "Tableau de bord"
 * @param {number}   notifCount        - Nombre de notifications non lues
 */
const Topbar = ({
  user,
  pageTitle = "Mon profil",
  parentPath = "Tableau de bord",
  notifCount = 3,
}) => {
  const initiales = `${user.prenom[0]}${user.nom[0]}`.toUpperCase();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 flex-shrink-0">
      {/* ── Fil d'Ariane ─────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-400">{parentPath}</span>
        <ChevronRight size={13} className="text-slate-300" />
        <span className="text-xs font-bold text-slate-700">{pageTitle}</span>
      </div>

      {/* ── Actions droite ────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Bouton recherche (optionnel) */}
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
          <Search size={16} />
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
          <Bell size={16} />
          {notifCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
          )}
        </button>

        {/* Chip utilisateur */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">{initiales}</span>
          </div>

          {/* Nom + statut */}
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">
              {user.prenom} {user.nom}
            </p>
            <p className="text-[10px] text-orange-500 font-semibold leading-tight">Particulier</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;