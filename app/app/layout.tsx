'use client'
import { SideBar } from "@/components/layouts/sidebar";
import { sideBarItemsStudent, sideBarItemsTeacher} from "@/data/side-bar-items";
import Header from "@/components/layouts/header";
import { useUserStore } from "@/store/user";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUserStore();
  
  return (
    <div className="w-full h-full flex">
      {user?.role == "teacher" ? 
      <SideBar role="teacher" sideBarItems={sideBarItemsTeacher} />
      : user?.role == "student" ?
      <SideBar role="student" sideBarItems={sideBarItemsStudent} /> 
      :
      // need to discuss with team
      <SideBar role="loading" sideBarItems={sideBarItemsStudent} /> 
    }
      <div className="flex-1 flex-col  h-full ">
          <Header />
          <div className="p-6">
          {children}
          </div>
      </div>
    </div>
  );
}
