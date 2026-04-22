import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI Co-Founder Method",
  description: "Stop using ChatGPT like a tool. Start using it like a co-founder. A strategic framework for founders who want to think better, move faster, and build with AI.",
  openGraph: {
    title: "The AI Co-Founder Method",
    description: "Stop using ChatGPT like a tool. Start using it like a co-founder.",
    url: "https://aicofoundermethod.com",
    siteName: "The AI Co-Founder Method",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
