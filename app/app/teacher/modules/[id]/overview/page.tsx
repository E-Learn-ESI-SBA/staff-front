import { LinksTabs } from "@/components/teacher/courses/tabs";
import appRouter from "@/config/routes";
import { moduleData } from "@/static/dummy-data/modules/chapter";
import { Overview } from "@/components/courses/overview";

type Props = {
  params: {
    id: string;
  };
};
export default function CoursePage({ params }: Props) {
  const path = appRouter.getPath("module")?.concat("/", params.id);
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
  const modules = moduleData;
  return (
    <main className="w-full min-h-screen bg-secondary-background  p-4">
      <LinksTabs activePath={path.concat("/overview")} tabs={tabs} />
      <div className="p-4 pt-12">
        <Overview
          data={{
            description: modules.description,
            points: modules.plan,
            title: modules.name,
          }}
          withEdit={true}
        />
      </div>
    </main>
  );
}
