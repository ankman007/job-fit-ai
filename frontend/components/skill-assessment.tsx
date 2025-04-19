"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface SkillItem {
  name: string
  status: "match" | "partial" | "missing"
  importance: number // 1-5
  description: string
}

interface SkillAssessmentProps {
  data: {
    matchedSkills: SkillItem[]
    partialSkills: SkillItem[]
    missingSkills: SkillItem[]
    overallMatch: number
  }
}

export function SkillAssessment({ data }: SkillAssessmentProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "match":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "missing":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

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
      <CardHeader
        className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skill Assessment</CardTitle>
            <CardDescription>Comparing your skills with job requirements</CardDescription>
          </div>
          <div className="flex items-center">
            <div className="mr-4 bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm font-medium">
              {data.overallMatch}% Match
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
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Matched Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.matchedSkills.map((skill, index) => (
                  <div key={index} className="border rounded-md p-3 bg-green-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getStatusIcon(skill.status)}
                        <h4 className="font-medium ml-2">{skill.name}</h4>
                      </div>
                      <div className="ml-2">{getImportanceStars(skill.importance)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Partial Matches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.partialSkills.map((skill, index) => (
                  <div key={index} className="border rounded-md p-3 bg-amber-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getStatusIcon(skill.status)}
                        <h4 className="font-medium ml-2">{skill.name}</h4>
                      </div>
                      <div className="ml-2">{getImportanceStars(skill.importance)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Missing Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.missingSkills.map((skill, index) => (
                  <div key={index} className="border rounded-md p-3 bg-red-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getStatusIcon(skill.status)}
                        <h4 className="font-medium ml-2">{skill.name}</h4>
                      </div>
                      <div className="ml-2">{getImportanceStars(skill.importance)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
