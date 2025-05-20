import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheatsheetGenerator } from "@/components/cheatsheet-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Interview Cheatsheet | JobFitAI",
  description: "Create your personalized interview cheatsheet with JobFitAI",
};

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <CheatsheetGenerator />
      <Footer />
    </main>
  );
}
