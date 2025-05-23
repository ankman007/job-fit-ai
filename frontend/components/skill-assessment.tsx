"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface SkillItem {
  title: string
  status: "match" | "partial" | "missing"
  rating: "High" | "Medium" | "Low"
  description: string
}

interface SkillAssessmentProps {
  data: {
    match_percentage: number
    matched_skills: SkillItem[]
    partial_matches: SkillItem[]
    missing_skills: SkillItem[]
  }
}

export function SkillAssessment({ data }: SkillAssessmentProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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

const getImportanceStars = (importance: "High" | "Medium" | "Low") => {
  const importanceMap = {
    High: 5,
    Medium: 3,
    Low: 1,
  };

  const stars = importanceMap[importance];

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full mx-0.5 ${i < stars ? "bg-teal-600" : "bg-gray-200"}`}
        ></div>
      ))}
    </div>
  );
};


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
              {data?.match_percentage}% Match
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
                {data?.matched_skills.map((skill, index) => (
                  <div key={index} className="border rounded-md p-3 bg-green-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getStatusIcon("match")}
                        <h4 className="font-medium ml-2">{skill.title}</h4>
                      </div>
                      <div className="ml-2">{getImportanceStars(skill.rating)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Partial Matches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data?.partial_matches.map((skill, index) => (
                  <div key={index} className="border rounded-md p-3 bg-amber-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getStatusIcon("partial")}
                        <h4 className="font-medium ml-2">{skill.title}</h4>
                      </div>
                      <div className="ml-2">{getImportanceStars(skill.rating)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Missing Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data?.missing_skills.map((skill, index) => (
                  <div key={index} className="border rounded-md p-3 bg-red-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getStatusIcon("missing")}
                        <h4 className="font-medium ml-2">{skill.title}</h4>
                      </div>
                      {/* <div className="ml-2">{getImportanceStars(skill.importance)}</div> */}
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
