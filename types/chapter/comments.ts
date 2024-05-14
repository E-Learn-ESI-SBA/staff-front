export interface Comment {
	id?: string;
	content: string;
	user_id: string;
	course_id: string;
	is_edited: boolean;
	created_at: Date;
	updated_at: Date;
	replays?: Reply[];
	user: User;
}

interface Reply {
	id?: string;
	content: string;
	user_id: string;
	is_edited: boolean;
	created_at: Date;
	updated_at: Date;
	user: User;
}

interface User {
	userId: string;
	avatar: string;
	email: string;
	group: string;
	role: string;
	username: string;
	id?: string;
}
