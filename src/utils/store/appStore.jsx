import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        connections: connectionsReducer,
        requests: requestsReducer,
    }
})

export default appStore;