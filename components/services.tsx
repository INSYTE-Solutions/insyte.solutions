"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, Database, LineChart, Cog } from "lucide-react"

const capabilities = [
  "Infrastructure Development",
  "Data Science Solutions",
  "Automation Engineering",
  "Platform Architecture",
  "Cloud Optimization",
  "DevOps Implementation",
  "Machine Learning Integration",
  "Data Pipeline Construction",
]

export default function Services() {
  const [typedText, setTypedText] = useState("")
  const [currentCapabilityIndex, setCurrentCapabilityIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    const currentCapability = capabilities[currentCapabilityIndex]

    const typeWriter = () => {
      if (!isDeleting && typedText === currentCapability) {
        // Pause at the end of typing
        setTypingSpeed(2000)
        setIsDeleting(true)
        return
      } else if (isDeleting && typedText === "") {
        // Move to the next capability
        setIsDeleting(false)
        setCurrentCapabilityIndex((prev) => (prev + 1) % capabilities.length)
        setTypingSpeed(100)
        return
      }

      // Set typing speed
      setTypingSpeed(isDeleting ? 50 : 100)

      // Update typed text
      setTypedText((prev) => {
        if (isDeleting) {
          return prev.substring(0, prev.length - 1)
        } else {
          return currentCapability.substring(0, prev.length + 1)
        }
      })
    }

    const timer = setTimeout(typeWriter, typingSpeed)
    return () => clearTimeout(timer)
  }, [typedText, currentCapabilityIndex, isDeleting, typingSpeed])

  const services = [
    {
      icon: <Database className="h-10 w-10" />,
      title: "Infrastructure",
      description:
        "Design and implementation of scalable, resilient infrastructure solutions using modern cloud technologies and best practices.",
    },
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Data Science",
      description:
        "Transform raw data into actionable insights through advanced analytics, machine learning, and data visualization techniques.",
    },
    {
      icon: <Cog className="h-10 w-10" />,
      title: "Automation",
      description:
        "Streamline operations with custom automation solutions that reduce manual effort, minimize errors, and increase productivity.",
    },
    {
      icon: <Code className="h-10 w-10" />,
      title: "Platform Engineering",
      description:
        "Build and optimize internal developer platforms that enhance productivity, standardize workflows, and improve delivery speed.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Services</span>
        </h2>

        <div className="flex justify-center mb-16">
          <div className="h-16 flex items-center">
            <h3 className="text-xl md:text-2xl font-medium">
              Specializing in{" "}
              <span className="text-blue-400 font-bold inline-block min-w-[20ch] border-r-2 border-blue-400">
                {typedText}
                <span className="animate-blink">|</span>
              </span>
            </h3>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-lg border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20"
            >
              <div className="text-blue-400 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
