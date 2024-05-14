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

export default function TeacherAssignment() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <Link
        href="/app/u/t/assignments/create"
        className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg  "
      >
        + Add Assignment
      </Link>
      <AssignmentTable show={false} />;
    </div>
  );
}
