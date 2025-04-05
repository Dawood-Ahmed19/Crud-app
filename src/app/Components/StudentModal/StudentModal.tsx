"use client";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@import/app/store/features/modalSlice";
import {
  addStudent,
  updateStudent,
} from "@import/app/store/features/studentSlice";
import { useState, useEffect } from "react";
import { RootState } from "@import/app/store/store";
import { Student } from "@import/app/store/features/studentSlice";

const StudentModal = () => {
  const dispatch = useDispatch();
  const { isOpen, student } = useSelector((state: RootState) => state.modal);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        contact: String(student.contact),
      });
    } else {
      setFormData({ name: "", email: "", contact: "" });
    }
  }, [student]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not found! Please log in again.");
      return;
    }

    if (student) {
      dispatch(
        updateStudent({
          _id: student._id,
          userId: student.userId,
          name: formData.name,
          email: formData.email,
          contact: Number(formData.contact),
          date: student.date,
        })
      );
    } else {
      const newStudent: Student = {
        _id: Date.now().toString(),
        userId,
        name: formData.name,
        email: formData.email,
        contact: Number(formData.contact),
        date: new Date().toISOString().split("T")[0],
      };

      const storedStudents = JSON.parse(
        localStorage.getItem(`students_${userId}`) || "[]"
      );

      if (storedStudents.some((s: Student) => s.email === newStudent.email)) {
        alert("Student already exists!");
        return;
      }

      dispatch(addStudent(newStudent));

      localStorage.setItem(
        `students_${userId}`,
        JSON.stringify([...storedStudents, newStudent])
      );
    }

    dispatch(closeModal());
    setFormData({ name: "", email: "", contact: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {student ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Phone Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {student ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
