import { AssignmentTable } from "@/components/assignment/table";
import { Link } from "lucide-react";

export default function StudentDashboard() {
  return <div className="flex flex-col gap-8 p-4" >
  <Link href='/app/u/t/assignments/create' className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg  " >
    + Add Assignment
  </Link>
 <AssignmentTable />;
  </div>  
}
