import { ThumbUpIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FacebookCounter, FacebookSelector } from "@charkour/react-reactions";

const LikeButton = ({
  isLiked,
  onLike,
}: {
  isLiked: boolean;
  onLike: () => void;
}) => {
  const controls = useAnimation();

  const [className, setClassName] = useState<string>(
    isLiked ? "final-state" : "initial-state"
  );

  useEffect(() => {
    if (!isLiked) {
      controls.start({
        scale: 1.2,
        color: "red",
      });
    } else {
      controls.start({
        scale: 1,
        color: "gray",
      });
    }
  }, [isLiked]);

  return (
    <>
      <motion.span
        initial={{ scale: 1 }}
        animate={controls}
        className={`rounded-full ml-2 mb-2 mt-5 cursor-pointer ${className}`}
        onClick={() => {
          setClassName(
            className == "initial-state" ? "final-state" : "initial-state"
          );
          onLike();
        }}
      >
        <ThumbUpIcon className="h-10 w-10 rounded-full p-2 hover:bg-red-200" />
      </motion.span>
    </>
  );
};

export default LikeButton;
