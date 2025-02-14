"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSpring, animated } from "react-spring"

export default function PoemPage() {
  const [currentLine, setCurrentLine] = useState(0)
  const [devName, setDevName] = useState("")
  const router = useRouter()

  // Diccionario con los identificadores y los nombres
  const nameSlug = {
    "1938-AH-1": "Ma Chérie ❤️",
    // Agregar más identificadores y nombres si es necesario
  }

  const poem = [
    "Hoy en San Valentín te quiero decir",
    "Que contigo siempre quiero estar aquí",
    "Tu amor me hace soñar sin fin",
    "Y mi vida contigo tiene mucho por vivir"
  ]

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const devId = urlParams.get("dev") // Obtenemos el query param dev de la URL
    console.log(devId)
    // Si el devId existe, buscamos el nombre en el diccionario
    if (devId && nameSlug[devId]) {
      setDevName(nameSlug[devId])  // Asignamos el nombre correspondiente
    } else {
      setDevName("")  // Si no existe, se deja en blanco
    }
  }, [])

  useEffect(() => {
    if (currentLine < poem.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        router.push("/question")
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [currentLine, router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-red-100 p-4">
      <animated.div style={fadeIn} className="text-center space-y-4">
        {/* Primera línea con nombre dinámico */}
        <h2 className="text-3xl md:text-5xl font-medium text-red-600 mb-4">
          {devName ? `${devName}` : "Ma Chérie ❤️"}
        </h2>

        {/* Líneas del poema */}
        {poem.slice(0, currentLine).map((line, index) => (
          <p
            key={index}
            className="text-2xl md:text-3xl text-red-600 font-light italic"
            style={{
              animation: "fadeInUp 0.5s ease-out",
              animationFillMode: "both",
              animationDelay: `${index * 0.5}s`,
            }}
          >
            {line}
          </p>
        ))}
      </animated.div>
    </main>
  )
}
