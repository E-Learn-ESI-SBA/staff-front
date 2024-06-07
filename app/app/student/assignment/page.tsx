import { AssignmentTable } from "@/components/assignment/table";
import NoData from "@/components/common/no-data";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";
async function getAssignments() {

  try {
    const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments`, {
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
    console.error("Failed to fetch assignments data:", err);
    return  {message : [] } ;
  }

}

export default async function StudentAssignment() {
  const data = await getAssignments();

  return <AssignmentTable show={true} assignments={data?.message}/>;

}
