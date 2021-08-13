import { FacebookCounter } from "@charkour/react-reactions";

const PostStats = () => {
  return (
    <div className="flex items-center justify-between">
      <FacebookCounter
        counters={[
          {
            emoji: "love",
            by: "Shaan ALam",
          },
          {
            emoji: "love",
            by: "Hasan",
          },
          {
            emoji: "love",
            by: "Lovey",
          },
          {
            emoji: "wow",
            by: "Hussain",
          },
          {
            emoji: "like",
            by: "Shams",
          },
          {
            emoji: "love",
            by: "Shaan ALam",
          },
        ]}
        user="Shaan ALam"
        important={["Lovey", "Hasan", "Hussain"]}
        alwaysShowOthers={false}
      />
      <p className="text-gray-500 text-sm">3 Comments</p>
    </div>
  );
};

export default PostStats;
