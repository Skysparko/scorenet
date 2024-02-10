"use client";
import { useAppDispatch } from "@/store/hooks";
import { otpVerify } from "@/store/slice/auth-slice";
import { IOtpVerifyPayload } from "@/types/auth.type";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { object, string } from "yup";

type TProps = {
  mobileNo: string;
};

const OtpForm = (props: TProps) => {
  const { mobileNo } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
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
        // setOtp((preVal) => preVal.split("").pop().join())
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
                className=" flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 input w-16 h-16"
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
          {/* <div id="inputs" className="inputs">
            <input
              ref={(ref) => {
                if (ref) inputsRef.current[0] = ref;
              }}
              className="input"
              type="text"
              inputMode="numeric"
              maxLength={1}
            />
            <input
              ref={(ref) => {
                if (ref) inputsRef.current[1] = ref;
              }}
              className="input"
              type="text"
              inputMode="numeric"
              maxLength={1}
            />
            <input
              ref={(ref) => {
                if (ref) inputsRef.current[2] = ref;
              }}
              className="input"
              type="text"
              inputMode="numeric"
              maxLength={1}
            />
            <input
              ref={(ref) => {
                if (ref) inputsRef.current[3] = ref;
              }}
              className="input"
              type="text"
              inputMode="numeric"
              maxLength={1}
            />
          </div> */}
          <div className="flex flex-col space-y-5">
            <div>
              <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" >
                Verify Account
              </button>
            </div>

            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't recieve code?</p>
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
