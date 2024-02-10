"use client";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { useRef } from "react";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
