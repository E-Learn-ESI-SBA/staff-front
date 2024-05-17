import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {
  data: {
    name: string;
    username: string;
    userId: string;
    avatar: string;
    views: number;
  };
};
export function VideoFooter({
  data: { name, views, userId, username, avatar },
}: Props) {
  return (
    <footer className="flex flex-col gap-2 w-full p-6 border-t">
      <h2 className="text-lg font-semibold"> {name} </h2>
      <div className="flex justify-between items-center">
        <Link className="flex items-start gap-2 " href={`/user/${userId}`}>
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>RY</AvatarFallback>
          </Avatar>
          <div>
            Teacher:
            <p className=" text-sm text-text-GRAY font-semibold">
              {" "}
              {username}{" "}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <Eye className="text-blue-origin w-5  h-5" />
          {views}
        </div>
      </div>
    </footer>
  );
}
