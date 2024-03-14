'use client'
import React, { ChangeEvent } from 'react'
import { Input } from '../../../@/components/ui/input'
import { CiSearch } from "react-icons/ci";
import Card from '@/components/dashboard/student/home/card';
import MsgBox from '@/components/dashboard/student/home/msgBox';
import NavBar from '@/components/dashboard/student/navBar';
import TrialClass from '@/components/dashboard/student/home/trialClass';
// import Search from '@/components/dashboard/student//search';

export default function page() {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Search submitted:', searchValue);
  };
  return (
    <main className='bg-secondary-background flex justify-between lg:h-lvh p-4'>
      {/* <NavBar title='Hello Hakim'/> */}
      <div className='w-[66%'>
        <div className='m-4'>
          <div className='flex w-full justify-between my-4'>
            <Card title='Learning Time' value='2h 37m' icon='/assets/icons/home/time.svg' />
            <Card title='Learning Time' value='2h 37m' icon='/assets/icons/home/time.svg' />
          </div>
          <TrialClass />
          <div>
          </div>
        </div>

      </div>
      <div className='w-[33%] right'>
        <MsgBox />
        <div className=''>

        </div>
      </div>

    </main>
  )
}
