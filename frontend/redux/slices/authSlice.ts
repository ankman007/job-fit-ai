import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

interface RootState {
  auth: AuthState;
}

const SESSION_DURATION_MS = 60 * 60 * 1000;

let autoLogoutTimerId: NodeJS.Timeout | null = null;

interface AuthState {
  accessToken: string;
  expiryTime: number | null;
}

const getInitialAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('accessToken');
    const storedExpiryTime = localStorage.getItem('tokenExpiryTime');

    if (storedToken && storedExpiryTime) {
      const expiryTime = parseInt(storedExpiryTime, 10);

      if (Date.now() < expiryTime) {
        return {
          accessToken: storedToken,
          expiryTime: expiryTime,
        };
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiryTime');
      }
    }
  }
  return {
    accessToken: "",
    expiryTime: null,
  };
};

const initialState: AuthState = getInitialAuthState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ accessToken: string; durationMs: number }>
    ) => {
      state.accessToken = action.payload.accessToken;
      const newExpiryTime = Date.now() + action.payload.durationMs;
      state.expiryTime = newExpiryTime;

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('tokenExpiryTime', newExpiryTime.toString());
      }
    },
    clearAuthData: (state) => {
      state.accessToken = "";
      state.expiryTime = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiryTime');
      }
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export const loginAndStartTimer =
  (accessToken: string, durationMs: number = SESSION_DURATION_MS) =>
  (dispatch: Dispatch) => {
    if (autoLogoutTimerId) {
      clearTimeout(autoLogoutTimerId);
    }

    dispatch(setAuthData({ accessToken, durationMs }));

    autoLogoutTimerId = setTimeout(() => {
      dispatch(logoutAndClearTimer());
    }, durationMs);
  };

export const logoutAndClearTimer =
  () =>
  (dispatch: Dispatch) => {
    dispatch(clearAuthData());

    if (autoLogoutTimerId) {
      clearTimeout(autoLogoutTimerId);
      autoLogoutTimerId = null;
    }
  };

export const initializeAuth =
  () =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { accessToken, expiryTime } = getState().auth;

    if (accessToken && expiryTime) {
      const remainingTimeMs = expiryTime - Date.now();

      if (remainingTimeMs > 0) {
        if (autoLogoutTimerId) {
          clearTimeout(autoLogoutTimerId);
        }
        autoLogoutTimerId = setTimeout(() => {
          dispatch(logoutAndClearTimer());
        }, remainingTimeMs);
      } else {
        dispatch(logoutAndClearTimer());
      }
    }
  };

export default authSlice.reducer;
