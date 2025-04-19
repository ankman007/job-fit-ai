"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-teal-400 bg-teal-50" : "border-gray-300 hover:border-teal-400 hover:bg-teal-50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag & drop your resume here, or <span className="text-teal-600 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Supports PDF, DOC, DOCX (Max 5MB)</p>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-100 rounded">
                <File className="h-5 w-5 text-teal-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
