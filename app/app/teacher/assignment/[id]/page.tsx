import AlertError from "@/components/common/error";
import NoData from "@/components/common/no-data";
import SingleAssignment from "@/components/dashboard/teacher/assignments/SingleAssignment";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

async function getAssignment(id: string) {

try{ 
const res = await fetch( ` ${ASSIGNMENT_BASE_URL}/assignments/${id}`,{
    method: "GET",
    cache : 'no-store',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
   }
 })

 if (!res.ok) {
  throw new Error(`HTTP error! status: ${res.status}`);
}

return await res.json()
} catch (err) {
  console.error("Failed to fetch assignments data:", err);
  return  {message : [] } ;
}
}

async function getSubmissions(id: string) {
  try{
    const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions`,{
      method: "GET",
      cache : 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
     }
   })

   if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json()

  }catch(err){
    console.error("Failed to fetch submissions data:", err);
    return  {submissions : [] } ;
  }

}

export default async function Assignment({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAssignment(params?.id);
  const submissions = await getSubmissions(params?.id);
  console.log('dd', submissions.submissions)
  return (
    <>
      {
        data?.message == "error" || submissions?.message == "error" ? <AlertError error={data.error} /> :
          data?.message == null ? <NoData /> :
            <SingleAssignment assignment={data.message} submissions={submissions.submissions} />
      }</>
  )
}
