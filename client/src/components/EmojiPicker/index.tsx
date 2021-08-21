import { useState } from "react";
import { SlackSelector } from "@charkour/react-reactions";
import { motion } from "framer-motion";

const EmojiPicker = ({
  onEmojiSelect,
}: {
  onEmojiSelect: (emoji: string) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);

  // background-position:0 -386px;background-size:auto;width:16px;height:16px;background-repeat:no-repeat;display:inline-block

  return (
    <div className="relative">
      <span
        className="mr-2 hover:bg-gray-200 rounded-full cursor-pointer p-2 flex items-center justify-center"
        onClick={() => setShowPicker(!showPicker)}
      >
        <i
          style={{
            backgroundImage:
              "url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/mUiFX7bN0Dk.png)",
            backgroundPosition: "0 -386px",
            backgroundSize: "auto",
            width: "16px",
            height: "16px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
          }}
        ></i>
      </span>
      {showPicker && (
        <motion.div
          className="absolute top-10 z-20 shadow-lg"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <SlackSelector onSelect={(emoji) => onEmojiSelect(emoji)} />
        </motion.div>
      )}
    </div>
  );
};

export default EmojiPicker;
