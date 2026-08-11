import axios from "axios";
import type { Todo } from "../types/todos";

async function updateTodo(todoId: number, completed: boolean): Promise<Todo> {
  const response = await axios.put<Todo>(
    `https://dummyjson.com/todos/${todoId}`,
    { completed },
  );
  return response.data;
}

export default updateTodo;
