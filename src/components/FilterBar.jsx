import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSelectedGenre, 
  setSelectedPlatform, 
  setSortBy, 
  selectFilters 
} from '../Redux/gamesSlice';
import { Filter, ArrowUpDown, Layers, Monitor } from 'lucide-react';

const GENRES = [
  'All',
  'Action',
  'RPG',
  'Action RPG',
  'Soulslike',
  'Aventure',
  'Metroidvania'
];

const PLATFORMS = [
  { label: 'Toutes Plateformes', value: 'All' },
  { label: 'PC', value: 'PC' },
  { label: 'PlayStation 5', value: 'PlayStation 5' },
  { label: 'Xbox Series X', value: 'Xbox Series X' },
  { label: 'Nintendo Switch', value: 'Nintendo Switch' }
];

const FilterBar = () => {
  const dispatch = useDispatch();
  const { selectedGenre, selectedPlatform, sortBy } = useSelector(selectFilters);

  return (
    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80 mb-6 backdrop-blur-md space-y-4">
      {/* Ligne Filtres & Tris */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Pills de Genre */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Genre:
          </span>
          {GENRES.map((genre) => {
            const isActive = selectedGenre.toLowerCase() === genre.toLowerCase();
            return (
              <button
                key={genre}
                onClick={() => dispatch(setSelectedGenre(genre))}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {genre === 'All' ? 'Tous' : genre}
              </button>
            );
          })}
        </div>

        {/* Dropdowns Plateforme & Tri */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Plateforme */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
            <Monitor className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedPlatform}
              onChange={(e) => dispatch(setSelectedPlatform(e.target.value))}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value} className="bg-slate-900 text-slate-200">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="default" className="bg-slate-900 text-slate-200">Tri par défaut</option>
              <option value="price-asc" className="bg-slate-900 text-slate-200">Prix : Moins cher</option>
              <option value="price-desc" className="bg-slate-900 text-slate-200">Prix : Plus cher</option>
              <option value="title-asc" className="bg-slate-900 text-slate-200">Titre : De A à Z</option>
              <option value="rating-desc" className="bg-slate-900 text-slate-200">Meilleures notes</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;
