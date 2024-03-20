import { Suspense } from 'react';
import { SideBar } from "@/components/dashboard/student/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense>
        <body className='flex'> 
                <SideBar />
                <div className='flex-1 pl-80'>{children}</div>
            </body>
        </Suspense>
    );
}

