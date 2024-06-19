import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default function InstructorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="h-full flex flex-col">
      <TopBar />
      <div className="flex-1 flex">
        <SideBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
