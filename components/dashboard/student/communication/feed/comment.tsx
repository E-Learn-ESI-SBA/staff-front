import { TPayload } from "@/types";
import AvatarComponent from "./avatar";
import { CommentProps, CommunicationUser } from "@/types/communication";
import { Heart } from "lucide-react";
import { useState } from "react";
import { COMMUNICATION_BASE_URL } from "@/config/constants";
import { toast } from "sonner";
import { timeSince } from "./post-header";



export default function Comment({data, postId, user}: {data: CommentProps, postId: string, user: TPayload}) {
    const db_likes = data.likes;
    const initialLiked = db_likes.some(like => like.user.id === user?.id);
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(db_likes.length);

    const handleLike = async () => {
        try {
            const res = await fetch(`${COMMUNICATION_BASE_URL}/posts/${postId}/comments/${data.id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.accessToken}`
                },
                cache: 'no-store',
            });

            if (res.ok) {
                // toast.success(`comment ${liked ? 'unliked' : 'liked'}`);
                setCount(liked ? count - 1 : count + 1);
                setLiked(!liked);
            } else {
                toast.error('Something went wrong...', {
                    style: {
                        backgroundColor: 'red',
                        color: 'white',
                    }
                });
            }

        } catch (error) {
            console.log(error);
            toast.error('Server error...', {
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                }
            });
        }
    }

    return (
    <div className="flex flex-row gap-3 items-center self-start justify-between w-full">
        <div className="flex flex-row gap-3">
            <AvatarComponent src={data.user.avatar} />
            <div className="flex flex-col gap-2 max-w-[50ch]">
                <div>
                    <span className="text-lg font-semibold inline">{data.user?.username}</span>{' '}
                    <span className="text-base">{data.text}</span>
                </div>
                <div className="text-gray-500 flex flex-row gap-4">
                    <div>{count} likes</div>
                    <div>{timeSince(data.created_at)}</div>
                </div>
            </div>
        </div>
        <div 
        onClick={handleLike}
        className="self-start cursor-pointer">
            <Heart className={`hover:fill-red-origin ${liked ? ' fill-red-origin' : ''}`} color={`${liked ? '#D80027' : 'black' }`} />
        </div>
    </div>
    )
}