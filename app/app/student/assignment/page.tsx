import { AssignmentTable } from "@/components/assignment/table";
import NoData from "@/components/common/no-data";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { assignments } from "@/static/dummy-data/assignment/assignment";
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
    if (res.ok) {
      return res.json()
    } else {
      return { data: null }
    }
  } catch (err) {
    console.error("Failed to fetch students data:", err);
    return { data: null }
  }

  // return quiz;
}

export default async function StudentAssignment() {
  const data = await getAssignments();
  console.log('students', data)
  return (
    data?.message ? <AssignmentTable show={true} assignments={data?.message} /> : <NoData />
  );
}
