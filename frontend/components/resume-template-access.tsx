"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TEMPLATE_URL =
  "https://docs.google.com/document/d/1_j0evc5cS_hZoP8TdhQcxSqLU5csiQcmoHeeAw3GMwg/edit?usp=sharing";

export function ResumeTemplateAccess() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(TEMPLATE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenTemplates = () => {
    window.open(TEMPLATE_URL, "_blank");
    setTimeout(() => setIsDialogOpen(false), 500);
  };

  return (
    <>
      <Button
        size="lg"
        className="bg-teal-600 hover:bg-teal-700 text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        <FileText className="mr-2 h-5 w-5" />
        View Resume Templates
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-4xl min-h-[60vh]">
          <DialogHeader>
            <DialogTitle className="text-lg">
              Access Resume Templates
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              You're about to access our free resume templates collection on
              Google Sheets.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="font-medium text-sm mb-2">
                How to use these templates:
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  Click the button below to open the Google Sheets template.
                </li>
                <li>
                  Go to <strong>File → Make a copy</strong> to create your own
                  editable version.
                </li>
                <li>Fill in your information in the highlighted sections.</li>
                <li>Download as PDF (File → Download → PDF Document).</li>
              </ol>
            </div>

            <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700">
              <span className="truncate">{TEMPLATE_URL}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="h-8 w-8 flex items-center justify-center"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleOpenTemplates}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Open Templates
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
