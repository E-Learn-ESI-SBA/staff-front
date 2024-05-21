import { SideBar } from "@/components/layouts/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-6 w-full h-full flex">
      <SideBar role="teacher" sideBarItems={} />
      <div>{children}</div>
    </main>
  );
}
