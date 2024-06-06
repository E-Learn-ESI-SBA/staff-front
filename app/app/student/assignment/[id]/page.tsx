import SingleAssignemnt from "@/components/dashboard/student/studentProfile/assignment/SingleAssignment";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

async function getAssignment(id: string) {
try {
  const res = await fetch( ` ${ASSIGNMENT_BASE_URL}/assignments/${id}`,{
    method: "GET",
    cache : 'no-store',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
   }
 })

 return res.json()
 
} catch (err) {
  console.error("Failed to fetch students data:", err);
}
}

async function getSubmission(id: string) {
  try {
    const res = await fetch( `${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions`,{
      method: "GET",
      cache : 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
     }
   })
  
   return res.json()
   
  } catch (err) {
    console.error("Failed to fetch students data:", err);
  }
  }

export default  async function Assignment({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAssignment(params?.id);
  const submissiondata = await getSubmission(params?.id);
  console.log('dd',data)
  console.log('ff',submissiondata)
  return  <SingleAssignemnt assignment={data.message} submission={submissiondata?.message} />;
}
