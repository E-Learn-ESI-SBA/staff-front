'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

type TProps = {
  label: string;
  icon: string;
  url: string;
  isActive: boolean;
  onItemClick: () => void;
}

export default function SideItem({ label, icon, url, isActive, onItemClick }: TProps) {


  return (

    <Button className={`flex ${isActive ? 'bg-blue-500 text-white' : 'text-text bg-transparent'}  w-60  py-6 flex justify-start hover:bg-blue-500 hover:text-white my-2`} onClick={onItemClick}>
      <Image src={icon} width={30} height={30} alt='icon' className='mr-2' color='white' />
      <p>{label}</p>
    </Button>

  );
}
