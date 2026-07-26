import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // SECURITY 🛡️: Authentication relies on HTTP-Only Cookies managed by the backend.
    // Client-side code should not handle or store sensitive tokens directly.
    // For demo purposes, we auto-login
    setTimeout(() => {
      setUser({
        id: 'usr_1',
        email: 'admin@unorouter.com',
        name: 'admin',
        role: 'admin'
      });
      setIsLoading(false);
    }, 400);
  }, []);

  const login = (token: string) => {
    // SECURITY 🛡️: Never store auth tokens in localStorage to prevent XSS attacks.
    // Instead, the backend should set an HTTP-Only cookie during the login response.
    // The client only needs to manage local user state.
    setUser({
      id: 'usr_1',
      email: 'admin@unorouter.com',
      name: 'admin',
      role: 'admin'
    });
  };

  const logout = () => {
    // SECURITY 🛡️: Backend should clear the HTTP-Only cookie on the logout endpoint.
    // The client only needs to clear local user state.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
