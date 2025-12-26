import type {Metadata} from 'next';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from '@/context/user-provider';

export const metadata: Metadata = {
  title: 'Ignite Desire',
  description: 'A sexy couple app for weekly challenges and rewards.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="font-body antialiased">
        <UserProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
