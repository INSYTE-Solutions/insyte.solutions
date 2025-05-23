"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    bottle: "",
  })

  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const payload = {
      ...formData,
      shared_key: "vRKqg6gyGcW8rxg9"
    }

    try {
      const res = await fetch("https://contact.insyte.solutions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Request failed")

      setStatus("success")
      setFormData({ name: "", email: "", message: "", bot_field: "" })
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-20 bg-black/10 backdrop-blur-[1px]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0e7270] to-[#468872]">Get in Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-gray-300 mb-8">
              Ready to transform your technical infrastructure or need consultation on your next big project? Reach out
              and let's discuss how we can work together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-[#329d8b] mr-4" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg">info@insyte.solutions</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-[#329d8b] mr-4" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-lg">Johannesburg, South Africa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-[#0e7270]/30">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div style={{ display: "none" }}>
                <label htmlFor="bot_field">Leave this field empty</label>
                <input
                  type="text"
                  name="bot_field"
                  id="bot_field"
                  value={formData.bot_field}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  rows={5}
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <Button type="submit" className="w-full bg-[#0e7270] hover:bg-[#258849]">
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
