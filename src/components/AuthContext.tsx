import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";

export interface User {
  username: string;
  role: "admin" | "provider" | "customer";
  token: string
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
        const saved = localStorage.getItem("user");
        if(!saved) return null
        return JSON.parse(saved) as User;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
    
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
