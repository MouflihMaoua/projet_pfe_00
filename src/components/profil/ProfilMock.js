// ============================================================
// data/profilMock.js
// Données mockées pour le profil client 7rayfi
// Prêt pour remplacement par API Laravel (Axios + React Query)
// ============================================================

export const mockUser = {
  id: "usr_001",
  prenom: "Karim",
  nom: "Bennani",
  email: "karim.bennani@gmail.com",
  telephone: "+212 661 234 567",
  cin: "AB123456",
  ville: "Casablanca",
  codePostal: "20000",
  avatar: null, // URL avatar ou null pour initiales
  statut: "CLIENT_OR",
  membreDepuis: "2024-01-15",
  derniereConnexion: new Date().toISOString(),
  estConnecte: true,
};

export const mockStats = {
  missionsTerminees: 12,
  artisansFavoris: 8,
  reservationsActives: 2,
  avisLaisses: 7,
};

export const mockActivite = [
  {
    id: "act_001",
    type: "reservation",
    titre: "Réservation confirmée",
    detail: "Mohamed Alami — Plombier",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // il y a 2h
  },
  {
    id: "act_002",
    type: "avis",
    titre: "Avis laissé",
    detail: "Youssef Tazi — Électricien ★★★★★",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // hier
  },
  {
    id: "act_003",
    type: "profil",
    titre: "Profil mis à jour",
    detail: "Informations personnelles modifiées",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3j
  },
  {
    id: "act_004",
    type: "mission",
    titre: "Nouvelle mission créée",
    detail: "Rénovation salle de bain",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 sem
  },
];

export const navItems = [
  {
    section: "Principal",
    items: [
      { label: "Tableau de bord", icon: "LayoutDashboard", path: "/dashboard" },
      { label: "Mes missions", icon: "Briefcase", path: "/missions" },
      { label: "Réservations", icon: "Calendar", path: "/reservations" },
      { label: "Artisans favoris", icon: "Heart", path: "/favoris" },
    ],
  },
  {
    section: "Compte",
    items: [
      { label: "Mon profil", icon: "User", path: "/profil", active: true },
      { label: "Notifications", icon: "Bell", path: "/notifications" },
      { label: "Aide", icon: "HelpCircle", path: "/aide" },
    ],
  },
];