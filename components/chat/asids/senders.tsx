"use client";

import { H4 } from "@/components/common/typography";
import { Ping } from "@/components/icons/ping";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Person, TMessage } from "@/types/messages";
import { Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  persons: Person[];
};
export function ReceiversAside({ persons }: Props) {
  const { receiver: selectedUser } =
    (useParams() as { receiver: string }) ?? {};
  return (
    <div className="flex flex-col gap-4 p-2 border-r flex-grow">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full">
          <Search className="absolute left-2 top-4 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 max-w-sm bg-gray-light h-12 rounded-lg"
            type="search"
            placeholder="Search .."
          />
        </div>
        <ScrollArea className="w-full h-[680px]">
          {persons.map((person, index) => (
            <Box person={person} key={index} selectedUser={selectedUser} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

type BoxProps = {
  person: Person;
  selectedUser: string;
};
function Box({
  person: { image, lastMessage, lastMessageTime, username, id, isOnline },
  selectedUser,
}: BoxProps) {
  return (
    <Link
      href={`/app/student/chat/${username}`}
      className="flex p-4 rounded-xl gap-2 cursor-pointer  relative hover:bg-gray-light"
    >
      {isOnline && (
        <span className="absolute top-3 z-10 left-3">
          <Ping color="#0F930F" />
        </span>
      )}
      <Avatar className="w-14 h-14 rounded-xl  ">
        <AvatarImage src={image} alt={username} />
        <AvatarFallback>ESI</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 item-center">
        <div className="flex justify-between item-center gap-4">
          <H4 className="text-base font-bold">{username}</H4>
          <p className="text-xs ">{lastMessageTime.slice(0, 10)}</p>
        </div>
        <span className="text-xs">{lastMessage}</span>
      </div>
    </Link>
  );
}
