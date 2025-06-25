import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function Contact() {
  return (
    <form>
      <div className="flex flex-col items-center justify-center h-156 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4 text-gray-600 text-center">Contacto</h2>
        <p className="text-lg text-gray-700 mb-8 px-64 text-center">Dejanos tu mensaje o comentario y nos pondremos en contacto con vos a la brevedad.</p>

          <div className="mt-10 flex w-full max-w-2xl flex-col gap-6">
            <div className="sm:col-span-full">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-tertiary sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-tertiary sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Mensaje
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-tertiary sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
        <button className='bg-tertiary hover:bg-tertiary-hover hover:cursor-pointer text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition mt-6'>
          Enviar
        </button>
      </div>
    </form>
  )
}
