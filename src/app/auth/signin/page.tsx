"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        action: "login",
        redirect: false,
      });

      if (result?.error) {
        alert("Error al iniciar sesión: " + result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-trackear-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-trackear-gray-darkest">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-trackear-gray-dark">
            O{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-trackear-primary hover:text-trackear-primary-dark transition-colors"
            >
              crea una cuenta nueva
            </Link>
          </p>
        </div>

        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-1">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-3 sm:py-2 border border-trackear-gray-light placeholder-trackear-gray text-trackear-gray-darkest rounded-t-md focus:outline-none focus:ring-trackear-primary focus:border-trackear-primary focus:z-10 text-sm sm:text-base"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-3 sm:py-2 border border-trackear-gray-light placeholder-trackear-gray text-trackear-gray-darkest rounded-b-md focus:outline-none focus:ring-trackear-primary focus:border-trackear-primary focus:z-10 text-sm sm:text-base"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 sm:py-2 px-4 border border-transparent text-sm font-medium rounded-md text-trackear-gray-darkest bg-trackear-primary hover:bg-trackear-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trackear-primary disabled:opacity-50 transition-colors"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-trackear-gray-light" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-trackear-white text-trackear-gray">O</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full inline-flex justify-center py-2 px-4 border border-trackear-gray-light rounded-md shadow-sm bg-white text-sm font-medium text-trackear-gray hover:bg-trackear-gray-light hover:text-trackear-gray-darkest transition-colors"
              >
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Continuar con Google</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
