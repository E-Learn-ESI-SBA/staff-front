import { Button } from "@/components/ui/button";
import { ArrowLeft, CirclePlay, Clock3, FolderOpen } from "lucide-react";
import React from "react";

export type CourseInfosTtileProps = {
  title: string;
  sections: number;
  lectures: number;
  time: string;
};
export const CourseInfosTtile = ({
  title,
  sections,
  lectures,
  time,
}: CourseInfosTtileProps) => {
  return (
    <div className="bg-white mx-8 p-8 rounded-2xl my-4">
      <div className="flex justify-between">
        <div className="flex gap-8 items-center">
          <ArrowLeft color="#1D2026" />
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-lg">{title}</h1>
            <div className="flex gap-4 text-text-GRAY">
              <div className="flex gap-2">
                <FolderOpen color="#FF6636" />
                <p>{sections} sections</p>
              </div>
              <div className="flex gap-2">
                <CirclePlay color="#564FFD" />
                <p>{lectures} lectures</p>
              </div>
              <div className="flex gap-2">
                <Clock3 color="#FD8E1F" />
                <p>{time}</p>
              </div>
            </div>
          </div>
        </div>
        <Button className="bg-primary text-white text-lg px-8 py-[1.8rem]">
          Write A Review
        </Button>
      </div>
    </div>
  );
};
