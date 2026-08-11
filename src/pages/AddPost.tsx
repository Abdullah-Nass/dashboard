import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SubmitButton from "../components/SubmitButton";
import addPostApi from "../api/addPost";

function AddPost() {
  const { t } = useTranslation(["profile", "add_post"]);
  const context = useContext(AuthContext);
  if (!context) throw new Error("Cannot use AuthContext");
  const { user } = context;
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  useEffect(() => {
    document.title = t("profile:posts.add");
  });
  const onToggle = () => {
    setSidebarOpen((prev) => !prev);
  };
  const handleAddPost: React.SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim() || !body.trim()) {
      setError(t("add_post:empty_fields"));
      setLoading(false);

      return;
    }
    if (!user) return;

    try {
      await addPostApi(user, title, body);
      setFeedback(t("add_post:feedback"));
      setTitle("");
      setBody("");
    } catch {
      setError(t("add_post:post_error"));
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading />;
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
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-center font-medium text-red-600">
                  {error}
                </div>
              )}
              {feedback && (
                <div className="rounded-lg bg-green-50 px-4 py-3 text-center font-medium text-green-600">
                  {feedback}
                </div>
              )}
              <form
                onSubmit={handleAddPost}
                className="flex flex-col gap-3 max-w-200 px-4 py-2 border border-gray-300 shadow rounded-lg bg-white"
              >
                <div className="flex flex-col gap-3">
                  <label htmlFor="title">{t("add_post:title_label")}</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => {
                      const content = e.target.value;
                      setTitle(content);
                      setError("");
                      setFeedback("");
                    }}
                    placeholder={t("add_post:title_plch")}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="body">{t("add_post:body_label")}</label>

                  <textarea
                    name="body"
                    id="body"
                    value={body}
                    onChange={(e) => {
                      const content = e.target.value;
                      setBody(content);
                      setError("");
                      setFeedback("");
                    }}
                    placeholder={t("add_post:body_plch")}
                    rows={8}
                    className="w-full resize-y border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <SubmitButton content={t("add_post:post")} />
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default AddPost;
