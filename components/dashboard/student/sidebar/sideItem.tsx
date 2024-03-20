import { Button } from '@/components/ui/button';
import { CalendarCheck, CircleUserRound, FileText, LogOut, Menu, MessageSquareText, Settings } from 'lucide-react';
import React from 'react';

type iconType = "menu" | "courses" | "profile" | "settings" | "logout" | "discussions" | "schedules";

type TProps = {
  label: string;
  icon: iconType;
  url: string;
  isActive: boolean;
  onItemClick: () => void;
}


export default function SideItem({ label, icon, url, isActive, onItemClick }: TProps) {

  return (

    <Button className={`flex ${isActive ? 'bg-blue-500 text-white' : 'text-text bg-transparent'}  w-60  py-6 flex justify-start hover:bg-blue-500 hover:text-white gap-4 text-xl`} onClick={onItemClick}>
      {SideIcon(icon)}
      <p>{label}</p>
    </Button>

  );
}



const SideIcon = (icon: iconType) => {
  switch (icon) {
    case "menu":
      return <Menu className='' />;
    case "courses":
      return <FileText />;
    case "profile":
      return <CircleUserRound />;
    case "settings":
      return <Settings />;
    case "discussions":
      return <MessageSquareText />;
    case "logout":
      return <LogOut />;
    case "schedules":
      return <CalendarCheck />;
  }
}