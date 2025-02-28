"use client";

const Students = (): any => {
  return (
    <section className="w-full px-7 py-20">
      <span className="flex w-full items-center justify-between">
        <h1 className="font-bold text-3xl">Student List</h1>
        <button className="px-10 py-2 bg-[#FEAF00] text-white rounded-lg">
          Add New Student
        </button>
      </span>
      <hr className="text-gray-400 opacity-35 mt-3" />
      <span className="flex items-center justify-around mt-3">
        <p className="text-gray-400">Name</p>
        <p className="text-gray-400">Email</p>
        <p className="text-gray-400">Phone</p>
        <p className="text-gray-400">Date of Admission</p>
      </span>
    </section>
  );
};

export default Students;
