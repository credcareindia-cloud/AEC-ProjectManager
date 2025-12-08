"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProject } from "@/lib/project-context"
import { Filter } from "lucide-react"

const clashData = [
  { id: 1, element1: "Pipe-MEP-001", element2: "Column-STR-045", severity: "Critical", distance: 0.2, status: "New" },
  { id: 2, element1: "Duct-MEP-032", element2: "Beam-STR-012", severity: "Major", distance: 0.5, status: "Active" },
  { id: 3, element1: "Cable-ELE-087", element2: "Wall-ARC-156", severity: "Minor", distance: 1.2, status: "Closed" },
  { id: 4, element1: "Pipe-MEP-045", element2: "Slab-STR-089", severity: "Critical", distance: 0.1, status: "Active" },
  { id: 5, element1: "Duct-MEP-067", element2: "Column-STR-034", severity: "Major", distance: 0.8, status: "New" },
]

export default function ClashesPage() {
  const { selectedProject } = useProject()

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
        <div className="max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Clash Detection</h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {selectedProject?.name} - Manage and resolve model clashes across disciplines
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="p-4 sm:p-6 border-slate-200">
              <p className="text-slate-600 text-xs sm:text-sm">Total Clashes</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">1,660</p>
            </Card>
            <Card className="p-4 sm:p-6 border-slate-200">
              <p className="text-slate-600 text-xs sm:text-sm">Critical</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1 sm:mt-2">245</p>
            </Card>
            <Card className="p-4 sm:p-6 border-slate-200">
              <p className="text-slate-600 text-xs sm:text-sm">Major</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-1 sm:mt-2">523</p>
            </Card>
            <Card className="p-4 sm:p-6 border-slate-200">
              <p className="text-slate-600 text-xs sm:text-sm">Resolved</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">892</p>
            </Card>
          </div>

          {/* Filter & Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Button variant="outline" className="gap-2 bg-transparent text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="text-sm">Export Report</Button>
          </div>

          {/* Clash Table */}
          <Card className="border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Element 1
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Element 2
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Severity
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Distance
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-slate-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clashData.map((clash) => (
                    <tr key={clash.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-900">
                        {clash.element1}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-900">
                        {clash.element2}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            clash.severity === "Critical"
                              ? "bg-red-100 text-red-700"
                              : clash.severity === "Major"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {clash.severity}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600">
                        {clash.distance}m
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            clash.status === "New"
                              ? "bg-blue-100 text-blue-700"
                              : clash.status === "Active"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {clash.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <Button size="sm" variant="outline" className="text-xs">
                          Review
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
