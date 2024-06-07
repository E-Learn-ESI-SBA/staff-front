import PassQuiz from "@/components/quiz/PassQuiz/pass";
import { ASSIGNMENT_BASE_URL, MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

const quizMeta = {
    "title": "updated title...",
    "duration": 30,
    "questions": [
      {
        id: '5055',
        score : 10,
        body: "Which of the following is not a networking protocol?",
        options: [
          { id: '18', option: "ICP" },
          { id: '29', option: "DCP" },
          { id: '3489', option: "CCP" },
          { id: '456', option: "BCP" },
        ],
      },
      {
        id: '5052',
        score : 20,
        body: "Which of the following is not a networking protocol?",
        options: [
          { id: '11', option: "ICP" },
          { id: '2234', option: "DCP" },
          { id: '35', option: "CCP" },
          { id: '48', option: "BCP" },
        ],
      },
      {
        id: '6666',
        score : 30,
        body: "Which of the following is not a networking protocol?",
        options: [
          { id: '19', option: "ICP" },
          { id: '28', option: "DCP" },
          { id: '37', option: "CCP" },
          { id: '46', option: "BCP" },
        ],
      },
      {
        id: '8000',
        score : 25,
        body: "Which of the following is not a networking protocol?",
        options: [
          { id: '152', option: "ICP" },
          { id: '22', option: "DCP" },
          { id: '33', option: "CCP" },
          { id: '44', option: "BCP" },
        ],
      },
      {
        id: '9524',
        score : 15,
        body: "Which of the following is not a networking protocol?",
        options: [
          { id: '188', option: "ICP" },
          { id: '298', option: "DCP" },
          { id: '333', option: "CCP" },
          { id: '444', option: "BCP" },
        ],
      },
    ],
  }


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
  <p className="text-center text-xl font-medium  " >something went wrong please try later</p>
  }
  </> 
}
