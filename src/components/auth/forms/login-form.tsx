"use client";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slice/auth-slice";
import { ILoginUserPayload } from "@/types/auth.type";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { object, string } from "yup";

const initialValues: ILoginUserPayload = {
  mobile_no: "",
  password: "",
};

const validationSchema = object().shape({
  mobile_no: string().required("Required"),
  password: string().required("Required"),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const dispatch = useAppDispatch();
  const router = useRouter()
  async function handleSubmit() {
    try {
      const res = await dispatch(login(formik.values)).unwrap();
      console.log("loginSuccess",res)
      if(res.success){
        if(res.data.bearerToken){
          router.push("/");
        }else{
          router.push("/verify-otp");
        }
      }
    } catch (error) {
      console.log("loginError",error);
    }
  }
  return (
    <div className="mt-8">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
          >
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile_no"
            id="mobile_no"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="example@example.com"
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <label
              htmlFor="password"
              className="text-sm text-gray-600 dark:text-gray-200"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Your Password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-6 text-sm text-center text-gray-400">
        Don&#x27;t have an account yet?{" "}
        <Link
          href="/register"
          className="text-blue-500 focus:outline-none focus:underline hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
