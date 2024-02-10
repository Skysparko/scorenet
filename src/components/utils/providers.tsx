"use client";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { useRef } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
