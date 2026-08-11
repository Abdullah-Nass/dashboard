import axios from "axios";
import type { PostsResponse } from "../types/posts";
import type { User } from "../types/user";

async function postsApi(user: User): Promise<PostsResponse> {
  const response = await axios.get<PostsResponse>(
    `https://dummyjson.com/users/${user.id}/posts`,
  );
  return response.data;
}

export default postsApi;
