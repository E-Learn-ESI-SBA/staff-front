"use client";
// import EditorComp from "@/components/editor";
import { JSONContent } from "novel";
import TailwindAdvancedEditor from "@/components/editor";
import EditorComp from "@/components/editor";
import { LectureTeacher } from "@/components/lectures";
import appRouter from "@/config/routes";
import { LinksTabs } from "@/components/teacher/courses/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    id: string;
    lectureId: string;
  };
};

export default function LecturePage({ params: { lectureId, id } }: Props) {
  const path = appRouter.getPath("module")?.concat("/", id);
  const tabs = [
    {
      title: "Overview",
      path: path.concat("/overview"),
    },
    {
      title: "Resources",
      path: path.concat("/resources"),
    },
    {
      title: "Instructors",
      path: path.concat("/instructors"),
    },
    {
      title: "Discuss",
      path: path.concat("/discuss"),
    },
  ];
  return (
    <main className="w-full min-h-screen bg-secondary-background  p-4">
      <LinksTabs activePath={path?.concat("/resources")} tabs={tabs} />
      <div className="p-8 flex flex-col gap-2">
        <Link href={path?.concat("/resources")}>
          <Button className="p-2" variant="ghost">
            Return to resources list
          </Button>
        </Link>
        <LectureTeacher />
      </div>
    </main>
  );
}
