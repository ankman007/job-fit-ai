import { Navbar } from "@/components/navbar"
import { CandidateOverview } from "@/components/interviewer/candidate-overview"
import { CompatibilityScore } from "@/components/interviewer/compatibility-score"
import { SkillsAssessment } from "@/components/interviewer/skills-assessment"
import { EducationExperience } from "@/components/interviewer/education-experience"
import { SkillGaps } from "@/components/interviewer/skill-gaps"
import { ScreeningQuestions } from "@/components/interviewer/screening-questions"
import { InterviewRecommendation } from "@/components/interviewer/interview-recommendation"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2, Star } from "lucide-react"

// This would normally come from an API
import { mockInterviewerData } from "@/lib/mock-interviewer-data"

export default function InterviewerResultsPage() {
  // In a real app, you would fetch data from an API here
  const candidateData = mockInterviewerData

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold">{candidateData.candidate.name}</h1>
                {candidateData.candidate.rating >= 4 && (
                  <div className="ml-3 bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-yellow-800" />
                    Top Candidate
                  </div>
                )}
              </div>
              <p className="mt-1 text-teal-100">{candidateData.candidate.appliedPosition}</p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </Button>
              <Button size="sm" variant="secondary" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button size="sm" variant="secondary" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <CandidateOverview data={candidateData.candidate} />
              <CompatibilityScore data={candidateData.compatibility} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-8">
              <SkillsAssessment data={candidateData.skills} />
              <EducationExperience education={candidateData.education} experience={candidateData.experience} />
              <SkillGaps data={candidateData.skillGaps} />
              <ScreeningQuestions data={candidateData.screeningQuestions} />
              <InterviewRecommendation data={candidateData.interviewRecommendation} />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Was this analysis helpful for your hiring decision?</p>
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
