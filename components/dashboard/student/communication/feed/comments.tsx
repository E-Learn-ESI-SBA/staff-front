import { CommentProps } from "@/types/communication";
import Comment from "./comment";




export default function Comments({ data, className }: { data: CommentProps[], className?: string}) {
    return (
        <div className={`flex flex-col gap-8 ${className} self-start h-full w-full px-4 overflow-y-scroll`}>
            {data.length == 0 && ( <div className="text-xl text-center">No comments yet</div> )}
            {data.map((comment, index) => (
                <Comment key={comment.id} text={comment.text} user={comment.user} />
            ))}
        </div>
    )
}