import PreQuiz from "@/components/quiz/PassQuiz";
import { MATERIAL_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";

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
