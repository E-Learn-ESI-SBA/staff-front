import { SideBar } from "@/components/layouts/sidebar";
import {sideBarItemsStudent} from "@/data/side-bar-items";
import Header from "@/components/layouts/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex">
      <SideBar role="teacher" sideBarItems={sideBarItemsStudent} />
      <div className="flex-1 flex-col  h-full ">
          <Header />
          <div className="p-6">
          {children}
          </div>
      </div>
    </div>
  );
}
