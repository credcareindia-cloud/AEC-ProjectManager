"use client"

import { Card } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"
import { useProject } from "@/lib/project-context"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ModelViewerPage() {
  const { selectedProject } = useProject()
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8f9fa)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    // Create sample geometry - building-like structure
    const geometry = new THREE.BoxGeometry(4, 3, 2)
    const material = new THREE.MeshPhongMaterial({ color: 0x3b82f6 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.y = 1.5
    scene.add(cube)

    // Add interior walls
    const wallGeometry = new THREE.BoxGeometry(0.1, 3, 2)
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x64748b })
    const wall = new THREE.Mesh(wallGeometry, wallMaterial)
    wall.position.set(-1.5, 1.5, 0)
    scene.add(wall)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.001
      cube.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
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

  return (
    <AppLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">3D Model Viewer</h1>
            <p className="text-slate-600 mt-2">{selectedProject?.name} - Interactive visualization of your BIM model</p>
          </div>

          <Card className="border-slate-200 overflow-hidden">
            <div ref={containerRef} className="w-full h-[600px] bg-slate-100" />
            <div className="p-6 bg-white border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Model Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">File Name</p>
                  <p className="font-medium text-slate-900">Architecture_Model_A1.ifc</p>
                </div>
                <div>
                  <p className="text-slate-600">File Size</p>
                  <p className="font-medium text-slate-900">145.3 MB</p>
                </div>
                <div>
                  <p className="text-slate-600">Elements</p>
                  <p className="font-medium text-slate-900">2,847</p>
                </div>
                <div>
                  <p className="text-slate-600">Last Updated</p>
                  <p className="font-medium text-slate-900">Dec 5, 2024</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
