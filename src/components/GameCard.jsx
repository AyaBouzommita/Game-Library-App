import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGame, setEditingGame, toggleFavorite } from '../Redux/gamesSlice';
import { 
  Trash2, 
  Edit3, 
  Heart, 
  Monitor, 
  Gamepad2, 
  Star, 
  Tag, 
  CheckCircle,
  ExternalLink 
} from 'lucide-react';

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Helper pour les badges de plateformes
  const getPlatformBadge = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('pc') || p.includes('steam')) {
      return { bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: Monitor };
    }
    if (p.includes('playstation') || p.includes('ps5') || p.includes('ps4')) {
      return { bg: 'bg-blue-600/15 text-blue-400 border-blue-500/25', icon: Gamepad2 };
    }
    if (p.includes('xbox')) {
      return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: Gamepad2 };
    }
    if (p.includes('switch') || p.includes('nintendo')) {
      return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', icon: Gamepad2 };
    }
    return { bg: 'bg-slate-500/10 text-slate-300 border-slate-500/20', icon: Gamepad2 };
  };

  const platformStyle = getPlatformBadge(game.platform);
  const PlatformIcon = platformStyle.icon;

  const handleDelete = () => {
    dispatch(deleteGame(game.id));
    setShowConfirmDelete(false);
  };

  const handleEdit = () => {
    dispatch(setEditingGame(game));
  };

  return (
    <div className="group relative bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/40 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between">
      
      {/* Partie Haute: Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' : game.image}
          alt={game.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Dégradé d'ombre sur l'image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40"></div>

        {/* Bouton Favori */}
        <button
          onClick={() => dispatch(toggleFavorite(game.id))}
          title={game.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
            game.isFavorite 
              ? 'bg-rose-500/80 text-white shadow-lg shadow-rose-500/30' 
              : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-900/90'
          }`}
        >
          <Heart className={`w-4 h-4 ${game.isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Badge Plateforme */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md border text-xs font-semibold tracking-wide shadow-sm"
             style={{ backdropFilter: 'blur(8px)' }}>
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${platformStyle.bg}`}>
            <PlatformIcon className="w-3.5 h-3.5" />
            <span>{game.platform}</span>
          </span>
        </div>

        {/* Prix flottant sur l'image */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider bg-indigo-600/90 text-white backdrop-blur-md shadow-md border border-indigo-400/30">
            {Number(game.price) === 0 ? 'GRATUIT' : `${Number(game.price).toFixed(2)} €`}
          </span>
        </div>

        {/* Badge Genre */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-950/70 text-slate-300 border border-slate-700/50 backdrop-blur-md">
            <Tag className="w-3 h-3 text-indigo-400" />
            {game.genre}
          </span>
        </div>
      </div>

      {/* Partie Centrale: Détails */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1" title={game.title}>
              {game.title}
            </h3>
          </div>

          {game.description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {game.description}
            </p>
          )}
        </div>

        {/* Métadonnées additionnelles : Note & Année */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 mb-4">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-slate-200">{game.rating || 4.5}</span>
            <span className="text-slate-500">/ 5</span>
          </div>
          <span className="text-slate-500 font-medium">
            {game.releaseYear || '2024'}
          </span>
        </div>

        {/* Boutons d'action : Edit & Delete */}
        <div className="flex items-center gap-2">
          {/* Bouton Edit */}
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold transition-all duration-200 border border-slate-700/60 hover:border-indigo-500 shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modifier</span>
          </button>

          {/* Bouton Delete */}
          {showConfirmDelete ? (
            <div className="flex items-center gap-1 bg-red-950/80 p-1 rounded-xl border border-red-800/60 animate-fadeIn">
              <button
                onClick={handleDelete}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                title="Confirmer la suppression"
              >
                Oui
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded-lg transition-colors"
                title="Annuler"
              >
                Non
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs font-semibold transition-all duration-200 border border-slate-700/60 hover:border-red-500/30"
              title="Supprimer ce jeu"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
