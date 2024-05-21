import ModulesPage from "@/components/modules";
import { useGetTeacherModules } from "@/app/actions/materials/modules.actions";
import GlobalError from "@/app/global-error";
import { Module } from "@/types/chapter/courses";
import { dummyModules } from "@/static/dummy-data/modules/modules";
import AlertError from "@/components/common/error";

export default async function Modules() {
  const res = dummyModules;
  const { data, error } = await useGetTeacherModules();
  console.log(data);
  if (error) {
    return <AlertError error={error} />;
  }
  return (
    <main className="p-6 w-full h-full">
      <ModulesPage data={data} />
    </main>
  );
}
