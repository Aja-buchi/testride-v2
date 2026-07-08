import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TestRide – Test Day Support for Learner Drivers',
  description:
    'Book a qualified accompanying driver and insured car for your UK practical driving test. Fast, reliable, stress-free test-day support.',
  keywords: 'UK driving test, test day support, accompanying driver, learner driver, DVSA, practical test car',
  openGraph: {
    title: 'TestRide – Test Day Support for Learner Drivers',
    description: 'Book a qualified driver and car for your UK practical driving test.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
