import { useEffect, useState } from "react";
import { type Login } from "../types/user";
import loginApi from "../api/auth";
import { AuthContext } from "./AuthContext";
function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<Login | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser && JSON.parse(savedUser);
  });
  const isAuthenticated = !!token;
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
  };
  const loginUser = async (
    username: string,
    password: string,
  ): Promise<void> => {
    try {
      const data = await loginApi(username, password);
      setUser(data);
      setToken(data.accessToken);
    } catch {
      throw new Error("Invalid username or password");
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
