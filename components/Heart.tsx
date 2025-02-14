"use client"

import { useState, useEffect } from "react"

export default function Heart() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`heart ${isVisible ? "visible" : "invisible"}`}>
      <style jsx>{`
        .heart {
          font-size: 100px;
          color: red;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      ❤️
    </div>
  )
}

