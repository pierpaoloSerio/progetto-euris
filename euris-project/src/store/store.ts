import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import layoutReducer from '../features/layoutSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
