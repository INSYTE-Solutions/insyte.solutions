"use client"

import type React from "react"

import { InsyteLogo } from "@/assets/logo"
import { useState, useEffect, forwardRef } from "react"
import { Database, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"


const NavBar = forwardRef<HTMLDivElement>(
  ({ scrollToHero, scrollToAbout, scrollToServices, scrollToExpertise, scrollToContact, logoRef }, ref) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
      { name: "Home", href: "#hero" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Projects", href: "#projects" },
    ]

    return (
      <>
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled ? "bg-gray-900/60 backdrop-blur-xl shadow-lg py-2" : "bg-transparent py-4"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div ref={logoRef} className="flex items-center cursor-pointer" onClick={scrollToHero}>
                <InsyteLogo className="h-6 w-6 text-teal-500 mr-2" />
                <span className="font-bold text-xl">INSYTE</span>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center">
                <Link
                  key="Contact"
                  href="#contact" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hidden md:inline-flex bg-gradient-to-r from-[#0e7270] to-[#468872] hover:from-[#258849] hover:to-[#60be7a] h-10 px-4 py-2 rounded-md">
                  Contact
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-gray-900/90 backdrop-blur-xl pt-20">
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl py-2 border-b border-gray-800 text-gray-300 hover:text-emerald-400 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </>
    )
  },
)

NavBar.displayName = "NavBar"

export default NavBar

