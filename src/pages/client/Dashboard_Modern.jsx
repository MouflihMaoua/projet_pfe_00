// src/pages/client/Dashboard_Modern.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar_Modern';
import ProfilPage from '../particulier/ProfilView_Modern';
import MissionsView from '../particulier/MissionsView_Modern';
import MessagesView from '../particulier/MessagesView_Modern';
import ProfilPersonnel from '../../components/artisan/ProfilPersonnel';
import {
  Search, Calendar, MessageSquare, ChevronRight, Star, Wrench,
  CheckCircle2, Clock, ArrowUpRight, MapPin, Sparkles, TrendingUp,
  Bell, MoreHorizontal, Phone, Send, Paperclip, Smile, Home,
  Users, FileText, Award, Activity, DollarSign, Target, Menu
} from 'lucide-react';

const DashboardModern = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Données mockées pour le dashboard
  const stats = [
    {
      title: "Missions actives",
      value: "3",
      change: "+12%",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Artisans contactés",
      value: "8",
      change: "+25%",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Messages non lus",
      value: "5",
      change: "-8%",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Total dépensé",
      value: "2.4k DH",
      change: "+18%",
      icon: DollarSign,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentMissions = [
    {
      id: 1,
      artisan: "Ahmed Mansouri",
      metier: "Plombier",
      date: "Demain, 10:00",
      status: "confirmé",
      prix: "1200 DH",
      image: "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=200"
    },
    {
      id: 2,
      artisan: "Youssef Alami",
      metier: "Électricien",
      date: "25 Fév 2025",
      status: "en attente",
      prix: "850 DH",
      image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=200"
    }
  ];

  const recentMessages = [
    {
      id: 1,
      artisan: "Ahmed Mansouri",
      message: "Je serai là à l'heure, prévoyez les matériaux...",
      time: "10:05",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=200"
    },
    {
      id: 2,
      artisan: "Fatima Zahra",
      message: "Merci pour votre confiance !",
      time: "Hier",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1580489938304-3c4a6b8c3b3?w=200"
    }
  ];

  const renderContent = () => {
    const path = location.pathname;
    
    if (path.endsWith('/missions')) return <MissionsView />;
    if (path.endsWith('/messages')) return <MessagesView />;
    if (path.endsWith('/profil')) return <ProfilPage />;
    if (path.endsWith('/profil-personnel')) return <ProfilPersonnel userType="particulier" />;
    
    // Vue d'ensemble par défaut
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-2">Bienvenue dans votre espace personnel</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Ce mois</span>
            </button>
            <Link to="/recherche-artisan" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Search size={18} />
              <span className="text-sm font-medium">Rechercher</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`} />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <ArrowUpRight size={14} className="text-green-500" />
                  <span className="text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Missions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Missions récentes</h3>
              <Link to="/dashboard/particulier/missions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tout
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentMissions.map((mission) => (
                <div key={mission.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <img src={mission.image} alt={mission.artisan} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{mission.artisan}</h4>
                        <p className="text-sm text-gray-600">{mission.metier}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{mission.prix}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{mission.date}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        mission.status === 'confirmé' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mission.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Messages récents</h3>
              <Link to="/dashboard/particulier/messages" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tout
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="relative">
                    <img src={message.avatar} alt={message.artisan} className="w-12 h-12 rounded-lg object-cover" />
                    {message.unread && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 truncate">{message.artisan}</h4>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Besoin d'un artisan ?</h3>
              <p className="text-blue-100">Trouvez rapidement des professionnels qualifiés pour vos projets</p>
            </div>
            <div className="flex gap-3">
              <Link to="/recherche-artisan" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Rechercher
              </Link>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors">
                Poster une mission
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-80">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Karim Bennani</p>
                  <p className="text-xs text-blue-600">Client</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  KB
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardModern;
