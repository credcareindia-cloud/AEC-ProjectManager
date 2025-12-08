"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProject } from "@/lib/project-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const progressData = [
  { month: "Jan", planned: 10, actual: 8 },
  { month: "Feb", planned: 20, actual: 18 },
  { month: "Mar", planned: 30, actual: 32 },
  { month: "Apr", planned: 40, actual: 38 },
  { month: "May", planned: 50, actual: 48 },
  { month: "Jun", planned: 60, actual: 62 },
]

const resourceData = [
  { role: "Architects", allocated: 12, utilized: 11 },
  { role: "Engineers", allocated: 15, utilized: 14 },
  { role: "Technicians", allocated: 8, utilized: 7 },
  { role: "Coordinators", allocated: 5, utilized: 5 },
]

export default function PlanningPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Planning Module</h1>
            <p className="text-slate-600 mt-2">
              {selectedProject?.name} - Track progress, resources, and project financials
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">Overall Progress</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">62%</p>
              <p className="text-xs text-slate-500 mt-2">On schedule</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">Budget Utilized</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">54.2M</p>
              <p className="text-xs text-slate-500 mt-2">89% of budget</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">Resources Active</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">45</p>
              <p className="text-xs text-slate-500 mt-2">94% utilization</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">Days Remaining</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">156</p>
              <p className="text-xs text-slate-500 mt-2">12% buffer</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Schedule Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planned" fill="#d1d5db" name="Planned %" />
                  <Bar dataKey="actual" fill="#3b82f6" name="Actual %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Resource Utilization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="role" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="allocated" fill="#d1d5db" name="Allocated" />
                  <Bar dataKey="utilized" fill="#10b981" name="Utilized" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-600 mb-4">Monitor milestone completion and schedule adherence</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Progress
              </Button>
            </Card>

            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">S-Curve Analysis</h3>
              <p className="text-slate-600 mb-4">View cumulative progress and forecast project completion</p>
              <Button variant="outline" className="w-full bg-transparent">
                View S-Curve
              </Button>
            </Card>

            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">Resource Management</h3>
              <p className="text-slate-600 mb-4">Manage manpower allocation and utilization</p>
              <Button variant="outline" className="w-full bg-transparent">
                Manage Resources
              </Button>
            </Card>

            <Card className="p-6 border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 mb-2">Financial Tracking</h3>
              <p className="text-slate-600 mb-4">Monitor cashflow and budget utilization</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Financials
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
