import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { type Post } from "../types/posts";
import currentUserApi from "../api/getUser";
import type { User } from "../types/user";
import axios from "axios";
import postsApi from "../api/posts";
import type { Todo } from "../types/todos";
import todosApi from "../api/todos";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import PostsList from "../components/PostsList";
import TodoList from "../components/TodosList";

function Profile() {
  const { t } = useTranslation(["profile", "common"]);
  const context = useContext(AuthContext);
  if (!context) throw new Error("Cannot use AuthContext");
  const { token, logout } = context;
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const firstName = user?.firstName;
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const onToggle = () => {
    setSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    document.title = t("profile");
    const getCurrentUser = async () => {
      try {
        const currentUser = await currentUserApi(token);
        setUser(currentUser);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          logout();
        } else {
          setError(t("user_error"));
        }
      }
    };

    getCurrentUser();
  }, [token, t, logout]);

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      try {
        const [user_todos, user_posts] = await Promise.all([
          todosApi(user),
          postsApi(user),
        ]);
        setTodos(user_todos.todos);
        setPosts(user_posts.posts);
      } catch {
        setError(t("user_error"));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [t, user]);

  if (error) return <div>{error}</div>;
  if (loading) return <Loading />;
  if (!user) return;
  return (
    <div className="min-h-screen">
      <Navbar onToggle={onToggle} />

      <div className="grid grid-cols-[auto_1fr]">
        <Sidebar isOpen={sidebarOpen} />

        <main className="p-8 overflow-hidden flex flex-col gap-3 bg-gray-100">
          <div className="mb-10 flex items-center gap-4">
            <img
              src={user.image}
              alt={`${firstName}'s profile`}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-yellow-300 shadow-md"
            />

            <div>
              <p className="text-3xl font-semibold text-gray-950">
                {t("profile:welcome", { name: user.firstName })}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {firstName} {user.lastName}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <PostsList posts={posts} />

            <TodoList todos={todos} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
