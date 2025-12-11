"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"

export default function FragmentsPage() {
    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Fragments Conversion</h1>
                <Card className="p-8">
                    <p>Auto-converting IFC models into lightweight fragments...</p>
                </Card>
            </div>
        </AppLayout>
    )
}
