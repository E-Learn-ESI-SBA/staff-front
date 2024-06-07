import { AssignmentTable } from "@/components/assignment/table";
import Link from "next/link";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

async function getAssignments() {
  try {
    const res = await fetch(`${ASSIGNMENT_BASE_URL}/assignments`,{
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

// return quiz;
}

export default async function TeacherAssignment() {

  const data = await getAssignments();
  return (  
    <div className="flex flex-col gap-8 p-4">
      <Link
        href="http://localhost:3000/app/teacher/assignment/create"
        className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg  "
      >
        + Add Assignment
      </Link>
      <AssignmentTable show={false} assignments={data.message} />;
    </div>
  );
}
