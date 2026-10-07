import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindora — Think. Create. Discover.",
  description:
    "Mindora is an intelligent AI workspace for conversations, writing, research, coding, creativity, and more.",
  keywords: [
    "AI assistant",
    "Mindora",
    "AI workspace",
    "coding assistant",
    "writing companion",
    "research intelligence",
  ],
  authors: [{ name: "Mindora AI" }],
  openGraph: {
    title: "Mindora — Think. Create. Discover.",
    description:
      "Your intelligent AI workspace for conversations, ideas, research, writing, coding, and more.",
    type: "website",
    siteName: "Mindora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindora — Think. Create. Discover.",
    description:
      "Your intelligent AI workspace for conversations, ideas, research, writing, coding, and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 dark:bg-[#070a12] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
