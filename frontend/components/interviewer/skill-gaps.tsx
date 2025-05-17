"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

interface SkillGap {
  experience_level: string;
  gap_level: string;
  recommendation: string;
  skill_name: string;
}

interface SkillGapsProps {
  data: SkillGap[];
}

export function SkillGaps({ data }: SkillGapsProps) {
  console.log("SkillGaps data", data);

  const [isExpanded, setIsExpanded] = useState(true);

  const criticalGaps = data.filter((gap) => gap.gap_level === "Critical Gap");
  const minorGaps = data.filter((gap) => gap.gap_level !== "Critical Gap");

  return (
    <Card>
      <CardHeader
        className="pb-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle>Skill Gaps & Concerns</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          {criticalGaps.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-red-600 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Critical Gaps
              </h3>
              <div className="space-y-4">
                {criticalGaps.map((gap, index) => (
                  <div
                    key={index}
                    className="border border-red-200 rounded-md p-4 bg-red-50"
                  >
                    <h4 className="font-medium mb-2">{gap.skill_name}</h4>
                    {gap.recommendation && (
                      <div className="bg-white p-3 rounded border border-red-100">
                        <h5 className="text-sm font-medium mb-1">
                          Recommendation
                        </h5>
                        <p className="text-sm text-gray-600">
                          {gap.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {minorGaps.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-amber-600 mb-3">
                Minor Gaps
              </h3>
              <div className="space-y-4">
                {minorGaps.map((gap, index) => (
                  <div
                    key={index}
                    className="border border-amber-200 rounded-md p-4 bg-amber-50"
                  >
                    <h4 className="font-medium mb-2">{gap.skill_name}</h4>
                    <div className="bg-white p-3 rounded border border-amber-100">
                      <h5 className="text-sm font-medium mb-1">
                        Recommendation
                      </h5>
                      <p className="text-sm text-gray-600">
                        {gap.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
