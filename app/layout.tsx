import Header from './components/Header';
import Footer from './components/Footer';

import { Toaster } from 'react-hot-toast';

import './styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Toaster position="top-right" reverseOrder={false} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
