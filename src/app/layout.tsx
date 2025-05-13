import type { Metadata } from 'next';
import { Cairo } from 'next/font/google'; // Changed from Inter to Cairo
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-cairo' 
});

export const metadata: Metadata = {
  title: 'مواءمة مثالية - اعثر على صديقك القط',
  description: 'منصة لتبني وإعادة توطين القطط.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
