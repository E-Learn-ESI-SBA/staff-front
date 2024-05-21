
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="p-6 w-full h-full">
        {children}
        </main>
    );
}
