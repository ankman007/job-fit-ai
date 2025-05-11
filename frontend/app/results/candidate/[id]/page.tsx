"use client";
import { Navbar } from "@/components/navbar";
import { ResultsHeader } from "@/components/results-header";
import { SwotAnalysis } from "@/components/swot-analysis";
import { SkillAssessment } from "@/components/skill-assessment";
import { ConceptRefresh } from "@/components/concept-refresh";
import { InterviewQuestions } from "@/components/interview-questions";
import { CompanyInsights } from "@/components/company-insights";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";
import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { mockResultsData } from "@/lib/mock-data";

// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Candidate Cheatsheet | JobFitAI",
//   description: "Interview Preparation made easy with JobFitAI",
// }

function ResultsPage() {
  const { id } = useParams();
  const cheatsheets = useSelector((state: RootState) => state.cheatsheets.cheatsheets);
  const sheet = cheatsheets.find((cs) => Number(cs.id) === Number(id));

  console.log('Found cheatsheet:', cheatsheets);
  console.log('Found sheet:', sheet);

  const formattedCheatsheet = sheet
    ? {
        id: sheet.id,
        jobTitle: (sheet.content as any).role,
        company: (sheet.content as any).company,
        resumeName: "john_doe_resume.pdf",
        generatedDate: "April 19, 2025",
        swotAnalysis: (sheet.content as any).swot_analysis,
        companyOverview: (sheet.content as any).company_insights,
        skillAssessment: (sheet.content as any).skill_assessment,
        conceptRefresh: (sheet.content as any).concept_refresh,
        interviewQuestions: (sheet.content as any).interview_questions,
        companyInsights: (sheet.content as any).company_insights,
      }
    : null;

  
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ResultsHeader
        jobTitle={formattedCheatsheet?.jobTitle}
        company={formattedCheatsheet?.company}
        resumeName={formattedCheatsheet?.resumeName}
        generatedDate={formattedCheatsheet?.generatedDate}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Your Interview Cheatsheet
              </h1>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Save PDF</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">
                This personalized cheatsheet is based on your resume and the job
                description you provided. Use it to prepare for your interview
                and highlight your relevant skills and experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SwotAnalysis data={formattedCheatsheet?.swotAnalysis} />
          <SkillAssessment data={formattedCheatsheet?.skillAssessment} />
          <ConceptRefresh data={formattedCheatsheet?.conceptRefresh} />
          <InterviewQuestions data={formattedCheatsheet?.interviewQuestions} />
          <CompanyInsights data={formattedCheatsheet?.companyInsights} />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Was this cheatsheet helpful for your interview preparation?
          </p>
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              Very Helpful
            </Button>
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              Somewhat Helpful
            </Button>
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              Not Helpful
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withAuth(ResultsPage);
