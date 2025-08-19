"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const navigation = [
  { name: 'Inicio', href: '/', current: false },
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Cursos', href: '/courses', current: false },
];

export function Navbar() {
  const { data: session } = useSession();

  return (
    <Disclosure as="nav" className="bg-trackear-white trackear-shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
        <div className="relative flex h-auto items-center justify-between py-2">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-trackear-gray hover:bg-trackear-gray-100 hover:text-trackear-gray-800 focus:ring-2 focus:ring-trackear-primary focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="hover:cursor-pointer flex items-center space-x-3 trackear-hover-lift">
                <div className="w-10 h-10 bg-trackear-gradient rounded-lg flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <circle cx="6" cy="8" r="3" fill="currentColor"/>
                    <circle cx="12" cy="14" r="2.5" fill="currentColor" opacity="0.9"/>
                    <circle cx="18" cy="20" r="2" fill="currentColor" opacity="0.8"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold text-trackear-gray-darkest">Trackear</span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:block m-auto w-full">
              <div className="flex space-x-4 justify-center">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-trackear-gray-dark hover:text-trackear-gray-darkest rounded-md px-3 py-2 text-xl font-normal transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {session ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden hover:cursor-pointer">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt={session.user?.name || "Usuario"}
                      src={session.user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Tu Perfil
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Cerrar sesión
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/signin"
                  className="bg-trackear-primary text-trackear-gray-darkest px-4 py-2 rounded-md bg-trackear-primary-hover transition-colors duration-200 font-medium trackear-shadow"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/signup"
                  className="border-2 border-trackear-primary-700 text-trackear-primary px-4 py-2 rounded-md hover:bg-trackear-primary-100 transition-colors duration-200 font-medium"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
