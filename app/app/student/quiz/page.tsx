import { QuizTable } from "@/components/dashboard/student/quiz/table";
import { MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

async function getQuiz() {
  try {
    const res = await fetch(`${MATERIAL_BASE_URL}/quizes/student`,{
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
  const data = await getQuiz();
  return (
    <div className="flex flex-col gap-8 p-4">
      <QuizTable data={data} />;
    </div>
  );
};
export default Quizzes;