"use client"
import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Gato1 from "@/public/img/Gato1.jpg"
import Gato2 from "@/public/img/Gato2.jpg"
import Gato3 from "@/public/img/Gato3.jpg"
import Gato4 from "@/public/img/Gato4.jpg"
import Gato5 from "@/public/img/Gato5.jpg"
import Gato6 from "@/public/img/Gato6.jpg"
import Gato7 from "@/public/img/Gato7.jpg"
import Gato8 from "@/public/img/Gato8.jpg"
import Gato9 from "@/public/img/Gato9.jpg"
import Gato10 from "@/public/img/Gato10.jpg"
import Gato11 from "@/public/img/Gato11.jpg"
import Senor from "@/public/img/senor.jpg"

export default function ValentineQuestion() {
  const [noCount, setNoCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const sadCatImages = [
    Gato1,
    Gato2, 
    Gato3,
    Gato4,
    Gato5, 
    Gato6,
    Gato7,
    Gato8, 
    Gato9,
    Gato10,
    Gato11
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
        src={Senor} // Cambia esta ruta a la imagen deseada
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
