import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Sora } from 'next/font/google';
import { LoadingProvider } from '@/context/LoadingContext';
import { Loader } from '@/components/common/Loader';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'Aetherium AI - AI-Powered Content Creation Tools',
  description: 'Your all in one AI toolkit for effortless content creation, optimization, and generation. Supercharge your workflow with our AI Blog Writer, SEO Optimizer, and Image Generator.',
  keywords: ['AI content creation', 'SEO optimization', 'blog writer', 'image generator', 'AI tools'],
  icons: {
    icon: '/fevicon.png',
  },
  openGraph: {
    title: 'Aetherium AI - AI-Powered Content Creation Tools',
    description: 'Effortlessly create and optimize content with the power of AI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aetherium AI - AI-Powered Content Creation Tools',
    description: 'Supercharge your content workflow with Aetherium AI.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sora.variable}`}>
      <body className="font-body antialiased">
        <LoadingProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <Loader />
        </LoadingProvider>
      </body>
    </html>
  );
}
