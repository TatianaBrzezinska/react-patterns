import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  createContext,
} from "react";

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:3001";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("userId");
    setUser(null);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data);
      } catch {
        setError("Failed to fetch user data");
        localStorage.removeItem("userId");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
    }),
    [user, loading, error, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
