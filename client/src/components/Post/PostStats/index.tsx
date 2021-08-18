import { useState } from "react";
import { FacebookCounter } from "@charkour/react-reactions";
import { AnimatePresence } from "framer-motion";
import useUser from "../../../hooks/useUser";
import PostStatsModal from "../PostStatsModal";

const PostStats = ({
  counters,
}: {
  counters: Array<{
    emoji: string;
    by: { userID: string; fullName: string; avatar: string };
  }>;
}) => {
  const [postStatsModal, setPostStatsModal] = useState(false);
  const user = useUser();

  return (
    <div className="flex items-center justify-between">
      <FacebookCounter
        onClick={() => setPostStatsModal(true)}
        counters={counters.map((res) => ({
          emoji: res.emoji,
          by: res.by.fullName,
        }))}
        user={user?.fullName}
        important={
          counters.length > 2
            ? counters
                .filter((counter) => counter.by.userID !== user?._id)
                .map((counter) => counter.by.fullName)
                .slice(3)
            : []
        }
      />
      <p className="text-gray-500 text-sm">3 Comments</p>
      <AnimatePresence>
        {postStatsModal && (
          <PostStatsModal
            isOpen={postStatsModal}
            setOpen={setPostStatsModal}
            counters={counters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostStats;
