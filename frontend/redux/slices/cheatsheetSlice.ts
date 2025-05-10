import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cheatsheet {
    id: string;
    user_id: string;
    cheatsheet_type: string;
    content: string;
}

interface CheatsheetState {
    cheatsheets: Cheatsheet[];
    currentCheatsheet: Cheatsheet | null;
}

const initialState: CheatsheetState = {
    cheatsheets: [],
    currentCheatsheet: null,
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
        setCurrentCheatsheet(state, action: PayloadAction<Cheatsheet>) {
            state.currentCheatsheet = action.payload;
        },
        addCheatsheet(state, action: PayloadAction<Cheatsheet>) {
            state.cheatsheets.push(action.payload);
        },
    },
});

export const {
    setCheatsheets,
    clearCheatsheets,
    setCurrentCheatsheet,
    addCheatsheet,
} = cheatsheetSlice.actions;

export default cheatsheetSlice.reducer;
