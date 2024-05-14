import { Comment } from '@/types/chapter/comments';

export const comments: Comment[] = [
	{
		id: '125564',
		content: 'This is the first comment',
		user_id: 'user1',
		course_id: '125564',
		is_edited: false,
		created_at: new Date(),
		updated_at: new Date(),
		replays: [],
		user: {
			userId: 'user1',
			avatar: 'avatar1.jpg',
			email: 'user1@example.com',
			group: 'Group A',
			role: 'student',
			username: 'user1',
			id: '125564',
		},
	},
	{
		id: '125564',
		content: 'Another comment here',
		user_id: 'user2',
		course_id: '125564',
		is_edited: true,
		created_at: new Date(),
		updated_at: new Date(),

		replays: [
			{
				id: '125564',
				content: 'Reply to the second comment',
				user_id: 'user3',
				is_edited: false,
				created_at: new Date(),
				updated_at: new Date(),
				user: {
					userId: 'user3',
					avatar: 'avatar3.jpg',
					email: 'user3@example.com',
					group: 'Group B',
					role: 'student',
					username: 'user3',
					id: '125564',
				},
			},
		],
		user: {
			userId: 'user2',
			avatar: 'avatar2.jpg',
			email: 'user2@example.com',
			group: 'Group A',
			role: 'instructor',
			username: 'user2',
			id: '125564',
		},
	},
];
