import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rising Sun Global | Industrial Scrap & Metal Recovery",
    template: "%s | Rising Sun Global",
  },
  description:
    "Rising Sun Global is an Adelaide-based industrial partner for scrap metal purchasing, demolition support, metal recovery, and export-focused supply across Australia and India.",
  keywords: [
    "Rising Sun Global",
    "scrap metal purchaser Adelaide",
    "industrial demolition Australia",
    "metal recovery provider",
    "scrap metal exporter",
    "industrial recycling",
    "ferrous metals",
    "non-ferrous metals",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Rising Sun Global",
    title: "Rising Sun Global | Industrial Scrap & Metal Recovery",
    description:
      "Industrial scrap procurement, demolition support, metal recovery, and export-focused supply across Australia and India.",
    images: [
      {
        url: "/rsg_front.jpeg",
        width: 1586,
        height: 973,
        alt: "Rising Sun Global business card with director contact details",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rising Sun Global | Industrial Scrap & Metal Recovery",
    description:
      "Industrial scrap procurement, demolition support, metal recovery, and export-focused supply across Australia and India.",
    images: ["/rsg_front.jpeg"],
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-rsg-paper text-rsg-ink">{children}</body>
    </html>
  );
}
