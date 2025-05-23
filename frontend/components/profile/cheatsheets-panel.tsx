"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Building, Users } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface CandidateCheatsheet {
  id: string;
  companyName: string;
  companyOverview: string;
  role: string;
}

interface InterviewerCheatsheet {
  id: string;
  candidateName: string;
  jobTitle: string;
  summary: string;
  recommendation: "proceed" | "reject" | "consider";
}

export function CheatsheetPanel() {
  const cheatsheets = useSelector(
    (state: RootState) => state.cheatsheets.cheatsheets
  );

  const candidateCheatsheets = cheatsheets
    .filter((sheet) => sheet.cheatsheet_type === "candidate")
    .map((sheet) => {
      return {
        id: sheet.id,
        companyName: (sheet.content as any).company,
        companyOverview: (sheet.content as any).company_insights
          .company_overview,
        role: (sheet.content as any).role,
      };
    });

  const sheet = cheatsheets.find((sheet) => sheet.id === "5");
  console.log("sheet", sheet);

  const idCheatsheets = sheet
    ? [
        {
          id: sheet.id,
          companyName: (sheet.content as any).company,
          companyOverview: (sheet.content as any).company_insights
            .company_overview,
          role: (sheet.content as any).role,
        },
      ]
    : [];
  console.log("idCheatsheets", idCheatsheets);

  const interviewerCheatsheets = cheatsheets
    .filter((sheet) => sheet.cheatsheet_type === "interviewer")
    .map((sheet) => {
      return {
        id: sheet.id,
        candidateName: (sheet.content as any).candidate_overview.full_name,
        summary: (sheet.content as any).candidate_overview.candidate_summary,
        jobTitle: (sheet.content as any).candidate_overview.current_job_title,
        recommendation: (sheet.content as any).interview_recommendation.proceed,
      };
    });

  const hasNoCheatsheets =
    candidateCheatsheets.length === 0 && interviewerCheatsheets.length === 0;

  if (hasNoCheatsheets) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No cheatsheets found
        </h3>
        <p className="text-gray-500 mb-4">
          You haven't created any cheatsheets yet
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Create Cheatsheet</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "Proceed":
        return <Badge className="bg-green-500">Proceed</Badge>;
      case "Reject":
        return <Badge className="bg-red-500">Reject</Badge>;
      case "Consider":
        return <Badge className="bg-amber-500">Consider</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10">
      {/* Candidate Cheatsheets Section */}
      {candidateCheatsheets.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-semibold">Candidate Cheatsheets</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidateCheatsheets.map((sheet) => (
              <Card
                key={sheet.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{sheet.companyName}</CardTitle>
                  <p className="text-sm font-medium text-gray-500">
                    {sheet.role}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        Company Overview
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {sheet.companyOverview}
                      </p>
                    </div>

                    <Button asChild size="sm">
                      <Link href={`/results/${sheet.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Cheatsheet
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Interviewer Cheatsheets Section */}
      {interviewerCheatsheets.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Interviewer Cheatsheets</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interviewerCheatsheets.map((sheet) => (
              <Card
                key={sheet.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {sheet.candidateName}
                    </CardTitle>
                    <p className="text-sm font-medium text-gray-500">
                      {sheet.jobTitle}
                    </p>
                  </div>
                  {getRecommendationBadge(sheet.recommendation)}
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        Candidate Summary
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {sheet.summary}
                      </p>
                    </div>

                    <Button asChild size="sm">
                      <Link href={`/results/${sheet.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Assessment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
