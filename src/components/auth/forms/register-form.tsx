"use client";
import ImageCropper from "@/components/cropper/image-cropper";
import { useAppDispatch } from "@/store/hooks";
import { register } from "@/store/slice/auth-slice";
import { IRegisterUserPayload } from "@/types/auth.type";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { object, ref, string } from "yup";
const initialValues = {
  city: "",
  email: "",
  mobile_no: "",
  name: "",
  password: "",
};
const validationSchema = object().shape({
  city: string().required("Required"),
  email: string().required("Required"),
  mobile_no: string().required("Required"),
  name: string().required("Required"),
  password: string().required("Required"),
  confirmPassword: string()
    .required("Required")
    .oneOf([ref("password")], "Passwords must match"),
});

const RegisterForm = () => {
  const router = useRouter();
  const [croppedImage, setCroppedImage] = useState<string>("");
  const formik = useFormik({
    initialValues: { ...initialValues, confirmPassword: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const dispatch = useAppDispatch();
  async function handleSubmit() {
    try {
      if (croppedImage) {
        const payload: IRegisterUserPayload = {
          ...formik.values,
          image: croppedImage,
        };
        const res = await dispatch(register(payload)).unwrap();
        if (res.success) {
          if (res.data.bearerToken) {
            router.push("/");
          } else {
            router.push("/verify-otp");
          }
        }
      } else {
        console.log("not image found");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <>
      <ImageCropper
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
      />
      <div>
        <form
          className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="John"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Phone number
            </label>
            <Input
              type="text"
              name="mobile_no"
              placeholder="XXX-XX-XXXX-XXX"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Email address
            </label>
            <Input
              type="email"
              name="email"
              placeholder="johnsnow@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              City
            </label>
            <Input
              type="text"
              name="city"
              placeholder="jodhpur"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Confirm password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <Button color="primary" type="submit">
            <span>Sign Up </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 rtl:-scale-x-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
