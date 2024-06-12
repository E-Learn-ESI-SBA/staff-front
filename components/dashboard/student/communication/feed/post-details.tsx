import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CommentProps, PostProps } from "@/types/communication";
import Item from "./item";
import { MessageSquare } from "lucide-react";
import PostImages from "./post-images";
import { COMMUNICATION_BASE_URL } from "@/config/constants";
import { TPayload } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import Comments from "./comments";
import Votes from "./votes";
import CommentField from "./comment-field";
 


export default function PostDetails({ data, user }: { data: PostProps, user: TPayload | null}) {
    const [comments, setComments] = useState<CommentProps[]>([]);


    const fetchPostComments = async (postId: string, accessToken: string) => {
      try {
        const response = await fetch(`${COMMUNICATION_BASE_URL}/posts/${postId}/comments`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          },
          }); 
        const data = await response.json();
        if (!response.ok) {
          toast.error('Something went wrong...', {
            style: {
              backgroundColor: 'red',
              color: 'white',
            }
          });
          return [];
        }
        return data; 
      } catch (error) {
        return []
      }
    
    }


    const handleClickFetchComments = async () => {
        const comments_data = await fetchPostComments(data.id, user!.accessToken);
        setComments(comments_data);
    }

  

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button onClick={handleClickFetchComments} >
                    <Item Icon={MessageSquare} text="comment" color="#3b82f6" count={data.comments_count} className=" hover:text-blue-500" />
                </button>
            </DialogTrigger>
            <DialogContent className={`${data.images.length > 0 ? 'max-w-screen-xl': 'max-w-screen-md'}`}>
                <DialogHeader>
                </DialogHeader>
                <div className="flex flex-row items-start h-[500px] gap-6">
                    {data.images.length > 0 && <PostImages className="w-1/2" images={data.images}/>}
                    <div className={`border-l-2 h-full flex flex-col gap-4 ${data.images.length > 0 ? 'w-1/2 border-gray-400 pl-10' : 'w-full'}`}> 
                      <Comments data={comments} postId={data.id} />
                      <div className="flex flex-row items-center gap-6">
                        <Votes
                          upvotes_count={data.upvotes_count}
                          downvotes_count={data.downvotes_count}
                          postId={data.id}
                          user={user}
                          votes={data.votes}
                        />
                        <CommentField postId={data.id} user={user} setComments={setComments} />
                      </div>
                    </div>
                </div>
            </DialogContent>
    </Dialog>
    )
}