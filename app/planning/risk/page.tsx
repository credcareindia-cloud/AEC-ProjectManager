"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"

export default function RiskRegisterPage() {
    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Risk Register</h1>
                <Card className="p-8">
                    <p>Track project risks, mitigation strategies, and impact.</p>
                </Card>
            </div>
        </AppLayout>
    )
}
