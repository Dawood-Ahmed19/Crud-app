import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Student {
  id: number;
  name: string;
  contact: number;
}

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students = [...state.students, action.payload];
    },

    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    clearStudents: (state) => {
      state.students = [];
    },
  },
});

export const { addStudent, setStudents, clearStudents } = studentSlice.actions;
export default studentSlice.reducer;
