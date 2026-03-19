import React, { createContext, useContext, useState, useCallback } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  membership: {
    id: string;
    plan: string;
    status: "active" | "expired";
    startDate: string;
    expiryDate: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string; phone: string }) => Promise<void>;
  logout: () => void;
}

const mockUser: User = {
  id: "usr_001",
  name: "Ahmed Mostafa",
  email: "ahmed.mostafa@mizgym.com",
  phone: "+20 10 215 8743",
  membership: {
    id: "MIZ-2026-0847",
    plan: "Premium Monthly",
    status: "active",
    startDate: "2026-01-15",
    expiryDate: "2026-04-15",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (_email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 1000));
    setUser(mockUser);
  }, []);

  const signup = useCallback(async (_data: { name: string; email: string; password: string; phone: string }) => {
    await new Promise((r) => setTimeout(r, 1000));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}