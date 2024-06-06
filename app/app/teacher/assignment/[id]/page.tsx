import SingleAssignment from "@/components/dashboard/teacher/assignments/SingleAssignment";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

async function getAssignment(id: string) {
  const res = await fetch( ` ${ASSIGNMENT_BASE_URL}/assignments/${id}`,{
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

async function getSubmissions(id: string) {
  const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions`,{
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
  params: { id: string };
}) {
  const data = await getAssignment(params?.id);
  const submissions = await getSubmissions(params?.id);
  console.log('dd',submissions.submissions)
  return <SingleAssignment assignment={data.message} submissions={submissions.submissions}  />;
}
