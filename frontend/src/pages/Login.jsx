import { useState, useEffect  } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useLocation  } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token-trackear");
    if (token) {
      login(token);
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="/brand.png"
            className="mx-auto h-24 w-auto"
          /> */}
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-600">
            Ingresá a tu cuenta
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-secondary hover:text-primary-hover">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
              >
                Ingresar
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm/6 text-gray-600">
            ¿No tenés cuenta?{' '}
            <a href="/register" className="font-semibold text-secondary hover:text-primary-hover">
              Registrate
            </a>
          </p>
          <div className="text-center mt-4 w-full">
            <hr className="my-4 border-primary" />
            <button
              onClick={handleGoogleLogin}
              className="bg-white border border-primary text-gray-600 mt-2 py-2 px-4 rounded hover:bg-gray-100 w-full hover:cursor-pointer hover:text-primary-hover font-bold"
            >
              Iniciar sesión con Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}