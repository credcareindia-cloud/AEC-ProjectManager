"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell, Area, AreaChart } from "recharts"

export interface DashboardData {
    type: "bar" | "line" | "pie" | "area"
    title: string
    description?: string
    data: any[]
    dataKey: string
    xAxisKey: string
    colors?: string[]
}

interface DashboardPreviewProps {
    data: DashboardData | null
}

const DEFAULT_COLORS = ["#2563eb", "#16a34a", "#db2777", "#ea580c", "#8b5cf6"]

export function DashboardPreview({ data }: DashboardPreviewProps) {
    if (!data) {
        return (
            <div className="h-full flex items-center justify-center p-8 text-slate-400 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200">
                <div className="text-center">
                    <p className="text-lg font-medium mb-2">No Dashboard Generated</p>
                    <p className="text-sm">Ask the agent to analyze data or generate a chart.</p>
                </div>
            </div>
        )
    }

    const colors = data.colors || DEFAULT_COLORS

    const renderChart = () => {
        switch (data.type) {
            case "bar":
                return (
                    <BarChart data={data.data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey={data.xAxisKey} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            cursor={{ fill: "transparent" }}
                        />
                        <Legend />
                        <Bar dataKey={data.dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
                    </BarChart>
                )
            case "line":
                return (
                    <LineChart data={data.data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey={data.xAxisKey} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey={data.dataKey} stroke={colors[0]} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                )
            case "area":
                return (
                    <AreaChart data={data.data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey={data.xAxisKey} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey={data.dataKey} stroke={colors[0]} fill={colors[0]} fillOpacity={0.2} />
                    </AreaChart>
                )
            case "pie":
                return (
                    <PieChart>
                        <Pie
                            data={data.data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey={data.dataKey}
                        >
                            {data.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        />
                        <Legend />
                    </PieChart>
                )
            default:
                return <div>Unsupported chart type</div>
        }
    }

    return (
        <Card className="h-full border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold text-slate-800">{data.title}</CardTitle>
                {data.description && <CardDescription>{data.description}</CardDescription>}
            </CardHeader>
            <CardContent className="px-0 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
