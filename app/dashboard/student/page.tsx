'use client'
import React, { ChangeEvent } from 'react'
import { Input } from '../../../@/components/ui/input'
import { CiSearch } from "react-icons/ci";
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
    <main className='bg-[#F4F7FE] flex justify-between lg:h-lvh '>
      <div className='w-[66%] left'>
      <div>
          <p>HI karim</p>
          <h1>Welcome to Madaurus!</h1>
        </div>
        
      </div>
      <div className='w-[33%] right'>
      <div className=''>
      {/* <Search
                value={searchValue}
                onChange={handleChange}
                onSubmit={handleSubmit}
                placeholder="Search..."
                className="custom-search-class"
            /> */}
        </div>
      </div>

    </main>
  )
}
