import { SideBarItem } from "@/types";

export const sideBarItems: SideBarItem[] = [
  {
    label: "Dashboard",
    icon: "menu",
    url: "/app/u/s",
  },
  {
    label: "Courses",
    icon: "courses",
    url: "/dashboard/student/courses",
  },
  {
    label: "Teachers",
    icon: "schedules",
    url: "/t",
  },
  {
    label: "Students",
    icon: "schedules",
    url: "/s",
  },
  {
    label: "My Account",
    icon: "profile",
    url: "/dashboard/student/account",
  },
  {
    label: "Settings",
    icon: "settings",
    url: "/dashboard/student/settings",
  },
];
