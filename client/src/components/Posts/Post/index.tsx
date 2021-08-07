import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

// Interfaces and Types
import { PostType } from "./types";
import { likePost } from "../../../actions/posts";
import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/outline";
import {
  ChatAltIcon as ChatAltIconSolid,
  ThumbUpIcon as ThumbUpIconSolid,
} from "@heroicons/react/solid";
import PostActions from "./PostActions";

const Post = ({ post }: { post: PostType }) => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const commentBox = useRef<HTMLInputElement>(null);

  return (
    <div className="post my-8">
      <div className="flex items-center bg-white">
        <img
          src="https://avatars.githubusercontent.com/u/48273777?v=4"
          alt={post?.author?.fullName}
          className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
        />
        <p className="text-fb font-semibold">{post?.author?.fullName}</p>
      </div>
      <div className="post">
        <img
          src={post?.imageURL}
          alt={post?.caption}
          className="my-3 w-full rounded-lg"
        />
        <div className="post-actions">
          <PostActions
            commentBox={commentBox}
            likes={post.likes.likes}
            profile={profile}
          />
        </div>
        <div className="add-comment ">
          <input
            ref={commentBox}
            type="text"
            className="w-full p-2 outline-none mt-6 border-b-2 focus:bg-gray-100 rounded-lg"
            placeholder="Comment..."
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
