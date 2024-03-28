import Teachers from '@/components/dashboard/student/courses/teachers'
import NavBar from '@/components/dashboard/student/navBar'
import React from 'react'

export default function page() {
  return (
<>
    <NavBar title='Courses' />
    <Teachers />
    </>
  )
}
