'use client'
import React from 'react'
import { SideBarItem } from '@/types';
import { sideBarItems } from '@/data/side-bar-items';
import SideItem from './sideItem';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';


export const  SideBar: React.FC = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = React.useState<string | null>(pathname);

  const handleItemClick = (url: string) => {
    setActiveItem(url);
    router.push(url);
  };

  // const inTarget =
  //   url === '/dashboard/student'
  //     ? pathname === url
  //     : pathname.includes(url);

  const router = useRouter();
  const SideItems = () => {
    return sideBarItems.map((item: SideBarItem, key: number) => (
      <SideItem
        icon={item.icon}
        url={item.url}
        label={item.label}
        isActive={activeItem === item.url}
        onItemClick={() => handleItemClick(item.url)}
        key={key}
      />
    ));
  };

  return (
    <div className="w-80 scrollbar-hide z-40 left-0 bg-light-200 absolute top-0 xl:h-lvh p-4">
      <div className='mb-16'>
        <Image src={'/icons/logo.svg'} width={150} height={150} alt='logo' />
      </div>

      <div className='flex flex-col justify-between'>
        {SideItems()}
      </div>
      <div className='logout absolute bottom-8'>
        <SideItem
          icon={"/assets/icons/side-bar/logout.svg"}
          url={"/logout"}
          label={"Log Out"}
          isActive={false}
          onItemClick={() => { }}
        />
      </div>
    </div>

  )
}
