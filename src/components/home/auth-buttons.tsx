"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { tokens as TK, logOut } from "@/store/slice/auth-slice";
import { useAppDispatch } from "@/store/hooks";
const AuthButtons = () => {
  const router = useRouter();
  const token = useSelector(TK);
  const dispatch = useAppDispatch();
  return (
    <div>
      {token ? (
        <>
          <h1>you are logged IN</h1>
          <Button onClick={() => dispatch(logOut())}>Logout</Button>
        </>
      ) : (
        <>
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/register")}>Register</Button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
