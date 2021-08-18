import { useState, useRef } from "react";
import { PostType } from "./types";
import PostActions from "./PostActions";
import PostStats from "./PostStats";
import Avatar from "../Avatar";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import { Counters } from "./PostActions/types";
import PostDropdown from "./PostDropdown";
import useUser from "../../hooks/useUser";

const Post = ({ post }: { post: PostType }) => {
  const [counters, setCounters] = useState<Counters[]>(
    post?.reactions?.reactions.map(
      ({ emoji, by: { _id, fullName, avatar } }) => ({
        emoji,
        by: {
          userID: _id,
          fullName,
          avatar,
        },
      })
    )
  );

  // CommentBox Ref to focus on the comment Box when clicked on the comment icon
  const commentBox = useRef<HTMLInputElement>(null);
  const user = useUser();

  return (
    <div className="post mb-3 p-4 bg-white shadow-sm w-full mx-auto rounded-lg">
      <div className="flex items-center justify-between bg-white mb-3 pt-4">
        <Avatar
          src={post?.author?.avatar}
          className="h-7 w-7 rounded-full"
          name={post?.author?.fullName}
          withName
        />
        <PostDropdown post={post} />
      </div>
      <PostImage
        image={post?.imageURL}
        caption={post?.caption}
        filter={post?.filter}
      />
      <PostCaption caption={post?.caption} />
      <PostStats counters={counters} />
      <PostActions
        commentBox={commentBox}
        post={post}
        setCounters={setCounters}
      />
      <div className="add-comment flex items-center">
        <Avatar src={user?.avatar} className="h-7 w-7 rounded-full mt-3 mr-1" />
        <input
          ref={commentBox}
          type="text"
          className="w-full p-2 rounded-full outline-none mt-6 focus:bg-gray-200 bg-gray-100"
          placeholder="Comment..."
        />
      </div>
    </div>
  );
};

export default Post;
