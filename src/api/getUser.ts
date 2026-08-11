import axios from "axios";
import type { User } from "../types/user";

async function currentUserApi(token: string | null): Promise<User> {
  if (!token) throw new Error("No token");
  const response = await axios.get<User>("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default currentUserApi;
