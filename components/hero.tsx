"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function TechModel() {
  return (
    <Float rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]} scale={1.5}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0ea5e9" wireframe emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]} scale={1.2}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0284c7" wireframe emissive="#0284c7" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#0369a1" wireframe emissive="#0369a1" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <TechModel />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="z-10 container mx-auto px-4 text-center relative">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          novammoth
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl mb-4 text-gray-400">
          consulting
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Building the digital infrastructure of tomorrow
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
            <Link href="#contact">Get in Touch</Link>
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-950 px-8 py-6 text-lg">
            <Link href="#services">Explore Services</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
