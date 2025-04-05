import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "./studentSlice";

interface ModalState {
  isOpen: boolean;
  student: Student | null;
}

const initialState: ModalState = {
  isOpen: false,
  student: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    openEditModal: (state, action: PayloadAction<Student>) => {
      state.isOpen = true;
      state.student = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.student = null;
    },
  },
});

export const { toggleModal, openEditModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
