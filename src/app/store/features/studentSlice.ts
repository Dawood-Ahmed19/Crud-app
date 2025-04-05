import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  _id: string;
  userId: string;
  name: string;
  contact: number;
  email: string;
  date: string;
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
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      state.students = state.students.map((s) =>
        s._id === action.payload._id ? action.payload : s
      );
    },
  },
});

export const {
  addStudent,
  setStudents,
  clearStudents,
  deleteStudent,
  updateStudent,
} = studentSlice.actions;
export default studentSlice.reducer;
