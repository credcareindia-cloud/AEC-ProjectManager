"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useProject } from "@/lib/project-context"
import { useRouter } from "next/navigation"

interface ProjectSelectionModalProps {
  isOpen: boolean
  projectName: string
  onClose: () => void
}

export function ProjectSelectionModal({ isOpen, projectName, onClose }: ProjectSelectionModalProps) {
  const { projects, setSelectedProject } = useProject()
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

  const project = projects.find((p) => p.name === projectName)

  const handleModeSelect = (mode: "design" | "planning") => {
    if (project) {
      setSelectedProject(project)
      setSelectedMode(mode)
      setTimeout(() => {
        router.push("/overview")
      }, 300)
    }
  }

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Mode</h2>
        <p className="text-slate-600 mb-8">Choose how you want to work with {projectName}</p>

        <div className="space-y-3 mb-8">
          <button
            onClick={() => handleModeSelect("design")}
            className="w-full p-4 border-2 border-slate-200 rounded-lg hover:border-slate-800 hover:bg-slate-50 transition-all text-left"
          >
            <div className="font-bold text-slate-900">Design Mode</div>
            <div className="text-sm text-slate-600">IFC models, clashes, LOIN/LOD, QAQC</div>
          </button>

          <button
            onClick={() => handleModeSelect("planning")}
            className="w-full p-4 border-2 border-slate-200 rounded-lg hover:border-slate-800 hover:bg-slate-50 transition-all text-left"
          >
            <div className="font-bold text-slate-900">Planning Mode</div>
            <div className="text-sm text-slate-600">Progress, S-curve, resources, financials</div>
          </button>
        </div>

        <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
          Cancel
        </Button>
      </div>
    </div>
  )
}
