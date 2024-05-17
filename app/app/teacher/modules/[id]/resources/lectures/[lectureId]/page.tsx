"use client";
// import EditorComp from "@/components/editor";
import { JSONContent } from "novel";
import TailwindAdvancedEditor from "@/components/editor";
import EditorComp from "@/components/editor";
import { LectureTeacher } from "@/components/lectures";

type Props = {
  params: {
    id: string;
    lectureId: string;
  };
};

export default function LecturePage({ params: { lectureId, id } }: Props) {
  return (
    <main className="bg-secondary-background w-full min-h-screen h-full  p-8 flex flex-col gap-4">
      <LectureTeacher />
    </main>
  );
}
