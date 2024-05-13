import { Avatar } from "@/components/ui/avatar";
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

export default function Post({ data }: { data: PostProps }) {
  return (
    <div className="text-black feed_border flex flex-row gap-6">
      <div className="flex flex-col justify-start items-center">
        <ArrowBigUp className="h-8 w-8" color="gray" />
        <p className="text-gray-500 font-bold">100</p>
        <ArrowBigDown className="h-8 w-8" color="gray" />
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <p className="font-bold">r/godsword</p>
            <p className="text-sm text-gray-500">23 hours ago</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* caption section probably markdown */}
          <p className="font-bold text-lg">hello there! new to the community</p>
          {data.body}
        </div>
        <div>
          {/* contains post's image (optional) */}
          {data.img && data.img !== "" && (
            <Image
              height={400}
              width={400}
              src={data.img}
              alt="post image"
              className="aspect-square max-h-[600px] object-cover"
            ></Image>
          )}
        </div>
        <div className="flex flex-row justify-between font-semibold">
          <div className="flex flex-row gap-6 items-center">
            {/* this section is for comments/share/save/more */}
            <Item Icon={MessageSquare} text="comment" />
            <Item Icon={Repeat2} text="share" />
            <Item Icon={Bookmark} text="save" />
          </div>
          <Item Icon={ListCollapse} />
        </div>
      </div>
    </div>
  );
}

const Item = ({ Icon, text }: { Icon: any; text?: string }) => {
  return (
    <div className="flex flex-row gap-6 items-center cursor-pointer">
      <Icon className="h-8 w-8" color="gray" />
      {text && <p className="text-gray-500 font-bold">{text}</p>}
    </div>
  );
};
