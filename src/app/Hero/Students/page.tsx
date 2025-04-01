"use client";
import StudentCard from "../../Components/StudentCard/StudentCard";
import { useDispatch, useSelector } from "react-redux";
import StudentModal from "../../Components/StudentModal/StudentModal";
import { toggleModal } from "@import/app/store/features/modalSlice";
import {
  addStudent,
  setStudents,
} from "@import/app/store/features/studentSlice";
import { useEffect } from "react";

interface StudentType {
  id: number;
  userId: string;
  name: string;
  email: string;
  contact: number;
}

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector((state: any) => state.students.students);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedStudents = JSON.parse(
      localStorage.getItem(`students_${userId}`) || "[]"
    );
    dispatch(setStudents(storedStudents));
  }, [dispatch, userId]);

  return (
    <section className="w-full h-screen px-7 py-20 bg-gray-100">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-bold text-3xl">Student List</h1>
        <button
          onClick={() => dispatch(toggleModal())}
          className="px-10 py-2 bg-[#EFAF08] text-white rounded-lg"
        >
          Add New Student
        </button>
      </div>

      <hr className="text-gray-400 opacity-35 mt-3" />

      <div className="flex w-full text-gray-700 font-semibold py-2 px-4 mt-3">
        <p className="w-1/4 text-gray-400">Name</p>
        <p className="w-1/4 text-gray-400">Email</p>
        <p className="w-1/4 text-gray-400">Phone</p>
        <p className="w-1/4 text-gray-400">Date of Admission</p>
        <p className="w-1/12 text-center text-gray-400">Actions</p>
      </div>
      <span className="flex flex-col items-center gap-3">
        {students.map((student: any, index: number) => (
          <StudentCard key={index} student={student} />
        ))}
      </span>
      <span>
        <StudentModal />
      </span>
    </section>
  );
};

export default Students;
