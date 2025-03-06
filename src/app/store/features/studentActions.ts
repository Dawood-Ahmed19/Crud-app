import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteStudent } from "./studentSlice";

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id: string, { dispatch }) => {
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete Student");
      dispatch(deleteStudent(id));
    } catch (error) {
      console.error("Error Deleting Student", error);
    }
  }
);
