import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import cheetsheetReducer from './slices/cheetsheetSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        cheatsheets: cheetsheetReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;