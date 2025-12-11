"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"

export default function VariationOrdersPage() {
    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Variation Orders</h1>
                <Card className="p-8">
                    <p>Manage and track variation orders and scope changes.</p>
                </Card>
            </div>
        </AppLayout>
    )
}
