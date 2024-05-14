import { Comment } from '@/types/chapter/comments';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { H3 } from '../common/typography';
import { timeAgo } from '@/lib/time-ago';
import { Reply } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
	data: Comment;
	setOpenComment: Dispatch<SetStateAction<boolean>>;
};
export const CommentItem = ({ data, setOpenComment }: Props) => {
	const timeAgoValue = timeAgo(data.created_at);
	return (
		<div className="flex items-start justify-between">
			<div className="flex items-start gap-1">
				<Avatar className="w-10 h-10 rounded-lg">
					<AvatarImage src={data.user.avatar} alt={data.user.username} />
					<AvatarFallback>IN</AvatarFallback>
				</Avatar>
				<div className="flex flex-col gap-1">
					<H3 className="text-base font-bold">{data.user.username}</H3>
					<p className="text-xs text-text-GRAY">{timeAgoValue}</p>
				</div>
			</div>
			<div
				className="flex gap-2 cursor-pointer"
				onClick={() => {
					setOpenComment((_) => true);
				}}>
				<span className="text-base text-blue-origin">Replay</span>
				<Reply className="w-4 h-4 text-blue-origin" />
			</div>
		</div>
	);
};
