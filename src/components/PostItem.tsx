import { Link } from "react-router-dom";
import type { Post } from "./PostList";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  const imageUrl = post.image_url ? JSON.parse(post.image_url).publicUrl : "";
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-[20px] bg-linear-to-r from-pink-600 to-purple-600 blur-sm opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none" />
      <Link to={`/post/${post.id}`} className="block relative z-10">
        <div className="w-80 h-76 bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-[20px] text-white flex flex-col p-5 overflow-hidden transition-colors duration-300 group-hover:bg-gray-800">
          {/* header avatar and title */}
          <div className="flex items-center space-x-2">
            {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="User Avatar"
                className="w-8.75 h-8.75 rounded-full object-cover"
              />
            ) : (
              <div className="w-8.75 h-8.75 rounded-full bg-linear-to-tl from-[#8A2BE2] to-[#491F70]" />
            )}

            <div className="flex flex-col flex-1">
              <div className="text-[20px] leading-5.5 font-semibold mt-2">
                {post.title}
              </div>
            </div>
          </div>
          {/* Image banner */}
          <div className="mt-2 flex-1">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full rounded-[20px] object-cover max-h-37.5 mx-auto"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
