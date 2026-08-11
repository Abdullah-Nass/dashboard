import axios from "axios";
import type { Login } from "../types/user";

async function loginApi(username: string, password: string): Promise<Login> {
  const response = await axios.post<Login>("https://dummyjson.com/auth/login", {
    username,
    password,
    expiresInMins: 30,
  });
  return response.data;
}

export default loginApi;
