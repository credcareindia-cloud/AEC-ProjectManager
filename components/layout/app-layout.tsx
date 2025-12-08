"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { MobileSidebar } from "./mobile-sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar - hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileMenuOpen} setOpen={setMobileMenuOpen} />

      {/* Main content area */}
      <main className="flex-1 overflow-auto w-full">
        {/* Mobile header with menu button */}
        <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-slate-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="font-semibold">Menu</span>
          </button>
        </div>
        {children}
      </main>
    </div>
  )
}
