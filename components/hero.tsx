"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { TypewriterEffect } from "./typewriter-effect"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import * as THREE from "three"
import Link from "next/link"
import FlowingLinesAnimation from "./flowing-lines-animation"
import { InsyteLogoWithName, SVGLogo, SVGName } from "@/assets/logo"

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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMouseMove(event) {
      // Calculate normalized coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1); // invert y for Three.js coords
      setMouse({ x, y });
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section id="hero" className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full z-10 backdrop-blur-xs bg-black/10 h-screen flex place-items-center">
        <div className="container mx-auto px-4 text-center py-8 md:py-12">
          <div className="flex flex-col items-center mb-8">
            <SVGLogo className="w-[180px] mb-4" />
            <SVGName className="w-[200px] mb-4" />
          </div>

          <div className="h-20 flex items-center justify-center mb-8">
            <TypewriterEffect words={words} />
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4"> */}
          {/*   <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"> */}
          {/*     <Link href="#contact">Get in Touch</Link> */}
          {/*   </Button> */}
          {/*   <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-950 px-8 py-6 text-lg"> */}
          {/*     <Link href="#services" className="flex items-center"> */}
          {/*       Discover More <ArrowDown className="ml-2 h-4 w-4" /></Link> */}
          {/*   </Button> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  )
}

