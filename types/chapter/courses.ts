import { IDate } from "@/types/common";

export interface CourseCategory {
  icon: string;
  bgColor: string;
  year: string;
  cycle: string;
  total: number;
}

export interface Module extends IDate {
  id?: string;
  name: string;
  year: string;
  speciality: string;
  semester: number;
  coefficient: number;
  teacher_id: string;
  instructors: string[];
  isPublic: boolean;
  plan: string[];
  image: string;
  courses: Chapter[]; // Assuming courses can be of any type
}

export interface Chapter extends IDate {
  name: string;
  id?: string;
  description: string;
  sections: Section[];
}

export interface Section extends IDate {
  name: string;
  teacher_id: string;
  videos: Video[]; // Assuming videos can be of any type
  lectures: Lecture[]; // Assuming lectures can be of any type
  files: File[];
  id?: string;
}

export interface Video extends IResource {
  url: string;
  section_id: string;
}
export interface Lecture extends IResource {
  content: string;
  isPublic: boolean;
}
export interface Note extends Lecture {
  content: string;
}

export interface File extends IResource {
  url: string;
  type: string;
}

export interface IResource extends IDate {
  name: string;
  id: string;
  teacher_id: number;
  groups: number[];
}

export enum ResourceEnum {
  Video = "video",
  Lecture = "lecture",
  Note = "note",
  File = "file",
}
