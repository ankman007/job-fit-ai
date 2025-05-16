"use client";

import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import InterviewerResultsPage from "@/components/results/interview-cheatsheet";
import CandidateResultsPage from "@/components/results/candidate.cheatsheet";

function ResultsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams() as { id: string };
  const { toast } = useToast();

  const sheet = useSelector((state: RootState) =>
    state.cheatsheets.cheatsheets.find((cs) => String(cs.id) === id)
  );
  console.log("Sheet from main res page", sheet);

  // useEffect(() => {
  //   if (!sheet) {
  //     toast({
  //       title: "Cheatsheet not found",
  //       description:
  //         "Looks like this cheatsheet doesn't exist. Try viewing your saved cheatsheets from your profile, or create a new one.",
  //       variant: "destructive",
  //     });
  //     router.push(`/`);
  //   }
  // }, [sheet, router, pathname]);

  // if (!sheet) {
  //   return null;
  // }

  const cheatsheet_type = sheet?.cheatsheet_type;

  if (cheatsheet_type == "candidate") {
    const candidateCheatsheet = sheet
      ? {
          id: sheet.id,
          jobTitle: (sheet.content as any).role,
          company: (sheet.content as any).company,
          resumeName: sheet.filename,
          generatedDate: sheet.generated_at,
          swotAnalysis: (sheet.content as any).swot_analysis,
          companyOverview: (sheet.content as any).company_insights,
          skillAssessment: (sheet.content as any).skill_assessment,
          conceptRefresh: (sheet.content as any).concept_refresh,
          interviewQuestions: (sheet.content as any).interview_questions,
          companyInsights: (sheet.content as any).company_insights,
        }
      : null;
    console.log("candidateCheatsheet", candidateCheatsheet);
    return <CandidateResultsPage sheet={candidateCheatsheet} />;
  }

  if (cheatsheet_type == "interviewer") {
    const inteviewerCheatsheet = sheet
      ? {
          id: sheet.id,
          resumeName: sheet.filename,
          generatedDate: sheet.generated_at,
          candidate: (sheet.content as any).candidate_overview,
          compatibility: (sheet.content as any).compatibility_score,
          skills: (sheet.content as any).candidate_overview.top_skills,
          education: (sheet.content as any).education,
          experience: (sheet.content as any).experience,
          skillGaps: (sheet.content as any).skill_gaps_and_concerns, 
          screeningQuestions: (sheet.content as any)
            .recommended_screening_questions,
          interviewRecommendation: (sheet.content as any)
            .interview_recommendation,
        }
      : null;
    console.log("inteviewerCheatsheet", inteviewerCheatsheet);
    return <InterviewerResultsPage sheet={inteviewerCheatsheet} />;
  }

  // return (
  //   <div className="flex items-center justify-center h-screen">
  //     <p className="text-xl text-gray-600">Unknown cheatsheet type.</p>
  //   </div>
  // );
}

export default withAuth(ResultsPage);
