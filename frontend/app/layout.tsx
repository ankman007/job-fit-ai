import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/components/redux-provider";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobFitAI - Ace Your Next Interview",
  description: "Prepare for your next job interview with AI-powered insights and personalized preparation guides.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Layout>
          {children}
          <Toaster />
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
