import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    email: string;
    location: string;
    id: string;
    bio: string;
    job_title: string;
}

const initialState: UserState = {
    username: "",
    email: "",
    location: "",
    id: "",
    bio: "",
    job_title: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<UserState>) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.location = action.payload.location;
            state.bio = action.payload.bio;
            state.job_title = action.payload.job_title;
        },
        clearUserDetails(state) {
            state.id = "";
            state.username = "";
            state.email = "";
            state.location = "";
            state.bio = "";
            state.job_title = "";
        },
    },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
