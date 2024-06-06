"use client";
import { PersonType, PostProps } from "@/types/communication";
import NavBar from "../../navBar";
import Left from "./left";
import Right from "./right";

export default function Feed({
  suggestions,
  posts,
}: {
  suggestions: PersonType[];
  posts: PostProps[];
}) {
  return (
    <div className="text-black">
      <div className="flex flex-row w-full">
        <Left className="w-[60%] h-screen" data={posts} />
        <Right className="w-[40%] h-screen" data={suggestions} />
      </div>
    </div>
  );
}
