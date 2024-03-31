"use client";
import { useAppDispatch } from "@/store/hooks";
import { loading as LD, login } from "@/store/slice/auth-slice";
import { tokens as TK } from "@/store/slice/auth-slice";

import { ILoginUserPayload } from "@/types/auth.type";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
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
  const router = useRouter();
  const loading = useSelector(LD)
  const token = useSelector(TK)
  async function handleSubmit() {
    try {
      const headers = {
        Authorization:  `Bearer ${token}`
      }
      const res = await dispatch(login({payload:formik.values,headers})).unwrap();
      if (res.success) {
        if (res.data.bearer_token) {
          router.push("/");
        } else {
          router.push("/verify-otp");
        }
      }
    } catch (error) {
      console.log("loginError", error);
    }
  }
  return (
    <div className="mt-8">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Input
            type="text"
            name="mobile_no"
            id="mobile_no"
            label="Mobile Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              (formik.errors.mobile_no &&
              formik.touched.mobile_no ) as boolean
            }
            errorMessage={(formik.errors.mobile_no &&
              formik.touched.mobile_no ) && formik.errors.mobile_no}
          />
        </div>

        <div className="mt-6">
          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              (formik.errors.password &&
              formik.touched.password ) as boolean
            }
            errorMessage={ (formik.errors.password &&
              formik.touched.password ) && formik.errors.password}
          />
          <div className="flex justify-end mt-2">
            <Link href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit" color="primary" className="w-full" isLoading={loading}>
            Sign in
          </Button>
        </div>
      </form>

      <p className="mt-6 text-sm text-center text-gray-400">
        Don&#x27;t have an account yet?
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
