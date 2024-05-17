import { ChapterComponent } from "@/components/teacher/courses/resources/chapter";
import { LinksTabs } from "@/components/teacher/courses/tabs";
import appRouter from "@/config/routes";
import { moduleData } from "@/static/dummy-data/modules/chapter";

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
  const modules = moduleData;
  return (
    <main className="w-full min-h-screen bg-secondary-background  p-4">
      <LinksTabs activePath={path.concat("/resources")} tabs={tabs} />
      <div className="w-full h-full flex flex-col gap-6 bg-white rounded-lg p-4">
        {modules.courses.map((c, i) => (
          <ChapterComponent
            chapter={c}
            key={i}
            pathname={path.concat("/resources")}
          />
        ))}
      </div>
    </main>
  );
}
