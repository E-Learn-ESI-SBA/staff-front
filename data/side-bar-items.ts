import { SideBarItem } from "@/types";

export const sideBarItemsTeacher: SideBarItem[] = [
  {
    label: "Dashboard",
    icon: "menu",
    url: "/app/teacher",
  },
  {
    label: "My Account",
    icon: "profile",
    url: "/app/teacher/profile",
  },
    {
    label: "Teachers",
    icon: "profile",
    url: "/app/teachers",
  },
  {
    label: "Modules",
    icon: "courses",
    url: "/app/teacher/modules",
  },
  {
    label: "Assignments",
    icon: "assignments",
    url: "/app/teacher/assignment",
  },
  {
    label: "Quizzes",
    icon: "quizzes",
    url: "/app/teacher/quizzes",
  },
  {
    label: "Communication",
    url: "/app/communication",
    icon: "communication",
  },
  {
    label: "Leaderboard",
    url: "/app/leader-board",
    icon: "leaderboard",
  },
];

export const sideBarItemsStudent: SideBarItem[] = [
  {
    label: "Dashboard",
    icon: "menu",
    url: "/app/student",
  },
  {
    label: "My Account",
    icon: "profile",
    url: "/app/student/profile",
  },
      {
    label: "Teachers",
    icon: "profile",
    url: "/app/teachers",
  },
  {
    label: "Modules",
    icon: "courses",
    url: "/app/courses",
  },
  {
    label: "Assignments",
    icon: "assignments",
    url: "/app/student/assignment",
  },
  {
    label: "Quizzes",
    icon: "quizzes",
    url: "/app/student/quiz",
  },
  {
    label: "Communication",
    url: "/app/communication",
    icon: "communication",
  },
  {
    label: "Leaderboard",
    url: "/app/leader-board",
    icon: "leaderboard",
  },
  // {
  //   label: "Settings",
  //   url: "/app/settings",
  //   icon: "settings",
  // },
];