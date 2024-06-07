import { MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";
import { StudentSubmissionTable } from "@/components/dashboard/student/submission/table";

async function getSubmission() {
  try {
    const res = await fetch(`${MATERIAL_BASE_URL}/quizes/student/result`,{
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

const Quizzes = async() => {
  const data = await getSubmission();
  console.log('submission',data)  
  return (
    <div className="flex flex-col gap-8 p-4">
      <StudentSubmissionTable data={data} />;
    </div>
  );
};
export default Quizzes;