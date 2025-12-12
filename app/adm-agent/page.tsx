"use client"

import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { UserChat } from "@/components/adm-agent/user-chat"
import { DashboardPreview, DashboardData } from "@/components/adm-agent/dashboard-preview"
import { AppLayout } from "@/components/layout/app-layout"
import { Bot, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdmAgentPage() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
    const router = useRouter()

    return (
        <div className="h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 bg-white flex-shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                        <ArrowLeft className="h-5 w-5 text-slate-500" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="font-bold text-slate-800">ADM Agent</h1>
                    </div>
                </div>
                <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Powered by GPT-4o
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={40} minSize={30}>
                        <UserChat onDashboardUpdate={setDashboardData} />
                    </ResizablePanel>

                    <ResizableHandle />

                    <ResizablePanel defaultSize={60} minSize={30}>
                        <div className="h-full bg-slate-50/30 p-6 overflow-y-auto">
                            <DashboardPreview data={dashboardData} />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
