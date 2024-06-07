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
 if (!res.ok) {
  throw new Error(`HTTP error! status: ${res.status}`);
}

 return await res.json()
 
} catch (err) {
  console.error("Failed to fetch assignments data:", err);
  return  {message : [] } ;
}

}

async function getSubmission(id: string) {
  try {
    const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments/${id}/submissions`, {
      method: "GET",
      cache: 'no-store',
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
    console.error("Failed to fetch submission data:", err);
  }

  }

export default async function Assignment({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAssignment(params?.id);
  const submissiondata = await getSubmission(params?.id);

  return  <SingleAssignemnt assignment={data.message} submission={submissiondata?.submissions} />;

}
