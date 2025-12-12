"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Bot, User, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    attachments?: File[]
}

interface UserChatProps {
    onDashboardUpdate: (data: any) => void
}

export function UserChat({ onDashboardUpdate }: UserChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm ADM Agent. Upload your project files (XER, CSV, PDF) or ask me anything about your project data. I can generate dashboards and insights for you."
        }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const extractDashboardData = (content: string) => {
        const match = content.match(/```json-dashboard([\s\S]*?)```/)
        if (match && match[1]) {
            try {
                const dashboardData = JSON.parse(match[1])
                onDashboardUpdate(dashboardData)
                // Remove the dashboard block from chat to keep it clean, or keep it if preferred.
                // For now, we'll keep it but maybe hide it visually or just let it be.
                return content.replace(/```json-dashboard[\s\S]*?```/, "\n*[Dashboard generated on the right]*\n")
            } catch (e) {
                console.error("Failed to parse dashboard JSON", e)
            }
        }
        return content
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if ((!input.trim() && files.length === 0) || isLoading) return

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            attachments: [...files]
        }

        setMessages(prev => [...prev, newMessage])
        setInput("")
        setFiles([])
        setIsLoading(true)

        try {
            // Prepare context with file info (mocking file reading for now)
            let fileContext = ""
            if (newMessage.attachments && newMessage.attachments.length > 0) {
                fileContext = `\n[User uploaded ${newMessage.attachments.length} files: ${newMessage.attachments.map(f => f.name).join(", ")}]. Analyze these files assuming they contain standard project management data (Tasks, Costs, Resources).`
            }

            const response = await fetch("/api/adm-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: messages.concat(newMessage).map(m => ({
                        role: m.role,
                        content: m.content + (m.role === 'user' && m.id === newMessage.id ? fileContext : "")
                    }))
                })
            })

            if (!response.ok) throw new Error("Failed to send message")
            if (!response.body) throw new Error("No response body")

            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let assistantMessage = ""

            setMessages(prev => [...prev, { id: "temp", role: "assistant", content: "" }])

            // Mock streaming accumulation
            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                // OpenAI API returns "data: JSON" lines in stream mode, but our route pipes raw body. 
                // Wait, our route passes response.body directly. 
                // Standard fetch from OpenAI returns raw chunks of valid JSON if not parsing SSE manually? 
                // Actually OpenAI returns SSE. My route pipes it. So browser sees SSE.
                // Simpler approach for MVP: Wait for full text or just parse basic chunks.
                // Wait, to keep it simple and robust, let's treat the route response as simple text for now (non-streaming in frontend or simple accumulation).
                // Re-reading route: it pipes response.body. OpenAI sends SSE (data: {...}). 
                // We need to parse SSE on client side or simplify route to return json.
                // Let's assume for this step we just accumulate text.

                // Correction: The route pipes the stream. If I use `stream: true` in OpenAI, I get SSE events.
                // Parsing SSE manually here is annoying. Let's switch Route to valid JSON response for stability first.
                // OR just accumulate the raw text and clean it.
                // Actually, let's assume the user wants a working MVP. Converting route to non-streaming is safer for avoiding parsing issues.
                // But I already wrote streaming route. 
                // Let's stick to simple text accumulation, assuming the route output is just text (if I turn off stream in route?). 
                // Ah, I set stream: true in route.
                // Okay, let's try to parse the complex SSE on client? No, too risky for a 1-shot.
                // I will rewrite the client to just handle the text roughly or better yet,
                // I will update the route to NOT stream in the next step if this fails, but for now let's write a client that assumes it receives full response or simple text.

                // Actually, to ensure success, I will modify this client code to NOT assume streaming for the MVP V1, 
                // effectively treating it as a standard fetch if I can change the route, 
                // but since I can't change the route in *this* tool call, I will handle the stream as raw text.
                assistantMessage += chunk
            }

            // OpenAI stream data format is "data: {...json...}\n\n". 
            // We need to parse that to get the actual "content".
            // Implementation detail: Let's do a quick client-side parser.
            let cleanResponse = ""
            const lines = assistantMessage.split("\n")
            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    const dataStr = line.replace("data: ", "").trim()
                    if (dataStr === "[DONE]") continue
                    try {
                        const json = JSON.parse(dataStr)
                        const content = json.choices[0]?.delta?.content || ""
                        cleanResponse += content
                    } catch (e) { }
                }
            }

            // If cleanResponse is empty (maybe not streaming or error), fallback to raw
            const finalContent = cleanResponse || assistantMessage

            const processedContent = extractDashboardData(finalContent)

            setMessages(prev => prev.map(m =>
                m.id === "temp" ? { ...m, id: Date.now().toString(), content: processedContent } : m
            ))

        } catch (error) {
            console.error(error)
            setMessages(prev => prev.map(m =>
                m.id === "temp" ? { ...m, id: "error", content: "Sorry, I encountered an error." } : m
            ))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-2xl mx-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-3",
                                message.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className={message.role === "user" ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"}>
                                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={cn(
                                    "p-4 rounded-lg text-sm max-w-[80%]",
                                    message.role === "user"
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm"
                                )}
                            >
                                <div className="whitespace-pre-wrap">{message.content}</div>
                                {message.attachments && message.attachments.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {message.attachments.map((file, i) => (
                                            <div key={i} className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-xs">
                                                <FileText className="h-3 w-3" />
                                                {file.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 bg-white border-t border-slate-200">
                <div className="max-w-2xl mx-auto">
                    {files.length > 0 && (
                        <div className="flex gap-2 mb-2 overflow-x-auto py-2">
                            {files.map((file, i) => (
                                <div key={i} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700">
                                    <FileText className="h-3 w-3" />
                                    {file.name}
                                    <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="ml-1 hover:text-red-500">×</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Paperclip className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Input
                            placeholder={isLoading ? "Analyzing..." : "Ask about your project..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={isLoading || (!input.trim() && files.length === 0)}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
