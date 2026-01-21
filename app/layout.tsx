import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://profilefinder.ai'),
  title: "ProfileFinder.ai - Reverse Image Search for Dating Apps",
  description: "Find hidden dating profiles, detect catfishing, and verify identities with our AI-powered reverse image search technology.",
  keywords: ["dating profile search", "reverse image search", "catfish detection", "profile finder", "identity verification"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ProfileFinder.ai - Reverse Image Search for Dating Apps",
    description: "Find hidden dating profiles, detect catfishing, and verify identities with our AI-powered reverse image search technology.",
    type: "website",
    locale: "en_US",
    siteName: "ProfileFinder.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfileFinder.ai - Reverse Image Search for Dating Apps",
    description: "Find hidden dating profiles, detect catfishing, and verify identities with our AI-powered reverse image search technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
