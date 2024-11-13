"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces/User";
import api from "@/api/api";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Busca o perfil do usuário usando o token
          const userData = await api.getProfileFromToken(token);
          // Verifica se o token é válido
          if (userData) {
            setUser(userData);
            router.push("/dashboard");
          } else {
            logout();
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          logout(); // Logout em caso de erro
        }
      } else {
        setLoading(false);
        router.push("/auth/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);

      // Armazenar o token no localStorage
      localStorage.setItem("token", data.access_token);

      // Buscar dados do usuário
      const userData = await api.getProfileFromToken(data.access_token);
      setUser(userData);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await api.register(name, email, password);
    localStorage.setItem("token", data.access_token);
    setUser(data.user);
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
