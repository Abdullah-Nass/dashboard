import type { Post } from "../types/posts";
import PostCard from "./PostCard";
import { useTranslation } from "react-i18next";

function PostsList({ posts }: { posts: Post[] }) {
  const { t } = useTranslation("profile");
  if (posts.length === 0)
    return <p className="text-gray-500">{t("posts.empty")}</p>;
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-700 ">
        {t("posts.title")}
      </h2>

      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
