// Services standardisés pour l'application 7rayfi
export const SERVICES_ARTISAN = [
  "Peintre",
  "Technicien en électroménager et climatisation", 
  "Électricien",
  "Plombier",
  "Femme de ménage"
];

export const CATEGORIES_SERVICES = [
  { value: "tous", label: "Tous les services" },
  { value: "Peintre", label: "Peintre" },
  { value: "Technicien en électroménager et climatisation", label: "Technicien en électroménager et climatisation" },
  { value: "Électricien", label: "Électricien" },
  { value: "Plombier", label: "Plombier" },
  { value: "Femme de ménage", label: "Femme de ménage" }
];

// Fonction utilitaire pour vérifier si un service est valide
export const isValidService = (service) => {
  return SERVICES_ARTISAN.includes(service);
};

// Fonction utilitaire pour formater l'affichage des services
export const formatServiceName = (service) => {
  const serviceMap = {
    "Peintre": "Peintre",
    "Technicien en électroménager et climatisation": "Technicien en électroménager et climatisation",
    "Électricien": "Électricien",
    "Plombier": "Plombier",
    "Femme de ménage": "Femme de ménage"
  };
  return serviceMap[service] || service;
};
