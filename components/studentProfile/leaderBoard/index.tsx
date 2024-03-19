'use client'
import { useState } from 'react';
import Card from './card';
import {monthStudents,quartlyStudents} from '@/static/content/rank';

const LeaderBoard = () => {
  const [selectedButton, setSelectedButton] = useState(true);

  const handleToggle = () => {
    setSelectedButton((prevState) => !prevState);
  };



  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="mx-auto shadow rounded-2xl border h-12 mt-4 flex py-2 px-2 sm:px-8  w-fit relative items-center bg-[#0066FF] text-white">
        <button
          onClick={handleToggle}
          className={`w-full flex justify-center rounded-2xl py-1 px-2 sm:px-8 translate-x-1 transition-all ${
            selectedButton ? 'bg-white text-blue-500' : 'text-white'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={handleToggle}
          className={`w-full flex justify-center rounded-2xl py-1 px-2 sm:px-8 translate-x-1 transition-all ${
            !selectedButton ? 'bg-white text-blue-500' : 'text-white'
          }`}
        >
          Quarterly
        </button>
      </div>
 
      {
            selectedButton ?       <div className="flex flex-col gap-2">       {monthStudents.map((student, index) => (
                <Card  student={student} index={index} />
    
              ))}
                          </div>  : 
               <div className="flex flex-col gap-2"> 
              {quartlyStudents.map((student, index) => (
                <Card  student={student} index={index} />
              ))}
              </div>
          }

  
    </div>
  );
};

export default LeaderBoard;

