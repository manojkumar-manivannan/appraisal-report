import React from "react";
import SideBar from "@/app/components/layout/SideBar";
import Header from "@/app/components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-clip bg-white">
      <Header />
      <div className="flex h-full flex-grow">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
