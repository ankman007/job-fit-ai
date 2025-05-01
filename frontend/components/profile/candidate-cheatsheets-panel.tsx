"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

interface CheatsheetProps {
  id: string
  companyName: string
  companyOverview: string
  role: string
}

interface CandidateCheatsheetPanelProps {
  cheatsheets: CheatsheetProps[]
}

export function CandidateCheatsheetPanel({ cheatsheets }: CandidateCheatsheetPanelProps) {
  if (cheatsheets.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-1">No candidate cheatsheets found</h3>
        <p className="text-gray-500 mb-4">You haven't created any interview cheatsheets yet</p>
        <Button asChild>
          <Link href="/">Create Your First Cheatsheet</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cheatsheets.map((sheet) => (
        <Card key={sheet.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">{sheet.companyName}</CardTitle>
            <p className="text-sm font-medium text-gray-500">{sheet.role}</p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Company Overview</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{sheet.companyOverview}</p>
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
  )
}
