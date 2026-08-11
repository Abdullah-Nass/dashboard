import type { Todo } from "../types/todos";
import { useTranslation } from "react-i18next";
import TodoCard from "./TodoCard";

function TodoList({ todos }: { todos: Todo[] }) {
  const { t } = useTranslation("profile");
  if (todos.length === 0)
    return <p className="text-gray-500">{t("todos.empty")}</p>;
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-700 ">
        {t("todos.title")}
      </h2>
      <ul className="grid grid-cols-1 gap-4">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todoElement={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
