import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string;
}

const getInitialToken = (key: string): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || "";
  }
  return "";
};

const initialState: AuthState = {
  accessToken: getInitialToken('accessToken'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
      }
    },
    clearTokens: (state) => {
      state.accessToken = "";

      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;