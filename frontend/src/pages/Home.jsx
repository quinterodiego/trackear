import { About } from "./About"
import Contact from "./Contact"

export const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-172 bg-background">
        <h1 className="text-7xl font-bold mb-12 text-gray-600 text-center">Organizá tu aprendizaje <br />como un profesional</h1>
        <p className="text-3xl text-gray-700 mb-12 px-102 text-center">Trackear es la app que te permite llevar el control de tus cursos, marcar avances y visualizar tu progreso con gráficos.</p>
        <a href="/register" className="text-xl font-bold px-6 py-3 bg-tertiary text-white rounded-md hover:primary-hover transition duration-300">
          Empezar ahora
        </a>
      </div>
      <About />
      <Contact />
    </>
  )
}
