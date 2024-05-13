import ModulesPage from "@/components/modules";
import { useGetTeacherModules } from "@/app/actions/materials/modules.actions";
import GlobalError from "@/app/global-error";
import {Module} from "@/types/chapter/courses";
import {dummyModules} from "@/static/dummy-data/modules/modules";

export default async function Modules() {
  const res = dummyModules
  /* if (res.error) {
     return <GlobalError error={res.error} reset={useGetTeacherModules} />;
   }
   return <ModulesPage data={res.data} />;
 }
 */

return <ModulesPage data={res} />;
}