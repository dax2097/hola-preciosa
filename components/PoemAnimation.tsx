"use client"
import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"


const poem = ["Roses are red,", "Violets are blue,", "Sugar is sweet,", "And so are you!"]

export default function PoemAnimation({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0)

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: { tension: 100, friction: 10 },
  })

  useEffect(() => {
    if (currentLine < poem.length) {
      const timer = setTimeout(() => setCurrentLine(currentLine + 1), 1500)
      return () => clearTimeout(timer)
    } else {
      setTimeout(onComplete, 1000)
    }
  }, [currentLine, onComplete])

  return (
    <div className="text-center">
      {poem.slice(0, currentLine).map((line, index) => (
        <animated.p key={index} style={fadeIn} className="text-2xl text-red-600 mb-2">
          {line}
        </animated.p>
      ))}
    </div>
  )
}

