import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SubmitButton from "../components/SubmitButton";
import addTodoApi from "../api/addTodo";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const AddTodoScheme = z.object({
  todo: z.string().min(1, "add_todo:empty_fields"),
});
type AddTodoData = z.infer<typeof AddTodoScheme>;

function AddTodo() {
  const { t } = useTranslation(["profile", "add_todo", "auth"]);
  const context = useContext(AuthContext);
  if (!context) throw new Error("Cannot use AuthContext");
  const { user } = context;

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AddTodoData>({ resolver: zodResolver(AddTodoScheme) });
  const addTodoMutation = useMutation({
    mutationFn: async (data: AddTodoData) => {
      await addTodoApi(user, data.todo);
    },
    onSuccess: () => {
      toast.success(t("add_todo:feedback"));
      reset();
    },
    onError: () => {
      setError("root", {
        message: "add_todo:todo_error",
      });
    },
  });
  useEffect(() => {
    document.title = t("profile:todos.add");
  }, [t]);
  const onToggle = () => {
    setSidebarOpen((prev) => !prev);
  };
  const onSubmit = (data: AddTodoData) => {
    addTodoMutation.mutate(data);
  };
  return (
    <>
      <div className="min-h-screen">
        <Navbar onToggle={onToggle} />

        <div className="grid grid-cols-[auto_1fr]">
          <Sidebar isOpen={sidebarOpen} />

          <main className="p-8 flex flex-col gap-3 bg-gray-100">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
              <header className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
                  {t("todos.add")}
                </h1>
              </header>
              {errors.root && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-center font-medium text-red-600">
                  {t(errors.root.message as "add_todo:todo_error")}
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 max-w-200 px-4 py-2 border border-gray-300 shadow rounded-lg bg-white"
              >
                <div className="flex flex-col gap-3">
                  <label htmlFor="title">{t("add_todo:todo_label")}</label>
                  <input
                    type="text"
                    id="title"
                    {...register("todo")}
                    placeholder={t("add_todo:todo_plch")}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.todo && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 text-center font-medium text-red-600">
                      {t(errors.todo.message as "add_todo:empty_fields")}
                    </div>
                  )}
                </div>

                <SubmitButton
                  disabled={addTodoMutation.isPending}
                  content={
                    addTodoMutation.isPending
                      ? t("auth:login.loading")
                      : t("add_todo:add")
                  }
                />
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default AddTodo;
