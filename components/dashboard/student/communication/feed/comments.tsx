import { CommentProps } from "@/types/communication";
import Comment from "./comment";
import { useUserStore } from "@/store/user";




export default function Comments({ data, className, postId }: { data: CommentProps[], className?: string, postId: string}) {
    const { user } = useUserStore();

    return (
        <div className={`flex flex-col gap-8 ${className} self-start h-full w-full px-4 overflow-y-scroll`}>
            {data.length == 0 && ( <div className="text-xl text-center">No comments yet</div> )}
            {data.map((comment, index) => (
                <Comment key={comment.id} data={comment} postId={postId} user={user!} />
            ))}
        </div>
    )
}