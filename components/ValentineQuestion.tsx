"use client"
import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ValentineQuestion() {
  const [noCount, setNoCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const sadCatImages = [
    "/img/Gato1.jpg",
    "/img/Gato2.jpg",
    "/img/Gato3.jpg",
    "/img/Gato4.jpg",
    "/img/Gato5.jpg",
    "/img/Gato6.jpg",
    "/img/Gato7.jpg",
    "/img/Gato8.jpg",
    "/img/Gato9.jpg",
    "/img/Gato10.jpg",
    "/img/Gato11.jpg",
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const fadeIn = useSpring({
    opacity: mounted ? 1 : 0,
    config: { duration: 500 },
  })

  const handleYes = () => {
    router.push("/success")
  }

  const handleNo = () => {
    setNoCount((prev) => prev + 1)
  }

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Por favor",
      "¿Estás segura?",
      "¿Segurota?",
      "Te dejo pensarlo...",
      "Piénsalo otra vez",
      "Otra",
      "F",
      "Me wa matar",
      "Ya no tengo gatos :(",
      "Pícale al sí, mami",
    ]
    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  return (
    <animated.div style={fadeIn} className="text-center flex flex-col items-center">
      {/* Imagen superior antes de la pregunta */}
      <Image
      hidden={noCount > 0}
        src="/img/senor.jpg" // Cambia esta ruta a la imagen deseada
        alt="Love Banner"
        width={400}
        height={200}
        className="mb-4 rounded-lg shadow-lg"
      />

      {/* Imagen del gato triste */}
      {noCount > 0 && (
        <Image
          src={sadCatImages[Math.min(noCount, sadCatImages.length - 1)]}
          alt="Sad cat"
          width={300}
          height={300}
          className="mb-4 rounded-lg shadow-lg"
        />
      )}

      <h2 className="text-3xl font-bold text-red-600 mb-8">¿Quieres ser mi Chiquistrikis?</h2>

      <div className="space-x-4 flex">
        <button
          onClick={handleYes}
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all ${
            noCount >= sadCatImages.length - 1 ? "shadow-[0px_0px_20px_5px_rgba(255,215,0,0.8)]" : ""
          }`}
        >
          Sí
        </button>
        <button
          onClick={handleNo}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          style={{ fontSize: `${Math.min(1.5, 1 + noCount * 0.05)}rem` }}
        >
          {getNoButtonText()}
        </button>
      </div>
    </animated.div>
  )
}
