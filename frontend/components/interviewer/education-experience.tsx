"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, GraduationCap, Briefcase } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EducationItem {
  degree: string
  institution: string
  location: string
  graduationYear: string
  fieldOfStudy: string
  gpa?: string
  achievements?: string[]
}

interface ExperienceItem {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  relevance: "high" | "medium" | "low"
}

interface EducationExperienceProps {
  education: EducationItem[]
  experience: ExperienceItem[]
}

export function EducationExperience({ education, experience }: EducationExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getRelevanceBadge = (relevance: string) => {
    switch (relevance) {
      case "high":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">High Relevance</span>
      case "medium":
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Medium Relevance</span>
      case "low":
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Low Relevance</span>
      default:
        return null
    }
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
                      {getRelevanceBadge(item.relevance)}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {item.company} • {item.location} • {item.startDate} - {item.endDate}
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {item.description.map((desc, descIndex) => (
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
                    <h4 className="font-semibold mb-1">{item.degree}</h4>
                    <div className="text-sm text-gray-600 mb-1">
                      {item.institution} • {item.location} • {item.graduationYear}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {item.fieldOfStudy} {item.gpa && `• GPA: ${item.gpa}`}
                    </div>
                    {item.achievements && (
                      <ul className="list-disc pl-5 space-y-1">
                        {item.achievements.map((achievement, achieveIndex) => (
                          <li key={achieveIndex} className="text-sm text-gray-600">
                            {achievement}
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
