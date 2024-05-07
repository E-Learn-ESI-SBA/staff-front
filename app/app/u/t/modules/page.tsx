import ModulesPage from "@/components/modules";
import { useGetTeacherModules } from "@/app/actions/materials/modules.actions";
import GlobalError from "@/app/global-error";

export default async function Modules() {
  const res = await useGetTeacherModules();
  if (res.error) {
    return <GlobalError error={res.error} reset={useGetTeacherModules} />;
  }
  return <ModulesPage data={res.data} />;
}
