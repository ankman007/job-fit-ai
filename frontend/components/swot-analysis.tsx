"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface SwotItem {
  title: string
  description: string
}

interface SwotAnalysisProps {
  data: {
    strengths: SwotItem[]
    weaknesses: SwotItem[]
    opportunities: SwotItem[]
    threats: SwotItem[]
  }
}

export function SwotAnalysis({ data }: SwotAnalysisProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card>
      <CardHeader
        className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SWOT Analysis</CardTitle>
            <CardDescription>Strengths, Weaknesses, Opportunities, and Threats</CardDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2 flex items-center">
                  <div className="w-2 h-6 bg-green-500 rounded-full mr-2"></div>
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {data.strengths.map((item, index) => (
                    <li key={index} className="bg-green-50 p-3 rounded-md">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2 flex items-center">
                  <div className="w-2 h-6 bg-red-500 rounded-full mr-2"></div>
                  Weaknesses
                </h3>
                <ul className="space-y-3">
                  {data.weaknesses.map((item, index) => (
                    <li key={index} className="bg-red-50 p-3 rounded-md">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 rounded-full mr-2"></div>
                  Opportunities
                </h3>
                <ul className="space-y-3">
                  {data.opportunities.map((item, index) => (
                    <li key={index} className="bg-blue-50 p-3 rounded-md">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2 flex items-center">
                  <div className="w-2 h-6 bg-amber-500 rounded-full mr-2"></div>
                  Threats
                </h3>
                <ul className="space-y-3">
                  {data.threats.map((item, index) => (
                    <li key={index} className="bg-amber-50 p-3 rounded-md">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
