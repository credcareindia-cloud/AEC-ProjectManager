"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProject } from "@/lib/project-context"
import { Upload, FileJson } from "lucide-react"
import { useState } from "react"

const recentModels = [
  { id: 1, name: "Architecture Model - A1", status: "Completed", clashes: 245, issues: 12 },
  { id: 2, name: "Structure Model - S2", status: "In Review", clashes: 523, issues: 28 },
  { id: 3, name: "MEP Coordination - M1", status: "In Review", clashes: 892, issues: 45 },
  { id: 4, name: "Electrical Model - E3", status: "Pending", clashes: 0, issues: 0 },
]

export default function DesignPage() {
  const { selectedProject } = useProject()
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Design Module</h1>
            <p className="text-slate-600 mt-2">
              {selectedProject?.name} - Upload IFC models, manage clashes, and coordinate designs
            </p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 border-2 border-dashed border-slate-300 mb-8">
            <div className="flex flex-col items-center justify-center py-12">
              <FileJson className="w-16 h-16 text-slate-400 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Upload IFC Model</h3>
              <p className="text-slate-600 mb-6 text-center">Drop your IFC file here or click to select</p>
              <div className="flex gap-4">
                <Button className="gap-2">
                  <Upload className="w-4 h-4" />
                  Select File
                </Button>
                <Button variant="outline">Upload from URL</Button>
              </div>
              {uploadedFile && <div className="mt-6 text-green-600 font-medium">✓ File uploaded: {uploadedFile}</div>}
            </div>
          </Card>

          {/* Recent Models */}
          <div className="mb-8">
            <h2 className="font-bold text-slate-900 text-xl mb-4">Recent Models</h2>
            <div className="space-y-3">
              {recentModels.map((model) => (
                <Card
                  key={model.id}
                  className="p-6 border-slate-200 hover:border-slate-300 transition cursor-pointer flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{model.name}</h4>
                    <div className="flex gap-6 mt-2 text-sm text-slate-600">
                      <span>
                        Status:{" "}
                        <span
                          className={
                            model.status === "Completed"
                              ? "text-green-600"
                              : model.status === "Pending"
                                ? "text-red-600"
                                : "text-orange-600"
                          }
                        >
                          {model.status}
                        </span>
                      </span>
                      <span>Clashes: {model.clashes}</span>
                      <span>Issues: {model.issues}</span>
                    </div>
                  </div>
                  <Button variant="outline">Review</Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">Clash Detection</h3>
              <p className="text-slate-600 mb-4">Analyze models for geometric and spatial conflicts</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Clashes
              </Button>
            </Card>

            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">LOIN/LOD Specification</h3>
              <p className="text-slate-600 mb-4">Define and track level of information requirements</p>
              <Button variant="outline" className="w-full bg-transparent">
                Configure LOIN/LOD
              </Button>
            </Card>

            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">QAQC Checks</h3>
              <p className="text-slate-600 mb-4">Perform quality assurance and quality control validations</p>
              <Button variant="outline" className="w-full bg-transparent">
                Run QAQC
              </Button>
            </Card>

            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">3D Viewer</h3>
              <p className="text-slate-600 mb-4">Visualize and navigate your BIM models in 3D</p>
              <Button variant="outline" className="w-full bg-transparent">
                Open Viewer
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
