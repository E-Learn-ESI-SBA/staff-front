import { TPayload } from "@/types";
import AvatarComponent from "./avatar";
import { CommunicationUser } from "@/types/communication";
import { Heart } from "lucide-react";



export default function Comment({text, user}: {text: string, user: CommunicationUser}) {
    return (
    <div className="flex flex-row gap-3 items-center self-start justify-between w-full">
        <div className="flex flex-row gap-3">
            <AvatarComponent src={user.avatar} />
            <div className="flex flex-col gap-2 max-w-[50ch]">
                <div>
                    <span className="text-lg font-semibold inline">{user?.username}</span>{' '}
                    <span className="text-base">{text}</span>
                </div>
                <div className="text-gray-500">
                    25 likes
                </div>
            </div>
        </div>
        <div className="self-start cursor-pointer">
            <Heart />
        </div>
    </div>
    )
}