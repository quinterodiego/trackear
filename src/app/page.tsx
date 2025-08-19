import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-trackear-white">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 bg-trackear-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-trackear-gradient rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 trackear-pulse trackear-shadow-lg">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-trackear-white sm:w-8 sm:h-8">
                  <circle cx="8" cy="10" r="4" fill="currentColor"/>
                  <circle cx="16" cy="18" r="3" fill="currentColor" opacity="0.9"/>
                  <circle cx="24" cy="26" r="2" fill="currentColor" opacity="0.8"/>
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-trackear-gray-darkest mb-0 trackear-text-shadow">
                Trackear
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-trackear-gray-dark mb-8 max-w-3xl mx-auto px-4">
              La plataforma definitiva para seguir el progreso de tus cursos y 
              mantener organizadas todas tus clases de manera eficiente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                href="/auth/signup"
                className="bg-trackear-primary text-trackear-gray-darkest px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-trackear-primary-600 transition duration-200 trackear-shadow-lg trackear-hover-lift text-center"
              >
                Comenzar Gratis
              </Link>
              <Link
                href="/auth/signin"
                className="border-2 border-trackear-primary-700 text-trackear-gray-darkest px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-trackear-primary-100 transition duration-200 text-center"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-trackear-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-trackear-gray-darkest mb-4">
              ¿Por qué elegir Trackear?
            </h2>
            <p className="text-lg sm:text-xl text-trackear-gray-dark max-w-2xl mx-auto px-4">
              Diseñado para estudiantes que quieren maximizar su aprendizaje y 
              mantener un seguimiento efectivo de su progreso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 trackear-hover-lift">
              <div className="w-14 h-14 sm:w-16 sm:h-16 trackear-accent-box rounded-full flex items-center justify-center mx-auto mb-4 trackear-shadow">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-trackear-gray-darkest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-trackear-gray-darkest mb-2">
                Seguimiento Visual
              </h3>
              <p className="text-sm sm:text-base text-trackear-gray-dark">
                Visualiza tu progreso con gráficos intuitivos y estadísticas detalladas 
                de cada curso.
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 trackear-hover-lift">
              <div className="w-14 h-14 sm:w-16 sm:h-16 trackear-accent-box rounded-full flex items-center justify-center mx-auto mb-4 trackear-shadow">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-trackear-gray-darkest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-trackear-gray-darkest mb-2">
                Organización Simple
              </h3>
              <p className="text-trackear-gray-dark">
                Organiza tus cursos y clases de manera eficiente con nuestra 
                interfaz intuitiva y fácil de usar.
              </p>
            </div>

            <div className="text-center p-6 trackear-hover-lift">
              <div className="w-16 h-16 trackear-accent-box rounded-full flex items-center justify-center mx-auto mb-4 trackear-shadow">
                <svg className="w-8 h-8 text-trackear-gray-darkest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-trackear-gray-darkest mb-2">
                Acceso Rápido
              </h3>
              <p className="text-trackear-gray-dark">
                Accede a tus cursos desde cualquier dispositivo, en cualquier momento 
                y lugar que necesites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-trackear-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-trackear-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-trackear-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya están mejorando su 
            aprendizaje con Trackear.
          </p>
          <Link
            href="/auth/signup"
            className="bg-trackear-primary text-trackear-gray-darkest px-8 py-3 rounded-lg text-lg font-semibold hover:bg-trackear-primary-600 transition duration-200 trackear-shadow-lg trackear-hover-lift"
          >
            Crear Cuenta Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
}
