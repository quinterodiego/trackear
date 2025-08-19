export function Footer() {
  return (
    <footer className="bg-trackear-gray-800 text-trackear-white">
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-trackear-primary">Trackear</h3>
            <p className="text-sm sm:text-base text-trackear-gray-300">
              Plataforma para seguimiento y gestión de cursos de manera eficiente.
            </p>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-trackear-primary">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm sm:text-base text-trackear-gray hover:text-trackear-primary transition-colors">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm sm:text-base text-trackear-gray hover:text-trackear-primary transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm sm:text-base text-trackear-gray hover:text-trackear-primary transition-colors">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
          
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-trackear-primary">Contacto</h3>
            <p className="text-sm sm:text-base text-trackear-gray">
              ¿Tienes preguntas? Contáctanos
            </p>
            <p className="text-sm sm:text-base text-trackear-gray mt-2">
              info@trackear.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-trackear-gray-dark mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-trackear-gray">
            © 2025 Trackear. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
