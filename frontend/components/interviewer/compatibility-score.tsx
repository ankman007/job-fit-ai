"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CompatibilityScoreProps {
  data: {
    overall: number
    categories: {
      name: string
      score: number
      color: string
    }[]
  }
}

export function CompatibilityScore({ data }: CompatibilityScoreProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-teal-600"
    if (score >= 40) return "text-amber-600"
    return "text-red-600"
  }

  const getScoreText = (score: number) => {
    if (score >= 80) return "Excellent Match"
    if (score >= 60) return "Good Match"
    if (score >= 40) return "Moderate Match"
    return "Low Match"
  }

  return (
    <Card>
      <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle>Compatibility Score</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-6 mb-2">
              <div className="text-4xl font-bold text-teal-600">{data.overall}%</div>
            </div>
            <p className={`font-medium ${getScoreColor(data.overall)}`}>{getScoreText(data.overall)}</p>
          </div>

          <div className="space-y-4">
            {data.categories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-medium">{category.score}%</span>
                </div>
                <Progress
                  value={category.score}
                  className={`h-2 ${
                    category.color === "green"
                      ? "bg-green-100"
                      : category.color === "amber"
                        ? "bg-amber-100"
                        : category.color === "red"
                          ? "bg-red-100"
                          : "bg-teal-100"
                  }`}
                  indicatorClassName={
                    category.color === "green"
                      ? "bg-green-600"
                      : category.color === "amber"
                        ? "bg-amber-600"
                        : category.color === "red"
                          ? "bg-red-600"
                          : "bg-teal-600"
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
