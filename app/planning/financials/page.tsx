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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, AlertCircle } from "lucide-react"

const financialData = [
  { month: "Jan", budget: 180000, actual: 170000, variance: -10000 },
  { month: "Feb", budget: 290000, actual: 320000, variance: 30000 },
  { month: "Mar", budget: 450000, actual: 485000, variance: 35000 },
  { month: "Apr", budget: 620000, actual: 580000, variance: -40000 },
  { month: "May", budget: 780000, actual: 820000, variance: 40000 },
  { month: "Jun", budget: 950000, actual: 920000, variance: -30000 },
]

const costDistribution = [
  { name: "Labor", value: 640000, color: "#3b82f6" },
  { name: "Materials", value: 480000, color: "#10b981" },
  { name: "Equipment", value: 160000, color: "#f59e0b" },
  { name: "Other", value: 80000, color: "#8b5cf6" },
]

const invoices = [
  { invoice: "INV-001", date: "2024-12-01", amount: 150000, status: "Paid", vendor: "ABC Contractors" },
  { invoice: "INV-002", date: "2024-12-10", amount: 175000, status: "Paid", vendor: "Material Suppliers" },
  { invoice: "INV-003", date: "2024-12-20", amount: 200000, status: "Pending", vendor: "Equipment Rental" },
  { invoice: "INV-004", date: "2024-12-28", amount: 185000, status: "Pending", vendor: "Engineering Firm" },
]

export default function FinancialsPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Financial Management</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Budget tracking and cost analysis</p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Budget</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">$2.0M</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Spent to Date</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">$1.36M</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Budget Variance</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">+$25K</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Remaining Budget</p>
              <p className="text-3xl font-bold text-green-600 mt-2">$640K</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Budget vs Actual</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="budget" fill="#cbd5e1" name="Budget" />
                  <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Cost Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {costDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Monthly Variance */}
          <div className="mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Monthly Variance Analysis</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="variance" stroke="#f59e0b" strokeWidth={2} name="Variance" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Invoices Table */}
          <Card className="border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">Recent Invoices</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Invoice</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Vendor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{inv.invoice}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{inv.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{inv.vendor}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        ${(inv.amount / 1000).toFixed(0)}K
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {inv.status}
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
