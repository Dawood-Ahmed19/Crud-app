"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@import/app/store/features/modalSlice";
import { addStudent } from "@import/app/store/features/studentSlice";
import { useState } from "react";

interface Student {
  _id: string;
  userId: string;
  name: string;
  email: string;
  contact: number;
}

const StudentModal = (): any => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.modal.isOpen);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

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

    const newStudent: Student = {
      _id: Date.now().toString(),
      userId,
      name: formData.name,
      email: formData.email,
      contact: Number(formData.contact),
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

    dispatch(toggleModal());
    setFormData({ name: "", email: "", contact: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
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
              onClick={() => dispatch(toggleModal())}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
