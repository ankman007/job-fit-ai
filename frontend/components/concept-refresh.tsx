"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react"

interface ConceptItem {
  context: string;
  review_notes: string;
  topic: string;
  video_resource: string;
}

interface ConceptRefreshProps {
  data: ConceptItem[];
}

export function ConceptRefresh({ data }: ConceptRefreshProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [expandedConcepts, setExpandedConcepts] = useState<number[]>([])

  const toggleConcept = (index: number) => {
    setExpandedConcepts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
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
            {data?.map((concept, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleConcept(index)}
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-teal-600 mr-3" />
                    <div>
                      <h3 className="font-medium">{concept.topic}</h3>
                      <p className="text-sm text-gray-500">{concept.context}</p>
                    </div>
                  </div>
                  {expandedConcepts.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                {expandedConcepts.includes(index) && (
                  <div className="p-4 bg-gray-50 border-t space-y-4">
                    <p className="text-gray-700">{concept.review_notes}</p>
                    <a
                      href={concept.video_resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-teal-600 hover:underline"
                    >
                      Watch Video
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
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
