"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { UserToggle } from "@/components/user-toggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User, Users } from "lucide-react";
import {
  setCurrentCheatsheet,
  addCheatsheet,
} from "@/redux/slices/cheatsheetSlice";

const apiBaseURL = "http://localhost:8000";

export function CheatsheetGenerator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isInterviewer, setIsInterviewer] = useState(false);
  const [cheatsheetType, setCheatsheetType] = useState("candidate");
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Handle toggling between interviewer and candidate
  const handleRoleToggle = (role: "candidate" | "interviewer") => {
    setIsInterviewer(role === "interviewer");
    setCheatsheetType(role);  // Update cheatsheet type based on role selection
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please enter the job description to continue",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("resume_pdf", uploadedFile);
    formData.append("job_description", jobDescription);
    formData.append("cheatsheet_type", cheatsheetType);  // Ensure correct cheatsheet type

    try {
      const response = await fetch(`${apiBaseURL}/cheatsheet/generate`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) throw new Error("Failed to generate cheatsheet");

      const data = await response.json();

      dispatch(setCurrentCheatsheet(data));
      dispatch(addCheatsheet(data));

      router.push(`/results/${data.data.cheatsheet_type}`);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong while generating the cheatsheet.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUploaded = (file: File) => {
    setResumeFile(file);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-2">
            <div className="inline-flex items-center bg-gray-100 p-1 rounded-full">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${
                  cheatsheetType === "candidate"
                    ? "bg-white shadow-sm text-teal-700"
                    : "text-gray-600"
                }`}
                onClick={() => handleRoleToggle("candidate")}
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Candidate</span>
              </div>

              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${
                  cheatsheetType === "interviewer"
                    ? "bg-white shadow-sm text-teal-700"
                    : "text-gray-600"
                }`}
                onClick={() => handleRoleToggle("interviewer")}
              >
                <Users className="h-4 w-4" />
                <span className="font-medium">Interviewer</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
            <FileUploader
              onFileUploaded={() => console.log("File uploaded")} 
              onFileSelect={(file) => setUploadedFile(file)} 
            />
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

          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate Interview Cheatsheet"}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            Our AI will analyze your resume and the job description to create a
            personalized interview preparation guide.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
