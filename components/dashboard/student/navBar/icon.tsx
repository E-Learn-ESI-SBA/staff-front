import { Button } from '@/components/ui/button'
import Image from 'next/image';
import React from 'react';

type Props = {
    icon: string;
}

export default function Icon({icon}: Props) {
  return (
    <div className='bg-secondary-background rounded-full flex justify-center items-center w-14 h-14 hover:bg-primary mx-4'>
        <Button className='bg-transparent border-none w-fit hover:bg-transparent'>
            <Image src={icon} alt='icon' width={30} height={30} /> 
        </Button>
    </div>
  )
}
