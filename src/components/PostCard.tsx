import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import type { Post } from "../types/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md ">
      <h2 className="text-lg font-semibold leading-tight text-gray-900">
        {post.title}
      </h2>

      <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
        {post.body}
      </p>

      <ul className="mt-1 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
          >
            #{tag}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 ">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{post.reactions.likes}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 ">
          <FontAwesomeIcon icon={faThumbsUp} className="rotate-180" />
          <span>{post.reactions.dislikes}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 ">
          <FontAwesomeIcon icon={faEye} />
          <span>{post.views}</span>
        </div>
      </div>
    </div>
  );
}
export default PostCard;
