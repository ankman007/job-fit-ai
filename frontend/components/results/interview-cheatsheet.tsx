"use client";

import { useRef } from "react";
import { Navbar } from "@/components/navbar";
import { CandidateOverview } from "@/components/interviewer/candidate-overview";
import { CompatibilityScore } from "@/components/interviewer/compatibility-score";
import { SkillsAssessment } from "@/components/interviewer/skills-assessment";
import { EducationExperience } from "@/components/interviewer/education-experience";
import { SkillGaps } from "@/components/interviewer/skill-gaps";
import { ScreeningQuestions } from "@/components/interviewer/screening-questions";
import { InterviewRecommendation } from "@/components/interviewer/interview-recommendation";
import { ResultsHeader } from "../results-header";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export default function InterviewerResultsPage({ sheet }: any) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ResultsHeader
        jobTitle={sheet.candidate.full_name}
        company={sheet?.candidate.current_job_title}
        resumeName={sheet?.resumeName}
        generatedDate={sheet?.generatedDate}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Your Interview Cheatsheet
              </h1>
              <div className="flex space-x-2 mt-4 md:mt-0 no-print">
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
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">
                Use this personalized cheatsheet, compiled from the candidate's
                resume and the job description, to guide your interview and
                probe their most relevant skills and experiences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <CandidateOverview data={sheet.candidate} />
                <CompatibilityScore data={sheet?.compatibility} />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                <InterviewRecommendation data={sheet.interviewRecommendation} />
                <ScreeningQuestions data={sheet.screeningQuestions} />
                <EducationExperience
                  education={sheet.education}
                  experience={sheet.experience}
                />
                {/* <SkillsAssessment data={sheet.skills} /> */}
                <SkillGaps data={sheet.skillGaps} />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Was this analysis helpful for your hiring decision?
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
      </div>
    </main>
  );
}
