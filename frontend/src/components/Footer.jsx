import React from 'react'

export const Footer = () => {
  return (
    <div className='mt-auto'>
      <footer className="bg-white m-4">
        <div className="w-full max-w-screen-xl mx-auto p-2 md:py-2">
          <div className="flex flex-col items-center gap-2">
            {/* <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src="/brand.png" className="h-10" alt="Flowbite Logo" />
            </a> */}
            {/* <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul> */}
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" className="hover:underline">TRACKEAR</a>. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
