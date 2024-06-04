import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PostProps } from "@/types/communication";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  ArrowBigUp,
  MessageSquare,
  ArrowBigDown,
  Repeat2,
  Bookmark,
  BookmarkCheck,
  ListCollapse,
} from "lucide-react";
import Image from "next/image";


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
  return (
    <div className="text-black feed_border flex flex-row gap-6">
      <div className="flex flex-col justify-start items-center">
        <div className="cursor-pointer">
          <ArrowBigUp className="h-8 w-8" color="gray" />
        </div>
        <p className="text-gray-500 font-bold">{data.upvotes_count - data.downvotes_count}</p>
        <div className=" cursor-pointer">
          <ArrowBigDown className="h-8 w-8" color="gray" />
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
        </div>
        <div className="flex flex-row justify-between font-semibold">
          <div className="flex flex-row gap-6 items-center">
            {/* this section is for comments/share/save/more */}
            <Item Icon={MessageSquare} text="comment" count={data.comments_count} />
            <Item Icon={Repeat2} text="share" />
            <Item Icon={Bookmark} text="save" />
          </div>
          <Item Icon={ListCollapse} />
        </div>
      </div>
    </div>
  );
}

const Item = ({ Icon, text, count }: { Icon: any; text?: string, count?: number }) => {
  return (
    <div className="flex flex-row gap-2 items-center cursor-pointer font-bold">
      <Icon className="h-8 w-8" color="gray" /><span className="text-gray-500">{count}</span>
      {text && <p className="text-gray-500 font-bold">{text}</p>}
    </div>
  );
};
