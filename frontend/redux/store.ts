import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import cheatsheetsReducer from './slices/cheatsheetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cheatsheets: cheatsheetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 👇 Add this for typing your thunks
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
