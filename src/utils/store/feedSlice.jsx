import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        setFeed: (state, action) => {
            return action.payload;
        },
        removePost: (state, action) => {
            return state.filter(post => post._id !== action.payload);
        },
    }
})

export const { setFeed, removePost } = feedSlice.actions;
export default feedSlice.reducer;