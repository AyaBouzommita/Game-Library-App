import { createSlice } from '@reduxjs/toolkit';

// Jeux de démonstration initiaux avec des visuels de haute qualité
const initialGamesList = [
  {
    id: '1',
    title: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    platform: 'PC',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    description: 'Incarnez Geralt de Riv, un tueur de monstres à gages dans un vaste monde ouvert fantastique.',
    rating: 4.9,
    releaseYear: 2015,
    isFavorite: true
  },
  {
    id: '2',
    title: 'Cyberpunk 2077',
    genre: 'Action RPG',
    platform: 'PlayStation 5',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Une aventure d\'action-RPG en monde ouvert qui se déroule dans la mégalopole de Night City.',
    rating: 4.6,
    releaseYear: 2020,
    isFavorite: false
  },
  {
    id: '3',
    title: 'Elden Ring',
    genre: 'Soulslike',
    platform: 'PC',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'Levez-vous, Sans-éclat, et puissiez-vous être guidé par la grâce pour brandir la puissance de l\'Anneau d\'Elden.',
    rating: 4.9,
    releaseYear: 2022,
    isFavorite: true
  },
  {
    id: '4',
    title: 'Red Dead Redemption 2',
    genre: 'Aventure',
    platform: 'Xbox Series X',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    description: 'L\'épopée sauvage d\'Arthur Morgan et de la bande de Dutch van der Linde à travers l\'Amérique au crépuscule de l\'ère des hors-la-loi.',
    rating: 4.9,
    releaseYear: 2018,
    isFavorite: true
  },
  {
    id: '5',
    title: 'God of War Ragnarök',
    genre: 'Action-Aventure',
    platform: 'PlayStation 5',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    description: 'Kratos et Atreus doivent s\'aventurer dans chacun des Neuf Royaumes en quête de réponses alors que les forces d\'Asgard se préparent à la bataille.',
    rating: 4.8,
    releaseYear: 2022,
    isFavorite: false
  },
  {
    id: '6',
    title: 'Hollow Knight',
    genre: 'Metroidvania',
    platform: 'Nintendo Switch',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80',
    description: 'Forge votre propre voie à travers les ruines oubliées d\'un royaume d\'insectes et de héros.',
    rating: 4.9,
    releaseYear: 2017,
    isFavorite: false
  }
];

const initialState = {
  // Liste principale des jeux
  items: initialGamesList,
  
  // Jeu actuellement en cours d'édition (si modal/formulaire ouvert)
  editingGame: null,
  
  // Filtres et recherche pour une expérience utilisateur moderne
  searchQuery: '',
  selectedGenre: 'All',
  selectedPlatform: 'All',
  sortBy: 'default' // 'default' | 'price-asc' | 'price-desc' | 'title-asc' | 'rating-desc'
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    // 1. Ajouter un nouveau jeu
    addGame: (state, action) => {
      const newGame = {
        id: action.payload.id || Date.now().toString(),
        title: action.payload.title,
        genre: action.payload.genre,
        platform: action.payload.platform,
        price: parseFloat(action.payload.price) || 0,
        image: action.payload.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        description: action.payload.description || 'Aucune description fournie.',
        rating: action.payload.rating ? parseFloat(action.payload.rating) : 4.5,
        releaseYear: action.payload.releaseYear ? parseInt(action.payload.releaseYear) : new Date().getFullYear(),
        isFavorite: false,
        createdAt: new Date().toISOString()
      };
      // Ajouter au début de la liste pour voir immédiatement l'élément
      state.items.unshift(newGame);
    },

    // 2. Supprimer un jeu à partir de son id
    deleteGame: (state, action) => {
      const idToDelete = action.payload;
      state.items = state.items.filter((game) => game.id !== idToDelete);
      // Si le jeu en cours d'édition est supprimé, fermer le formulaire d'édition
      if (state.editingGame && state.editingGame.id === idToDelete) {
        state.editingGame = null;
      }
    },

    // 3. Modifier les informations d'un jeu existant
    updateGame: (state, action) => {
      const updatedGame = action.payload;
      const index = state.items.findIndex((game) => game.id === updatedGame.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updatedGame,
          price: parseFloat(updatedGame.price) || 0
        };
      }
      state.editingGame = null; // Réinitialiser le mode édition après mise à jour
    },

    // --- Fonctionnalités Bonus Professionnelles ---
    setEditingGame: (state, action) => {
      state.editingGame = action.payload;
    },

    clearEditingGame: (state) => {
      state.editingGame = null;
    },

    toggleFavorite: (state, action) => {
      const id = action.payload;
      const game = state.items.find((g) => g.id === id);
      if (game) {
        game.isFavorite = !game.isFavorite;
      }
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },

    setSelectedPlatform: (state, action) => {
      state.selectedPlatform = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    resetToDefaultGames: (state) => {
      state.items = initialGamesList;
      state.editingGame = null;
      state.searchQuery = '';
      state.selectedGenre = 'All';
      state.selectedPlatform = 'All';
      state.sortBy = 'default';
    }
  }
});

// Export des actions générées automatiquement par createSlice
export const {
  addGame,
  deleteGame,
  updateGame,
  setEditingGame,
  clearEditingGame,
  toggleFavorite,
  setSearchQuery,
  setSelectedGenre,
  setSelectedPlatform,
  setSortBy,
  resetToDefaultGames
} = gamesSlice.actions;

// Sélecteurs utiles pour useSelector
export const selectAllGames = (state) => state.games.items;
export const selectEditingGame = (state) => state.games.editingGame;
export const selectFilters = (state) => ({
  searchQuery: state.games.searchQuery,
  selectedGenre: state.games.selectedGenre,
  selectedPlatform: state.games.selectedPlatform,
  sortBy: state.games.sortBy
});

// Sélecteur pour les statistiques globales
export const selectGamesStats = (state) => {
  const games = state.games.items;
  const totalGames = games.length;
  const totalPrice = games.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  const averagePrice = totalGames > 0 ? (totalPrice / totalGames).toFixed(2) : 0;
  const totalFavorites = games.filter(g => g.isFavorite).length;

  return {
    totalGames,
    totalPrice: totalPrice.toFixed(2),
    averagePrice,
    totalFavorites
  };
};

// Export du reducer par défaut pour le store
export default gamesSlice.reducer;
