import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const monts = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-montserrat",
  display: "swap",
});

import { SideBar } from "@/components/layouts/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" title="Madaurus">
      <body className={monts.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
