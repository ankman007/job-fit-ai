"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react"

interface InterviewRecommendationProps {
  data: {
    recommendation: "strong_yes" | "yes" | "maybe" | "no"
    summary: string
    strengths: string[]
    concerns: string[]
    nextSteps: string[]
  }
}

export function InterviewRecommendation({ data }: InterviewRecommendationProps) {
  // console.log("InterviewRecommendation data", data);

  const [isExpanded, setIsExpanded] = useState(true)

  const getRecommendationDisplay = () => {
    switch (data.recommendation) {
      case "strong_yes":
        return (
          <div className="flex items-center bg-green-100 text-green-800 px-4 py-3 rounded-lg">
            <ThumbsUp className="h-6 w-6 mr-3 fill-green-800" />
            <div>
              <h3 className="font-bold text-lg">Strong Yes</h3>
              <p className="text-sm">Highly recommended to proceed with this candidate</p>
            </div>
          </div>
        )
      case "yes":
        return (
          <div className="flex items-center bg-teal-100 text-teal-800 px-4 py-3 rounded-lg">
            <ThumbsUp className="h-6 w-6 mr-3" />
            <div>
              <h3 className="font-bold text-lg">Yes</h3>
              <p className="text-sm">Recommended to proceed with this candidate</p>
            </div>
          </div>
        )
      case "maybe":
        return (
          <div className="flex items-center bg-amber-100 text-amber-800 px-4 py-3 rounded-lg">
            <AlertCircle className="h-6 w-6 mr-3" />
            <div>
              <h3 className="font-bold text-lg">Maybe</h3>
              <p className="text-sm">Consider additional evaluation before proceeding</p>
            </div>
          </div>
        )
      case "no":
        return (
          <div className="flex items-center bg-red-100 text-red-800 px-4 py-3 rounded-lg">
            <ThumbsDown className="h-6 w-6 mr-3" />
            <div>
              <h3 className="font-bold text-lg">No</h3>
              <p className="text-sm">Not recommended to proceed with this candidate</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle>Interview Recommendation</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-6">
            {getRecommendationDisplay()}

            <div>
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <p className="text-gray-700">{data.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-green-700 mb-2">Key Strengths</h3>
                <ul className="space-y-2">
                  {data.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <ThumbsUp className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-red-700 mb-2">Concerns</h3>
                <ul className="space-y-2">
                  {data.concerns.map((concern, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-teal-700 mb-2">Recommended Next Steps</h3>
              <ul className="space-y-2">
                {data.nextSteps.map((step, index) => (
                  <li key={index} className="bg-teal-50 border border-teal-100 rounded-md p-3">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
