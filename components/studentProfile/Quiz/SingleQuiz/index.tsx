'use client'
import { useState } from 'react';
import QuizDetails from './details';
import Response from './response';
import Quiz from '@/types/detailQuiz';


const SingleQuiz: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>({
    questions: [
      {
        id: 1,
        questionText: 'Which of the following is not a networking protocol?',
        answers: [
          { id: 1, text: 'ICP' },
          { id: 2, text: 'DCP' },
          { id: 3, text: 'CCP' },
          { id: 4, text: 'BCP' },
        ],
        correctAnswerId: 4, 
        selectedAnswerId: 1, 
      },
      {
        id: 2,
        questionText: 'Which of the following is not a networking protocol?',
        answers: [
          { id: 1, text: 'ICP' },
          { id: 2, text: 'DCP' },
          { id: 3, text: 'CCP' },
          { id: 4, text: 'BCP' },
        ],
        correctAnswerId: 3, 
        selectedAnswerId: 3, 
      },

    ],
  });

  const handleToggle = () => {
    setSelectedButton((prevState) => !prevState);
  };

  return (
    <div className='flex flex-col gap-4 p-8'>
      <p className='bg-[#ECF2FF] text-[#3D70F5] p-2 rounded-lg text-xs w-fit self-end'>
        Result Declared on 12:30 AM | 22 September 2023
      </p>
      <p className='text-xl font-medium'>Quiz Result Details</p>

      <div className='self-start my-8 inline-flex items-center rounded-lg bg-[#EEEFF9] text-[#7E7E7E]'>
        <button
          onClick={handleToggle}
          className={`py-1 px-2 sm:px-16 transition-all ${
            selectedButton ? 'bg-[#3D70F5] text-white' : ''
          }`}
        >
          Details
        </button>
        <button
          onClick={handleToggle}
          className={`py-1 px-2 sm:px-16 transition-all ${
            !selectedButton ? 'bg-[#3D70F5] text-white' : ''
          }`}
        >
          Response
        </button>
      </div>

      {selectedButton ? <QuizDetails  /> : <Response quiz={quiz} />}
    </div>
  );
};

export default SingleQuiz;


