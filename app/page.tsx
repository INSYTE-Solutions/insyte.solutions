"use client"

import { useEffect } from "react"
import { gsap } from 'gsap';
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ParticleBackground from '@/components/particle-background'

export default function Home() {

  useEffect(() => {
    const cursor = document.querySelector(".cursor-follow")
    if (cursor) {
      document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        })
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Mouse follower */}
      <div className="invisible lg:visible cursor-follow fixed w-4 h-4 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 opacity-50 mix-blend-screen pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
