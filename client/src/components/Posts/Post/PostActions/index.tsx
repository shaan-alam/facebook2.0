import React, { useState } from "react";
import { useMutation } from "react-query";
import { likePost } from "../../../../api";
import { PostType } from "../types";
import { FacebookSelector } from "@charkour/react-reactions";
import { reactions, Reaction, Reactions } from "./reactions";
import { motion } from "framer-motion";

const PostActions = ({
  commentBox,
  post,
  user,
}: {
  commentBox: React.RefObject<HTMLInputElement>;
  post: PostType;
  user: any;
}) => {
  const { likes } = post?.likes;

  const [reaction, setReaction] = useState<Reaction>({
    name: "Like",
    icon: "",
    textColor: "",
  });
  const [showReactions, setShowReactions] = useState<boolean>(false);

  // To know whether did current logged in user like this post?
  const [didCurrentUserLike, setCurrentUserLike] = useState<boolean>(
    likes?.filter(({ _id }: { _id: string }) => _id === user._id).length !== 0
  );

  // Mutation for liking the post
  const mutation = useMutation((userID: string) =>
    likePost(post?._id, user._id)
  );

  return (
    <div className="mt-2 flex justify-between px-4 border-b-2 border-t-2 border-gray-300 py-1 relative cursor-pointer">
      <div
        className="like-button w-full hover:bg-gray-200 rounded-lg"
        onMouseOver={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        <div>
          {showReactions && (
            <motion.div
              initial={{ y: "-50", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                delay: 1.2,
              }}
              className={`reactions absolute bottom-10 z-10 shadow-xl rounded-full`}
            >
              <FacebookSelector
                onSelect={(newReaction: keyof Reactions) => {
                  console.log(newReaction);
                  setReaction(reactions[newReaction]);
                }}
              />
            </motion.div>
          )}
          <div
            style={{ color: reaction.textColor }}
            className="py-2 w-full font-semibold flex items-center justify-center"
            onClick={(e: React.SyntheticEvent) => {
              if (reaction.name !== "Like") {
                setCurrentUserLike(false);
                return setReaction(reactions.like);
              }

              setCurrentUserLike(!didCurrentUserLike);
              setReaction(reactions.like);
            }}
          >
            <div className="w-full flex items-center justify-center text-gray-600">
              <i
                style={{
                  backgroundImage:
                    reaction.name === "Like"
                      ? "url(https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/ut5P48U8gch.png)"
                      : "",
                  backgroundPosition: didCurrentUserLike
                    ? "0 -172px"
                    : "0 -191px",
                  backgroundSize: "auto",
                  width: "18px",
                  height: "18px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: didCurrentUserLike
                    ? "invert(39%) sepia(57%) saturate(200%) saturate(200%) saturate(200%) saturate(200%) saturate(200%) saturate(147.75%) hue-rotate(202deg) brightness(97%) contrast(96%)"
                    : "",
                }}
              ></i>
              &nbsp;
              {reaction.name !== "Like" && (
                <img
                  src={reaction.icon}
                  className="h-6 w-6 mr-1 rounded-full"
                />
              )}
              {reaction.name}
            </div>
          </div>
        </div>
      </div>

      <button
        className="py-2 w-full hover:bg-gray-200 rounded-lg font-semibold flex items-center justify-center text-gray-600"
        onClick={() => commentBox?.current?.focus()}
      >
        <i
          style={{
            backgroundImage:
              "url(https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/ut5P48U8gch.png)",
            backgroundPosition: "0 -153px",
            backgroundSize: "auto",
            width: "18px",
            height: "18px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
          }}
        ></i>
        &nbsp; Comment
      </button>
    </div>
  );
};

export default PostActions;

// Liked
// background-image: url("https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/ut5P48U8gch.png"); background-position: 0px -172px; background-size: auto; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;

// comment
// background-image:url('https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/ut5P48U8gch.png');
// background-position:0 -153px;
// background-size:auto;
// width:18px;height:18px;
// background-repeat:no-repeat;
// display:inline-block
