"use client"

import { Card } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { useProject } from "@/lib/project-context"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const sCurveData = [
  { month: "Jan", planned: 8, actual: 7, labor: 12, material: 10 },
  { month: "Feb", planned: 18, actual: 16, labor: 24, material: 20 },
  { month: "Mar", planned: 32, actual: 35, labor: 38, material: 35 },
  { month: "Apr", planned: 48, actual: 50, labor: 52, material: 50 },
  { month: "May", planned: 65, actual: 68, labor: 70, material: 68 },
  { month: "Jun", planned: 80, actual: 82, labor: 85, material: 82 },
]

const costBreakdown = [
  { phase: "Design", budget: 450000, spent: 425000, percent: 94 },
  { phase: "Coordination", budget: 380000, spent: 335000, percent: 88 },
  { phase: "Execution", budget: 890000, spent: 600000, percent: 67 },
  { phase: "Closeout", budget: 280000, spent: 0, percent: 0 },
]

export default function SCurvePage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">S-Curve Analysis</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Cumulative project progress tracking</p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">$2,000,000</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Spent to Date</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">$1,360,000</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Budget Utilization</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">68%</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Remaining Budget</p>
              <p className="text-2xl font-bold text-green-600 mt-2">$640,000</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Cumulative S-Curve</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sCurveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="planned" fill="#cbd5e1" stroke="#64748b" name="Planned" />
                  <Area type="monotone" dataKey="actual" fill="#3b82f6" stroke="#2563eb" name="Actual" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Labor vs Material Cost</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sCurveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="labor" stroke="#f59e0b" strokeWidth={2} name="Labor" />
                  <Line type="monotone" dataKey="material" stroke="#8b5cf6" strokeWidth={2} name="Material" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Cost Breakdown */}
          <Card className="border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">Budget by Phase</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Phase</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Budget</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Spent</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {costBreakdown.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.phase}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">${(item.budget / 1000).toFixed(0)}K</td>
                      <td className="px-6 py-4 text-sm text-slate-600">${(item.spent / 1000).toFixed(0)}K</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-green-600 h-full" style={{ width: `${item.percent}%` }} />
                          </div>
                          <span className="text-slate-900 font-medium">{item.percent}%</span>
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
