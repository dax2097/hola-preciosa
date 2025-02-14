"use client"
import { useState, useEffect } from "react"
import { useSpring, animated } from "react-spring"

export default function LetterAnimation({ onComplete }) {
  const [step, setStep] = useState(0)

  const envelopeAnimation = useSpring({
    transform: step >= 1 ? "rotateY(180deg)" : "rotateY(0deg)",
    config: { tension: 80, friction: 10 },
  })

  const letterAnimation = useSpring({
    top: step >= 2 ? "-80%" : "10%",
    config: { tension: 50, friction: 10 },
  })

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000)
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
      <animated.div style={envelopeAnimation} className="absolute inset-0">
        <svg width="320" height="240" viewBox="0 0 320 240">
          {/* Envelope back */}
          <rect x="10" y="10" width="300" height="220" fill="#f4d03f" stroke="#e67e22" strokeWidth="2" />

          {/* Envelope flap */}
          <path d="M10 10 L160 120 L310 10" fill="#f1c40f" stroke="#e67e22" strokeWidth="2" />

          {/* Envelope bottom */}
          <path d="M10 230 L160 140 L310 230" fill="#f39c12" stroke="#e67e22" strokeWidth="2" />
        </svg>
      </animated.div>

      <animated.div style={letterAnimation} className="absolute left-1/2 transform -translate-x-1/2 w-3/4 h-full">
        <svg width="240" height="240" viewBox="0 0 240 240">
          {/* Letter page */}
          <rect x="0" y="0" width="240" height="240" fill="#ffffff" stroke="#34495e" strokeWidth="2" />

          {/* Letter lines */}
          {[40, 80, 120, 160, 200].map((y, index) => (
            <line key={index} x1="20" y1={y} x2="220" y2={y} stroke="#bdc3c7" strokeWidth="1" />
          ))}
        </svg>
      </animated.div>
    </div>
  )
}

