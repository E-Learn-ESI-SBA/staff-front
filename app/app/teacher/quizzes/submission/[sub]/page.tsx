import { MATERIAL_BASE_URL } from '@/config/constants'
import SingleQuiz from '@/components/dashboard/student/studentProfile/Quiz/SingleQuiz'
import { cookies } from 'next/headers'
import React from 'react'

async function getQuiz(id:string) {
  try{
    const res = await fetch( `${MATERIAL_BASE_URL}/quizes/${id}/teacher/result`,{
      method: "GET",
      cache : 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("accessToken")?.value}`,
     }
   })
   if (!res.ok) {
    console.log(await res.json())
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return await res.json()

  }catch(err){
    console.error("Failed to fetch data:", err);
  } 
    }

const QuizResult = async({ params }: { params: { sub: string } }) => {
    const data = await getQuiz(params?.sub)
  return (
    <>
          {data ? 
      <SingleQuiz data={data} />  
    : 
    <p className="text-center text-xl font-medium  " >something went wrong please try later</p>
    }

    </>
  )
}

export default QuizResult
