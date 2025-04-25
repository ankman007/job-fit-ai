"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Check, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// This would be replaced with actual template URLs in a production environment
const TEMPLATE_URL = "https://docs.google.com/spreadsheets/d/1_template_example_url/edit?usp=sharing"

export function ResumeTemplateAccess() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(TEMPLATE_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenTemplates = () => {
    // Open in new tab
    window.open(TEMPLATE_URL, "_blank")
    // Close dialog after a short delay
    setTimeout(() => setIsDialogOpen(false), 500)
  }

  return (
    <>
      <Button size="lg" className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsDialogOpen(true)}>
        <FileText className="mr-2 h-5 w-5" />
        View Resume Templates on Google Sheets
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Resume Templates</DialogTitle>
            <DialogDescription>
              You're about to access our free resume templates collection on Google Sheets
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
              <h4 className="font-medium text-sm mb-2">How to use these templates:</h4>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal pl-4">
                <li>Click the button below to open the Google Sheets template</li>
                <li>Go to File {"->"} Make a copy to create your own editable version</li>
                <li>Fill in your information in the highlighted sections</li>
                <li>
                  Download as PDF (File {"->"} Download {"->"} PDF Document)
                </li>
              </ol>
            </div>

            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <span className="text-sm text-gray-600 truncate mr-2">{TEMPLATE_URL}</span>
              <Button variant="ghost" size="sm" onClick={handleCopyLink} className="h-8 px-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOpenTemplates} className="bg-teal-600 hover:bg-teal-700">
              Open Templates
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
