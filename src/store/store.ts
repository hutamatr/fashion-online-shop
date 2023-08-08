import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import productsReducer from './productSlice';
import wishlistReducer from './wishlistSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['products', 'order'],
};

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'auth/loginUser/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['register'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
