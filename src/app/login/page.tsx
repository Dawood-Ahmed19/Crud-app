"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginSchema from "@import/Validations/loginSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../store/features/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message);
        return;
      }

      const data = await res.json();

      if (!data.token) {
        setMessage("No token received");
        return;
      }

      sessionStorage.setItem("token", data.token);

      dispatch(setUser({ name: data.user.name, email: data.user.email }));

      setMessage("Login Successful");
      setIsSuccess(true);
      router.push("/Hero");
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred while logging in");
      setIsSuccess(false);
    }
  };

  return (
    <section className="bg-gray-700 flex flex-col gap-5 items-center justify-center h-screen w-full">
      {message && (
        <span
          className={`text-lg px-10 py-2 rounded-lg text-white ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </span>
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-1/4 mx-auto">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@flowbite.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm dark:text-red-400"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <Field
                name="password"
                type="password"
                id="password"
                placeholder="type your password here..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm dark:text-red-400"
              />
            </div>
            <span className="flex gap-2 items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <Link href="./signup" className="text-gray-400">
                You don't have an account? Signup here
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default LoginPage;
