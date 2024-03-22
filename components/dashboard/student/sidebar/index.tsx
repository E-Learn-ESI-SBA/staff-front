import React from 'react'
import { SideBarItem } from '@/types';
import { sideBarItems } from '@/data/side-bar-items';
import SideItem from './sideItem';
import Image from 'next/image';


export const SideBar: React.FC = () => {


  return (
    <div className="w-80 scrollbar-hide z-40 left-0 bg-light-200 absolute top-0 xl:h-lvh p-4">
      <div className='mb-16'>
        <Image src={'/icons/logo.svg'} width={150} height={150} alt='logo' />
      </div>

      <div className='flex flex-col justify-between gap-4'>
        {sideBarItems.map((item: SideBarItem, key: number) => (
          <SideItem
            icon={item.icon}
            url={item.url}
            label={item.label}
            key={key}
          />
        ))}
      </div>
      <div className='logout absolute bottom-8'>
        <SideItem
          icon={"logout"}
          url={"/logout"}
          label={"Log Out"}
        />
      </div>
    </div>

  )
}
