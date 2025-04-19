"use client"

import { useState } from "react"
import { User, Users } from "lucide-react"

export function UserToggle() {
  const [isInterviewer, setIsInterviewer] = useState(false)

  return (
    <div className="inline-flex items-center bg-gray-100 p-1 rounded-full">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${
          !isInterviewer ? "bg-white shadow-sm text-teal-700" : "text-gray-600"
        }`}
        onClick={() => setIsInterviewer(false)}
      >
        <User className="h-4 w-4" />
        <span className="font-medium">Candidate</span>
      </div>

      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${
          isInterviewer ? "bg-white shadow-sm text-teal-700" : "text-gray-600"
        }`}
        onClick={() => setIsInterviewer(true)}
      >
        <Users className="h-4 w-4" />
        <span className="font-medium">Interviewer</span>
      </div>
    </div>
  )
}
