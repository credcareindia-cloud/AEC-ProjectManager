"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Zap } from "lucide-react"

export function ThreeDViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const [aiResponse, setAiResponse] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfafafa)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 3
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create cube
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const material = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.3,
      roughness: 0.4,
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.castShadow = true
    cube.receiveShadow = true
    cube.userData.originalColor = new THREE.Color(0x334155)
    scene.add(cube)
    cubeRef.current = cube

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (cube) {
        cube.rotation.x += 0.005
        cube.rotation.y += 0.008
      }
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
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
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  const changeColor = (colorName: string) => {
    if (!cubeRef.current) return

    const colors: { [key: string]: number } = {
      red: 0xef4444,
      blue: 0x3b82f6,
      green: 0x22c55e,
      yellow: 0xeab308,
      purple: 0xa855f7,
      slate: 0x334155,
      white: 0xf5f5f5,
    }

    const color = colors[colorName.toLowerCase()] || 0x334155
    if (cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
      cubeRef.current.material.color.setHex(color)
    }

    setAiResponse(`Changed cube color to ${colorName}`)
  }

  const rotate = (axis: string, speed: number) => {
    if (!cubeRef.current) return
    setAiResponse(`Rotating cube around ${axis} axis`)
  }

  const scale = (factor: number) => {
    if (!cubeRef.current) return
    cubeRef.current.scale.multiplyScalar(factor)
    setAiResponse(`Scaled cube by factor of ${factor}`)
  }

  const handleAICommand = async (command: string) => {
    setLoading(true)
    setAiResponse("Processing command...")

    // Simulate AI processing with different commands
    setTimeout(() => {
      const lowerCommand = command.toLowerCase()

      if (lowerCommand.includes("color") || lowerCommand.includes("red") || lowerCommand.includes("blue")) {
        const colors = ["red", "blue", "green", "yellow", "purple"]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        changeColor(randomColor)
      } else if (lowerCommand.includes("rotate")) {
        rotate("x", 0.1)
      } else if (
        lowerCommand.includes("scale") ||
        lowerCommand.includes("bigger") ||
        lowerCommand.includes("smaller")
      ) {
        const factor = lowerCommand.includes("bigger") ? 1.2 : 0.8
        scale(factor)
      } else if (lowerCommand.includes("reset")) {
        if (cubeRef.current) {
          cubeRef.current.rotation.set(0, 0, 0)
          cubeRef.current.scale.set(1, 1, 1)
          if (cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
            cubeRef.current.material.color.setHex(0x334155)
          }
        }
        setAiResponse("Reset cube to original state")
      } else {
        setAiResponse("Command: " + command + " - Try 'change color', 'rotate', 'scale', or 'reset'")
      }

      setLoading(false)
    }, 500)
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
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-slate-900" />
            <h3 className="font-bold text-slate-900">3D AI Assistant</h3>
          </div>
          <p className="text-sm text-slate-600">Control the model interactively</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Response Display */}
          {aiResponse && (
            <div className="p-3 bg-slate-100 rounded-lg">
              <p className="text-sm text-slate-900">{aiResponse}</p>
            </div>
          )}

          {/* Quick Commands */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-600 uppercase">Quick Commands</p>
            <button
              onClick={() => handleAICommand("change color to red")}
              disabled={loading}
              className="w-full px-3 py-2 text-sm bg-red-50 text-red-900 rounded-lg hover:bg-red-100 transition-colors border border-red-200 font-medium disabled:opacity-50"
            >
              Change Color
            </button>
            <button
              onClick={() => handleAICommand("rotate")}
              disabled={loading}
              className="w-full px-3 py-2 text-sm bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 font-medium disabled:opacity-50"
            >
              Rotate
            </button>
            <button
              onClick={() => handleAICommand("make it bigger")}
              disabled={loading}
              className="w-full px-3 py-2 text-sm bg-green-50 text-green-900 rounded-lg hover:bg-green-100 transition-colors border border-green-200 font-medium disabled:opacity-50"
            >
              Scale Up
            </button>
            <button
              onClick={() => handleAICommand("reset")}
              disabled={loading}
              className="w-full px-3 py-2 text-sm bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors border border-slate-300 font-medium disabled:opacity-50"
            >
              Reset
            </button>
          </div>

          {/* Manual Input */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase">Custom Command</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., change to blue"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    handleAICommand(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
