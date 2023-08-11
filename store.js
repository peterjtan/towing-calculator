import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import TowedObjectWaterFrictionReducer from './slices/towedObjectWaterFrictionSlice';

export const store = configureStore({
    reducer: {
        towedObjectWaterFriction: TowedObjectWaterFrictionReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
});
