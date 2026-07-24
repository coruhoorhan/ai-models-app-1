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
    // Check local storage for token on mount
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
    localStorage.setItem('unorouter_token', token);
    setUser({
      id: 'usr_1',
      email: 'admin@unorouter.com',
      name: 'admin',
      role: 'admin'
    });
  };

  const logout = () => {
    localStorage.removeItem('unorouter_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
