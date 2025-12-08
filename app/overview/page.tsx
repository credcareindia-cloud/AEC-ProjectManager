"use client"

import { ThreeDViewerWithChat } from "@/components/3d-viewer-with-chat"
import { AppLayout } from "@/components/layout/app-layout"
import { UploadDataDialog } from "@/components/upload-data-dialog"
import { useProject } from "@/lib/project-context"

export default function OverviewPage() {
  const { selectedProject } = useProject()

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Please select a project first</p>
      </div>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                Project Overview
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 truncate">
                {selectedProject.name} - {selectedProject.code}
              </p>
            </div>
            <div className="flex-shrink-0">
              <UploadDataDialog />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
          <ThreeDViewerWithChat />
        </div>
      </div>
    </AppLayout>
  )
}
