import { CirclePlay, Clock4 } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  count: number;
  time: string;
};
export const AccordionOneTitle = ({ title, count, time }: Props) => {
  return (
    <div className="flex w-full justify-between mx-4" dir="ltr">
      <h1 className="text-2xl ">{title}</h1>
      <div className="flex gap-8 text-text-GRAY">
        <div className="flex gap-2">
          <CirclePlay color="#564FFD" />
          <p className="">{count} lectures</p>
        </div>
        <div className="flex gap-2">
          <Clock4 color="#FD8E1F" />
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};
