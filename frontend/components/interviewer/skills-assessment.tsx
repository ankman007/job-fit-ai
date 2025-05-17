"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface SkillItem {
  assessment: string
  category: string
  skill_name: string
}

interface SkillsAssessmentProps {
  data: SkillItem[]
}

export function SkillsAssessment({ data }: SkillsAssessmentProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  // Group skills by category
  const groupedSkills = data.reduce((acc: Record<string, SkillItem[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <Card>
      <CardHeader
        className="pb-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle>Skills Assessment</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          {Object.keys(groupedSkills).length > 0 ? (
            Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category} className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">{category}</h4>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-md border flex items-center justify-between"
                    >
                      <span className="font-medium">{skill.skill_name}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          skill.assessment === "meets"
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                        }`}
                      >
                        {skill.assessment === "meets" ? "Meets" : "Below"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No skills provided.</p>
          )}
        </CardContent>
      )}
    </Card>
  )
}
