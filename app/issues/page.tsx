"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProject } from "@/lib/project-context"

const issuesData = [
  {
    id: 1,
    title: "BEP not uploaded for MEP coordination",
    priority: "Critical",
    status: "New",
    assignee: "Asim Rehman",
    dueDate: "2024-12-15",
  },
  {
    id: 2,
    title: "Clash Matrix not submitted",
    priority: "Major",
    status: "Open",
    assignee: "Sarah Ahmed",
    dueDate: "2024-12-18",
  },
  {
    id: 3,
    title: "Duct clashing with floor in Level 3",
    priority: "Major",
    status: "Open",
    assignee: "John Smith",
    dueDate: "2024-12-20",
  },
  {
    id: 4,
    title: "Electrical routing incomplete",
    priority: "Major",
    status: "Open",
    assignee: "Mike Johnson",
    dueDate: "2024-12-22",
  },
  {
    id: 5,
    title: "LOIN specifications clarified",
    priority: "Minor",
    status: "Closed",
    assignee: "Emma Wilson",
    dueDate: "2024-12-10",
  },
  {
    id: 6,
    title: "Model submission format corrected",
    priority: "Minor",
    status: "Closed",
    assignee: "Alex Brown",
    dueDate: "2024-12-12",
  },
]

export default function IssuesPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">BIM Issues Management</h1>
            <p className="text-slate-600 mt-2">
              {selectedProject?.name} - Track and manage all project issues and action items
            </p>
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">Total Issues</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">25</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">New</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">3</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">Open</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">14</p>
            </Card>
            <Card className="p-6 border-slate-200">
              <p className="text-slate-600 text-sm">Closed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">8</p>
            </Card>
          </div>

          {/* Issues Table */}
          <Card className="border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Issue</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Priority</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Assigned To</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Due Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issuesData.map((issue) => (
                    <tr key={issue.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{issue.title}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            issue.priority === "Critical"
                              ? "bg-red-100 text-red-700"
                              : issue.priority === "Major"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            issue.status === "New"
                              ? "bg-blue-100 text-blue-700"
                              : issue.status === "Open"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{issue.assignee}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{issue.dueDate}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
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
