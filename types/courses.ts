export interface CourseCategory {
	icon: string;
	bgColor: string;
	year: string;
	cycle: string;
	total: number;
}

export interface Chapter {
	name: string;
	id: string;
	module_id: string;
	chapter_number: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface Section {
	name: string;
	course_id: string;
	id?: string;
}

export interface Video extends IResource {
	url: string;
}
export interface Lecture extends IResource {
	content: string;
}
export interface Note extends Lecture {}
export interface SectionWithResources extends Section {
	videos: Video[];
	lectures: Lecture[];
	note?: Note;
	files?: IResource[];
}

export interface IResource {
	name: string;
	id: string;
	createdAt?: Date;
	section_id: string;
	teacher_id: string;
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
