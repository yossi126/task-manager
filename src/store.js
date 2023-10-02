import { configureStore } from "@reduxjs/toolkit";
import addUserReducer from "./Features/addUserSlice";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    addUser: addUserReducer,
  },
});
