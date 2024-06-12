import React from 'react'
import Link from 'next/link'
const TeachersPage = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center ' >
      Teachers page
      <Link href='/app/teachers/1' className='bg-blue-500 p-4 rounded-xl text-white font-medium text-xl' >
        go to this teacher
      </Link>
    </div>
  )
}

export default TeachersPage
