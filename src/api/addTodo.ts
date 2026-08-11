import axios from "axios";
import type { Login } from "../types/user";
import type { Todo } from "../types/todos";

async function addTodoApi(user: Login, todo: string): Promise<Todo> {
  const response = await axios.post<Todo>("https://dummyjson.com/todos/add", {
    todo,
    completed: false,
    userId: user.id,
  });
  return response.data;
}

export default addTodoApi;
