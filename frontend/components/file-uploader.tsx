"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, type File, X, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileUploaderProps {
  onFileUploaded?: () => void;
  onFileSelect?: (file: File) => void;
}

export function FileUploader({ onFileUploaded, onFileSelect }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Maximum file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Clear previous errors
      setError(null);

      // Handle rejected files
      if (rejectedFiles && rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          setError(`File is too large. Maximum size is 5MB.`);
        } else if (rejection.errors[0].code === "file-invalid-type") {
          setError(`Only PDF files are accepted.`);
        } else {
          setError(`Invalid file: ${rejection.errors[0].message}`);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];

        // Additional validation
        if (selectedFile.size > MAX_FILE_SIZE) {
          setError(`File is too large. Maximum size is 5MB.`);
          return;
        }

        if (selectedFile.type !== "application/pdf") {
          setError(`Only PDF files are accepted.`);
          return;
        }

        // Simulate upload process
        setIsUploading(true);
        setTimeout(() => {
          setFile(selectedFile);
          setIsUploading(false);
          if (onFileUploaded) {
            onFileUploaded();
          }
          if (onFileSelect) {
            onFileSelect(selectedFile); // ✅ Inform parent of file
          }
        }, 1000);
      }
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    disabled: isUploading,
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  // Format file size to KB or MB
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-teal-400 bg-teal-50 scale-[1.02]"
              : "border-gray-300 hover:border-teal-400 hover:bg-teal-50"
          } ${error ? "border-red-300 bg-red-50" : ""} ${
            isUploading ? "opacity-70" : ""
          }`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-pulse">
                <Upload className="h-10 w-10 mx-auto text-teal-500" />
              </div>
              <p className="mt-2 text-sm text-teal-600 font-medium">
                Uploading...
              </p>
            </div>
          ) : (
            <>
              <Upload
                className={`h-10 w-10 mx-auto ${
                  isDragActive ? "text-teal-500" : "text-gray-400"
                } transition-colors duration-300`}
              />
              <p className="mt-2 text-sm text-gray-600">
                Drag & drop your resume here, or{" "}
                <span className="text-teal-600 font-medium">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports PDF only (Max 5MB)
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-teal-50 border-teal-200 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-teal-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="h-8 w-8 p-0 rounded-full hover:bg-teal-100 hover:text-teal-700"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
