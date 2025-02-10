import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";
import feedReducer from "./feedSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        connections: connectionsReducer,
        requests: requestsReducer,
        feed: feedReducer,
    }
})

export default appStore;