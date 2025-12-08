"use client"

import { Card } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { useProject } from "@/lib/project-context"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const lodData = [
  { discipline: "Architecture", LOD100: 40, LOD200: 85, LOD300: 92, LOD400: 60, LOD500: 15 },
  { discipline: "Structure", LOD100: 50, LOD200: 88, LOD300: 95, LOD400: 70, LOD500: 20 },
  { discipline: "Mechanical", LOD100: 35, LOD200: 72, LOD300: 80, LOD400: 45, LOD500: 10 },
  { discipline: "Electrical", LOD100: 42, LOD200: 78, LOD300: 88, LOD400: 55, LOD500: 12 },
]

const lodTimeline = [
  { week: "W1", target: 30, achieved: 28 },
  { week: "W2", target: 45, achieved: 42 },
  { week: "W3", target: 60, achieved: 58 },
  { week: "W4", target: 72, achieved: 68 },
]

const lodSpecifications = [
  { level: "LOD 100", description: "Conceptual", elements: "Design concepts", progress: 100 },
  { level: "LOD 200", description: "Schematic", elements: "System assemblies", progress: 85 },
  { level: "LOD 300", description: "Design Development", elements: "Specific components", progress: 92 },
  { level: "LOD 400", description: "Construction Documents", elements: "Fabrication details", progress: 62 },
  { level: "LOD 500", description: "As-Built", elements: "As-constructed elements", progress: 15 },
]

export default function LODPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">LOD - Level of Detail</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Model detail specification by discipline</p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {lodSpecifications.map((spec) => (
              <Card key={spec.level} className="p-4 border-slate-200">
                <p className="text-slate-600 text-xs font-semibold mb-2">{spec.level}</p>
                <div className="mb-3">
                  <div className="text-sm font-bold text-slate-900">{spec.progress}%</div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1 overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: `${spec.progress}%` }} />
                  </div>
                </div>
                <p className="text-xs text-slate-600">{spec.description}</p>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">LOD Progression by Discipline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="discipline" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="LOD200" fill="#60a5fa" name="LOD 200" />
                  <Bar dataKey="LOD300" fill="#3b82f6" name="LOD 300" />
                  <Bar dataKey="LOD400" fill="#1e40af" name="LOD 400" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Weekly LOD Targets vs Achieved</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lodTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} name="Target" />
                  <Line type="monotone" dataKey="achieved" stroke="#3b82f6" strokeWidth={2} name="Achieved" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Detailed Table */}
          <Card className="border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">LOD Specifications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Level</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Elements</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {lodSpecifications.map((spec) => (
                    <tr key={spec.level} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{spec.level}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{spec.description}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{spec.elements}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-full" style={{ width: `${spec.progress}%` }} />
                          </div>
                          <span className="text-slate-900 font-medium">{spec.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
