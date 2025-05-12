"use client";

import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";

import InterviewerResultsPage from "@/components/results/interview-cheatsheet";
import CandidateResultsPage from "@/components/results/candidate.cheatsheet";

function ResultsPage() {
  const { id } = useParams() as { id: string };
  
  const sheet = useSelector((state: RootState) =>
    state.cheatsheets.cheatsheets.find((cs) => String(cs.id) === id)
  );

  const cheatsheet_type = sheet?.cheatsheet_type;
  
  if (cheatsheet_type == "candidate") {
    const candidateCheatsheet = sheet
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
    console.log("candidateCheatsheet", candidateCheatsheet)
    return <CandidateResultsPage sheet={candidateCheatsheet} />
  }

  if (cheatsheet_type == "inteviewer") {
    const inteviewerCheatsheet = sheet
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
    console.log("inteviewerCheatsheet", inteviewerCheatsheet)
    return <InterviewerResultsPage sheet={inteviewerCheatsheet} />
  }
}

export default withAuth(ResultsPage);
