import CustomNavbar from "@/components/navbar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};

export default layout;
