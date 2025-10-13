import './globals.css';
import Navbar from './components/Navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Personal Task Tracker',
  description: 'Track your tasks, homework, and progress easily!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 min-h-screen`}>
        <Navbar />
        <main className="container mx-auto py-10 px-4">{children}</main>
        <footer className="text-center text-sm py-4 text-gray-500 mt-10">
          © 2025 Personal Task Tracker | DIT312 Midterm Project
        </footer>
      </body>
    </html>
  );
}
