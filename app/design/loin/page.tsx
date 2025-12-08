"use client"

import { Card } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { useProject } from "@/lib/project-context"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const loinData = [
  { discipline: "Architecture", geometry: 95, attributes: 87, relations: 92 },
  { discipline: "Structure", geometry: 88, attributes: 85, relations: 90 },
  { discipline: "Mechanical", geometry: 72, attributes: 68, relations: 75 },
  { discipline: "Electrical", geometry: 80, attributes: 78, relations: 82 },
  { discipline: "Fire Protection", geometry: 65, attributes: 62, relations: 70 },
]

const phaseProgress = [
  { phase: "Phase 1", target: 90, actual: 88 },
  { phase: "Phase 2", target: 85, actual: 80 },
  { phase: "Phase 3", target: 80, actual: 75 },
  { phase: "Phase 4", target: 75, actual: 60 },
]

const loinRequirements = [
  { id: 1, category: "Geometry", requirement: "Full 3D representation", status: "Complete" },
  { id: 2, category: "Attributes", requirement: "All object properties documented", status: "In Progress" },
  { id: 3, category: "Relations", requirement: "Element connectivity defined", status: "Complete" },
  { id: 4, category: "Metadata", requirement: "BIM data structure", status: "Pending" },
]

export default function LOINPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">LOIN - Level of Information Need</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Information completeness and requirements</p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Overall LOIN</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">81%</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Geometry Complete</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">82%</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Attributes Defined</p>
              <p className="text-3xl font-bold text-green-600 mt-2">76%</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Relations Mapped</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">82%</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">LOIN by Discipline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={loinData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="discipline" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="geometry" fill="#3b82f6" name="Geometry" />
                  <Bar dataKey="attributes" fill="#10b981" name="Attributes" />
                  <Bar dataKey="relations" fill="#8b5cf6" name="Relations" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Phase Completion Target</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={phaseProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="phase" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} name="Target" />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Requirements Table */}
          <Card className="border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">LOIN Requirements</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Requirement</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loinRequirements.map((req) => (
                    <tr key={req.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{req.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{req.requirement}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-xs font-medium ${
                            req.status === "Complete"
                              ? "bg-green-100 text-green-700"
                              : req.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {req.status === "Complete" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {req.status}
                        </span>
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
