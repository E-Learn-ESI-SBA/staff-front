import PreQuiz from "@/components/quiz/PassQuiz";
import { MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";
const quizMeta = {
  "passed": true,
  "quiz": {
    "id": "664773ba3b0a6f059a331321",
    "module_id": "664773b83b0a6f059a33131f",
    "teacher_id": "3",
    "title": "hello...",
    "instructions": "updated instructions...",
    "image": "/courses/card-pic.png",
    "question_count": 20,
    "max_score": 100,
    "min_score": 50,
    "start_date": "2024-05-17T15:11:54.326Z",
    "end_date": "2024-05-17T15:11:56.326Z",
    "duration": 100,
    "questions": null,
    "grades": null,
    "created_at": "2024-05-17T15:11:54.335Z",
    "updated_at": "2024-05-17T15:11:54.335Z"
  }
}

async function getQuiz(id:string) {
  try{
    const res = await fetch( `${MATERIAL_BASE_URL}/quizes/${id}`,{
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

  }catch(err){
    console.error("Failed to fetch data:", err);
  }
  }

export default async function SingleQuiz({ params }: { params: { id: string } }) {
const data = await getQuiz(params?.id)
console.log('sss',data)
  return <div>
    {data ? 
  <PreQuiz  quizMeataData={data} />    
    : 
    <p className="text-center text-xl font-medium  " >something went wrong please try later</p>
    }

  </div>

}
