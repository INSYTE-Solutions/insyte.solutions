"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { TypewriterEffect } from "./typewriter-effect"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import * as THREE from "three"
import Link from "next/link"

// Gradient Balls/Stars with parallax effect
function ParallaxBalls() {
  const count = 40 // Increased count to fill space
  const balls = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20, // Wider spread
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15 - 5, // Different depths for parallax
      ],
      radius: Math.random() * 0.3 + 0.1,
      color:
        i % 3 === 0
          ? new THREE.Color("#10b981") // Emerald
          : i % 3 === 1
            ? new THREE.Color("#0ea5e9") // Cyan
            : new THREE.Color("#ffffff"), // White
      speed: Math.random() * 0.2 + 0.1,
      amplitude: Math.random() * 0.5 + 0.5,
    }))
  }, [count])

  return (
    <group>
      {balls.map((ball, i) => (
        <Ball key={i} {...ball} />
      ))}
    </group>
  )
}

function Ball({ position: initialPosition, radius, color, speed, amplitude }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      // Add gentle floating motion
      ref.current.position.x = initialPosition[0] + Math.sin(t * speed) * amplitude * 0.3
      ref.current.position.y = initialPosition[1] + Math.cos(t * speed) * amplitude * 0.2
    }
  })

  return (
    <mesh ref={ref} position={initialPosition}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}

function FlowingLines() {
  const lineCount = 3

  return (
    <group>
      {Array.from({ length: lineCount }).map((_, i) => (
        <FluctuatingLine
          key={i}
          index={i}
          yOffset={(i - lineCount / 2) * 2.2}
          color={
            i % 3 === 0
              ? new THREE.Color("#10b981") // Emerald
              : i % 3 === 1
                ? new THREE.Color("#0ea5e9") // Cyan
                : new THREE.Color("#ffffff") // White
          }
          width={0.02 + (i % 3) * 0.01}
          phaseOffset={i * 0.2} // Different starting phases
          frequency={0.2 + (i % 3) * 0.1} // Reduced frequencies (was 0.5 + (i % 3) * 0.2)
          amplitude={0.25 + (i % 4) * 0.08} // Slightly reduced amplitude (was 0.3 + (i % 4) * 0.1)
        />
      ))}
    </group>
  )
}

// Individual fluctuating line
function FluctuatingLine({ index, yOffset, color, width, phaseOffset, frequency, amplitude }) {
  const meshRef = useRef()
  const pointsCount = 100 // High number of points for smooth curves

  // Create initial curve points
  const initialPoints = useMemo(() => {
    const points = []
    for (let i = 0; i < pointsCount; i++) {
      const x = (i / (pointsCount - 1)) * 40 - 20 // Spread from -20 to 20
      const y = yOffset
      const z = -5 - (index % 5) * 0.5 // Different depths
      points.push(new THREE.Vector3(x, y, z))
    }
    return points
  }, [pointsCount, yOffset, index])

  // Create a curve that will be updated
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(initialPoints)
  }, [initialPoints])

  // Create geometry with high detail
  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 120, width, 8, false)
  }, [curve, width])

  // Update the curve points to create fluctuation
  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const t = clock.getElapsedTime()

    // Update each point in the curve
    for (let i = 0; i < curve.points.length; i++) {
      const point = curve.points[i]
      const x = initialPoints[i].x

      // Create wave-like motion with multiple frequencies
      // This creates the illusion of movement without actually moving the line
      const wave1 = Math.sin(x * 0.08 + t * frequency + phaseOffset) * amplitude // Reduced x frequency (was 0.1)
      const wave2 = Math.sin(x * 0.15 + t * frequency * 1.3 + phaseOffset) * (amplitude * 0.5) // Reduced x frequency and multiplier
      const wave3 = Math.sin(x * 0.3 + t * frequency * 0.6 + phaseOffset) * (amplitude * 0.3) // Reduced x frequency and multiplier

      // Combine waves for complex motion
      point.y = initialPoints[i].y + wave1 + wave2 + wave3

      // Add subtle depth variation
      point.z = initialPoints[i].z + Math.sin(t * 0.15 + i * 0.05) * 0.1 // Slowed down z variation
    }

    // Update the curve and geometry
    curve.updateArcLengths()

    // Update the geometry to match the new curve
    const newGeometry = new THREE.TubeGeometry(curve, 120, width, 8, false)
    meshRef.current.geometry.dispose()
    meshRef.current.geometry = newGeometry
  })

  // Adjust opacity based on index for visual variety
  const opacity = 0.5 + (index % 3) * 0.15 // Slightly reduced base opacity

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

export default function Hero() {
  const words = [
    { text: "Infrastructure" },
    { text: "Data Science" },
    { text: "Cloud Migrations" },
    { text: "Distributed Systems" },
    { text: "Microservices" },
    { text: "DevOps" },
    { text: "Automation" },
    { text: "Platform Engineering" },
    { text: "CI/CD" },
    { text: "Database Systems" },
    { text: "Web Applications" },
    { text: "API Integrations" },
  ]

  return (
    <section id="hero" className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="opacity-85">
          <ParallaxBalls />
          <FlowingLines />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} enablePan={false} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-[1] top-[380px] overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-100,250 C50,200 150,350 300,250 S450,150 600,200 S750,300 900,250 S1050,150 1200,200 S1350,300 1500,250 S1650,150 1800,200 S1950,300 2100,250 S2250,150 2400,200 S2550,300 2700,250 S2850,150 3000,200"
            fill="none"
            stroke="rgba(16, 185, 129, 0.2)"
            strokeWidth="15"
            className="animate-[wave_30s_linear_infinite]" // Adjusted duration example
          />
          <path
            d="M-100,350 C50,300 150,450 300,350 S450,250 600,300 S750,400 900,350 S1050,250 1200,300 S1350,400 1500,350 S1650,250 1800,300 S1950,400 2100,350 S2250,250 2400,300 S2550,400 2700,350 S2850,250 3000,300"
            fill="none"
            stroke="rgba(14, 165, 233, 0.15)"
            strokeWidth="12.5"
            className="animate-[wave_60s_linear_infinite]" // Adjusted duration example
          />
          <path
            d="M-100,150 C50,200 150,100 300,150 S450,200 600,150 S750,100 900,150 S1050,200 1200,150 S1350,100 1500,200 S1650,200 1800,150 S1950,100 2100,200 S2250,200 2400,150 S2550,100 2700,200 S2850,200 3000,150"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="10"
            className="animate-[wave_100s_linear_infinite]" // Adjusted duration example
          />
        </svg>
      </div>

      <div className="w-full z-10 backdrop-blur-sm bg-black/10 h-screen flex place-items-center">
        <div className="container mx-auto px-4 text-center py-8 md:py-12">
          <h1 className="text-8xl md:text-9xl lg:text-[180px] font-bold text-transparent text-shadow-lg bg-clip-text bg-gradient-to-br from-emerald-500 to-blue-500">
            INSYTE
          </h1>
          <h2 className="text-sm md:text-base lg:text-lg text-gray-300 mb-4 -mt-2 md:-mt3 lg:-mt-4">
            Solutions
          </h2>

          <div className="h-20 flex items-center justify-center mb-8">
            <TypewriterEffect words={words} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              <Link href="#contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-950 px-8 py-6 text-lg">
              <Link href="#services" className="flex items-center">
                Discover More <ArrowDown className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

