import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import GameList from './components/GameList';
import AddGame from './components/AddGame';
import EditGame from './components/EditGame';
import { selectEditingGame, clearEditingGame } from './Redux/gamesSlice';
import { Layers, ShieldCheck, Zap, Database, Code2 } from 'lucide-react';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Le jeu en cours d'édition est géré par l'état global Redux
  const editingGame = useSelector(selectEditingGame);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Barre de Navigation */}
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Contenu Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Bannière Hero Moderne */}
        <div className="relative rounded-3xl overflow-hidden mb-8 border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-purple-950/40 p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" /> TP N°6 — Redux Toolkit & React-Redux
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-gaming">
              GAME LIBRARY <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                APPLICATION
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
              Application professionnelle de gestion de collection de jeux vidéo. Développée avec React, 
              Redux Toolkit (<code className="text-indigo-300 font-mono text-xs">createSlice</code>, <code className="text-indigo-300 font-mono text-xs">configureStore</code>), 
              et les hooks <code className="text-indigo-300 font-mono text-xs">useSelector()</code> et <code className="text-indigo-300 font-mono text-xs">useDispatch()</code>.
            </p>
          </div>

          {/* Décoration en arrière-plan */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-indigo-600/10 to-transparent pointer-events-none" />
        </div>

        {/* Tableau de bord / Statistiques */}
        <StatsBar />

        {/* Barre de Recherche et Filtres */}
        <FilterBar />

        {/* Liste des Jeux vidéo (GameList & GameCard) */}
        <GameList onOpenAddModal={() => setIsAddModalOpen(true)} />

        {/* Section explicative pédagogique du TP */}
        <section className="mt-16 pt-10 border-t border-slate-800/80">
          <h3 className="text-base font-bold text-slate-300 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            Concepts Clés Redux Toolkit Utilisés dans ce TP
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                <Database className="w-4 h-4" /> 1. configureStore()
              </div>
              <p className="text-slate-400">
                Configure le store global de façon simplifiée avec Redux DevTools et les middlewares intégrés par défaut.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-purple-400 mb-1 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> 2. createSlice()
              </div>
              <p className="text-slate-400">
                Regroupe le state initial, les reducers (addGame, deleteGame, updateGame) et génère automatiquement les actions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> 3. useSelector()
              </div>
              <p className="text-slate-400">
                Hook permettant aux composants de lire les données du store Redux avec souscription automatique aux changements.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 4. useDispatch()
              </div>
              <p className="text-slate-400">
                Hook fournissant la référence de la fonction dispatch pour déclencher les actions synchrones vers les reducers.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Modal / Dialog pour Ajouter un Jeu (AddGame) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <AddGame onClose={() => setIsAddModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Modal pour Modifier un Jeu (EditGame) - Déclenché automatiquement quand editingGame est présent */}
      {editingGame && (
        <EditGame 
          gameToEdit={editingGame} 
          onClose={() => dispatch(clearEditingGame())} 
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <p>© 2026 Game Library APP — TP N°6 Redux Toolkit. Réalisé avec React, Redux Toolkit & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
