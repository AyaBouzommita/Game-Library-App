import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
