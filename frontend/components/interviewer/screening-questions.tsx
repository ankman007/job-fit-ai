"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Question {
  question: string
  purpose: string
  expectedAnswer?: string
  category: "technical" | "behavioral" | "experience" | "cultural"
  priority: "high" | "medium" | "low"
}

interface ScreeningQuestionsProps {
  data: Question[]
}

export function ScreeningQuestions({ data }: ScreeningQuestionsProps) {
  // console.log("SkillGaps data", data);

  const [isExpanded, setIsExpanded] = useState(true)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "technical":
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Technical</span>
      case "behavioral":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Behavioral</span>
      case "experience":
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Experience</span>
      case "cultural":
        return <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">Cultural Fit</span>
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">High Priority</span>
      case "medium":
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Medium Priority</span>
      case "low":
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Low Priority</span>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle>Recommended Screening Questions</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            {data.map((question, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {getCategoryBadge(question.category)}
                    {getPriorityBadge(question.priority)}
                  </div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{question.question}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-gray-500 hover:text-gray-700"
                      onClick={() => copyToClipboard(question.question, index)}
                    >
                      {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <h5 className="text-sm font-medium mb-1">Purpose</h5>
                    <p className="text-sm text-gray-600">{question.purpose}</p>
                  </div>

                  {question.expectedAnswer && (
                    <div>
                      <h5 className="text-sm font-medium mb-1">What to Look For</h5>
                      <p className="text-sm text-gray-600">{question.expectedAnswer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
