import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import updateTodo from "../api/updateTodo";
import type { Todo } from "../types/todos";

function TodoCard({ todoElement }: { todoElement: Todo }) {
  const [completed, setCompleted] = useState<boolean>(todoElement.completed);

  const handleTodoStatus = async () => {
    setCompleted(!completed);
    try {
      await updateTodo(todoElement.id, !completed);
    } catch {
      setCompleted(completed);
    }
  };
  return (
    <>
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md">
        <button
          type="button"
          onClick={handleTodoStatus}
          className={`flex cursor-pointer h-6 w-6 shrink-0 items-center justify-center rounded-full  text-transparent transition ${completed ? "bg-yellow-400" : "hover:border-yellow-400 hover:bg-yellow-50 border-2 border-gray-300"} `}
        >
          <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
        </button>

        <span
          className={`font-medium ${completed ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {todoElement.todo}
        </span>
      </div>
    </>
  );
}

export default TodoCard;
