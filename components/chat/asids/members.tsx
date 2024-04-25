"use client";

import { H2, H4 } from "@/components/common/typography";
import { Ping } from "@/components/icons/ping";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ISender } from "@/types/messages";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Props = {
  members: ISender[];
};
export function MemberAside({ members }: Props) {
  return (
    <div className="flex flex-col gap-4 flex-grow bar ">
      <H2 className="text-lg font-bold">
        Members:{" "}
        <span className="p-1 bg-light-medium border rounded-full">
          {members.length}
        </span>
      </H2>
      <ul className="flex flex-col gap-1 flex-1 h-[420px] overflow-y-scroll">
        <ScrollArea className="h-[420px]" key="memberscroll">
          {members.map((member, index) => (
            <Box key={index} member={member} />
          ))}
        </ScrollArea>
      </ul>
    </div>
  );
}

type BoxProps = {
  member: ISender;
};
function Box({ member: { image, username, title, isOnline } }: BoxProps) {
  return (
    <li className="flex p-4 rounded-xl gap-2 cursor-pointer relative  hover:bg-gray-light">
      {isOnline && (
        <span className="absolute top-3 z-10 left-3">
          <Ping color="#0F930F" />
        </span>
      )}
      <Avatar className="w-14 h-14 rounded-xl">
        <AvatarImage src={image} alt={username} />
        <AvatarFallback>ESI</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <H4 className="text-base font-bold">{username}</H4>
        <span className="text-xs text-li">{title}</span>
      </div>
    </li>
  );
}
