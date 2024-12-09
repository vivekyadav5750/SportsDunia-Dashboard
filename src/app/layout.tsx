import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProviders from "@/redux/providers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "../config/auth";
import Providers from "@/components/layouts/providers";

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
  title: "Sports Dunia Dashboard",
  description:
    "Sports Dunia Dashboard provides comprehensive sports analytics, news, and insights. Stay updated with the latest sports news, articles, and payout details.",
  openGraph: {
    title: "Sports Dunia Dashboard",
    description:
      "Stay updated with the latest sports analytics and news. Access insights and payout details tailored for sports enthusiasts.",
    url: "https://sports-dunia-dashboard.vercel.app",
    images: [
      {
        url: "https://sports-dunia-dashboard.vercel.app/og-image.jpg",
        alt: "Sports Dunia Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Dunia Dashboard",
    description:
      "Explore the latest sports analytics and payout details with Sports Dunia Dashboard.",
    images: ["https://sports-dunia-dashboard.vercel.app/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // Structured Data (JSON-LD Schema)
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: metadata.title,
    url: "https://sports-dunia-dashboard.vercel.app",
    description: metadata.description,
    author: {
      "@type": "Organization",
      name: "Sports Dunia",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sports-dunia-dashboard.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader showSpinner={false} />
        <ReduxProviders>
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
