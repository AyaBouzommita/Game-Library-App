import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameCard from './GameCard';
import { resetToDefaultGames, selectAllGames, selectFilters } from '../Redux/gamesSlice';
import { Gamepad2, Sparkles, RefreshCw, PlusCircle, SearchX } from 'lucide-react';

const GameList = ({ onOpenAddModal }) => {
  const dispatch = useDispatch();
  
  // 7. Utiliser useSelector() pour récupérer les jeux depuis le store
  const games = useSelector(selectAllGames);
  const { searchQuery, selectedGenre, selectedPlatform, sortBy } = useSelector(selectFilters);

  // Filtrage et Recherche avancés
  const filteredGames = games
    .filter((game) => {
      const matchesSearch =
        game.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.platform?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === 'All' || game.genre?.toLowerCase() === selectedGenre.toLowerCase();

      const matchesPlatform =
        selectedPlatform === 'All' || game.platform?.toLowerCase() === selectedPlatform.toLowerCase();

      return matchesSearch && matchesGenre && matchesPlatform;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return Number(a.price) - Number(b.price);
      if (sortBy === 'price-desc') return Number(b.price) - Number(a.price);
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'rating-desc') return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      return 0; // default order
    });

  return (
    <div className="space-y-6">
      {/* En-tête de la section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-indigo-400" />
            Bibliothèque de Jeux
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {filteredGames.length} {filteredGames.length > 1 ? 'titres' : 'titre'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gérez vos jeux vidéo synchronisés en temps réel avec Redux Toolkit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(resetToDefaultGames())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            title="Réinitialiser les jeux par défaut"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>

          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nouveau Jeu</span>
            </button>
          )}
        </div>
      </div>

      {/* Grille des jeux ou Message si aucun jeu */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Utiliser map() pour parcourir le tableau et afficher chaque jeu dans GameCard */}
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        /* État vide stylisé */
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-12 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Aucun jeu trouvé</h3>
          <p className="text-sm text-slate-400 mb-6">
            Aucun jeu ne correspond à vos filtres actuels ou la bibliothèque est vide. Essayez de réinitialiser les filtres ou d'ajouter un nouveau titre.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => dispatch(resetToDefaultGames())}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Recharger les jeux de base
            </button>
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                Ajouter un jeu
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameList;
