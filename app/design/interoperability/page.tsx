"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"

export default function InteroperabilityPage() {
    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Interoperability</h1>
                <Card className="p-8">
                    <p>Manage data exchange between different software platforms.</p>
                </Card>
            </div>
        </AppLayout>
    )
}
