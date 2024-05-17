import { Comment, Reply as TReplay } from "@/types/chapter/comments";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { H3 } from "../common/typography";
import { timeAgo } from "@/lib/time-ago";
import { Reply } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenCommentFormEnum } from "@/types/forms/state";
import { Button } from "@/components/ui/button";

type Props = {
  data: Comment;
  setOpenComment: Dispatch<SetStateAction<OpenCommentFormEnum>>;
};
export const CommentItem = ({ data, setOpenComment }: Props) => {
  const [seeAll, setSeeAll] = useState(false);
  const shortReplays = data.replays?.slice(0, 2) ?? [];
  const timeAgoValue = timeAgo(data.created_at);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start  gap-2">
        <Avatar className="w-10 h-10 rounded-full">
          <AvatarImage src={data.user.avatar} alt={data.user.username} />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-1 w-full  items-start justify-between">
            <div className="flex items-center  gap-4">
              <H3 className="text-base font-bold">{data.user.username}</H3>
              <p className="text-xs text-text-GRAY">{timeAgoValue}</p>
            </div>
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => {
                setOpenComment((_) => OpenCommentFormEnum.REPLAY);
              }}
            >
              <Reply className="w-4 h-4 font-bold text-blue-origin" />
              <span className="text-sm font-bold text-blue-origin">Replay</span>
            </div>
          </div>
          <p className="text-text-GRAY text-xs pl-2 ">{data.content}</p>
        </div>
      </div>
      {data.replays && data.replays.length > 2 && (
        <Button
          onClick={() => {
            setSeeAll((prev) => !prev);
          }}
          className="text-xs text-blue-origin"
        >
          {seeAll ? "See less" : "See all"}
        </Button>
      )}
      <div className="flex ml-8 flex-col gap-2">
        {seeAll
          ? data.replays?.map((replay, i) => <Item key={i} data={replay} />)
          : shortReplays.map((replay, i) => <Item key={i} data={replay} />)}
      </div>
    </div>
  );
};

type ItemProps = {
  data: TReplay;
};
const Item: React.FC<ItemProps> = ({ data }) => {
  const timeAgoValue = timeAgo(data.created_at);
  return (
    <div className="flex items-start  gap-2">
      <Avatar className="w-10 h-10 rounded-full">
        <AvatarImage src={data.user.avatar} alt={data.user.username} />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center  gap-4">
          <H3 className="text-base font-bold">{data.user.username}</H3>
          <p className="text-xs text-text-GRAY">{timeAgoValue}</p>
        </div>
        <p className="text-text-GRAY text-xs pl-2 ">{data.content}</p>
      </div>
    </div>
  );
};
