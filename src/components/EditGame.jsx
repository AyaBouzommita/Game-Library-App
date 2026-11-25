import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGame, clearEditingGame, selectEditingGame } from '../Redux/gamesSlice';
import { 
  Edit3, 
  X, 
  Save, 
  AlertCircle, 
  Check, 
  Eye, 
  Tag, 
  Monitor, 
  DollarSign 
} from 'lucide-react';

const PLATFORMS = [
  'PC',
  'PlayStation 5',
  'PlayStation 4',
  'Xbox Series X',
  'Xbox One',
  'Nintendo Switch'
];

const GENRES = [
  'Action',
  'Action-Aventure',
  'RPG',
  'Action RPG',
  'Soulslike',
  'Aventure',
  'Metroidvania',
  'FPS / Shooter',
  'Course / Sport',
  'Stratégie / Sandbox'
];

const EditGame = ({ gameToEdit, onClose }) => {
  const dispatch = useDispatch();
  
  // Récupérer le jeu sélectionné depuis le store Redux si non passé en prop directe
  const selectedFromStore = useSelector(selectEditingGame);
  const activeGame = gameToEdit || selectedFromStore;

  // État local synchronisé avec les données du jeu sélectionné
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Action',
    platform: 'PC',
    price: '',
    image: '',
    description: '',
    rating: '4.8',
    releaseYear: '2024'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Charger les données du jeu sélectionné à chaque changement de jeu actif
  useEffect(() => {
    if (activeGame) {
      setFormData({
        title: activeGame.title || '',
        genre: activeGame.genre || 'Action',
        platform: activeGame.platform || 'PC',
        price: activeGame.price !== undefined ? activeGame.price.toString() : '',
        image: activeGame.image || '',
        description: activeGame.description || '',
        rating: activeGame.rating !== undefined ? activeGame.rating.toString() : '4.5',
        releaseYear: activeGame.releaseYear !== undefined ? activeGame.releaseYear.toString() : '2024'
      });
      setErrors({});
    }
  }, [activeGame]);

  if (!activeGame) {
    return null; // Ne rien afficher si aucun jeu n'est en cours d'édition
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleClose = () => {
    dispatch(clearEditingGame());
    if (onClose) onClose();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est obligatoire';
    if (formData.price === '' || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Veuillez saisir un prix valide';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // 10. Déclencher l’action updateGame pour mettre à jour le jeu dans le store
    dispatch(
      updateGame({
        id: activeGame.id,
        title: formData.title.trim(),
        genre: formData.genre,
        platform: formData.platform,
        price: parseFloat(formData.price),
        image: formData.image.trim() || activeGame.image,
        description: formData.description.trim(),
        rating: parseFloat(formData.rating) || activeGame.rating || 4.5,
        releaseYear: parseInt(formData.releaseYear) || activeGame.releaseYear || 2024
      })
    );

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      handleClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header Modal */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 px-6 sm:px-8 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Modifier le Jeu : <span className="text-amber-400">{activeGame.title}</span>
              </h2>
              <p className="text-xs text-slate-400">
                Identifiant ID : #{activeGame.id}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps du formulaire */}
        <div className="p-6 sm:p-8 space-y-6">
          {success && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Jeu mis à jour avec succès dans le Store Redux !
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Titre */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Titre du Jeu <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm ${
                  errors.title ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                }`}
              />
              {errors.title && (
                <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Genre & Plateforme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Genre
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g} className="bg-slate-900 text-slate-200">
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Plateforme
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p} className="bg-slate-900 text-slate-200">
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prix, Note & Année */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Prix (€) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm ${
                    errors.price ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                  }`}
                />
                {errors.price && (
                  <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Note (/5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Année
                </label>
                <input
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                URL de l'image (Poster)
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
                {formData.image && (
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex-shrink-0">
                    <img
                      src={formData.image}
                      alt="Miniature"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all duration-200"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer les Modifications</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGame;
