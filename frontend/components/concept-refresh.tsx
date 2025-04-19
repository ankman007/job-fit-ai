"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react"

interface ConceptItem {
  topic: string
  relevance: string
  description: string
  resources: {
    title: string
    url: string
    type: "article" | "video" | "course"
  }[]
}

interface ConceptRefreshProps {
  data: ConceptItem[]
}

export function ConceptRefresh({ data }: ConceptRefreshProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [expandedConcepts, setExpandedConcepts] = useState<number[]>([])

  const toggleConcept = (index: number) => {
    if (expandedConcepts.includes(index)) {
      setExpandedConcepts(expandedConcepts.filter((i) => i !== index))
    } else {
      setExpandedConcepts([...expandedConcepts, index])
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
            <CardTitle>Concept Refresh</CardTitle>
            <CardDescription>Topics to review before your interview</CardDescription>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-6">
          <div className="space-y-4">
            {data.map((concept, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleConcept(index)}
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-teal-600 mr-3" />
                    <div>
                      <h3 className="font-medium">{concept.topic}</h3>
                      <p className="text-sm text-gray-500">{concept.relevance}</p>
                    </div>
                  </div>
                  {expandedConcepts.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                {expandedConcepts.includes(index) && (
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-gray-700 mb-4">{concept.description}</p>

                    {concept.resources.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Resources:</h4>
                        <ul className="space-y-2">
                          {concept.resources.map((resource, rIndex) => (
                            <li key={rIndex} className="flex items-center">
                              <span
                                className={`
                                w-2 h-2 rounded-full mr-2
                                ${
                                  resource.type === "article"
                                    ? "bg-blue-500"
                                    : resource.type === "video"
                                      ? "bg-red-500"
                                      : "bg-purple-500"
                                }
                              `}
                              ></span>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-teal-600 hover:underline flex items-center"
                              >
                                {resource.title}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                              <span className="text-xs text-gray-500 ml-2 capitalize">({resource.type})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
