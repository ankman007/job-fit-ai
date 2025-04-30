import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cheatsheet {
    id: string;
    user_id: string;
    resume_text: string;
    job_description: string;
    cheatsheet_type: string;
    content: string;
}

interface CheatsheetState {
    cheatsheets: Cheatsheet[];  // Directly store an array of cheatsheets
}

const initialState: CheatsheetState = {
    cheatsheets: [],  // Start with an empty array
};

const cheatsheetSlice = createSlice({
    name: 'cheatsheets',
    initialState,
    reducers: {
        // Set the cheatsheets array directly in the state
        setCheatsheets(state, action: PayloadAction<Cheatsheet[]>) {
            state.cheatsheets = action.payload;
        },
        // Clear the cheatsheets
        clearCheatsheets(state) {
            state.cheatsheets = [];
        },
    },
});

export const { setCheatsheets, clearCheatsheets } = cheatsheetSlice.actions;
export default cheatsheetSlice.reducer;
