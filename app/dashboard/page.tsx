"use client"

import { Card } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { useProject } from "@/lib/project-context"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react"

const modelCompletionData = [
  { discipline: "Architecture", value: 71, target: 80 },
  { discipline: "Structure", value: 83, target: 85 },
  { discipline: "Mechanical", value: 53, target: 70 },
  { discipline: "Electrical", value: 64, target: 75 },
  { discipline: "Fire Protection", value: 46, target: 60 },
  { discipline: "Interior Design", value: 40, target: 65 },
  { discipline: "Landscape", value: 58, target: 70 },
]

const clashData = [
  { name: "Closed", value: 521200, color: "#10b981" },
  { name: "Active", value: 231110, color: "#f97316" },
  { name: "New", value: 163219, color: "#ef4444" },
]

const issueStatusData = [
  { status: "Closed", count: 8, color: "#10b981" },
  { status: "Open", count: 14, color: "#ef4444" },
  { status: "New", count: 3, color: "#3b82f6" },
]

const progressData = [
  { phase: "Phase 1", LOD: 45, LOIN: 42 },
  { phase: "Phase 2", LOD: 58, LOIN: 62 },
  { phase: "Phase 3", LOD: 75, LOIN: 78 },
  { phase: "Phase 4", LOD: 89, LOIN: 91 },
]

export default function DashboardPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Project Dashboard</h1>
            <p className="text-slate-600 mt-2">
              {selectedProject?.name} - {selectedProject?.code}
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Model Completion</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">62.3%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Clashes</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">915.5K</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Issues Progress</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">32%</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Quality Score</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">76%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Model Completion by Discipline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="discipline" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" name="Current" />
                  <Bar dataKey="target" fill="#d1d5db" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Clash Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clashData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {clashData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">LOD/LOIN Progress by Phase</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="phase" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="LOD" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="LOIN" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Issue Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={issueStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6">
                    {issueStatusData.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
