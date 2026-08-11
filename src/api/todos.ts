import axios from "axios";
import type { User } from "../types/user";
import type { TodosResponse } from "../types/todos";

async function todosApi(user: User): Promise<TodosResponse> {
  const response = await axios.get<TodosResponse>(
    `https://dummyjson.com/todos/user/${user.id}`,
  );
  return response.data;
}

export default todosApi;
