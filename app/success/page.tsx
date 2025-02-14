"use client"
import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"

export default function Success() {
  const [mounted, setMounted] = useState(false)
  const [heartCount, setHeartCount] = useState(150)

  useEffect(() => {
    setMounted(true)

    // Función para actualizar el número de corazones según el tamaño de la pantalla
    const updateHeartCount = () => {
      const width = window.innerWidth
      if (width <= 600) {
        setHeartCount(10) // Para móviles
      } else if (width <= 1024) {
        setHeartCount(80) // Para tablets
      } else {
        setHeartCount(150) // Para computadoras
      }
    }

    // Llama a la función de actualización al cargar la página
    updateHeartCount()

    // Añadir el listener para cambios en el tamaño de la ventana
    window.addEventListener("resize", updateHeartCount)

    // Limpia el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", updateHeartCount)
  }, [])

  const fadeIn = useSpring({
    opacity: mounted ? 1 : 0,
    config: { tension: 100, friction: 10 },
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-pink-100">
      <animated.div style={fadeIn} className="text-center">
        <div className="text-6xl mb-8">
          {Array(heartCount)
            .fill("❤️")
            .map((heart, index) => (
              <span key={index} className="inline-block animate-pulse" style={{ animationDelay: `${index * 0.1}s` }}>
                {heart}
              </span>
            ))}
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Muñeca</h2>
          {/* <p className="text-xl text-gray-700">
          Desde el primer momento en que te vi, supe que había algo especial en ti. Hoy, más que nunca, quiero que este San Valentín sea a tu lado, 
            <br />
            porque no hay nadie más con quien prefiera compartir esta vida que no sea contigo 💖
          </p> */}
          <p className="text-base lg:text-3xl text-gray-700">
            Hay algo en tu mirada que enciende cada fibra de mi ser…<br />
            una chispa que me invita a descubrir cada secreto de tu piel,<br />
            perderme en el calor de tu aliento, en la urgencia de tu querer,<br />
            y escribir con mis labios en tu cuerpo lo mucho que te quiero tener.<br />
            <br />
            Quiero perderme en tus brazos, sin prisa, sin final,<br />
            ser la sombra que te sigue, en un abrazo inmortal.<br />
            Que el tiempo se detenga cuando tú me mires así,<br />
            y que el universo se disuelva, sólo tú y yo, aquí.<br />

          </p>
        </div>
      </animated.div>
    </main>
  )
}
