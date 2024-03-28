import { File, Play } from "lucide-react";
import React from "react";

export type AccordionOneContentProps = {
  type: "lecture" | "video";
  content: string;
};
export const AccordionOneContent = ({
  type,
  content,
}: AccordionOneContentProps) => {
  return (
    <div className="flex gap-4 text-text-GRAY text-[1.3rem]">
      {type == "lecture" ? <Play fill="black" /> : <File />}
      {content}
    </div>
  );
};
