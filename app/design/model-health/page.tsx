"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Activity } from "lucide-react"

export default function ModelHealthPage() {
    return (
        <AppLayout>
            <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold">Model Health</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="p-6">
                        <h3 className="font-bold mb-2">Integrity Check</h3>
                        <div className="text-green-600 font-bold">Passed</div>
                    </Card>
                    <Card className="p-6">
                        <h3 className="font-bold mb-2">Data Quality</h3>
                        <div className="text-orange-500 font-bold">85%</div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
