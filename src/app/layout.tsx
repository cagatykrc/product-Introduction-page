import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Fatoş Perde',
  description: 'Kaliteli ve şık perde çözümleri',
  keywords: "perde, tül perde, kadife perde, rulo perde, modern perde, perde modelleri, perde fiyatları, perde mağazası",
  authors: [{ name: "Fatoş Perde" }],
  creator: "Fatoş Perde",
  publisher: "Fatoş Perde",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fatosperde.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Fatoş Perde - Modern Perde Çözümleri",
    description: "Kaliteli ve modern perde çözümleri ile yaşam alanlarınıza değer katın. Tül perde, kadife perde, rulo perde ve daha fazlası için doğru adres.",
    url: 'https://fatosperde.com',
    siteName: 'Fatoş Perde',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fatoş Perde - Modern Perde Çözümleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fatoş Perde - Modern Perde Çözümleri",
    description: "Kaliteli ve modern perde çözümleri ile yaşam alanlarınıza değer katın.",
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-white min-h-screen flex flex-col`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
