"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react"

interface SkillGap {
  skill: string
  importance: number // 1-5
  description: string
  recommendation: string
}

interface SkillGapsProps {
  data: {
    criticalGaps: SkillGap[]
    minorGaps: SkillGap[]
  }
}

export function SkillGaps({ data }: SkillGapsProps) {
  // console.log("SkillGaps data", data);

  const [isExpanded, setIsExpanded] = useState(true)

  const getImportanceStars = (importance: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full mx-0.5 ${i < importance ? "bg-teal-600" : "bg-gray-200"}`}
          ></div>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle>Skill Gaps & Concerns</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          {data.criticalGaps.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-red-600 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Critical Gaps
              </h3>
              <div className="space-y-4">
                {data.criticalGaps.map((gap, index) => (
                  <div key={index} className="border border-red-200 rounded-md p-4 bg-red-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{gap.skill}</h4>
                      <div className="ml-2">{getImportanceStars(gap.importance)}</div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{gap.description}</p>
                    <div className="bg-white p-3 rounded border border-red-100">
                      <h5 className="text-sm font-medium mb-1">Recommendation</h5>
                      <p className="text-sm text-gray-600">{gap.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.minorGaps.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-amber-600 mb-3">Minor Gaps</h3>
              <div className="space-y-4">
                {data.minorGaps.map((gap, index) => (
                  <div key={index} className="border border-amber-200 rounded-md p-4 bg-amber-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{gap.skill}</h4>
                      <div className="ml-2">{getImportanceStars(gap.importance)}</div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{gap.description}</p>
                    <div className="bg-white p-3 rounded border border-amber-100">
                      <h5 className="text-sm font-medium mb-1">Recommendation</h5>
                      <p className="text-sm text-gray-600">{gap.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
