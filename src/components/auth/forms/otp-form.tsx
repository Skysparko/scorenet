"use client";
import { useAppDispatch } from "@/store/hooks";
import { otpVerify, loading as LD } from "@/store/slice/auth-slice";
import { IOtpVerifyPayload } from "@/types/auth.type";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { object, string } from "yup";

type TProps = {
  mobileNo: string;
};

const OtpForm = (props: TProps) => {
  const { mobileNo } = props;
  const loading = useSelector(LD);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (otp.length === 4) {
        const payload: IOtpVerifyPayload = {
          mobile_no: mobileNo,
          otp: otp,
        };
        const res = await dispatch(otpVerify(payload)).unwrap();
        if (res.success) {
          if (res.data.bearerToken) {
            router.push("/");
          } else {
            router.push("/verify-otp");
          }
        }
      } else {
        setOtpError(true);
      }
    } catch (error) {
      console.log("loginError", error);
    }
  }
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const val = target.value;

      if (isNaN(Number(val))) {
        target.value = "";
        return;
      }

      if (val !== "") {
        setOtp((preVal) => preVal + val);
        const next = target.nextElementSibling as HTMLInputElement;
        if (next) {
          next.focus();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const target = e.target as HTMLInputElement;
      const key = e.key.toLowerCase();

      if (key === "backspace" || key === "delete") {
        target.value = "";
        const prev = target.previousElementSibling as HTMLInputElement;
        if (prev) {
          prev.focus();
        }
        return;
      }
    };

    inputsRef.current.forEach((input) => {
      input.addEventListener("input", handleInput);
      input.addEventListener("keyup", handleKeyUp);
    });

    return () => {
      inputsRef.current.forEach((input) => {
        input.removeEventListener("input", handleInput);
        input.removeEventListener("keyup", handleKeyUp);
      });
    };
  }, []);

  useEffect(() => {
    if (otp.length === 4) {
      setOtpError(false);
    }
  }, [otp]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-16 text-black">
          <div
            className="flex flex-row items-center justify-between mx-auto w-full max-w-xs inputs"
            id="inputs"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                className={` ${
                  otpError ? "border-red-600" : "border-gray-200"
                } flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border  text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 input w-16 h-16`}
                type="text"
                name=""
                id=""
                inputMode="numeric"
                ref={(ref) => {
                  if (ref) inputsRef.current[index] = ref;
                }}
                maxLength={1}
              />
            ))}
          </div>

          <div className="flex flex-col space-y-5">
            <Button type="submit" color="primary" isLoading={loading}>
              Verify Account
            </Button>

            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn&apos;t recieve code?</p>
              <a
                className="flex flex-row items-center text-blue-600"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
