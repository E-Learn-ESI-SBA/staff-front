import PreQuiz from "@/components/quiz/PassQuiz";
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
  console.log('seif',id)
    const res = await fetch( `http://localhost:8080/chats`,{
      method: "GET",
   })
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function SingleQuiz({ params }: { params: { id: string } }) {
const data = await getQuiz(params?.id)
console.log('eee',data)
  return <div>
  <PreQuiz  quizMeataData={quizMeta} />;
  </div>

}
