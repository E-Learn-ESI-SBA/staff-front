"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send } from "lucide-react";
import { TMessage } from "@/types/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { P } from "@/components/common/typography";

type Props = {
  messages: TMessage[];
  currentUserId: string;
};
export function Massager({ messages, currentUserId }: Props) {
  return (
    <div className="flex flex-col  justify-between  border-r">
      <ul className="flex-1 flex flex-col max-h-[80vh]  gap-8 p-2">
        <ScrollArea>
          {messages.map((message, index) => (
            <Message key={index} {...message} currentUserId={currentUserId} />
          ))}
        </ScrollArea>
      </ul>
      <div className="flex  items-center p-4 gap-6 self-end  w-full">
        <Paperclip className="h-6 w-6 text-black" />
        <div className="relative flex-1 w-full">
          <Input
            className=" p-4 pl-8   w-full"
            type="text"
            placeholder="Type a message .."
          />
          <button className="absolute right-2 top-2">
            <Send className="h-6 w-6 text-blue-origin" />
          </button>
        </div>
      </div>
    </div>
  );
}
type MessageProps = TMessage & {
  currentUserId: string;
};

export function Message({
  currentUserId,
  message,
  username,
  previousMessageUserId = "",
  senderId,
  senderImage,
  timestamp,
}: MessageProps) {
  const sendAt = new Date(timestamp).toDateString();
  return (
    <div
      className={`flex gap-2 p-4 items-start ${senderId === currentUserId ? "flex-row-reverse self-end" : ""}`}
    >
      <abbr title={`${username} send at ${sendAt}`}>
        <Avatar
          className={cn(
            "w-12 h-12 rounded-lg",
            senderId === previousMessageUserId ? "opacity-0" : "",
          )}
        >
          <AvatarImage src={senderImage} alt={username} />
          <AvatarFallback>ESI</AvatarFallback>
        </Avatar>
      </abbr>
      <p
        className={`p-2 no-underline max-w-52 rounded-xl flex-1 text-sm ${currentUserId === senderId ? "bg-blue-origin text-white" : "bg-gray-light"}`}
      >
        {message}
      </p>
    </div>
  );
}
