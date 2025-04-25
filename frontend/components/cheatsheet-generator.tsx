"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { FileUploader } from "@/components/file-uploader"
import { UserToggle } from "@/components/user-toggle"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function CheatsheetGenerator() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [fileUploaded, setFileUploaded] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fileUploaded) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue",
        variant: "destructive",
      })
      return
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please enter the job description to continue",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // In a real app, you would send this data to your API
    // For now, we'll simulate a delay and redirect to results
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/results")
    }, 2000)
  }

  const handleFileUploaded = () => {
    setFileUploaded(true)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-2">
            <UserToggle />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
            <FileUploader onFileUploaded={handleFileUploaded} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Enter Job Description</h3>
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-[150px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>

          <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Generating..." : "Generate Interview Cheatsheet"}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            Our AI will analyze your resume and the job description to create a personalized interview preparation
            guide.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
