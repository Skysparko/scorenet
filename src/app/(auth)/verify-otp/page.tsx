"use client";
import OtpForm from "@/components/auth/forms/otp-form";
import { store } from "@/store";
import { user as U } from "@/store/slice/auth-slice";
import React from "react";
import { useSelector } from "react-redux";

const OtpPage = () => {
  // const state = store.getState();
  // console.log(state.auth.user.detail?.mobile_no)
  const user = useSelector(U);
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your number {user?.mobile_no}</p>
            </div>
          </div>

          {user?.mobile_no && <OtpForm mobileNo={user?.mobile_no} />}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
