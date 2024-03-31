"use client";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { useRef } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { NextUIProvider } from "@nextui-org/react";
import CustomNavbar from "../navbar";
import { ToastContainer } from "react-toastify";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <NextUIProvider>
      <ToastContainer />
        {children}
      </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
