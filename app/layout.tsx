import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import 'mapbox-gl/dist/mapbox-gl.css';

import './globals.css';



const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
    title: 'sonocracy',
    description: 'vote for what you hear',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={inter.className}>{children}</body>
        </html>
    );
}
