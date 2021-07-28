import Post from "./Post";
import { PostType } from "./Post/types";

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
};

export default Posts;
