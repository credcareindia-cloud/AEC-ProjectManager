"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"

export default function WeightagePage() {
    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Weightage Configuration</h1>
                <Card className="p-8">
                    <p>Configure weightage parameters for model scoring.</p>
                </Card>
            </div>
        </AppLayout>
    )
}
