"use client";
import QuizFirstStepForm from "@/components/dashboard/Quiz/create/first-step";
import Preview from "@/components/dashboard/Quiz/create/fourth-step";
import GradesForm from "@/components/dashboard/Quiz/create/second-step";
import QCMForm from "@/components/dashboard/Quiz/create/third-step";
import { useQuizFormStore} from "@/store/forms/quiz/quiz.store";


interface Option {
    id: number;
    option: string;
  }
  
  interface Question {
    id: number;
    body: string;
    score: number;
    image: string;
    options: Option[];
    correct_idxs: string[];
  }
  
  interface Grade {
    min: number;
    max: number;
    grade: string;
  }
  
  interface Quiz {
    id: string;
    module_id: string;
    teacher_id: string;
    title: string;
    instructions: string;
    image: string;
    question_count: number;
    max_score: number;
    min_score: number;
    start_date: string;
    end_date: string; 
    duration: number;
    questions: Question[];
    grades: Grade[];
  }


export default function Quiz({quiz} : {quiz ?: any}) {
  const {
    currentStep
  } = useQuizFormStore((state) => ({
    currentStep: state.currentStep,
  }));

  const {title,
    instructions,
    image,
    module_id,
    max_score,
    min_score,
    duration,
    question_count,
    start_date,
    end_date,
    id,
    grades,
    questions} = quiz
  
const quizGrades = {grades};
  const quizQuestions = {questions};


  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-[#434343] font-medium ">{quiz?  'Update Quiz' : 'Create New Quiz' } </p>
      </div>
      <div className="flex flex-col">
        {currentStep === 1 && <QuizFirstStepForm defaultValues={{title,instructions,image,file: undefined,module_id,max_score,min_score,duration,question_count,start_date,end_date,id}} />}
        {currentStep === 2 && <GradesForm defaultValues={quizGrades}  />}
        {currentStep === 3 && <QCMForm defaultValues={quizQuestions} />}
        {currentStep === 4 && <Preview />}
      </div>
    </div>
  );
}
