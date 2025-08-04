"use client"

import { useState, useEffect } from "react"
import { Clock, Radio } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="h-15 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-2 flex-shrink-0">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <Image 
            src="../assets/ssi-logo-bw.svg" 
            alt="Stanford SSI Logo" 
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <h1 className="text-xl font-semibold text-gray-900">Stanford SSI Mission Control</h1>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">System Nominal</span>
        </div>

        <div className="flex items-center space-x-2">
          <Radio className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">GS-001 Connected</span>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-mono text-gray-900">
            {currentTime ? currentTime.toISOString().substring(11, 19) : "--:--:--"} UTC
          </span>
        </div>
      </div>
    </header>
  )
}