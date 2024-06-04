import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PersonProps, SuggestionsProps } from "@/types/communication";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Suggestions({ data }: SuggestionsProps) {
  return (
    <div className="text-black flex flex-col gap-8 mx-16">
      <p className="text-2xl">People you might know</p>
      <div className="flex flex-col gap-4 justify-start">
        {data.map((person) => (
          <Person key={person.id} data={person} />
        ))}
      </div>
      <Link href="#">
        <div className="flex flex-row gap-4 justify-end items-center text-blue-origin">
          <p className="font-semibold">View all recommendations</p>
          <ChevronRight className="h-8 w-8" />
        </div>
      </Link>
    </div>
  );
}

function Person({ data }: PersonProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-16">
      <div className="flex flex-row items-center gap-6 p-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src={data.img} alt="avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-bold text-xl">{data.username}</p>
          <p className=" text-base text-gray-500">
            {data.summary}
          </p>
        </div>
      </div>
      <div>
        {/* to change later button */}
        <button className="border border-blue-origin py-2 px-4 rounded-xl text-xl text-blue-origin hover:bg-blue-origin hover:text-white duration-300">
          Follow
        </button>
      </div>
    </div>
  );
}
