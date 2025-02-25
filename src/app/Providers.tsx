"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { setUser } from "./store/features/userSlice"; // Adjust path if needed

function LoadUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch user");
          return;
        }

        const data = await res.json();
        dispatch(setUser({ name: data.name, email: data.email }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LoadUser />
      {children}
    </Provider>
  );
}
