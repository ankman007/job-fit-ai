import { Navbar } from "@/components/navbar"
import { ResultsHeader } from "@/components/results-header"
import { SwotAnalysis } from "@/components/swot-analysis"
import { SkillAssessment } from "@/components/skill-assessment"
import { ConceptRefresh } from "@/components/concept-refresh"
import { InterviewQuestions } from "@/components/interview-questions"
import { CompanyInsights } from "@/components/company-insights"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2 } from "lucide-react"
import type { Metadata } from "next"
import { mockResultsData } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Candidate Cheatsheet | JobPrepAI",
  description: "Interview Preparation made easy with JobPrepAI",
}

export default function ResultsPage() {
  // In a real app, you would fetch data from an API here
  const resultsData = mockResultsData

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ResultsHeader
        jobTitle={resultsData.jobTitle}
        company={resultsData.company}
        resumeName={resultsData.resumeName}
        generatedDate={resultsData.generatedDate}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Your Interview Cheatsheet</h1>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Save PDF</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">
                This personalized cheatsheet is based on your resume and the job description you provided. Use it to
                prepare for your interview and highlight your relevant skills and experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SwotAnalysis data={resultsData.swotAnalysis} />
          <SkillAssessment data={resultsData.skillAssessment} />
          <ConceptRefresh data={resultsData.conceptRefresh} />
          <InterviewQuestions data={resultsData.interviewQuestions} />
          <CompanyInsights data={resultsData.companyInsights} />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Was this cheatsheet helpful for your interview preparation?</p>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              Very Helpful
            </Button>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              Somewhat Helpful
            </Button>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              Not Helpful
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
