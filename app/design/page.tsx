"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProject } from "@/lib/project-context"
import {
  Upload,
  FileJson,
  Settings2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  RefreshCw,
  Scale,
  Activity,
  BarChart4
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function DesignPage() {
  const { selectedProject } = useProject()
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const menuItems = [
    {
      title: "LOIN Requirements",
      desc: "Level of Information Need",
      icon: <Settings2 className="w-6 h-6 text-blue-500" />,
      href: "/design/loin"
    },
    {
      title: "LOD Specification",
      desc: "Level of Development",
      icon: <Settings2 className="w-6 h-6 text-indigo-500" />,
      href: "/design/lod"
    },
    {
      title: "Clash Detection",
      desc: "Identify geometric conflicts",
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      href: "/design/clashes"
    },
    {
      title: "BIM Issues",
      desc: "Track and manage model issues",
      icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
      href: "/design/bim-issues"
    },
    {
      title: "Interoperability",
      desc: "IFC/BCF Exchange settings",
      icon: <RefreshCw className="w-6 h-6 text-cyan-500" />,
      href: "/design/interoperability"
    },
    {
      title: "Weightage",
      desc: "Model scoring parameters",
      icon: <Scale className="w-6 h-6 text-purple-500" />,
      href: "/design/weightage"
    },
    {
      title: "QA/QC",
      desc: "Quality assurance checks",
      icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      href: "/design/qaqc"
    },
    {
      title: "Model Health",
      desc: "Integrity and performance",
      icon: <Activity className="w-6 h-6 text-pink-500" />,
      href: "/design/model-health"
    },
  ]

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Design Module</h1>
            <p className="text-slate-600 mt-2">
              {selectedProject?.name} - Model coordination and quality control
            </p>
          </div>

          {/* Primary Action: Upload & Convert */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            <Card className="p-8 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors bg-white">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-xl">1. Upload IFC Models</h3>
                <p className="text-slate-600 mb-6 max-w-sm">
                  Upload your Industry Foundation Classes (IFC) files to begin the coordination process.
                </p>
                <div className="flex gap-4">
                  <Button className="gap-2">
                    <Upload className="w-4 h-4" />
                    Select File
                  </Button>
                </div>
              </div>
            </Card>

            <Link href="/design/fragments" className="block h-full">
              <Card className="p-8 border-slate-200 hover:border-slate-400 hover:shadow-md transition-all h-full bg-white flex flex-col items-center justify-center text-center cursor-pointer">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                  <FileJson className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-xl">2. Auto-Convert to Fragments</h3>
                <p className="text-slate-600 mb-6 max-w-sm">
                  Convert IFC models into lightweight fragments for web performance.
                </p>
                <Button variant="outline" className="gap-2">
                  Start Conversion
                </Button>
              </Card>
            </Link>
          </div>

          {/* Model Submission Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart4 className="w-6 h-6" />
              Model Submission Checks
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuItems.map((item) => (
                <Link key={item.title} href={item.href}>
                  <Card className="p-6 h-full border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="mb-4 p-3 bg-slate-50 w-fit rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {item.desc}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Overall Performance Full Width */}
            <Card className="p-6 border-slate-200 bg-slate-900 text-white mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-1">Overall Performance Score</h3>
                  <p className="text-slate-400">Aggregate score based on all submission checks</p>
                </div>
                <div className="text-4xl font-bold text-green-400">
                  92<span className="text-lg text-slate-500">/100</span>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </AppLayout>
  )
}
