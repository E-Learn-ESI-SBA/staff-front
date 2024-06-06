import SingleSubmission from "@/components/dashboard/teacher/submission";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";


async function getSubmission(id: string,sub: string) {
  const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions/${sub}`,{
    method: "GET",
    cache : 'no-store',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
   }
 })

  if (!res.ok) {
    console.log('zz',res.json())
    throw new Error('Failed to fetch data')
  }

return res.json()
// return quiz;
}

export default async function Assignment({
  params,
}: {
  params: { id: string; sub: string };
}) {
  const data = await getSubmission(params?.id,params?.sub);
  console.log('sss',data)
  return <SingleSubmission submission={data.submission}   />;
}
