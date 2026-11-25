import React from 'react';
import { useSelector } from 'react-redux';
import { selectGamesStats } from '../Redux/gamesSlice';
import { Gamepad, DollarSign, TrendingUp, Heart } from 'lucide-react';

const StatsBar = () => {
  const { totalGames, totalPrice, averagePrice, totalFavorites } = useSelector(selectGamesStats);

  const stats = [
    {
      label: 'Titres Répertoriés',
      value: totalGames,
      subtext: 'Dans votre store Redux',
      icon: Gamepad,
      color: 'from-blue-500 to-indigo-500',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    },
    {
      label: 'Valeur Totale',
      value: `${totalPrice} €`,
      subtext: 'Estimation du catalogue',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      label: 'Prix Moyen',
      value: `${averagePrice} €`,
      subtext: 'Par jeu vidéo',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      label: 'Coups de Cœur',
      value: totalFavorites,
      subtext: 'Jeux favoris marqués',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            {/* Petit dégradé discret de fond au survol */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity`} />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl border ${stat.badgeColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl font-black text-white tracking-tight">
              {stat.value}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBar;
