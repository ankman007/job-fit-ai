"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"

interface InterviewerCheatsheetProps {
  id: string
  candidateName: string
  jobTitle: string
  summary: string
  recommendation: "proceed" | "reject" | "consider"
}

interface InterviewerCheatsheetPanelProps {
  cheatsheets: InterviewerCheatsheetProps[]
}

export function InterviewerCheatsheetPanel({ cheatsheets }: InterviewerCheatsheetPanelProps) {
  if (cheatsheets.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-1">No interviewer cheatsheets found</h3>
        <p className="text-gray-500 mb-4">You haven't created any interviewer cheatsheets yet</p>
        <Button asChild>
          <Link href="/interviewer">Create Interviewer Cheatsheet</Link>
        </Button>
      </div>
    )
  }

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "proceed":
        return <Badge className="bg-green-500">Proceed</Badge>
      case "reject":
        return <Badge className="bg-red-500">Reject</Badge>
      case "consider":
        return <Badge className="bg-amber-500">Consider</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cheatsheets.map((sheet) => (
        <Card key={sheet.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-xl">{sheet.candidateName}</CardTitle>
              <p className="text-sm font-medium text-gray-500">{sheet.jobTitle}</p>
            </div>
            {getRecommendationBadge(sheet.recommendation)}
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Summary</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{sheet.summary}</p>
              </div>

              <Button asChild size="sm">
                <Link href={`/interviewer/results/${sheet.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Assessment
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
