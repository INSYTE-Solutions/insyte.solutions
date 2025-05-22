"use client"

import { useEffect, useRef } from "react"

export default function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const numPoints = 12;
    const fluidPoints: {
      x: number;
      y: number;
      baseY: number;
      amplitude: number;
      frequency: number; // This is defined but not used in y-update for fluidPoints
      phase: number;
    }[] = [];

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Update fluidPoints positions and baseY
      // Ensure fluidPoints and numPoints are accessible here
      for (let i = 0; i < fluidPoints.length; i++) {
        const point = fluidPoints[i];
        point.x = (canvas.width / (numPoints - 1)) * i;
        point.baseY = canvas.height / 2;
      }
    };

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Data points
    const dataPoints: { x: number; y: number; size: number; speed: number; color: string }[] = []

    // // Generate random data points
    // for (let i = 0; i < 50; i++) {
    //   dataPoints.push({
    //     x: Math.random() * canvas.width,
    //     y: Math.random() * canvas.height,
    //     size: Math.random() * 3 + 1,
    //     speed: Math.random() * 1 + 0.2,
    //     color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
    //       Math.random() * 200 + 55,
    //     )}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.2})`,
    //   })
    // }
    //
    // Draw grid lines
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(50, 130, 200, 0.1)"
      ctx.lineWidth = 0.5

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    // Simple noise function (pseudo-perlin)
    const noise = (x: number, y: number) => {
      const X = Math.floor(x)
      const Y = Math.floor(y)

      // Simple hash function
      return (Math.sin(X * 12.9898 + Y * 78.233) * 43758.5453) % 1
    }

    // Smooth noise function
    const smoothNoise = (x: number, y: number) => {
      const corners = (noise(x - 1, y - 1) + noise(x + 1, y - 1) + noise(x - 1, y + 1) + noise(x + 1, y + 1)) / 16
      const sides = (noise(x - 1, y) + noise(x + 1, y) + noise(x, y - 1) + noise(x, y + 1)) / 8
      const center = noise(x, y) / 4
      return corners + sides + center
    }

    // Interpolated noise
    const interpolatedNoise = (x: number, y: number) => {
      const intX = Math.floor(x)
      const fracX = x - intX
      const intY = Math.floor(y)
      const fracY = y - intY

      const v1 = smoothNoise(intX, intY)
      const v2 = smoothNoise(intX + 1, intY)
      const v3 = smoothNoise(intX, intY + 1)
      const v4 = smoothNoise(intX + 1, intY + 1)

      // Cubic interpolation
      const i1 = cubicInterpolate(v1, v2, fracX)
      const i2 = cubicInterpolate(v3, v4, fracX)

      return cubicInterpolate(i1, i2, fracY)
    }

    // Cubic interpolation for smoother curves
    const cubicInterpolate = (a: number, b: number, x: number) => {
      const ft = x * Math.PI
      const f = (1 - Math.cos(ft)) * 0.5
      return a * (1 - f) + b * f
    }

    // Create fluid wave points for teal line
      []

    for (let i = 0; i < numPoints; i++) {
      fluidPoints.push({
        x: (canvas.width / (numPoints - 1)) * i,
        y: canvas.height / 2,
        baseY: canvas.height / 2,
        amplitude: Math.random() * 15 + 10,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Draw data visualization
    const drawDataVisualization = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      drawGrid()

      // Draw data points and connections
      for (let i = 0; i < dataPoints.length; i++) {
        const point = dataPoints[i]

        // Move points
        point.y += point.speed
        if (point.y > canvas.height) {
          point.y = 0
        }

        // Draw point
        ctx.fillStyle = point.color
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect nearby points
        for (let j = i + 1; j < dataPoints.length; j++) {
          const otherPoint = dataPoints[j]
          const dx = point.x - otherPoint.x
          const dy = point.y - otherPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.stroke()
          }
        }
      }

      const time = Date.now() / 1000

      // Update fluid points for teal line
      for (let i = 0; i < fluidPoints.length; i++) {
        const point = fluidPoints[i]

        // Create a fluid, almost liquid-like motion
        const timeOffset = i * 0.2
        const primaryWave = Math.sin(time * 0.8 + point.phase) * point.amplitude
        const secondaryWave = Math.sin(time * 1.2 + point.phase * 2) * (point.amplitude * 0.5)
        const tertiaryWave = Math.sin(time * 0.3 + point.phase * 0.5) * (point.amplitude * 0.7)

        const noiseX = i + time * 0.1;
        const noiseY = time * 0.2;
        const randomFactor = interpolatedNoise(noiseX, noiseY) * 10; // Adjust multiplier as needed

        // Combine all factors
        point.y = point.baseY + primaryWave + secondaryWave + tertiaryWave + randomFactor
      }

      // Draw teal line with fluid motion using Catmull-Rom spline for smoothness
      const drawTealLine = (lineWidth: number, alpha: number) => {
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.beginPath()

        // Draw a smooth curve through the fluid points using Catmull-Rom spline
        const drawCatmullRomSpline = () => {
          const points = fluidPoints

          // Function to calculate Catmull-Rom spline point
          const catmullRom = (p0: number, p1: number, p2: number, p3: number, t: number) => {
            const v0 = (p2 - p0) * 0.5
            const v1 = (p3 - p1) * 0.5
            const t2 = t * t
            const t3 = t * t * t
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
          }

          // Start the path
          ctx.moveTo(points[0].x, points[0].y)

          // Draw segments with high resolution for smoothness
          for (let i = 0; i < points.length - 1; i++) {
            const p0 = i > 0 ? points[i - 1] : points[0]
            const p1 = points[i]
            const p2 = points[i + 1]
            const p3 = i < points.length - 2 ? points[i + 2] : p2

            // Draw multiple segments between each pair of control points
            const segments = 20
            for (let t = 1; t <= segments; t++) {
              const t1 = t / segments
              const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t1)
              const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t1)
              ctx.lineTo(x, y)
            }
          }
        }

        drawCatmullRomSpline()
        ctx.stroke()
      }

      // Draw teal line with glow effect
      drawTealLine(4, 0.3) // Outer glow
      drawTealLine(3, 0.5) // Middle glow
      drawTealLine(2, 0.3) // Core line

      requestAnimationFrame(drawDataVisualization)
    }

    drawDataVisualization()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
