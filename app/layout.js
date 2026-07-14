import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Cosmos em Movimento · Scrollytelling',
  description: 'Uma jornada visual pela ciência, com efeitos cinematográficos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>{children}</body>
    </html>
  );
                                  }
