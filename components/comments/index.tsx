"use client";
import { CommentItem } from "@/components/comments/item";
import { OpenCommentFormEnum } from "@/types/forms/state";
import { useState } from "react";
import { Comment } from "@/types/chapter/comments";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/icons";

type Props = {
  data: Comment[];
};
export default function CommentPage({ data }: Props) {
  const [stateModal, setStateModal] = useState<OpenCommentFormEnum>(
    OpenCommentFormEnum.CLOSED,
  );
  const [fetchedData, setFetchedData] = useState<Comment[]>(data);
  const cursorHandler = () => {
    console.log("cursorHandler");
    setFetchedData((prev) => [...prev, ...data]);
  };
  return (
    <div className="flex flex-col  h-full w-full justify-between   p-6 lg:p-8 ">
      <ScrollArea className="h-[720px]">
        <div className="flex flex-col gap-4 p-8 lg:p-12">
          {fetchedData.map((c, i) => (
            <CommentItem key={i} data={c} setOpenComment={setStateModal} />
          ))}
        </div>
      </ScrollArea>
      <Button
        variant="ghost"
        className="w-fit bg-blue-light text-blue-origin text-base "
        onClick={cursorHandler}
      >
        Show More
        {false && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      </Button>
    </div>
  );
}
