import ModulesPage from "@/components/modules";
import { useGetTeacherModules } from "@/app/actions/materials/modules.actions";
import GlobalError from "@/app/global-error";
import { Module } from "@/types/chapter/courses";
import { dummyModules } from "@/static/dummy-data/modules/modules";

export default async function Modules() {
  const res = dummyModules;
  return <ModulesPage data={res} />;
}
