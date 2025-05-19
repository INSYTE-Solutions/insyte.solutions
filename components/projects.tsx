"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Cloud Migration Platform",
    description:
      "Developed a comprehensive platform for migrating legacy systems to cloud infrastructure, reducing operational costs by 40%.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["AWS", "Terraform", "Docker", "Kubernetes"],
  },
  {
    title: "Predictive Analytics Dashboard",
    description:
      "Built an advanced analytics dashboard for a financial services company to predict market trends and optimize investment strategies.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Python", "TensorFlow", "React", "D3.js"],
  },
  {
    title: "Automated CI/CD Pipeline",
    description:
      "Designed and implemented a fully automated CI/CD pipeline for a SaaS company, reducing deployment time from days to minutes.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Jenkins", "GitHub Actions", "Ansible", "ArgoCD"],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-950/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Featured Projects
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg overflow-hidden border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20"
            >
              <div className="relative h-48">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="bg-blue-950/30 text-blue-300 border-blue-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="text-blue-400 border-blue-800 hover:bg-blue-950">
                  Case Study <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
