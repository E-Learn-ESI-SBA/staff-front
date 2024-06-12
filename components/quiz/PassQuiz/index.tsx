import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Quiz {
  title: string;
  image: string;
  start_date: string;
  end_date: string;
  duration: number;
  max_score: number;
  min_score: number;
  instructions: string;
  id: string;
}

interface QuizMetaData {
  quiz: Quiz;
  passed: boolean;
}

const PreQuiz = ({ quizMeataData }: { quizMeataData: QuizMetaData }) => {
  return (
    <div className='flex flex-col gap-8 text-[#4E5566] p-8' >
      <h1 className="text-3xl font-medium text-[#2B3674] "> {quizMeataData.quiz.title}</h1>
      <p>Read the following informations</p>
      <div className='flex items-start justify-start gap-8' >
      <Image src={quizMeataData.quiz.image} alt="Quiz image"         
      width={0}
                height={0}
                sizes="100vw"
                className="w-1/2 max-h-96" />
       <ul className='w-1/2 flex flex-col gap-8' >
        <li> <span className='font-semibold' >start date</span>   :  {quizMeataData.quiz?.start_date.slice(0,16).replace('T',' at ')}   </li>
        <li>  <span className='font-semibold' >end date</span>  :  {quizMeataData.quiz?.end_date.slice(0,16).replace('T',' at ')}   </li>
        <li>  <span className='font-semibold' >duration</span>  : {quizMeataData.quiz.duration} minutes </li>
        <li>  <span className='font-semibold' >highest value</span> : {quizMeataData.quiz.max_score} points </li>
        <li>  <span className='font-semibold' >pass value</span> : {quizMeataData.quiz.min_score} points  </li>
        </ul>   
        </div>
         <h1 className='font-semibold text-2xl' > Instructions</h1>
         <p>{quizMeataData.quiz.instructions}</p> 
         <div className='flex flex-col items-center gap-4 self-end ' >
         {quizMeataData.passed ?   <p className="text-center text-xl font-medium text-red-500 " >You have already passed this quiz</p>:  <Link href={`/app/student/quiz/${quizMeataData.quiz.id}/pass`}   className='rounded-3xl bg-[#0066FF] px-6 py-4 flex justify-center items-center text-white w-64 self-end ' >Start</Link> }
         </div>

          </div>  

  )
}

export default PreQuiz
