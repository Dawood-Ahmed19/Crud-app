"use client";

import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { deleteStudent } from "@import/app/store/features/studentSlice";
import { Student } from "@import/app/store/features/studentSlice";
const StudentCard = ({ student }: { student: any }) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not found! Please log in again.");
      return;
    }

    const storedStudents: Student[] = JSON.parse(
      localStorage.getItem(`students_${userId}`) || "[]"
    );

    const updatedStudents = storedStudents.filter((s: Student) => s._id !== id);

    localStorage.setItem(`students_${userId}`, JSON.stringify(updatedStudents));

    dispatch(deleteStudent(id));
  };

  return (
    <div className="flex w-full items-center justify-between py-8 px-4 bg-white rounded-lg">
      <p className="w-1/4">{student.name}</p>
      <p className="w-1/4">{student.email}</p>
      <p className="w-1/4">{student.contact}</p>
      <p className="w-1/4">{student.date}</p>
      <div className="w-1/12 flex gap-4 justify-center">
        <FontAwesomeIcon
          icon={faPencil}
          className="text-blue-500 cursor-pointer"
        />
        <button onClick={() => handleDelete(student._id)}>
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-500 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
