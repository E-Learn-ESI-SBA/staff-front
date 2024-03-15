'use client'
import { useState } from 'react'; // Import useState hook
import Image from 'next/image';
import Card from './card';

const LeaderBoard = () => {
    const [selectedButton, setSelectedButton] = useState(true); // State to track selected button


    const handleToggle = () => {
        setSelectedButton(prevState => !prevState);
    };

    return (
        <div className='flex flex-col gap-8 px-8' >

        <div className="mx-auto shadow rounded-xl border h-10 mt-4 flex p-2  max-w-64 relative items-center bg-[#0066FF] text-white ">
                            <button onClick={handleToggle} className={` w-full flex justify-center rounded-2xl py-1 px-4 translate-x-1 transition-all ${selectedButton ? 'bg-white text-blue-500' : 'text-white'}  `} >Monthly</button>
           <button onClick={handleToggle} className={` w-full flex justify-center rounded-2xl py-1 px-4 translate-x-1 transition-all ${!selectedButton ? 'bg-white text-blue-500' : 'text-white'}  `} >Quartly</button>
        </div>
        <div className='flex flex-col gap-2' >
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>

        </div>
    );
};

export default LeaderBoard;

