import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a modern sans-serif font
import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'VIT Rank Predictor',
  description: 'Predict your VIT campus and course options based on your VITEEE rank.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>{/* Add dark class here */}
      {/* Removed space here */}
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}
