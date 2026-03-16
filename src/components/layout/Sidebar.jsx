// ============================================================
// components/layout/Sidebar.jsx
// Sidebar de navigation principale ArtisanConnect
// Sections étiquetées, indicateur de page active, logo
// ============================================================

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Briefcase, Calendar, Heart,
  User, Bell, HelpCircle, LogOut, Wrench,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

// ── Mapping icon string → composant Lucide ─────────────────
const iconMap = {
  LayoutDashboard, Briefcase, Calendar, Heart,
  User, Bell, HelpCircle, LogOut, Wrench,
};

// ── Éléments de navigation ─────────────────────────────────
const navSections = [
  {
    label: "Principal",
    items: [
      { label: "Tableau de bord", icon: "LayoutDashboard", path: "/dashboard/particulier" },
      { label: "Mes missions",    icon: "Briefcase",       path: "/dashboard/particulier/missions" },
      { label: "Mes messages",    icon: "Calendar",        path: "/dashboard/particulier/messages" },
      { label: "Mon profil",      icon: "User",            path: "/dashboard/particulier/profil" },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/connexion");
  };
  return (
    <aside
      className="flex flex-col w-64 h-full flex-shrink-0"
      style={{ background: "#1C2333" }}
    >
      {/* ── Logo ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 px-6 py-6 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
          <Wrench size={15} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <span className="text-white font-bold text-sm tracking-tight">ArtisanConnect</span>
          <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">Plateforme client</p>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            {/* Étiquette de section */}
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {section.label}
            </p>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = iconMap[item.icon] || User;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-sm font-medium transition-all duration-150
                      group
                      ${isActive
                        ? "bg-orange-500/15 text-orange-400"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={16}
                          strokeWidth={isActive ? 2.5 : 2}
                          className={`flex-shrink-0 transition-colors ${
                            isActive ? "text-orange-400" : "text-slate-500 group-hover:text-slate-300"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>

                        {/* Indicateur actif */}
                        {isActive && (
                          <div className="ml-auto w-1 h-4 rounded-full bg-orange-400" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer sidebar : déconnexion ───────────────────── */}
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            text-sm font-medium text-slate-400
            hover:text-red-400 hover:bg-red-500/10
            transition-all duration-150 group
          "
        >
          <LogOut size={16} strokeWidth={2} className="flex-shrink-0 group-hover:text-red-400 transition-colors" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;