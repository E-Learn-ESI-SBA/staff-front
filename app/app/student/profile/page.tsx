import { getProfile } from "@/app/actions";
import Profile from "@/components//dashboard/student/studentProfile";
import AlertError from "@/components/common/error";
import General from "@/components/dashboard/student/studentProfile/general";
import { IError } from "@/types/errors";
import { Student } from "@/types/students";


export default async function ProfilePage() {
  let profile:Student|null = null;
  let error = null;
  try {
    profile = await getProfile()
  } catch (err: any) {
    error = new IError(err)
  }
  return (
    <>
    {error ? <AlertError error={error}/> : <General student={profile}/>}
    </>
  )
}
