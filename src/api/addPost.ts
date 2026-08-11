import axios from "axios";
import type { Post } from "../types/posts";
import type { Login } from "../types/user";

async function addPostApi(
  user: Login,
  title: string,
  body: string,
): Promise<Post> {
  const response = await axios.post<Post>("https://dummyjson.com/posts/add", {
    title,
    body,
    userId: user.id,
  });
  return response.data;
}

export default addPostApi;
