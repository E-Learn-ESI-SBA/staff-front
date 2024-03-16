import React from 'react'
import Search from './search';
import Icon from './icon';
import Image from 'next/image';


type Props = {
    title: string;
}
export default function NavBar({title}: Props) {
  return (
    <div className='flex justify-between w-ful bg-white p-4'>
        <div className=''>
            <p className='text-secondary text-3xl font-semibold'>{title}</p>
        </div>
        <div className='flex justify-between'>
            <Search />
            <Icon icon='/assets/icons/nav-bar/settings.svg' />
            <Icon icon='/assets/icons/nav-bar/notifications.svg' />
            <Image src={'/assets/person.png'} width={50} height={50} alt='person' className='rounded-full w-14 h-14 mx-4' />
        </div>
    </div>
  )
}
