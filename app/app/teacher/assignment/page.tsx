// import { AssignmentTable } from "@/components/assignment/table";
// import { Link } from "lucide-react";
// import
// export default function TeacherAsshignment() {
//   return <div className="flex flex-col gap-8 p-4" >
//   <Link href='/app/u/t/assignments/create' className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg  " >
//     + Add Assignment
//   </Link>
//  <AssignmentTable show={false}  />;
//   </div>
// }

import { AssignmentTable } from "@/components/assignment/table";
import Link from "next/link";
import { assignments } from "@/static/dummy-data/assignment/assignment";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

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
  
   return res.json()
  } catch (err) {
    console.error("Failed to fetch students data:", err);
  }

// return quiz;
}

export default async function TeacherAssignment() {
  const data = await getAssignments();
  console.log('ssss',data)
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
