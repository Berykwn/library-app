import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  notifications: {
    id: number;
    message: string;
    type: "success" | "error" | "info";
  }[];
  addNotification: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;
  clearNotifications: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [notifications, setNotifications] = useState<
    { id: number; message: string; type: "success" | "error" | "info" }[]
  >([]);

  const addNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    const newNotification = { id: Date.now(), message, type };
    setNotifications([...notifications, newNotification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const saveToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      addNotification("Logged in successfully", "success");
    } else {
      localStorage.removeItem("token");
      addNotification("Logged out successfully", "info");
    }
    setToken(newToken);
  };

  const logout = () => {
    saveToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: saveToken,
        logout,
        notifications,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
