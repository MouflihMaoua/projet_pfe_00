import React from "react";
import { BarChart3, Heart, Star } from "lucide-react";

const ProfileStats = ({ stats }) => {
  const statItems = [
    {
      label: "Missions complétées",
      value: stats?.completedMissions || "0",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Artisans favoris",
      value: stats?.favoritesCount || "0",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Avis donnés",
      value: stats?.reviewsCount || "0",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statItems.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
              <Icon size={24} className={stat.color} />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              {stat.label}
            </p>
            <p className="text-4xl font-black text-brand-navy">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileStats;
