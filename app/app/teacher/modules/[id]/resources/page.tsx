import { LinksTabs } from "@/components/teacher/courses/tabs";
import appRouter from "@/config/routes";
import { moduleData } from "@/static/dummy-data/modules/chapter";
import { ModuleTree } from "@/components/modules/tree";
import { Suspense } from "react";
import GridLoader from "@/components/icons/grid";
import {useGetModuleDetails} from "@/app/actions/materials/modules.actions";
import AlertError from "@/components/common/error";
import NoDataComponent from "@/components/common/no-data";

type Props = {
  params: {
    id: string;
  };
};
export default async function ResourcePage({ params: { id } }: Props) {
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
  const { data, error } = await useGetModuleDetails(id);

    if (error) {
        return <AlertError error={error} />;
    }
   if (!data) {
    return <NoDataComponent />;
    }
  return (
    <main className="w-full min-h-screen bg-secondary-background  p-4">
      <LinksTabs activePath={path.concat("/resources")} tabs={tabs} />
      <Suspense fallback={<GridLoader />}>
        <ModuleTree modulesData={data} path={path.concat("/resources")} />
      </Suspense>
    </main>
  );
}
