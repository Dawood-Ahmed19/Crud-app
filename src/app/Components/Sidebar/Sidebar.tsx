"use client";

import {
  faBookmark,
  faChartColumn,
  faGear,
  faGraduationCap,
  faHouse,
  faMoneyBill1,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStudents } from "@import/app/store/features/studentSlice";
import type { AppDispatch } from "@import/app/store/store";
import {
  fetchUser,
  selectUserName,
  selectUserError,
  selectUserLoading,
  logoutUser,
} from "@import/app/store/features/userSlice";
import { useRouter } from "next/navigation";

interface SidebarItem {
  name: string;
  path: string;
  icon: any;
}

const sideBarItems: SidebarItem[] = [
  { name: "Home", path: "/Hero", icon: faHouse },
  { name: "Course", path: "/Hero/course", icon: faBookmark },
  { name: "Students", path: "/Hero/Students", icon: faGraduationCap },
  { name: "Payments", path: "/Hero/payments", icon: faMoneyBill1 },
  { name: "Reports", path: "/Hero/reports", icon: faChartColumn },
  { name: "Settings", path: "/Hero/settings", icon: faGear },
];

const Sidebar = (): any => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const name = useSelector(selectUserName);
  const error = useSelector(selectUserError);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(clearStudents());
    router.push("/");
  };

  return (
    <div className="h-screen w-[15%] flex flex-col justify-between py-[18px] px-[40px] bg-[#F2EAE1]">
      <span>
        <span className="flex items-center">
          <span className="w-1 h-5 bg-yellow-500 mr-2"></span>
          <h1 className="font-bold">Crud Operations</h1>
        </span>
        {loading ? (
          <p>Loading....</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p className="text-bold">{name}</p>
        )}
      </span>
      <span className="flex flex-col gap-8">
        {sideBarItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={item.icon} className="min-w-[20px]" />
            {item.name}
          </button>
        ))}
      </span>
      <span>
        <button
          className="cursor-pointer py-1 px-2 rounded-sm hover:bg-black hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </span>
    </div>
  );
};
export default Sidebar;
