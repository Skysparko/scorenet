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
  const [showImageError, setShowImageError] = useState(false);
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
        showImageError={showImageError}
        setShowImageError={setShowImageError}
      />
      <div>
        <form
          className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2"
          onSubmit={(e) => {
            !croppedImage && setShowImageError(true);
            formik.handleSubmit(e);
          }}
        >
          <div>
            <Input
              type="text"
              id="name"
              name="name"
              label="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={(formik.errors.name && formik.touched.name) as boolean}
              errorMessage={
                formik.errors.name && formik.touched.name && formik.errors.name
              }
            />
          </div>

          <div>
            <Input
              type="number"
              name="mobile_no"
              label="Mobile number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.errors.mobile_no && formik.touched.mobile_no) as boolean
              }
              errorMessage={
                formik.errors.mobile_no &&
                formik.touched.mobile_no &&
                formik.errors.mobile_no
              }
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              label="Email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.errors.email && formik.touched.email) as boolean
              }
              errorMessage={
                formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
              }
            />
          </div>

          <div>
            <Input
              type="text"
              name="city"
              label="City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={(formik.errors.city && formik.touched.city) as boolean}
              errorMessage={
                formik.errors.city && formik.touched.city && formik.errors.city
              }
            />
          </div>

          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.errors.password && formik.touched.password) as boolean
              }
              errorMessage={
                formik.errors.password &&
                formik.touched.password &&
                formik.errors.password
              }
            />
          </div>

          <div>
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.errors.confirmPassword &&
                  formik.touched.confirmPassword) as boolean
              }
              errorMessage={
                formik.errors.confirmPassword &&
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
              }
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
