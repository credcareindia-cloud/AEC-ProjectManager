"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"

export default function BIMIssuesPage() {
    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">BIM Issues</h1>
                <Card className="p-8">
                    <p>Track and manage model issues here (BCF support coming soon).</p>
                </Card>
            </div>
        </AppLayout>
    )
}
