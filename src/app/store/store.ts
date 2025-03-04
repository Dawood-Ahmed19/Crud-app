import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import uiReducer from "./features/uiSlice";
import modalReducer from "./features/modalSlice";
import studentReducer from "./features/studentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    modal: modalReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
