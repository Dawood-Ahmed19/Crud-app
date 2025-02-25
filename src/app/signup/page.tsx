"use client";
import SignupSchema from "@import/Validations/SignupSchema";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";

const Signup = (): any => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    {
      resetForm,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      name: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    try {
      console.log("Submitting form:", values);

      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("Invalid JSON response from server");
      }

      if (res.ok) {
        setMessage("Signup Successful!");
        setIsSuccess(true);
        resetForm();
      } else {
        setMessage(`Signup failed: ${data?.error || "Unknown error"}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Signup failed:");
      setIsSuccess(false);
    } finally {
      setSubmitting(false);
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
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
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
              placeholder="Type your email here"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm dark:text-red-400"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <Field
              name="name"
              type="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Type your name here"
            />
            <ErrorMessage
              name="name"
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
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <Field
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password here..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-600 text-sm dark:text-red-400"
            />
          </div>
          <span className="flex gap-2 items-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Signup
            </button>
            <Link href="./login" className="text-gray-400">
              You already have account? Login
            </Link>
          </span>
        </Form>
      </Formik>
    </section>
  );
};

export default Signup;
