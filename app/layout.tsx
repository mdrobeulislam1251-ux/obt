import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Data Infrastructure',
  description: 'Data Infrastructure Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
