import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { PostType } from "./types";
import PostActions from "./PostActions";
import User from "../../../assets/svg/user.svg";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import useUser from "../../../hooks/useUser";
import TextTruncate from "react-truncate";
import PostStats from "./PostStats";
import Avatar from "../../Avatar";

const Post = ({ post }: { post: PostType }) => {
  const [isTruncated, setTruncated] = useState<boolean>(true); // To determine whether to show full post caption or truncted text caption
  const [isLoaded, setLoaded] = useState<boolean>(false); // To determine if the image is completely loaded!

  const dispatch = useDispatch();
  const user = useUser();

  // CommentBox Ref to focus on the comment Box when clicked on the comment icon
  const commentBox = useRef<HTMLInputElement>(null);

  // postImageRef to determine when the image is loaded and to show skeleton component on the basis of that!
  const postImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = postImageRef.current;
    if (img && img.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="post mb-3 p-4 bg-white shadow-sm w-full mx-auto rounded-lg">
      <div className="flex items-center bg-white mb-3 pt-4">
        <img
          src={post?.author?.avatar ? post?.author?.avatar : User}
          alt={post?.author?.fullName}
          className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
        />
        <p className="text-fb font-semibold">{post?.author?.fullName}</p>
      </div>
      <div className="post-image">
        {!isLoaded && post?.thumbnailURL && (
          <Skeleton height={400} width="200" />
        )}
        {post?.imageURL !== "" ? (
          <img
            ref={postImageRef}
            src={post?.imageURL}
            alt={post?.caption}
            className={`my-3 w-full rounded-lg ${!isLoaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        ) : null}
      </div>
      <div className="caption mb-4">
        {isTruncated ? (
          <TextTruncate
            lines={3}
            ellipsis={
              <a
                href="#!"
                onClick={() => setTruncated(false)}
                className="text-fb"
              >
                ...Show more..
              </a>
            }
          >
            <p className="leading-7">{post?.caption}</p>
          </TextTruncate>
        ) : (
          <>
            <p className="leading-7">{post?.caption}</p>
            <a href="#!" onClick={() => setTruncated(true)} className="text-fb">
              Show less
            </a>
          </>
        )}
      </div>
      <PostStats />
      <div className="post-actions mt-3">
        <PostActions commentBox={commentBox} post={post} user={user} />
      </div>
      <div className="add-comment flex items-center">
        <Avatar className="h-7 w-7 rounded-full mt-3 mr-1" />
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
