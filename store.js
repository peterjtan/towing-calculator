import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import WaterAreaReducer from './slices/waterAreaSlice';

export const store = configureStore({
    reducer: {
        waterArea: WaterAreaReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
});
