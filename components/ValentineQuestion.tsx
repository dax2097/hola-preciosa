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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaVRswdLPCBrEq50f6a0pWA9IKI2arq5ynw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuEhUKga54cJfc9Nr25Z5B6mmK0vsW60NsQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGR7uk9vIYTelAfQxC6RaQq_FRePoW5ISzjg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjcVDes0h4pdADtiyHMvJ68usdPqfX9NmcQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0QLBk7y1OwBrEx21EZ_cnio-ArfYAATbQBg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvjAh5Pdt-pBosz6twf1oC_EyTZfPEJTRVGwaWvqiqEhJdGa-MFsq70yLlEtmbG9MaWks&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn1yDmmKGUlr3Xh6yuPe1gq6Y7PkBQ_VyJjQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIAsNn7c7bCLRZKl7VywmepvR176xH8xeQGQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOebxQ2JWhJgfiu_myFHjerSgejGOhrXP4g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROwOunnsDc2c-EFtIHpAvFFs40_Fu0Ach2A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgwcmsnuQJ08KxnFQE8H7iCJat30QLrWXR-A&s",
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
        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRg2V2yJUBjmrcZFQaXeUINZ1HPKJmOiT5Gg&s"} // Cambia esta ruta a la imagen deseada
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
