import AvatarComponent from "./avatar";


export function timeSince(date: string): string {
    const now = new Date();
    const postDate = new Date(date);
    const secondsPast = (now.getTime() - postDate.getTime()) / 1000;
  
    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)} seconds ago`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast < 86400) {
      return `${Math.floor(secondsPast / 3600)} hours ago`;
    }
    return `${Math.floor(secondsPast / 86400)} days ago`;
  }

export default function PostHeader({ avatar, username, created_at }: { avatar: string, username: string, created_at: string}) {
    return (
    <div className="flex flex-row items-center gap-4">
      <AvatarComponent src={avatar} />
      <div className="flex flex-col items-center">
        <p className="font-bold text-lg">{username}</p>
        <p className="text-sm text-gray-500">{timeSince(created_at)}</p>
      </div>
    </div>
    )
}