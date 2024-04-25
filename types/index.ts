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
    | "schedules";
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
  OOP = "OOP",
  ANALYSE = "Analyse",
}

export type Exam = {
  createdAt: string;
  id: string;
  quiz_title: string;
  quiz_instructions: string;
  quiz_type: EQuizType;
  course: ECourseType;
  quiz_duration: number;
  question_time_limit: number;
  questions_count: number;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
};
