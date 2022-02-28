import { createSlice } from "@reduxjs/toolkit";

export const locationCards = createSlice({
    name: "locationCards",
    initialState: { value: [] },
    reducers: {
        addLocationCard: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        deleteLocationCard: (state, action) => {
            state.value = state.value.filter((card) => card.name.toLowerCase() !== action.payload.name.toLowerCase());
        },
    },
});

export const { addLocationCard, deleteLocationCard } = locationCards.actions;
export default locationCards.reducer;