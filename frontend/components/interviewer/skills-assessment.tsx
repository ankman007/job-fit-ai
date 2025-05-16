"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface SkillsAssessmentProps {
  data: string[] // Flat list of skill strings
}

export function SkillsAssessment({ data }: SkillsAssessmentProps) {
  
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card>
      <CardHeader
        className="pb-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle>Skills Assessment</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-2">
            {data.length > 0 ? (
              data.map((skill, index) => (
                <div
                  key={index}
                  className="p-3 rounded-md border flex items-center justify-between"
                >
                  <span className="font-medium">{skill}</span>
                  <span className="text-xs text-gray-500">No assessment data</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills provided.</p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
