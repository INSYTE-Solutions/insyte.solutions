"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex].text

    const timeout = setTimeout(
      () => {
        // If deleting, remove a character
        if (isDeleting) {
          setCurrentText((prev) => prev.substring(0, prev.length - 1))

          // If all characters are deleted, move to typing mode and next word
          if (currentText === "") {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
        // If typing, add a character
        else {
          setCurrentText(word.substring(0, currentText.length + 1))

          // If word is complete, wait and then start deleting
          if (currentText === word) {
            setTimeout(() => {
              setIsDeleting(true)
            }, 2000) // Wait time before deleting
          }
        }
      },
      isDeleting ? 50 : 100,
    ) // Typing is slower than deleting

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words])

  return (
    <div className={cn("flex items-center text-xl md:text-2xl lg:text-3xl font-bold", className)}>
      <span className="text-gray-300">Specializing in&nbsp;</span>
      <span className="text-[#0071bd]">{currentText}</span>
      <span className={cn("ml-1 animate-pulse text-[#003c63]", cursorClassName)}>|</span>
    </div>
  )
}
