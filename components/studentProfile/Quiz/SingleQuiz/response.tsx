import Image from 'next/image';
const QuizDetails = () => {




  return (
    <>
      <div className='flex items-center justify-start gap-4' >
        <p>Articulate structure of C++ and Java in Semester 1</p>
        <p className='text-[#0F930F] bg-[#d8eed8] px-2 py-1 rounded-[10px]' >Status : Passed</p>
      </div>
      <div className='flex items-center justify-start gap-4' >
        <p className='font-medium' >Quiz Schedule</p>
        <div className=' bg-[#ededf5] px-2 py-1 rounded-[10px] flex justify-between items-center gap-2 ' >
          <Image src='/dashboard/quiz/calendar.svg' alt='calendar icon' width={0} height={0} sizes='100vw' className='w-4 h-4' />
            <p className='text-sm font-light' >12-01-2023</p> </div>
      </div>
      <div className='flex items-center justify-start gap-4' >
        <p className='font-medium'>Subject : </p>
        <p> Networking</p>
      </div>
      <div className='flex items-center justify-start gap-4' >
        <p className='font-medium'>Number of Questions : </p>
        <p>50</p>
      </div>
      <div className='flex items-center justify-start gap-4' >
        <p className='font-medium'>Correct Answers : </p>
        <p>35</p>
      </div>
   <div className='flex flex-col gap-6 my-8' >
   <p>Passing Percentege</p>

   </div>

    </>
  );
};

export default QuizDetails;

