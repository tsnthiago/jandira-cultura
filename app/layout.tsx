// app/layout.tsx

import { ReactNode } from 'react';
import Footer from './components/Footer';
import ToasterProvider from './components/ToastProvider';
import './styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
