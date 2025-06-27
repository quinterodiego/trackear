import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token-trackear") || "");
  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name,
        google: payload.google, // esto lo agrega el backend si viene de Google
      });
    } catch (error) {
      console.error("Token inválido:", error);
      logout(); // limpia estado si el token es inválido
    }
    }
  }, [token]);

  const login = (jwt, userData = null) => {
    localStorage.setItem("token-trackear", jwt);
    setToken(jwt);

    if(userData) {
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("token-trackear");
    setToken("");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}