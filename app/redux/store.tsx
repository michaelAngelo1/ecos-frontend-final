import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authConfig";

const store = configureStore({
  reducer: {
    auth: authReducer,
  }
})

export default store;