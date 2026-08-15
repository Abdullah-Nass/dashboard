import type { Login } from "./user";

export interface AuthContextType {
  user: Login;
  token: string | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
