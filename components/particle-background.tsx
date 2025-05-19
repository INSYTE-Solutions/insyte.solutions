"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

    const colors = [
      "rgba(20, 184, 166, 0.5)", // teal
      "rgba(56, 189, 248, 0.5)", // sky blue
      "rgba(99, 102, 241, 0.5)", // indigo
      "rgba(168, 85, 247, 0.5)", // purple
      "rgba(236, 72, 153, 0.5)", // pink
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    // Connect particles with lines if they are close enough
    const connectParticles = () => {
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.beginPath()
            ctx.strokeStyle = `rgba(150, 150, 150, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x > canvas.width || p.x < 0) {
          p.speedX = -p.speedX
        }

        if (p.y > canvas.height || p.y < 0) {
          p.speedY = -p.speedY
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      const mouseRadius = 100

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const force = mouseRadius / distance
          const angle = Math.atan2(dy, dx)
          p.speedX -= Math.cos(angle) * force * 0.05
          p.speedY -= Math.sin(angle) * force * 0.05
        }
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Start animation
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

