"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProject } from "@/lib/project-context"
import { Send } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const suggestedQueries = [
  "What is the current model completion percentage?",
  "Show me the active clashes in the MEP system",
  "How many resources are currently allocated?",
  "What are the critical issues that need attention?",
  "Generate a progress report for this week",
]

const botResponses: Record<string, string> = {
  completion:
    "The current model completion rate is 62.3% across all disciplines. Architecture is at 71%, Structure at 83%, Mechanical at 53%, and Electrical at 64%.",
  clash:
    "There are currently 1,660 active clashes detected. 245 are Critical, 523 are Major, and 892 are Minor. The MEP system has the highest clash count with 892 interactions.",
  resources:
    "We have 45 active resources on the project with 94% utilization. This includes 12 Architects, 15 Engineers, 8 Technicians, and 5 Coordinators.",
  issues:
    "There are 25 total issues: 3 New, 14 Open, and 8 Closed. Critical issues include clash resolution in the MEP-Structure interface and incomplete LOIN specifications in Mechanical systems.",
  progress:
    "Weekly progress shows 62% overall completion. Schedule is on track with 156 days remaining. Budget utilization is at 89% of the allocated budget.",
  default:
    "I can help you with project information, clash management, resource allocation, financial tracking, and schedule analysis. What would you like to know?",
}

export default function ChatPage() {
  const { selectedProject } = useProject()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your BuildSync AI Assistant. I can help you with project information, clash management, resource allocation, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("completion") || lowerQuery.includes("complete")) return botResponses.completion
    if (lowerQuery.includes("clash")) return botResponses.clash
    if (lowerQuery.includes("resource") || lowerQuery.includes("manpower")) return botResponses.resources
    if (lowerQuery.includes("issue") || lowerQuery.includes("critical")) return botResponses.issues
    if (lowerQuery.includes("progress") || lowerQuery.includes("report")) return botResponses.progress
    return botResponses.default
  }

  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: findBotResponse(messageText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen flex flex-col">
        <div className="max-w-4xl w-full mx-auto flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">AI Project Assistant</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Get instant insights about your project</p>
          </div>

          {/* Chat Area */}
          <Card className="border-slate-200 flex-1 flex flex-col mb-6">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-slate-800 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Queries */}
            {messages.length === 1 && (
              <div className="px-6 pb-6">
                <p className="text-sm font-medium text-slate-700 mb-3">Suggested queries:</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQueries.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(query)}
                      className="text-left text-sm px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me about your project..."
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white"
                />
                <Button onClick={() => handleSendMessage()} disabled={!input.trim() || isLoading} className="gap-2">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
