"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, MessageCircle, ThumbsUp, ThumbsDown, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Question {
  question: string
  category: "Technical" | "Behavioral" | "Experience" | "Project"
  difficulty: "Easy" | "Medium" | "Hard"
  answer: string
}

interface InterviewQuestionsProps {
  data: Question[] | null;
} 

export function InterviewQuestions({ data }: InterviewQuestionsProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter((i) => i !== index))
    } else {
      setExpandedQuestions([...expandedQuestions, index])
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Easy</span>
      case "Medium":
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Medium</span>
      case "Hard":
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Hard</span>
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technical":
        return <div className="w-1 h-10 bg-blue-500 rounded-full mr-3"></div>
      case "behavioral":
        return <div className="w-1 h-10 bg-green-500 rounded-full mr-3"></div>
      case "experience":
        return <div className="w-1 h-10 bg-purple-500 rounded-full mr-3"></div>
      case "project":
        return <div className="w-1 h-10 bg-amber-500 rounded-full mr-3"></div>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader
        className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Interview Questions</CardTitle>
            <CardDescription>Prepare for these likely questions</CardDescription>
          </div>
          <div className="flex items-center">
            <div className="mr-4 bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm font-medium">
              {data?.length} Questions
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-sm">Technical</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span className="text-sm">Behavioral</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                <span className="text-sm">Experience</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                <span className="text-sm">Project</span>
              </div>
            </div>

            {data?.map((question, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center">
                    {getCategoryIcon(question.category)}
                    <div>
                      <h3 className="font-medium">{question.question}</h3>
                      <div className="flex items-center mt-1">
                        {getDifficultyBadge(question.difficulty)}
                        <span className="text-xs text-gray-500 ml-2 capitalize">{question.category}</span>
                      </div>
                    </div>
                  </div>
                  {expandedQuestions.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                {expandedQuestions.includes(index) && (
                  <div className="p-4 bg-gray-50 border-t">
                    {question.answer && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-700 flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1 text-teal-600" />
                            Suggested Answer
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-gray-500 hover:text-gray-700"
                            onClick={() => copyToClipboard(question.answer!, index)}
                          >
                            {copiedIndex === index ? (
                              <span className="text-xs flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Copied!
                              </span>
                            ) : (
                              <span className="text-xs flex items-center">
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </span>
                            )}
                          </Button>
                        </div>
                        <p className="text-gray-700 text-sm bg-white p-3 rounded border">{question.answer}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-end mt-4 space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-xs">Helpful</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        <span className="text-xs">Not Helpful</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
