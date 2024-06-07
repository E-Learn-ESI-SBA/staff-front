import { TeacherSubmissionTable } from "@/components/dashboard/teacher/submission/table";
import { MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";
import Link from "next/link";

async function getSubmission(id : string) {
  try {
    const res = await fetch(`${MATERIAL_BASE_URL}/quizes/${id}/teacher `,{
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
      console.error("Failed to fetch quizes data:", err);
      return []
  }
}

const Quizzes = async({ params }: { params: { id: string } }) => {
  const data = await getSubmission(params?.id);
  console.log('submission',data)  
  return (
    <div className="flex flex-col gap-8 p-4">
      <TeacherSubmissionTable data={data} />;
    </div>
  );
};
export default Quizzes;