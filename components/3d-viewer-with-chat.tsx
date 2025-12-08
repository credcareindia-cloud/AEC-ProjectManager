"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Send, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const botResponses: Record<string, string> = {
  completion: "Model completion is 62.3%. Architecture 71%, Structure 83%, Mechanical 53%, Electrical 64%.",
  clash: "1,660 active clashes detected. 245 Critical, 523 Major, 892 Minor.",
  resources: "45 active resources with 94% utilization. 12 Architects, 15 Engineers, 8 Technicians, 5 Coordinators.",
  issues: "25 total issues: 3 New, 14 Open, 8 Closed. Critical issues in MEP-Structure interface.",
  progress: "62% completion. Schedule on track with 156 days remaining. Budget at 89%.",
  color: "I've changed the cube color. You can ask me to change it to red, blue, green, yellow, purple, or white.",
  rotate: "Rotating the cube for better visibility.",
  scale: "Adjusting the cube scale.",
  reset: "Cube reset to original state.",
  default:
    "I can help with project info, 3D model commands, clash data, resources, and financials. What would you like?",
}

export function ThreeDViewerWithChat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your 3D AI Assistant. I can control the model and answer project questions. Try asking me to change colors or rotate the model!",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfafafa)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const material = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.3,
      roughness: 0.4,
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.castShadow = true
    cube.receiveShadow = true
    scene.add(cube)
    cubeRef.current = cube

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (cube) {
        cube.rotation.x += 0.005
        cube.rotation.y += 0.008
      }
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const processCubeCommand = (lowerCommand: string) => {
    if (!cubeRef.current) return

    if (
      lowerCommand.includes("color") ||
      lowerCommand.includes("red") ||
      lowerCommand.includes("blue") ||
      lowerCommand.includes("green")
    ) {
      const colors: { [key: string]: number } = {
        red: 0xef4444,
        blue: 0x3b82f6,
        green: 0x22c55e,
        yellow: 0xeab308,
        purple: 0xa855f7,
        white: 0xf5f5f5,
        slate: 0x334155,
      }

      let colorName = "slate"
      if (lowerCommand.includes("red")) colorName = "red"
      else if (lowerCommand.includes("blue")) colorName = "blue"
      else if (lowerCommand.includes("green")) colorName = "green"
      else if (lowerCommand.includes("yellow")) colorName = "yellow"
      else if (lowerCommand.includes("purple")) colorName = "purple"
      else if (lowerCommand.includes("white")) colorName = "white"

      if (cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
        cubeRef.current.material.color.setHex(colors[colorName])
      }
      return `Changed cube color to ${colorName}`
    }

    if (lowerCommand.includes("rotate")) {
      cubeRef.current.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      return "Rotated the cube"
    }

    if (lowerCommand.includes("bigger") || lowerCommand.includes("scale up")) {
      cubeRef.current.scale.multiplyScalar(1.2)
      return "Scaled up the cube"
    }

    if (lowerCommand.includes("smaller") || lowerCommand.includes("scale down")) {
      cubeRef.current.scale.multiplyScalar(0.8)
      return "Scaled down the cube"
    }

    if (lowerCommand.includes("reset")) {
      cubeRef.current.rotation.set(0, 0, 0)
      cubeRef.current.scale.set(1, 1, 1)
      if (cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
        cubeRef.current.material.color.setHex(0x334155)
      }
      return "Reset cube to original state"
    }

    return null
  }

  const findBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    const cubeResponse = processCubeCommand(lowerQuery)
    if (cubeResponse) return cubeResponse

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
      const aiMessage: Message = {
        id: messages.length + 2,
        text: findBotResponse(messageText),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="flex gap-6 h-full">
      {/* 3D Viewer */}
      <div className="flex-1">
        <div
          ref={containerRef}
          className="w-full h-full rounded-lg border border-slate-200 overflow-hidden bg-slate-50"
        />
      </div>

      {/* AI Chat Panel */}
      <div className="w-96 bg-white border-l border-slate-200 flex flex-col rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-slate-900">3D AI Assistant</h3>
          </div>
          <p className="text-sm text-slate-600">Control model & get project insights</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.sender === "user"
                    ? "bg-slate-800 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-900 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1.5">
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

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me something..."
              className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="gap-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Try: 'change to red', 'rotate', 'bigger', 'reset'</p>
        </div>
      </div>
    </div>
  )
}
