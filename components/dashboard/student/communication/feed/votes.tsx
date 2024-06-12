import { COMMUNICATION_BASE_URL } from "@/config/constants";
import { TPayload } from "@/types";
import { Vote } from "@/types/communication";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";




export default function Votes({ upvotes_count, downvotes_count, user, postId, votes }: { upvotes_count: number, downvotes_count: number, user: TPayload | null, postId: string, votes: Vote[]}) {
    const [Vote, setVote] = useState<Vote | null>(null);
    const [count, setCount] = useState<number>(upvotes_count - downvotes_count);

    useEffect(() => {
        const isVotedVal = votes?.find((vote: Vote) => vote.user.id === user?.id);
        setVote(isVotedVal || null);
    }, [user])

    const handleVote = async (vote: 'up' | 'down') => {
        try {
          const res = await fetch(`${COMMUNICATION_BASE_URL}/votes/${postId}/${vote}`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${user?.accessToken!}`,
            },
          });
    
          if (res.ok) {
            if (!Vote) {
              setVote({ id: "1", user: { id: user?.id! }, vote });
              setCount(vote === 'up' ? count + 1 : count - 1);
            } else {
              if (Vote.vote === vote) {
                setVote(null);
                setCount(vote === 'up' ? count - 1 : count + 1);
              } else {
                setVote({ id: "1", user: { id: user?.id! }, vote });
                setCount(vote === 'up' ? count + 2 : count - 2);
              }
            }
          } else {
            toast.error("something went wrong...", {
              style: {
                backgroundColor: "red",
                color: "white",
              }
            });
          }
        } catch (error) {
          toast.error("something went wrong...", {
            style: {
              backgroundColor: "red",
              color: "white",
            }
          });
        }
      }

    return (
        <div className="flex flex-col justify-start items-center">
            <div className="cursor-pointer" onClick={() => handleVote('up')}>
              <ArrowBigUp className={`h-8 w-8 hover:fill-blue-500 ${(Vote && Vote.vote == 'up') ? 'fill-blue-500' : '' }`} color={`#3b82f6`} />
            </div>
            <p className="text-blue-500 font-bold text-center pt-[3px]">{count}</p>
            <div className=" cursor-pointer" onClick={() => handleVote('down')}>
              <ArrowBigDown className={`h-8 w-8 hover:fill-blue-500 ${(Vote && Vote.vote == 'down') ? 'fill-blue-500' : '' }`} color={`#3b82f6`} />
            </div>
      </div>
    )
}