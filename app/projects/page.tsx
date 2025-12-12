"use client"

import { Suspense, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Layers3, MapPin, ArrowLeft } from "lucide-react"
import { useProject } from "@/lib/project-context"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

function ProjectsContent() {
    const { projects, setSelectedProject } = useProject()
    const router = useRouter()
    const searchParams = useSearchParams()
    const mode = searchParams.get("mode") as "design" | "planning" | null

    // If no mode is selected, redirect back to landing
    useEffect(() => {
        if (!mode) {
            router.push("/")
        }
    }, [mode, router])

    const handleProjectSelect = (project: any) => {
        setSelectedProject(project)
        // Navigate to the appropriate dashboard
        if (mode === "design") {
            router.push("/design")
        } else {
            router.push("/planning")
        }
    }

    if (!mode) return null

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                <Layers3 className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-slate-900">BuildSync</h1>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-600 capitalize">
                        {mode} Mode
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Select a Project</h2>
                    <p className="text-slate-600">Choose a project to enter <span className="font-bold">{mode}</span> mode</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            onClick={() => handleProjectSelect(project)}
                            className="group p-6 border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-slate-900 transition-colors" />

                            <div className="flex items-center justify-between mb-4 pl-2">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Layers3 className="w-6 h-6 text-slate-700" />
                                </div>
                                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                    {project.code}
                                </span>
                            </div>

                            <div className="pl-2">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                                    {project.name}
                                </h3>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin className="w-4 h-4" />
                                        {project.location}
                                    </div>
                                    <div className="text-sm text-slate-600">Phase: {project.phase}</div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 pl-2 flex items-center justify-between text-sm font-semibold text-slate-900">
                                <span>Enter Project</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProjectsContent />
        </Suspense>
    )
}
