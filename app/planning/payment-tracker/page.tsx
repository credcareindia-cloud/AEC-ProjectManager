"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"

export default function PaymentTrackerPage() {
    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Payment Tracker</h1>
                <Card className="p-8">
                    <p>Track outgoing and incoming payments against milestones.</p>
                </Card>
            </div>
        </AppLayout>
    )
}
