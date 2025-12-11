"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Line
} from "recharts"
import {
  Upload,
  FileJson,
  TrendingUp,
  Users,
  AlertTriangle,
  DollarSign,
  FileText,
  CreditCard,
  PieChart
} from "lucide-react"
import Link from "next/link"

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

  const tools = [
    {
      title: "S-Curve Analysis",
      desc: "Cumulative progress forecasting",
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      href: "/planning/scurve"
    },
    {
      title: "Manpower S-Curve",
      desc: "Resource allocation tracking",
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      href: "/planning/resources"
    },
    {
      title: "Risk Register",
      desc: "Risk mitigation & impact",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      href: "/planning/risk"
    },
    {
      title: "Cashflow",
      desc: "Inflow/outflow monitoring",
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      href: "/planning/financials"
    },
    {
      title: "Variation Orders",
      desc: "Scope change management",
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      href: "/planning/variation-orders"
    },
    {
      title: "Payment Tracker",
      desc: "Milestone payments status",
      icon: <CreditCard className="w-6 h-6 text-cyan-500" />,
      href: "/planning/payment-tracker"
    }
  ]

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Planning Module</h1>
            <p className="text-slate-600 mt-2">
              {selectedProject?.name} - Schedule, resources, and cost control
            </p>
          </div>

          {/* Upload & Convert Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Upload Schedule Data</h3>
                  <p className="text-slate-500 text-sm">Supported: IFC, XER, Excel</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Upload XER</Button>
                <Button variant="outline" className="flex-1">Upload Excel</Button>
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <FileJson className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Fragments Conversion</h3>
                  <p className="text-slate-500 text-sm">Optimize models for web viewing</p>
                </div>
              </div>
              <Button className="w-full">Convert Files</Button>
            </Card>
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
              <p className="text-slate-600 text-sm">Pending VO cost</p>
              <p className="text-3xl font-bold text-slate-900 mt-2 text-orange-600">$1.2M</p>
              <p className="text-xs text-slate-500 mt-2">Requires approval</p>
            </Card>
          </div>

          {/* Module Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {tools.map((tool) => (
              <Link key={tool.title} href={tool.href}>
                <Card className="p-6 hover:shadow-lg transition-shadow border-slate-200 cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      {tool.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{tool.title}</h3>
                  <p className="text-slate-500 text-sm">{tool.desc}</p>
                </Card>
              </Link>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Overall Schedule Progress</h3>
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

        </div>
      </div>
    </AppLayout>
  )
}
