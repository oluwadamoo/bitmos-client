import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: null,

        loading: false,
        error: false,
    },
    reducers: {
        loadingCat: (state) => {
            state.pending = true;
        },
        categorySaved: (state, action) => {
            state.pending = false;
            state.mainCategory = action.payload;
        },
        loadingError: (state) => {
            state.error = true;
            state.pending = false;
        },

    },
});

export const { isLoading, categorySaved, loadingError } =
    categorySlice.actions;
export default categorySlice.reducer;
