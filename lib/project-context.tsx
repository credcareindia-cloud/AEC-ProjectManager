"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Project {
  id: string
  name: string
  code: string
  location: string
  phase: string
}

interface ProjectContextType {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  projects: Project[]
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "red-sea",
      name: "Red Sea",
      code: "RS-2025",
      location: "Saudi Arabia",
      phase: "Design Coordination",
    },
    {
      id: "teamlab",
      name: "TeamLab",
      code: "TL-2025",
      location: "Dubai, UAE",
      phase: "Model Submission",
    },
    {
      id: "adnoc-1",
      name: "ADNOC 1",
      code: "ADNOC-001",
      location: "Abu Dhabi, UAE",
      phase: "QAQC Review",
    },
  ]

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject, projects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProject must be used within ProjectProvider")
  }
  return context
}
