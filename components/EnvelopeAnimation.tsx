"use client"
import { useState, useEffect } from "react"
import { useSpring, animated, config } from "@react-spring/web"


const emojis = ["🌹", "❤️", "😍", "💌", "💘"]

function FallingEmoji({ emoji, delay }) {
  const { transform, opacity } = useSpring({
    from: { transform: "translate3d(0,-50px,0)", opacity: 0 },
    to: { transform: "translate3d(100vw,100vh,0)", opacity: 1 },
    config: { duration: 6000 }, // Increased duration
    delay: delay,
    loop: true,
  })

  return (
    <animated.div
      style={{
        position: "absolute",
        transform,
        opacity,
        fontSize: "36px", // Increased size
      }}
    >
      {emoji}
    </animated.div>
  )
}

export default function EnvelopeAnimation({ onComplete }) {
  const [showLetter, setShowLetter] = useState(false)

  const letterAnimation = useSpring({
    transform: showLetter ? "scale(20)" : "scale(1)",
    opacity: showLetter ? 0 : 1,
    config: config.gentle,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLetter(true)
    }, 6000) // Increased delay

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 7500) // Increased total duration

    return () => {
      clearTimeout(timer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-pink-100">
      {Array.from({ length: 20 }).map((_, index) => (
        <FallingEmoji key={index} emoji={emojis[index % emojis.length]} delay={index * 300} />
      ))}
      <animated.div
        style={{
          ...letterAnimation,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: letterAnimation.transform.to((t) => `${t} translate(-50%, -50%)`),
          fontSize: "48px", // Increased size
        }}
      >
        💌
      </animated.div>
    </div>
  )
}

