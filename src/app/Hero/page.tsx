"use client";
import Sidebar from "../Components/Sidebar/Sidebar";
import Students from "../Components/Students/Students";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const HomePage = () => {
  const selectedComponent = useSelector(
    (state: RootState) => state.ui.selectedComponent
  );
  return (
    <section className="h-[100vh] flex">
      {selectedComponent === "Students" && <Students />}
    </section>
  );
};

export default HomePage;
