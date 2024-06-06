import { Avatar } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PostProps } from "@/types/communication";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  ArrowBigUp,
  ArrowBigDown,
  Repeat2,
  Bookmark,
  ListCollapse,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Vote } from "@/types/communication";
import { toast } from "sonner";
import { COMMUNICATION_BASE_URL, TEST_TOKEN } from "@/config/constants";
import Item from "./item";
import PostDetails from "./post-details";
import { CountdownTimerIcon } from "@radix-ui/react-icons";


function timeSince(date: string): string {
  const now = new Date();
  const postDate = new Date(date);
  const secondsPast = (now.getTime() - postDate.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }
  return `${Math.floor(secondsPast / 86400)} days ago`;
}

export default function Post({ data }: { data: PostProps }) {
  // will get the id from the token later
  // ps: my pc ran out of memory can't run staff service
  const votes = data.votes;
  const isVotedVal = votes.find((vote: Vote) => vote.user.id === "c0f6e869-840b-4963-8c58-6453b5d5cae5");
  const [Vote, setVote] = useState<Vote | null>(isVotedVal || null);
  const [count, setCount] = useState<number>(data.upvotes_count - data.downvotes_count);
  const [isSaved, setIsSaved] = useState<boolean>(data.isSaved);

  const handleSave = async () => {
    try {
      const res = await fetch(`${COMMUNICATION_BASE_URL}/posts/${data.id}/save`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TEST_TOKEN}`,
        },
      });

      if (res.ok) {
        toast.success(`post ${isSaved ? 'unsaved' : 'saved'} successfully!`);
        setIsSaved(!isSaved);
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      toast.error("something went wrong...");
    }
  }

  const handleVote = async (vote: 'up' | 'down') => {
    try {
      const res = await fetch(`${COMMUNICATION_BASE_URL}/votes/${data.id}/${vote}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TEST_TOKEN}`,
        },
      });

      if (res.ok) {
        if (!Vote) {
          setVote({ id: "1", user: { id: "c0f6e869-840b-4963-8c58-6453b5d5cae5" }, vote });
          setCount(vote === 'up' ? count + 1 : count - 1);
        } else {
          if (Vote.vote === vote) {
            setVote(null);
            setCount(vote === 'up' ? count - 1 : count + 1);
          } else {
            setVote({ id: "1", user: { id: "c0f6e869-840b-4963-8c58-6453b5d5cae5" }, vote });
            setCount(vote === 'up' ? count + 2 : count - 2);
          }
        }
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      toast.error("something went wrong...");
    }
  }

  return (
    <div className="text-black feed_border flex flex-row gap-6">
      <div className="flex flex-col justify-start items-center">
        <div className="cursor-pointer" onClick={() => handleVote('up')}>
          <ArrowBigUp className={`h-8 w-8 ${(Vote && Vote.vote == 'up') ? 'fill-blue-500' : '' }`} color={`${(Vote && Vote.vote == 'up') ? '#3b82f6' : 'gray'}`} />
        </div>
        <p className="text-gray-500 font-bold">{count}</p>
        <div className=" cursor-pointer" onClick={() => handleVote('down')}>
          <ArrowBigDown className={`h-8 w-8 ${(Vote && Vote.vote == 'down') ? 'fill-blue-500' : '' }`} color={`${(Vote && Vote.vote == 'down') ? '#3b82f6' : 'gray'}`} />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <p className="font-bold">r/godsword</p>
            <p className="text-sm text-gray-500">{timeSince(data.created_at)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* caption section probably markdown */}
          {data.header && (<p className="font-bold text-lg">{data.header}</p>)}
          {data.text}
        </div>
        <div>
          {/* contains post's images (optional) */}
          {data.images.length > 0 && (
            <Carousel className="w-full h-full max-w-md mx-auto">
              <CarouselContent>
                {data.images.length > 0 ? (
                  data.images.map((img, index) => (
                    <CarouselItem key={index}>
                      <Image
                        height={600}
                        width={1000}
                        src={img}
                        alt="post image"
                        className="aspect-square max-h-[600px] object-cover"
                      ></Image>
                    </CarouselItem>
                  ))
                ): null}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
        <div className="flex flex-row justify-end font-semibold">
          <div className="flex flex-row gap-6 items-center">
            {/* this section is for comments/share/save/more */}
            {/* <Item Icon={MessageSquare} text="comment" count={data.comments_count} /> */}
            <PostDetails data={data} />
            {/* <Item Icon={Repeat2} text="share" /> */}
            <Item
              Icon={Bookmark}
              text="save"
              className={`${isSaved ? ' fill-blue-500' : ''}`}
              color={`${isSaved ? '#3b82f6' : 'gray'}`}
              onClick={() => handleSave()}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
