"use client"
import { useState, useEffect } from "react"
import { useSpring, animated } from "react-spring"

export default function CoupleAnimation({ onComplete }) {
  const [step, setStep] = useState(0)

  const boyAnimation = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: step >= 1 ? "translateX(0%)" : "translateX(-100%)" },
    config: { tension: 80, friction: 10 },
  })

  const girlAnimation = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: step >= 1 ? "translateX(0%)" : "translateX(100%)" },
    config: { tension: 80, friction: 10 },
  })

  const letterAnimation = useSpring({
    opacity: step >= 2 ? 1 : 0,
    transform: step >= 2 ? "scale(1)" : "scale(0)",
    config: { tension: 300, friction: 10 },
  })

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500)
    const timer2 = setTimeout(() => setStep(2), 2000)
    const timer3 = setTimeout(onComplete, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className="relative w-80 h-60">
      <animated.svg
        style={boyAnimation}
        className="absolute left-0 bottom-0"
        width="100"
        height="150"
        viewBox="0 0 100 150"
      >
        <circle cx="50" cy="30" r="20" fill="#87CEEB" /> {/* Head */}
        <rect x="40" y="50" width="20" height="60" fill="#1E90FF" /> {/* Body */}
        <rect x="35" y="110" width="10" height="30" fill="#000080" /> {/* Left leg */}
        <rect x="55" y="110" width="10" height="30" fill="#000080" /> {/* Right leg */}
      </animated.svg>
      <animated.svg
        style={girlAnimation}
        className="absolute right-0 bottom-0"
        width="100"
        height="150"
        viewBox="0 0 100 150"
      >
        <circle cx="50" cy="30" r="20" fill="#FFB6C1" /> {/* Head */}
        <polygon points="30,50 70,50 60,110 40,110" fill="#FF69B4" /> {/* Dress */}
        <rect x="40" y="110" width="8" height="30" fill="#FF1493" /> {/* Left leg */}
        <rect x="52" y="110" width="8" height="30" fill="#FF1493" /> {/* Right leg */}
      </animated.svg>
      <animated.svg
        style={letterAnimation}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        width="40"
        height="30"
        viewBox="0 0 40 30"
      >
        <rect x="0" y="0" width="40" height="30" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        <line x1="0" y1="0" x2="20" y2="15" stroke="#000000" strokeWidth="1" />
        <line x1="40" y1="0" x2="20" y2="15" stroke="#000000" strokeWidth="1" />
      </animated.svg>
    </div>
  )
}

