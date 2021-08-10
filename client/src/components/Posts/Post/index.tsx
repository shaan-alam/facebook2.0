import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { PostType } from "./types";
import PostActions from "./PostActions";
import User from "../../../assets/svg/user.svg";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import useUser from "../../../hooks/useUser";
import TextTruncate from "react-truncate";
import Linkify from "react-linkify";

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
    <div className="post mb-3 bg-white shadow-sm">
      <div className="flex items-center bg-white mb-3 p-4">
        <img
          src={user?.avatar ? user?.avatar : User}
          alt={post?.author?.fullName}
          className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
        />
        <p className="text-fb font-semibold">{post?.author?.fullName}</p>
      </div>
      <div className="post-image px-4">
        {!isLoaded && post?.imageURL && <Skeleton height={400} width="200" />}
        {post?.imageURL !== "" ? (
          <img
            ref={postImageRef}
            src={post?.imageURL}
            alt={post?.caption}
            className="my-3 w-full rounded-lg"
            onLoad={() => setLoaded(true)}
          />
        ) : null}
        <div className="caption">
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
              <a
                href="#!"
                onClick={() => setTruncated(true)}
                className="text-fb"
              >
                Show less
              </a>
            </>
          )}
        </div>
      </div>
      <div className="post-actions">
        <PostActions commentBox={commentBox} post={post} user={user} />
      </div>
      <div className="add-comment ">
        <input
          ref={commentBox}
          type="text"
          className="w-full p-2 outline-none mt-6 border-t-2 focus:bg-blue-50 bg-gray-50"
          placeholder="Comment..."
        />
      </div>
    </div>
  );
};

export default Post;
