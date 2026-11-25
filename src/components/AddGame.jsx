import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGame } from '../Redux/gamesSlice';
import { 
  PlusCircle, 
  Image, 
  Gamepad, 
  DollarSign, 
  Layers, 
  Sparkles, 
  X, 
  Check, 
  AlertCircle 
} from 'lucide-react';

// Exemples d'images prédéfinies pour faciliter la saisie rapide
const PRESET_IMAGES = [
  { name: 'GTA V', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Aventure', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fantasy', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
  { name: 'Combat', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80' }
];

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

const AddGame = ({ onClose, onSuccess }) => {
  // 8. Utiliser useDispatch() pour envoyer l'action addGame
  const dispatch = useDispatch();

  // État local du formulaire
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Action',
    platform: 'PC',
    price: '',
    image: '',
    description: '',
    rating: '4.8',
    releaseYear: new Date().getFullYear().toString()
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Sélection d'une image prédéfinie
  const handleSelectPreset = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }
    if (formData.price === '' || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Veuillez saisir un prix valide (>= 0)';
    }
    if (!formData.genre) {
      newErrors.genre = 'Veuillez sélectionner un genre';
    }
    if (!formData.platform) {
      newErrors.platform = 'Veuillez sélectionner une plateforme';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Préparation du payload
    const newGamePayload = {
      title: formData.title.trim(),
      genre: formData.genre,
      platform: formData.platform,
      price: parseFloat(formData.price),
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      description: formData.description.trim() || `Jeu vidéo ${formData.title} sur ${formData.platform}.`,
      rating: parseFloat(formData.rating) || 4.5,
      releaseYear: parseInt(formData.releaseYear) || new Date().getFullYear()
    };

    // Déclencher l'action addGame dans le store Redux
    dispatch(addGame(newGamePayload));

    // Message de succès temporaire
    setSuccessMessage(true);

    // Réinitialiser le formulaire
    setFormData({
      title: '',
      genre: 'Action',
      platform: 'PC',
      price: '',
      image: '',
      description: '',
      rating: '4.8',
      releaseYear: new Date().getFullYear().toString()
    });

    if (onSuccess) {
      onSuccess();
    }

    // Fermer le modal si fourni
    setTimeout(() => {
      setSuccessMessage(false);
      if (onClose) onClose();
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Ajouter un Nouveau Jeu
            </h2>
            <p className="text-xs text-slate-400">
              Remplissez les détails pour enregistrer le jeu dans le store Redux
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Message de confirmation */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-fadeIn">
          <Check className="w-5 h-5" />
          <span className="text-sm font-semibold">
            Jeu ajouté avec succès dans le Store Redux !
          </span>
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Titre du jeu */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Titre du Jeu <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Elden Ring, The Witcher 3..."
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm ${
                errors.title ? 'border-rose-500 ring-rose-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.title && (
            <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Ligne : Genre & Plateforme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Genre <span className="text-rose-400">*</span>
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre} className="bg-slate-900 text-slate-200">
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Plateforme <span className="text-rose-400">*</span>
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform} className="bg-slate-900 text-slate-200">
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ligne : Prix, Note & Année */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Prix (€) <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="49.99"
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm ${
                  errors.price ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.price && (
              <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Note (sur 5)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.8"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Année de Sortie
            </label>
            <input
              type="number"
              min="1980"
              max="2035"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              placeholder="2024"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* URL de l'image */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            URL de l'image (Poster)
          </label>
          <div className="relative mb-2">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Sélecteur rapide d'images d'exemple */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[11px] text-slate-400">Exemples rapides :</span>
            {PRESET_IMAGES.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleSelectPreset(preset.url)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Prévisualisation de l'image */}
          {formData.image && (
            <div className="mt-3 relative w-36 h-20 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
              <img
                src={formData.image}
                alt="Aperçu"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 px-1.5 py-0.5 rounded text-white">
                Aperçu
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Description (Optionnelle)
          </label>
          <textarea
            name="description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            placeholder="Résumé de l'histoire, univers, gameplay..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
          ></textarea>
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
            >
              Annuler
            </button>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ajouter à la Bibliothèque</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGame;
