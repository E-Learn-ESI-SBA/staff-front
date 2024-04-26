import { IDate } from '@/types/common';

export interface CourseCategory {
	icon: string;
	bgColor: string;
	year: string;
	cycle: string;
	total: number;
}

export interface Module extends IResource {
	name: string;
	year: number;
	speciality?: string;
	description: string;
	semester: number;
	coefficient: number;
	instructors: number[];
	isPublic: boolean;
	plan: string[];
	image?: string;
}

export interface Chapter extends IResource {
	module_id: string;
	chapter_number: number;
	description: string;
}

export interface Section extends IDate {
	name: string;
	course_id: string;
	id?: string;
}

export interface Video extends IResource {
	url: string;
	section_id: string;
}
export interface Lecture extends IResource {
	content: string;
	section_id: string;
}
export interface Note extends Lecture {}

export interface File extends IResource {
	section_id: string;
}
export interface SectionWithResources extends Section {
	videos: Video[];
	lectures: Lecture[];
	note?: Note;
	files?: File[];
}

export interface IResource extends IDate {
	name: string;
	id: string;
	teacher_id: number;
	groups: number[];
}

export interface ChapterWithSections extends Chapter {
	sections: SectionWithResources[];
}

export enum ResourceEnum {
	Video = 'video',
	Lecture = 'lecture',
	Note = 'note',
	File = 'file',
}
export interface ModulesWithChapters extends Module {
	chapters: ChapterWithSections[];
}
