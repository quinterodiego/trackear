import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token-trackear") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // Podés decodificar el token o llamar al backend para obtener el usuario
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id, email: payload.email, name: payload.name });
    }
  }, [token]);

  const login = (jwt) => {
    localStorage.setItem("token-trackear", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token-trackear");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}