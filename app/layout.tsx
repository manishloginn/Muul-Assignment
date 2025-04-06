import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CubeProviderWrapper from './_providers/CubeProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Dashboard using Cube.js + Recharts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CubeProviderWrapper>
          {children}
        </CubeProviderWrapper>
      </body>
    </html>
  );
}
