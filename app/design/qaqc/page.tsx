"use client"

import { Card } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { useProject } from "@/lib/project-context"
import {
  BarChart,
  Bar,
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
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

const qaqcData = [
  { discipline: "Architecture", passed: 145, failed: 23, pending: 8 },
  { discipline: "Structure", passed: 132, failed: 18, pending: 12 },
  { discipline: "Mechanical", passed: 98, failed: 31, pending: 15 },
  { discipline: "Electrical", passed: 112, failed: 25, pending: 10 },
  { discipline: "Fire Protection", passed: 78, failed: 19, pending: 8 },
]

const checklistData = [
  { name: "Passed", value: 565, color: "#10b981" },
  { name: "Failed", value: 116, color: "#ef4444" },
  { name: "Pending", value: 53, color: "#f59e0b" },
]

const qaqcChecks = [
  { check: "Model Structure Validation", passed: 152, failed: 8, status: "Pass" },
  { check: "Geometry Accuracy", passed: 148, failed: 12, status: "Pass" },
  { check: "Attribute Completeness", passed: 132, failed: 28, status: "Fail" },
  { check: "Clash Detection", passed: 145, failed: 15, status: "Pass" },
  { check: "System Connectivity", passed: 138, failed: 22, status: "Fail" },
  { check: "LOD Compliance", passed: 155, failed: 5, status: "Pass" },
]

export default function QAQCPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              QAQC - Quality Assurance & Quality Control
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {selectedProject?.name} - Model quality validation and testing
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="p-4 sm:p-6 border-slate-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Total Tests</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">734</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4 sm:p-6 border-slate-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Passed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">565</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4 sm:p-6 border-slate-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Failed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1 sm:mt-2">116</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4 sm:p-6 border-slate-200">
              <p className="text-slate-600 text-xs sm:text-sm font-medium">Pass Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">77%</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <Card className="p-4 sm:p-6 border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                QAQC Results by Discipline
              </h3>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <BarChart data={qaqcData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="discipline"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="passed" fill="#10b981" name="Passed" />
                  <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4 sm:p-6 border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                Overall Test Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <PieChart>
                  <Pie
                    data={checklistData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {checklistData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Checks Table */}
          <Card className="border-slate-200">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">QAQC Checks Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Check
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Passed
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Failed
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {qaqcChecks.map((check, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-slate-900">
                        {check.check}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <span className="text-green-600 font-medium">{check.passed}</span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <span className="text-red-600 font-medium">{check.failed}</span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            check.status === "Pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {check.status}
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
