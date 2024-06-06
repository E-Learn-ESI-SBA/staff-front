import SingleQuiz from '@/components/dashboard/student/studentProfile/Quiz/SingleQuiz'
import React from 'react'

const quizMeta = {
    "submission": {
        id: '6649603fa25436bee3497476',
        answers: [
          {
            question_id: 'bf7c9dc9-6bf9-4b8f-9983-4e94020efae4',
            choices: [ '120', '129' ],
            is_correct: false
          },
          {
            question_id: '1b2d0ab6-6371-43a4-ab3e-1bf10890c3d3',
            choices: [ '5', '1' ],
            is_correct: true
          },
          {
            question_id: 'f9b6b3c6-9418-478a-8b49-0317a1b73a73',
            choices: [ '21', '23' ],
            is_correct: true
          }
        ],
        created_at: '2024-05-19T02:13:19.515Z',
        grade: 'F',
        score: 20,
        is_passed: true
      },
    "module_name" : "Networking",
    "quiz": {
      "id": "664773ba3b0a6f059a331321",
      "module_id": "664773b83b0a6f059a33131f",
      "teacher_id": "3",
      "title": "updated title...",
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
    const res = await fetch( `http://localhost:8080/quizes/${id}/student`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk4LCJpYXQiOjE3MTU5NTkzOTgsImp0aSI6IjhkZWU5YzQ0YjlkOTQyYmZiYjMxNjI2ZmYyMTBkZjIxIiwiaWQiOiJjMGY2ZTg2OS04NDBiLTQ5NjMtOGM1OC02NDUzYjVkNWNhZTUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJzdHVkZW50IiwiZW1haWwiOiJzdHVkZW50QGhvc3QuY29tIiwicm9sZSI6InN0dWRlbnQiLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.WShTxYZQ07i6fRO6SDF-REAOHOscvbUXzbFSr0Vrzlo`,
     }
   })
   return res.json()

  }catch(err){
    console.error("Failed to fetch data:", err);
  } 
    }

const QuizResult = async({ params }: { params: { id: string } }) => {
    const data = await getQuiz(params?.id)
  return (
    <div>
      <SingleQuiz data={data} />
    </div>
  )
}

export default QuizResult
