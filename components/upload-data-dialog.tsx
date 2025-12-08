"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, File, X, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  file: File
  status: "pending" | "uploading" | "success" | "error"
  progress: number
}

export function UploadDataDialog() {
  const [open, setOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const acceptedFileTypes = {
    // Documents
    "application/pdf": [".pdf"],
    "text/csv": [".csv"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],

    // CAD & BIM
    "application/ifc": [".ifc"],
    "application/acad": [".dwg"],
    "application/dxf": [".dxf"],
    "model/vnd.rvt": [".rvt"],

    // Images
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/svg+xml": [".svg"],

    // Other
    "application/json": [".json"],
    "text/plain": [".txt"],
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      file,
      status: "pending",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload for each file
    newFiles.forEach((uploadedFile, index) => {
      simulateUpload(uploadedFiles.length + index)
    })
  }

  const simulateUpload = (index: number) => {
    setUploadedFiles((prev) => {
      const updated = [...prev]
      updated[index].status = "uploading"
      return updated
    })

    // Simulate progress
    const interval = setInterval(() => {
      setUploadedFiles((prev) => {
        const updated = [...prev]
        if (updated[index].progress < 100) {
          updated[index].progress += 10
        } else {
          updated[index].status = "success"
          clearInterval(interval)
        }
        return updated
      })
    }, 200)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    return <File className="w-8 h-8 text-slate-400" />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 text-sm sm:text-base px-3 sm:px-4">
          <Upload className="w-4 h-4" />
          <span className="hidden xs:inline">Upload Data</span>
          <span className="xs:hidden">Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Upload Project Data</DialogTitle>
          <DialogDescription className="text-sm">
            Upload drawings, specifications, schedules, or any project-related documents.
            Supported formats: PDF, CSV, Excel, IFC, DWG, DXF, Images, and more.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors",
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-slate-400",
            )}
          >
            <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-slate-400" />
            <p className="text-xs sm:text-sm font-medium text-slate-900 mb-1">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500 mb-3 sm:mb-4 px-2">
              PDF, CSV, Excel, IFC, DWG, DXF, Images (Max 50MB per file)
            </p>
            <input
              type="file"
              multiple
              accept={Object.values(acceptedFileTypes).flat().join(",")}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2 max-h-[200px] sm:max-h-[300px] overflow-y-auto">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900">
                Uploaded Files ({uploadedFiles.length})
              </h3>
              {uploadedFiles.map((uploadedFile, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white border border-slate-200 rounded-lg"
                >
                  <div className="hidden sm:block">{getFileIcon(uploadedFile.file.name)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500">
                      {formatFileSize(uploadedFile.file.size)}
                    </p>
                    {uploadedFile.status === "uploading" && (
                      <div className="mt-1 sm:mt-2">
                        <div className="w-full bg-slate-200 rounded-full h-1 sm:h-1.5">
                          <div
                            className="bg-blue-600 h-1 sm:h-1.5 rounded-full transition-all"
                            style={{ width: `${uploadedFile.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {uploadedFile.status === "success" && (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  )}
                  {uploadedFile.status === "pending" && (
                    <button
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-slate-600 flex-shrink-0"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Here you would typically send files to your backend
                console.log("Processing uploads:", uploadedFiles)
                setOpen(false)
                setUploadedFiles([])
              }}
              disabled={uploadedFiles.length === 0 || uploadedFiles.some((f) => f.status === "uploading")}
              className="w-full sm:w-auto"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
