import PassQuiz from "@/components/quiz/PassQuiz/pass";
import { ASSIGNMENT_BASE_URL } from "@/config/constants";

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
    const res = await fetch( `${ASSIGNMENT_BASE_URL}/quizes/${id}/questions`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk4LCJpYXQiOjE3MTU5NTkzOTgsImp0aSI6IjhkZWU5YzQ0YjlkOTQyYmZiYjMxNjI2ZmYyMTBkZjIxIiwiaWQiOiJjMGY2ZTg2OS04NDBiLTQ5NjMtOGM1OC02NDUzYjVkNWNhZTUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJzdHVkZW50IiwiZW1haWwiOiJzdHVkZW50QGhvc3QuY29tIiwicm9sZSI6InN0dWRlbnQiLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.WShTxYZQ07i6fRO6SDF-REAOHOscvbUXzbFSr0Vrzlo`,
     }
   })
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }


export default async  function QuizPass({ params }: { params: { id: string } }) {
  const data = await getQuiz(params?.id)
  return <PassQuiz  quizData={data} />;
}
