"use client";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  CircleUserRound,
  FileText,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type iconType =
  | "menu"
  | "courses"
  | "profile"
  | "settings"
  | "logout"
  | "discussions"
  | "schedules"
  | "teachers"
  | "students";

type TProps = {
  label: string;
  icon: iconType;
  url: string;
};

export default function SideItem({ label, icon, url }: TProps) {
  // const pathname = "/" + usePathname().split("/")[1];
  const pathname = usePathname();
  console.log(pathname);
  const isActive = pathname.includes(url);
  console.log(url)
  return (
    <Link href={url} className="">
      <Button
        className={`flex ${isActive ? "bg-blue-500 text-white" : "text-text bg-transparent"}  w-60  py-6 flex justify-start hover:bg-blue-500 hover:text-white gap-4 text-lg`}
      >
        {SideIcon(icon)}
        <p>{label}</p>
      </Button>
    </Link>
  );
}

const SideIcon = (icon: iconType) => {
  switch (icon) {
    case "menu":
      return <Menu className="" />;
    case "courses":
      return <FileText />;
    case "profile":
      return <CircleUserRound />;
    case "settings":
      return <Settings />;
    case "discussions":
      return <MessageSquareText />;
    case "logout":
      return <LogOut />;
    case "schedules":
      return <CalendarCheck />;
  }
};
