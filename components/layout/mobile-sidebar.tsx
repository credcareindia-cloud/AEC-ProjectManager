"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Cable as Cube,
  Zap,
  BookOpen,
  CheckSquare,
  TrendingUp,
  PieChart,
  Users,
  DollarSign,
  AlertCircle,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useProject } from "@/lib/project-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface MobileSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function MobileSidebar({ open, setOpen }: MobileSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { selectedProject, setSelectedProject } = useProject()

  const menuItems = [
    {
      label: "Overview",
      href: "/overview",
      icon: Home,
    },
    {
      label: "Clash Detection",
      href: "/design/clashes",
      icon: Zap,
    },
    {
      label: "LOIN",
      href: "/design/loin",
      icon: BookOpen,
    },
    {
      label: "LOD",
      href: "/design/lod",
      icon: CheckSquare,
    },
    {
      label: "QAQC",
      href: "/design/qaqc",
      icon: CheckSquare,
    },
    {
      label: "Progress",
      href: "/planning/progress",
      icon: TrendingUp,
    },
    {
      label: "S-Curve",
      href: "/planning/scurve",
      icon: PieChart,
    },
    {
      label: "Resources",
      href: "/planning/resources",
      icon: Users,
    },
    {
      label: "Financials",
      href: "/planning/financials",
      icon: DollarSign,
    },
    {
      label: "Issues",
      href: "/issues",
      icon: AlertCircle,
    },
  ]

  const handleExit = () => {
    setSelectedProject(null)
    router.push("/")
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <Cube className="w-5 h-5 text-white" />
              </div>
              <SheetTitle className="font-bold text-slate-900">BuildSync</SheetTitle>
            </div>

            {selectedProject && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="text-xs font-semibold text-slate-600 mb-1">Active Project</div>
                <div className="font-bold text-slate-900 text-sm">{selectedProject.name}</div>
                <div className="text-xs text-slate-600">{selectedProject.code}</div>
              </div>
            )}
          </SheetHeader>

          <nav className="p-4 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 font-medium transition-colors",
                      isActive ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-slate-200">
            <Button onClick={handleExit} variant="outline" className="w-full gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Exit Project
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
