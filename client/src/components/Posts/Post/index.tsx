import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { PostType } from "./types";
import PostActions from "./PostActions";
import TextTruncate from "react-text-truncate";
import User from "../../../assets/images/user.svg";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

const Post = ({ post }: { post: PostType }) => {
  const [isTruncated, setTruncated] = useState<boolean>(true); // To determine whether to show full post caption or truncted text caption
  const [isLoaded, setLoaded] = useState<boolean>(false); // To determine if the image is completely loaded!

  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

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
    <div className="post my-14">
      <div className="flex items-center bg-white mb-6">
        <img
          src={profile.avatar || User}
          alt={post?.author?.fullName}
          className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
        />
        <p className="text-fb font-semibold">{post?.author?.fullName}</p>
      </div>
      <div className="post">
        {!isLoaded && <Skeleton height={400} width="200" />}
        <img
          ref={postImageRef}
          src={post?.imageURL}
          alt={post?.caption}
          className="my-3 w-full rounded-lg"
          onLoad={() => setLoaded(true)}
        />
        <div className="post-actions">
          <PostActions commentBox={commentBox} post={post} profile={profile} />
        </div>
        <div className="caption px-4 mt-4">
          {isTruncated ? (
            <TextTruncate
              containerClassName="leading-7"
              line={3}
              element="span"
              truncateText="…"
              text={post?.caption}
              textTruncateChild={
                <a
                  href="#!"
                  onClick={() => setTruncated(false)}
                  className="text-fb"
                >
                  Show more
                </a>
              }
            />
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
