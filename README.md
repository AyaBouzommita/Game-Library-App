# 🎮 TP N°6 — Redux Toolkit : Game Library APP

Bienvenue dans l'application **Game Library**, développée dans le cadre du **TP N°6 sur Redux Toolkit & React-Redux**.
Cette solution respecte rigoureusement l'ensemble des questions du TP tout en apportant une finition professionnelle moderne (Dark Mode Gaming, Glassmorphism, Recherche dynamique, Filtres, KPIs et Toast notifications).

---

## 📁 Architecture du Projet (Conforme à l'énoncé)

```text
src/
├── Redux/
│   ├── store.js            # Configuration du Store Redux (configureStore)
│   └── gamesSlice.js       # Slice RTK (createSlice) avec actions et reducers
├── components/
│   ├── GameList.jsx        # Liste des jeux avec useSelector() et map()
│   ├── GameCard.jsx        # Carte de jeu individuelle (image, titre, prix, actions)
│   ├── AddGame.jsx         # Formulaire d'ajout d'un jeu (useDispatch + addGame)
│   ├── AddGameAdd.jsx      # Alias conforme au diagramme de l'énoncé
│   ├── EditGame.jsx        # Modal de modification (useDispatch + updateGame)
│   ├── Navbar.jsx          # Barre de navigation avec recherche en direct
│   ├── StatsBar.jsx        # Statistiques en temps réel du catalogue
│   └── FilterBar.jsx       # Filtrage par genre, plateforme et tri
├── App.jsx                 # Composant racine orchestrant l'interface
├── main.jsx                # Point d'entrée avec <Provider store={store}>
└── index.css               # Styles Tailwind CSS et effets Glassmorphism
```

---

## 🚀 Réponse détaillée aux Questions du TP

### 1. Installation des bibliothèques nécessaires
```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Organisation du projet
Les dossiers `src/Redux/` et `src/components/` ont été créés avec tous les fichiers demandés.

### 3 & 4. Création du Slice `games` et des reducers (`src/Redux/gamesSlice.js`)
Le slice est créé via `createSlice()` avec le nom `'games'` et contient les reducers suivants :
- `addGame` : Ajoute un nouveau jeu au début du tableau.
- `deleteGame` : Supprime un jeu à partir de son `id` unique.
- `updateGame` : Modifie les informations d'un jeu existant.
- *Bonus pro* : `toggleFavorite`, `setSearchQuery`, `setSelectedGenre`, `setSelectedPlatform`, `setSortBy`, `resetToDefaultGames`.

### 5. Configuration du store (`src/Redux/store.js`)
Configuration via `configureStore()` avec `gamesReducer`.

### 6. Provider dans `main.jsx`
L'application `<App />` est entourée par `<Provider store={store}>` importé de `react-redux`.

### 7. Composant `GameList.jsx`
- Récupération des jeux grâce au hook `useSelector()`.
- Rendu dynamique avec `map()`.
- Affichage de chaque élément dans `GameCard.jsx` avec image, titre, genre, plateforme et prix.

### 8. Formulaire `AddGame.jsx`
- Récupère les saisies (Titre, Genre, Plateforme, Prix, Image, Description).
- Utilise `useDispatch()` pour envoyer l'action `addGame(payload)`.
- Intègre des raccourcis d'images d'exemple pour tester rapidement sans chercher de lien.

### 9. Bouton Delete dans `GameCard.jsx`
- Clic sur "Supprimer" déclenche `dispatch(deleteGame(game.id))` avec confirmation de sécurité.

### 10. Bouton Edit & Composant `EditGame.jsx`
- Clic sur "Modifier" charge les données du jeu dans le formulaire d'édition.
- Clic sur "Enregistrer" déclenche `dispatch(updateGame(updatedData))`.

---

## ⚡ Démarrage Rapide

Pour lancer l'application en mode développement :
```bash
npm run dev
```

Pour compiler le projet :
```bash
npm run build
```
