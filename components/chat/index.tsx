import { ISender } from "@/types/messages";
import styles from "./style.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, GripVertical } from "lucide-react";
import { H2, H4 } from "../common/typography";
import { Ping } from "../icons/ping";
import { ReceiversAside } from "./asids/senders";
import { message2x2, persons } from "@/data/fake/chat/messages";
import { Massager } from "./asids/message";
import { MemberAside } from "./asids/members";
import { chatFiles, members } from "@/data/fake/chat/files";
import { FileAside } from "./asids/files";
export default function ChatComponent() {
  const selectedUser: ISender = {
    image: "/assets/messages/random.png",
    username: "Ameri M.Ayoub",
    title: "Software Engineer",
    isOnline: true,
    id: "23",
  };
  return (
    <section id="chat" className={styles.gridStyle}>
      <div className="flex justify-between border-b items-center p-4">
        <div className="flex gap-3 w-fit ">
          <H4 className="font-bold text-lg">Messages</H4>
          <span className="p-1 bg-light-medium rounded-full">
            {message2x2.length}
          </span>
        </div>
        <ChevronDown className="w-6 h-6" />
      </div>
      <div className="flex gap-2 border-l items-center p-4 border-b">
        <Avatar className="w-12 h-12 rounded-lg">
          <AvatarImage src={selectedUser.image} alt={selectedUser.username} />
          <AvatarFallback>ESI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between gap-2 ">
          <H4 className="text-base font-bold">{selectedUser.username}</H4>
          {selectedUser.isOnline && (
            <div className="flex gap-4">
              <Ping color="#0F930F" />
              <span className="text-xs font-bold">Online</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center border-l border-b p-4">
        <H2 className="font-bold text-lg">Directory</H2>
        <span className="w-fit p-1 bg-blue-light">
          <GripVertical className="w-6 h-6 text-blue-origin" />
        </span>
      </div>
      <ReceiversAside persons={persons} />
      <Massager messages={message2x2} currentUserId="user1" />
      <div className="p-2 flex flex-col gap-4">
        <MemberAside members={members} />
        <FileAside files={chatFiles} />
      </div>
    </section>
  );
}
