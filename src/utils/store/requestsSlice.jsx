import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        setRequests: (state, action) => {
            return action.payload;
        },
        removeRequests: (state) => {
            return null;
        },
    }
})

export const { setRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;