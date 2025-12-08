"use client"

import { ThreeDViewerWithChat } from "@/components/3d-viewer-with-chat"
import { AppLayout } from "@/components/layout/app-layout"
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
        <div className="border-b border-slate-200 bg-white px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Project Overview</h1>
          <p className="text-slate-600 mt-1">
            {selectedProject.name} - {selectedProject.code}
          </p>
        </div>

        <div className="flex-1 overflow-hidden p-8">
          <ThreeDViewerWithChat />
        </div>
      </div>
    </AppLayout>
  )
}
