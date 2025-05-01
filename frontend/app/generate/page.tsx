'use client'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheatsheetGenerator } from "@/components/cheatsheet-generator"
import type { Metadata } from "next";
import withAuth from "@/hoc/withAuth";

// export const metadata: Metadata = {
//   title: "Generate Interview Cheatsheet | JobPrepAI",
//   description: "Create your personalized interview cheatsheet with JobPrepAI",
// }

function GeneratePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-2">Generate Your Interview Cheatsheet</h1>
          <p className="text-center text-gray-600 mb-8">
            Upload your resume and enter the job description to create your personalized interview guide
          </p>
          <CheatsheetGenerator />
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default withAuth(GeneratePage);