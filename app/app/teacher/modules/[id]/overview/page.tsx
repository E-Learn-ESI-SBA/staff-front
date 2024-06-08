import { LinksTabs } from "@/components/teacher/courses/tabs";
import { moduleData } from "@/static/dummy-data/modules/chapter";
import { Overview } from "@/components/courses/overview";
import {useGetModuleOverview} from "@/app/actions/materials/modules.actions";
import AlertError from "@/components/common/error";
import NoDataComponent from "@/components/common/no-data";

type Props = {
  params: {
    id: string;
  };
};
export default async function CoursePage({ params }: Props) {

  const path = "/app/teacher/modules/".concat(params.id);
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
  const  {data , error} = await useGetModuleOverview(params.id);
  if (error) {
    return <AlertError error={error} />
  }
  if (!data) {
    return <NoDataComponent />
  }
  return (
    <main className="w-full min-h-screen bg-secondary-background  p-4">
      <LinksTabs activePath={path.concat("/overview")} tabs={tabs} />
      <div className="p-4 pt-12">
        <Overview
          data={{
            description: data.description,
            points: data.plan,
            title: data.name,
          }}
          withEdit={true}
        />
      </div>
    </main>
  );
}
