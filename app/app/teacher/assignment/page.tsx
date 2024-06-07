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
import { ASSIGNMENT_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";
import AlertError from "@/components/common/error";
import NoData from "@/components/common/no-data";

export const dynamic = "force-dynamic";

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
    return res.json()
  } catch (err) {
    console.error("Failed to fetch assignments:", err);
    return { message: "err", error: err };
  }
}

export default async function TeacherAssignment() {

  const response = await getAssignments();
  if (response.message === "err") {
    return <AlertError error={response.error} />
  }
  console.log('ssss', response)
  return (
    <div className="flex flex-col gap-8 p-4">
      <Link
        href="/app/teacher/assignment/create"
        className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg  w-fit"
      >
        + Add Assignment
      </Link>
      {response.message ? <AssignmentTable show={false} assignments={response.message} /> :
        <NoData />}
    </div>
  );
}
