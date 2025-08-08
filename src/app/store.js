import { configureStore } from '@reduxjs/toolkit';
import questionsGameReducer from './../gameContainer/gameSlice';

export const store = configureStore({
    reducer: {
			questionsGame: questionsGameReducer,
    },
})
