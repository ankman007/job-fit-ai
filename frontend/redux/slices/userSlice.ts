import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetails {
    username: string;
    email: string;
    location: string;
    id: number;
    bio: string;
    job_title: string;
}

interface UserState {
    userDetails: UserDetails | null;
}

const initialState: UserState = {
    userDetails: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<UserDetails>) {
            state.userDetails = action.payload;
        },
        clearUserDetails(state) {
            state.userDetails = null;
        },
    },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
