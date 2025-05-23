"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, GraduationCap, Briefcase } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EducationItem {
  degree_name: string
  institution: string
  location: string
  major: string
  notable_points: string[]
}

interface ExperienceItem {
  title: string
  company: string
  location: string
  start_date: string
  end_date: string
  responsibilities: string[]
  relevance_to_job: string
}

interface EducationExperienceProps {
  education: EducationItem[]
  experience: ExperienceItem[]
}

export function EducationExperience({ education, experience }: EducationExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getRelevanceBadge = (relevanceText: string) => {
    if (!relevanceText) return null

    const lower = relevanceText.toLowerCase()

    if (lower.includes("high")) {
      return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">High Relevance</span>
    } else if (lower.includes("medium")) {
      return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Medium Relevance</span>
    } else if (lower.includes("low")) {
      return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Low Relevance</span>
    }

    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle>Education & Experience</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <Tabs defaultValue="experience">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="experience" className="flex-1">
                <Briefcase className="h-4 w-4 mr-2" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex-1">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience">
              <div className="space-y-6">
                {experience.map((item, index) => (
                  <div key={index} className="relative pl-6 pb-6 border-l border-gray-200 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500"></div>
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="font-semibold">{item.title}</h4>
                      {getRelevanceBadge(item.relevance_to_job)}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {item.company} • {item.start_date} - {item.end_date}
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {item.responsibilities.map((desc, descIndex) => (
                        <li key={descIndex} className="text-sm text-gray-600">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="relative pl-6 pb-6 border-l border-gray-200 last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500"></div>
                    <h4 className="font-semibold mb-1">{item.degree_name}</h4>
                    <div className="text-sm text-gray-600 mb-1">
                      {item.institution}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {item.major}
                    </div>
                    {item.notable_points.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1">
                        {item.notable_points.map((point, i) => (
                          <li key={i} className="text-sm text-gray-600">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  )
}
