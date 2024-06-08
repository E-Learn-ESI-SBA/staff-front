import { getProfile } from "@/app/actions";
// import  from "@/components//dashboard/teacher/teacherProfile";
import AlertError from "@/components/common/error";
import General from "@/components/dashboard/teacher/teacherProfile/general";
import { IError } from "@/types/errors";
import { Teacher } from "@/types/teachers";


export default async function ProfilePage() {
  let profile:Teacher|null = null;
  let error = null;
  try {
    profile = await getProfile()
  } catch (err: any) {
    error = new IError(err)
  }
  return (
    <>
    {error ? <AlertError error={error}/> : <General teacher={profile}/>}
    </>
  )
}
