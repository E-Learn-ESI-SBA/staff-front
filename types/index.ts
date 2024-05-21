import { AssignmentType } from "./assignment";

// Sidebar types -->
export interface SideBarItem {
  label: string;
  icon:
    | "menu"
    | "courses"
    | "profile"
    | "settings"
    | "logout"
    | "discussions"
    | "schedules"
    | "modules";
  url: string;
  isActive?: boolean;
}

// Sidebar types <--
export enum EQuestionType {
  QCM = "QCM",
  SORT = "SORT",
  DRAG_AND_DROP = "DRAG_AND_DROP",
  QROC = "QROC",
}

export enum EQuizType {
  DEVOIR = "DEVOIR",
  TEST = "TEST",
}

export enum ECourseType {
  OOP = "66453ff8a9a6b2a1a507b8a2",
  ANALYSE = "66453ff8a9a6b2a1a507b8a1",
}

export type Exam = {
  id: string;
  title: string;
  instructions: string;
  module_id: ECourseType;
  image: string;
  file: any;
  duration: number;
  max_score: number;
  min_score: number;
  question_count: number;
  start_date: string;
  end_date: string;
};

export type Assignment = {
  id: string;
  assignment_title: string;
  assignment_description: string;
  assignment_type: AssignmentType;
  course: ECourseType;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
};

export type File = {
  url: string;
  name: string;
};

// User

export type TPayload = {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
  group: string;
  year: string;
  username: string;
  avatar:string
};
