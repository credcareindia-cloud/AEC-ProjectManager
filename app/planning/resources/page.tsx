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
import { Users } from "lucide-react"

const resourceData = [
  { month: "Jan", architects: 3, engineers: 5, technicians: 2, coordinators: 1 },
  { month: "Feb", architects: 5, engineers: 8, technicians: 4, coordinators: 2 },
  { month: "Mar", architects: 8, engineers: 12, technicians: 6, coordinators: 3 },
  { month: "Apr", architects: 10, engineers: 15, technicians: 8, coordinators: 4 },
  { month: "May", architects: 9, engineers: 14, technicians: 7, coordinators: 3 },
  { month: "Jun", architects: 7, engineers: 10, technicians: 5, coordinators: 2 },
]

const utilizationData = [
  { resource: "Architects", allocated: 10, available: 15, utilization: 67 },
  { resource: "Engineers", allocated: 15, available: 18, utilization: 83 },
  { resource: "Technicians", allocated: 8, available: 12, utilization: 67 },
  { resource: "Coordinators", allocated: 4, available: 5, utilization: 80 },
]

const teamMembers = [
  { name: "Asim Rehman", role: "Lead Architect", allocation: 100, status: "Active" },
  { name: "Sarah Ahmed", role: "Structural Engineer", allocation: 95, status: "Active" },
  { name: "John Smith", role: "MEP Coordinator", allocation: 85, status: "Active" },
  { name: "Emma Wilson", role: "BIM Technician", allocation: 100, status: "Active" },
  { name: "Mike Johnson", role: "Quality Lead", allocation: 75, status: "On Leave" },
]

export default function ResourcesPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Resource Management</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Team allocation and utilization tracking</p>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Team</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">45</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Avg Utilization</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">74%</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Active Resources</p>
              <p className="text-3xl font-bold text-green-600 mt-2">42</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm font-medium">On Leave</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">3</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Team Allocation Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="architects" fill="#3b82f6" name="Architects" />
                  <Bar dataKey="engineers" fill="#10b981" name="Engineers" />
                  <Bar dataKey="technicians" fill="#f59e0b" name="Technicians" />
                  <Bar dataKey="coordinators" fill="#8b5cf6" name="Coordinators" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Resource Utilization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="resource" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="utilization" stroke="#3b82f6" strokeWidth={2} name="Utilization %" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Team Table */}
          <Card className="border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">Team Members</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Allocation</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{member.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{member.role}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-full" style={{ width: `${member.allocation}%` }} />
                          </div>
                          <span className="text-slate-900 font-medium">{member.allocation}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {member.status}
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
