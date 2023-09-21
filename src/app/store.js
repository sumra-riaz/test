import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../redux/modal/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
