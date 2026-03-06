/**
 * Sidebar - Navigation latérale moderne du dashboard client
 * Design moderne avec animations et interactions améliorées
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarDays, MessageSquare, UserCircle, LogOut, 
  Wrench, X, Home, Settings, TrendingUp, Award, ChevronDown,
  Bell, Search, Menu, Sparkles
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const menuItems = [
  { 
    name: "Tableau de bord", 
    icon: LayoutDashboard, 
    path: '/dashboard/particulier',
    badge: null,
    description: "Vue d'ensemble"
  },
  { 
    name: 'Mes Demandes', 
    icon: CalendarDays, 
    path: '/dashboard/particulier/demandes',
    badge: null,
    description: "Demandes envoyées"
  },
  { 
    name: 'Discussions', 
    icon: MessageSquare, 
    path: '/dashboard/particulier/messages',
    badge: '5',
    description: "Messages avec artisans"
  },
  { 
    name: 'Profil', 
    icon: UserCircle, 
    path: '/dashboard/particulier/profil',
    badge: null,
    description: "Mes informations"
  },
];

const Sidebar = ({ isOpen, onClose, onMenuClick }) => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const [expandedItem, setExpandedItem] = useState(null);

  const isActive = (path) => {
    if (path === '/dashboard/particulier') {
      return location.pathname === path;
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 w-80 h-screen bg-white flex flex-col z-50
          transform transition-all duration-300 ease-out shadow-2xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-gray-200">
          {/* Fermer (mobile) */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-6 right-6 p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            <X size={20} />
          </button>

          {/* Logo moderne */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <img src="/assets/logo_app.png" alt="7rayfi" className="w-14 h-14 rounded-2xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-gray-900 font-bold text-xl leading-tight group-hover:text-orange-600 transition-colors">
                7rayfi
              </h1>
              <p className="text-orange-600 text-xs font-semibold tracking-wider uppercase">
                Dashboard Client
              </p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-orange-500 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Navigation principale
            </h3>
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
                      ${active
                        ? 'bg-gradient-to-r from-orange-500/10 to-orange-600/5 text-orange-600 border border-orange-200 shadow-lg shadow-orange-500/10'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                      }
                    `}
                  >
                    {/* Icône */}
                    <div className={`
                      relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300
                      ${active ? 'bg-orange-100' : 'bg-gray-100 group-hover:bg-gray-200'}
                    `}>
                      <Icon size={20} className={active ? 'text-orange-600' : 'text-gray-600'} />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm truncate">{item.name}</span>
                        {active && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-orange-500 rounded-full"
                          />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
                    </div>

                    {/* Indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Section secondaire */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Autres
            </h3>
            
            <Link
              to="/dashboard/particulier/settings"
              onClick={onClose}
              className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
                <Settings size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm">Paramètres</span>
                <p className="text-xs text-gray-500 mt-0.5">Préférences et compte</p>
              </div>
            </Link>

            <button
              onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                  logout();
                  alert('Votre compte a été supprimé avec succès.');
                }
              }}
              className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 w-full"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 group-hover:bg-red-200 transition-all duration-300">
                <X size={20} className="text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-sm">Supprimer mon compte</span>
                <p className="text-xs text-red-500 mt-0.5">Action irréversible</p>
              </div>
            </button>

          </div>
        </nav>

        {/* Footer avec profil et déconnexion */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {/* Profil utilisateur */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-orange-600 flex items-center justify-center">
                <UserCircle size={20} className="text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium text-sm truncate">Sophie Martin</p>
              <p className="text-gray-500 text-xs truncate">sophie.martin@email.com</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>

          {/* Déconnexion */}
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full p-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 group-hover:bg-red-200 transition-all duration-300">
              <LogOut size={20} />
            </div>
            <div className="flex-1 text-left">
              <span className="font-medium text-sm">Déconnexion</span>
              <p className="text-xs text-red-500 mt-0.5">Quitter le dashboard</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
