'use client';

import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TanstackProvider from '@/provider/TanstackQuery';
import { Toaster } from '@/components/ui/toaster';
import { ReduxProvider } from '@/provider/ReduxProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang='en'>
        <body className={inter.className}>
          <TanstackProvider>
            <main className='flex min-h-screen flex-col justify-between'>
              <Navbar />
              <div className='pt-4'>{children}</div>
              <Toaster />
              <Footer />
            </main>
          </TanstackProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
