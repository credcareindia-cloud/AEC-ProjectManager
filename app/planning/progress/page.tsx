"use client"

import { Card } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { useProject } from "@/lib/project-context"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Calendar, Zap } from "lucide-react"

const progressData = [
  { week: "W1", planned: 10, actual: 9, variance: -1 },
  { week: "W2", planned: 18, actual: 17, variance: -1 },
  { week: "W3", planned: 28, actual: 29, variance: 1 },
  { week: "W4", planned: 38, actual: 36, variance: -2 },
]

const disciplineProgress = [
  { discipline: "Architecture", progress: 71, onTrack: 68, delayed: 3 },
  { discipline: "Structure", progress: 83, onTrack: 80, delayed: 3 },
  { discipline: "Mechanical", progress: 53, onTrack: 50, delayed: 3 },
  { discipline: "Electrical", progress: 64, onTrack: 61, delayed: 3 },
]

const milestones = [
  { name: "Schematic Design", date: "2024-12-20", status: "Complete", progress: 100 },
  { name: "Design Development", date: "2025-01-15", status: "In Progress", progress: 68 },
  { name: "Construction Documents", date: "2025-02-28", status: "Pending", progress: 0 },
  { name: "BIM Coordination", date: "2025-03-30", status: "Pending", progress: 0 },
]

export default function ProgressPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Progress Tracking</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Project schedule and milestone tracking</p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Overall Progress</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">68%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Days Remaining</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">156</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Schedule Variance</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">-2%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Completion Date</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">2025-06-30</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Progress vs Plan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="planned" stroke="#cbd5e1" strokeWidth={2} name="Planned" />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Discipline Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={disciplineProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="discipline" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" name="Progress %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Milestones */}
          <Card className="border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">Project Milestones</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Milestone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Target Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((milestone, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{milestone.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{milestone.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            milestone.status === "Complete"
                              ? "bg-green-100 text-green-700"
                              : milestone.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {milestone.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-full" style={{ width: `${milestone.progress}%` }} />
                          </div>
                          <span className="text-slate-900 font-medium">{milestone.progress}%</span>
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
