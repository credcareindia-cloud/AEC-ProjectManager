"use client"

import type React from "react"
import { Sidebar } from "./sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
