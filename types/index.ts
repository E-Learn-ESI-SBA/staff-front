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
    | "leaderboard"
    | "assignments"
    | "quizzes"
    | "communication"
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
  year:string;
  duration: number;
  max_score: number;
  min_score: number;
  question_count: number;
  start_date: string;
  end_date: string;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  module_id: ECourseType;
  teacher_id : string;
  year : string;
  file?:any;
  deadline: string;
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
  avatar:string;
  accessToken: string;
};


export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  city?: string;
  gender?: string;
  phone_number?: string;
  password?: string;
}

export type Profile = {
  id?: string;
  summary?: string;
  image?: string;
  file ?: any;
  experiences?: {
    role: string;
    company: string;
    start_date: string;
    end_date: string;
    description: string;
  }[];
  projects?: {
    name: string;
    start_date: string;
    end_date: string;
    description: string;
  }[];
  awards?: {
    name: string;
    event: string;
    date: string;
    description: string;
  }[];
  skills?: {
    name: string;
    percentage: number;
  }[];
  other_skills?: string[];
  educations?: {
    institution: string;
    degree: string;
    start_date: string;
    end_date: string;
    description: string;
  }[];
};
