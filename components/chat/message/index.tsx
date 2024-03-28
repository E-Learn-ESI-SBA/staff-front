import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  message: string;
  senderId: string;
  timestamp: number;
  currentUserId: string;
  previousMessageUserId: string;
  senderImage: string;
  name: string;
};

export function Message({
  currentUserId,
  message,
  name,
  previousMessageUserId,
  senderId,
  senderImage,
  timestamp,
}: Props) {
  return (
    <div
      className={`flex gap-2 ${senderId === currentUserId ? "flex-row-reverse self-end" : ""}`}
    >
      <abbr title={name}>
        <Avatar
          className={senderId === previousMessageUserId ? "invisible" : ""}
        >
          <AvatarImage src={senderImage} alt={name} />
          <AvatarFallback>ESI</AvatarFallback>
        </Avatar>
      </abbr>
      <abbr title={`send at ${timestamp}`}>
        <p className="p-2 flex-1 text-sm bg-green-light">{message}</p>
      </abbr>
    </div>
  );
}
