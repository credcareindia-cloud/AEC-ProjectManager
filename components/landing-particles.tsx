"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function LandingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000 // Increased for better effect

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Spread particles across a wide area
      posArray[i] = (Math.random() - 0.5) * 15 // Range -7.5 to 7.5
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    // Create a star-like material
    const material = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xffffff, // White stars
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    })

    const particlesMesh = new THREE.Points(particlesGeometry, material)
    scene.add(particlesMesh)

    camera.position.z = 3

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX)
      mouseY = (event.clientY - windowHalfY)
    }

    document.addEventListener('mousemove', onDocumentMouseMove)

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate)

      targetX = mouseX * 0.0005
      targetY = mouseY * 0.0005

      // Smooth rotation based on mouse
      particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y)
      particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x)

      // Very slow constant rotation like the galaxy
      particlesMesh.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', onDocumentMouseMove)
      container.removeChild(renderer.domElement)
      particlesGeometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-black"
    />
  )
}
