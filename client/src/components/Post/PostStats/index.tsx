import { FacebookCounter } from "@charkour/react-reactions";
import useUser from "../../../hooks/useUser";

interface Reaction {
  _id: string;
  emoji: string;
  by: {
    _id: string;
    fullName: string;
  };
}

const PostStats = ({
  counters,
}: {
  counters: Array<{ emoji: string; by: string }>;
}) => {
  const user = useUser();

  return (
    <div className="flex items-center justify-between">
      <FacebookCounter
        counters={counters}
        user={user?.fullName}
        important={
          counters.length > 2
            ? counters
                .filter((counter) => counter.by !== user?.fullName)
                .map((counter) => counter.by)
                .slice(3)
            : []
        }
      />
      <p className="text-gray-500 text-sm">3 Comments</p>
    </div>
  );
};

export default PostStats;
