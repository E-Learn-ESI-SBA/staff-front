"use client";
import { Button } from "@/components/ui/button";
import {
  BookOpenCheck,
  Brain,
  CalendarCheck,
  FileText,
  LayoutGrid,
  LogOut,
  Menu,
  MessageCircle,
  MessageSquareText,
  Package,
  Settings,
  Sword,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type TProps = {
  label: string;
  icon: IconType;
  url: string;
};

export default function SideItem({ label, icon, url }: TProps) {
  // const pathname = "/" + usePathname().split("/")[1];
  const pathname = usePathname();
  const isActive = ["/app/student", "/app/teacher"].includes(url) ? pathname === url : pathname.startsWith(url)
  return (
    <Link href={url} className="">
      <Button
        className={`flex ${isActive ? "bg-blue-500 text-white" : "text-blue-origin bg-transparent"}  w-60  py-6 flex justify-start hover:bg-blue-500 hover:text-white gap-4 text-lg`}
      >
        <SideIcon icon={icon} />
        <p>{label}</p>
      </Button>
    </Link>
  );
}

type IconType =
  "menu"
  | "courses"
  | "profile"
  | "settings"
  | "logout"
  | "discussions"
  | "schedules"
  | "leaderboard"
  | "assignments"
  | "quizzes"
  | "communication"
  | "modules"
  | "profile";
interface SideIconProps {
  icon: IconType;
  [key: string]: any; // allows any additional props
}

const icons: Record<IconType, React.ComponentType<any>> = {
  menu: Menu,
  courses: FileText,
  settings: Settings,
  discussions: MessageSquareText,
  logout: LogOut,
  schedules: CalendarCheck,
  modules: Package,
  assignments: BookOpenCheck,
  communication: MessageCircle,
  quizzes: Sword,
  leaderboard: Brain,
  profile: User,

};

const SideIcon: React.FC<SideIconProps> = ({ icon, ...props }) => {
  const IconComponent = icons[icon] || LayoutGrid;
  return <IconComponent {...props} />;
};