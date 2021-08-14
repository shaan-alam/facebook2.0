import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { reactPost } from "../../../../api";
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
  const { reactions: postReactions } = post?.reactions;
  const [showReactions, setShowReactions] = useState<boolean>(false); // State for showing the reactions circular box
  const [reaction, setReaction] = useState<Reaction>(reactions.default);
  const [currentUserReaction] = useState(
    postReactions.filter((reaction) => reaction.by._id === user?._id)[0] || null
  ); // If the currently logged in user reacted for this post, then store his reaction

  useEffect(() => {
    if (currentUserReaction !== null) {
      // If currentUserReaction exists, then set it to reaction state...
      // We have to use currentUserReaction for storing user's reaction (which comes from the backend)
      // and reaction state for storing the further reactions!!
      setReaction({ ...reactions[currentUserReaction.emoji] });
    }
  }, [currentUserReaction]);

  // Mutation for reacting to the post
  const mutation = useMutation((reaction: any) => 
    reactPost(post?._id, { ...reaction })
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
                reactions={["love", "haha", "wow", "sad", "angry"]}
                onSelect={(newReaction: keyof Reactions) => {
                  if (
                    newReaction.toLowerCase() === reaction.name.toLowerCase()
                  ) {
                    mutation.mutate({ emoji: reaction.name, by: user?._id });
                    return setReaction(reactions.default);
                  }
                  setReaction(reactions[newReaction]);
                  mutation.mutate({ emoji: newReaction, by: user?._id });
                }}
              />
            </motion.div>
          )}
          <div
            style={{ color: reaction.textColor }}
            className="py-2 w-full font-semibold flex items-center justify-center"
            onClick={(e: React.SyntheticEvent) => {
              if (reaction.name !== "like" && reaction.name !== "default") {
                mutation.mutate({ emoji: reaction.name, by: user?._id }); // Remove the already existing reaction emoji!

                // Make the reaction icon back to unlike
                return setReaction(reactions.default);
              }
              // Like/Unlike the post
              mutation.mutate({ emoji: reactions.like.name, by: user?._id });
              setReaction((reaction) =>
                reaction.name === "like" ? reactions.default : reactions.like
              );
            }}
          >
            <div className="w-full flex items-center justify-center text-gray-600">
              {reaction.icon && (
                <img
                  src={reaction.icon}
                  className="h-6 w-6 mr-1 rounded-full"
                />
              )}
              &nbsp;
              <p style={{ color: reaction.textColor }}>{reaction.label}</p>
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

