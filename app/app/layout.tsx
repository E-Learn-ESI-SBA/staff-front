import { Suspense } from "react";
import { SideBar } from "@/components/dashboard/student/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="flex">
      <Suspense>
        <SideBar />
        <div className="flex-1 pl-80">{children}</div>
      </Suspense>
    </body>
  );
}
