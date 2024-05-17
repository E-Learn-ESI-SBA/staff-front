import { LinksTabs } from "@/components/teacher/courses/tabs";
import appRouter from "@/config/routes";
import VideoSection from "@/components/videos";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    id: string;
    videoId: string;
  };
};
export default function VideoPage({ params: { videoId, id } }: Props) {
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
          <Button className="p-2" variant="link">
            Return to resources list
          </Button>
        </Link>
        <VideoSection videoId={videoId} />
      </div>
    </main>
  );
}
