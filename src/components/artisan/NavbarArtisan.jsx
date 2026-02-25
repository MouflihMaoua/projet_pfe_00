import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FileText, MessageSquare, User, Bell, LogOut, Briefcase, Star } from 'lucide-react';

const NavbarArtisan = ({ userName = "Ahmed Mansouri", userStatus = "Expert Plomberie" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Liens de navigation
  const navLinks = [
    { label: "Espace Pro", href: "/dashboard/artisan", icon: Home },
    { label: "Mes Demandes", href: "/dashboard/artisan/demandes", icon: FileText },
    { label: "Messages", href: "/dashboard/artisan/messages", icon: MessageSquare },
    { label: "Réputation", href: "/dashboard/artisan/avis", icon: Star },
    { label: "Éditer Profil", href: "/dashboard/artisan/profil", icon: User },
  ];

  // Vérifier si un lien est actif
  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            to="/dashboard/artisan" 
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="font-black text-lg text-brand-navy tracking-tight hidden sm:inline">
              Artisan<span className="text-orange-500">Connect</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    active
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all hidden sm:flex">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 hidden sm:flex">
              <div className="text-right">
                <p className="text-sm font-bold text-brand-navy leading-tight">{userName}</p>
                <p className="text-xs font-semibold text-orange-500 leading-tight">{userStatus}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-xs font-bold text-white">
                  {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    active
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium text-sm transition-all">
              <LogOut size={18} />
              Déconnexion
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavbarArtisan;
