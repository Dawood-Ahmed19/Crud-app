"use client";

import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StudentCard = ({ student }: { student: any }) => {
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
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default StudentCard;
