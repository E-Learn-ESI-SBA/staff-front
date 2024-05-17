import { LinksTabs } from "@/components/teacher/courses/tabs";
import appRouter from "@/config/routes";
import { comments } from "@/static/dummy-data/modules/comments";
import CommentPage from "@/components/comments";

type Props = {
  params: {
    id: string;
  };
};
export default function ResourcePage({ params: { id } }: Props) {
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
      <LinksTabs activePath={path.concat("/discuss")} tabs={tabs} />
      <CommentPage data={comments} />
    </main>
  );
}
