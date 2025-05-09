import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cheatsheet {
    id: string;
    user_id: string;
    cheatsheet_type: string;
    content: string;
}

interface CheatsheetState {
    cheatsheets: Cheatsheet[];
}

const initialState: CheatsheetState = {
    cheatsheets: [],
};

const cheatsheetSlice = createSlice({
    name: 'cheatsheets',
    initialState,
    reducers: {
        setCheatsheets(state, action: PayloadAction<Cheatsheet[]>) {
            state.cheatsheets = action.payload;
        },
        clearCheatsheets(state) {
            state.cheatsheets = [];
        },
    },
});

export const { setCheatsheets, clearCheatsheets } = cheatsheetSlice.actions;
export default cheatsheetSlice.reducer;
