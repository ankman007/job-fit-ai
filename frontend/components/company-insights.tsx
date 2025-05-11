"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChevronDown,
  ChevronUp,
  Building,
  Users,
  Briefcase,
  TrendingUp,
  Globe,
  Info
} from "lucide-react"

interface CompanyInsightsProps {
  data: {
    company_overview: string;
    company_values: string[];
    culture_points: string[];
    expectations: string;
    interview_style: string;
    additional_info?: string;
    fallback: string;
  };
}

export function CompanyInsights({ data }: CompanyInsightsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card>
      <CardHeader
        className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Company Insights</CardTitle>
            <CardDescription>Know your potential employer better</CardDescription>
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
          <div className="space-y-6">
            {/* Company Overview */}
            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Company Overview
              </h3>
              <p className="text-gray-700">{data.company_overview || data.fallback}</p>
            </div>

            {/* Culture + Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Company Culture
                </h3>
                <ul className="space-y-2">
                  {data.culture_points.length > 0 ? (
                    data.culture_points.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">{data.fallback}</li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Company Values
                </h3>
                <ul className="space-y-2">
                  {data.company_values.length > 0 ? (
                    data.company_values.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">{data.fallback}</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Interview Style */}
            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Interview Style
              </h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-md border">
                {data.interview_style || data.fallback}
              </p>
            </div>

            {/* Expectations */}
            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                What They Expect
              </h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-md border">
                {data.expectations || data.fallback}
              </p>
            </div>

            {/* Additional Info */}
            {data.additional_info && (
              <div className="bg-teal-50 p-4 rounded-md border border-teal-100">
                <h3 className="text-sm font-semibold text-teal-700 mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  Additional Information
                </h3>
                <p className="text-sm text-gray-700">{data.additional_info}</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
