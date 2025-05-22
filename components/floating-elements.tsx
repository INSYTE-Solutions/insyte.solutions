"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create floating elements
    const elements = []
    const container = containerRef.current

    // Binary data
    for (let i = 0; i < 20; i++) {
      const element = document.createElement("div")
      element.className = "floating-data-element absolute text-xs md:text-sm opacity-30 font-mono"
      element.style.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.3})`
      element.style.left = `${Math.random() * 100}%`
      element.style.top = `${Math.random() * 100}%`
      element.textContent = generateRandomBinary()
      container.appendChild(element)
      elements.push(element)
    }

    // Data structures
    for (let i = 0; i < 10; i++) {
      const element = document.createElement("div")
      element.className = "floating-data-element absolute opacity-20"
      element.style.left = `${Math.random() * 100}%`
      element.style.top = `${Math.random() * 100}%`

      // Create a small data structure visualization
      const size = Math.floor(Math.random() * 30) + 20
      element.style.width = `${size}px`
      element.style.height = `${size}px`
      element.style.border = `1px solid rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.5)`

      container.appendChild(element)
      elements.push(element)
    }

    // Animate elements
    elements.forEach((element) => {
      gsap.to(element, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        rotation: `random(-20, 20)`,
        duration: `random(5, 15)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
      })
    })

    return () => {
      elements.forEach((element) => {
        if (element.parentNode === container) {
          container.removeChild(element)
        }
      })
    }
  }, [])

  return <div ref={containerRef}></div>
}

// Helper function to generate random binary strings
function generateRandomBinary() {
  let result = ""
  const length = 8

  for (let i = 0; i < length; i++) {
    result += Math.random() > 0.5 ? "1" : "0"
  }

  return result
}
