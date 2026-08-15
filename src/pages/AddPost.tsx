import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SubmitButton from "../components/SubmitButton";
import addPostApi from "../api/addPost";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
const AddPostScheme = z.object({
  title: z.string().min(1, "add_post:empty_title"),
  body: z.string().min(1, "add_post:empty_content"),
});

type AddPostData = z.infer<typeof AddPostScheme>;

function AddPost() {
  const { t } = useTranslation(["profile", "add_post", "auth"]);
  const context = useContext(AuthContext);
  if (!context) throw new Error("Cannot use AuthContext");
  if (!context.user) throw new Error("User must be logged in to add a todo");
  const { user } = context;
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AddPostData>({ resolver: zodResolver(AddPostScheme) });
  useEffect(() => {
    document.title = t("profile:posts.add");
  }, [t]);
  const onToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const addPostMutation = useMutation({
    mutationFn: async (data: AddPostData) => {
      await addPostApi(user, data.title.trim(), data.body.trim());
    },
    onSuccess: () => {
      reset();
      toast.success(t("add_post:feedback"));
    },
    onError: () => {
      setError("root", { message: "add_post:post_error" });
    },
  });
  const onSubmit = (data: AddPostData) => {
    addPostMutation.mutate(data);
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
                  {t("posts.add")}
                </h1>
              </header>
              {errors.root && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-center font-medium text-red-600">
                  {t(errors.root.message as "add_post:post_error")}
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 max-w-200 px-4 py-2 border border-gray-300 shadow rounded-lg bg-white"
              >
                <div className="flex flex-col gap-3">
                  <label htmlFor="title">{t("add_post:title_label")}</label>
                  <input
                    type="text"
                    id="title"
                    {...register("title")}
                    placeholder={t("add_post:title_plch")}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.title && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 font-medium text-red-600">
                      {t(errors.title.message as "add_post:empty_title")}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="body">{t("add_post:body_label")}</label>

                  <textarea
                    id="body"
                    {...register("body")}
                    placeholder={t("add_post:body_plch")}
                    rows={8}
                    className="w-full resize-y border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.body && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 font-medium text-red-600">
                      {t(errors.body.message as "add_post:empty_content")}
                    </div>
                  )}
                </div>
                <SubmitButton
                  disabled={addPostMutation.isPending}
                  content={
                    addPostMutation.isPending
                      ? t("auth:login.loading")
                      : t("add_post:post")
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
export default AddPost;
