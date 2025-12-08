"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ProjectSelectionModal } from "@/components/project-selection-modal"
import { Layers3, MapPin } from "lucide-react"
import { useProject } from "@/lib/project-context"

export default function LandingPage() {
  const { projects } = useProject()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
            <Layers3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">BuildSync</h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Projects</h2>
          <p className="text-slate-600">Select a project to get started</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              onClick={() => setSelectedProject(project.name)}
              className="p-6 border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Layers3 className="w-6 h-6 text-slate-700" />
                </div>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                  {project.code}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{project.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
                <div className="text-sm text-slate-600">Phase: {project.phase}</div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-sm font-semibold text-slate-900">
                Click to Enter →
              </div>
            </Card>
          ))}
        </div>
      </main>

      <ProjectSelectionModal
        isOpen={!!selectedProject}
        projectName={selectedProject || ""}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
