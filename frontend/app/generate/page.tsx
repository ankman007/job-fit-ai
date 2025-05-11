import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheatsheetGenerator } from "@/components/cheatsheet-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Generate Interview Cheatsheet | JobFitAI",
  description: "Create your personalized interview cheatsheet with JobFitAI",
}

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              Generate Your Interview Cheatsheet
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Upload your resume and enter the job description to create your personalized interview guide
            </p>
          </div>
          <CheatsheetGenerator />
        </div>
      </section>
      <Footer />
    </main>
  )
}
