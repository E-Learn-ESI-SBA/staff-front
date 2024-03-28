import React from 'react'
import TeacherCard from './teacher-card'


const data = {
  image: '/assets/teacher.jpeg',
  name: 'John Doe',
  job: 'Math Teacher',
  review: 10, 
  rate: 4.5, 
  courses: 5, 
  social: {
      website: 'https://www.example.com',
      facebook: 'https://www.facebook.com/example',
      twitter: 'https://twitter.com/example',
      instagram: 'https://www.instagram.com/example',
      youtube: 'https://www.youtube.com/example',
      whatsapp: 'https://wa.me/1234567890',
  }
};

export default function Teachers() {
  return (
    <div className='text-black'>
      <TeacherCard {...data} />
    </div>
  )
}
