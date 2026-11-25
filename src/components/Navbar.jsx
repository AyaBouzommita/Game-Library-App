import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectFilters } from '../Redux/gamesSlice';
import { Gamepad2, Plus, Search, Cpu, Sparkles } from 'lucide-react';

const Navbar = ({ onOpenAddModal }) => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(selectFilters);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo & Titre */}
        <div className="flex items-center gap-3.5">
          <div className="relative group cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center group-hover:bg-transparent transition-all">
                <Gamepad2 className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-gaming">
                GAME<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">LIBRARY</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Cpu className="w-3 h-3" /> RTK
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              TP N°6 — Gestion d'état global avec Redux Toolkit
            </p>
          </div>
        </div>

        {/* Barre de Recherche Rapide */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Rechercher par titre, genre ou console..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Actions de droite */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Ajouter un Jeu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
