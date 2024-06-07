import PassQuiz from "@/components/quiz/PassQuiz/pass";
import {MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

async function getQuiz(id:string) {
  try{
    const res = await fetch( `${MATERIAL_BASE_URL}/quizes/${id}/questions`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
     }
   })

   if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return await res.json()

  }catch(err){
    console.error("Failed to fetch assignments data:", err);
  }   

  }


export default async  function QuizPass({ params }: { params: { id: string } }) {
  const data = await getQuiz(params?.id)
  return <>
  {data ? 
  <PassQuiz  quizData={data} />
  :
  <p className="text-center text-xl font-medium text-red-500 " >You have already passed this quiz</p>
  }
  </> 
}
