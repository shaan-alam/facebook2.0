import Post from "../Post";
import { PostType } from "../Post/types";
import { useQuery } from "react-query";
import { getPosts } from "../../api/index";
import { ExclamationIcon } from "@heroicons/react/solid";
import SkeletonPost from "../SkeletonPost";

const Posts = () => {
  const fetchPosts = async () => {
    const posts = await getPosts();
    console.log("fetching again!");
    console.log(posts.data);
    return posts.data;
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery(
    "posts",
    fetchPosts
  );

  return (
    <>
      {isLoading && !data && (
        <div className="">
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </div>
      )}
      {isError && (
        <div className="flex  items-center bg-red-100 border-2 border-red-200 rounded-lg p-3 font-semibold text-red-600">
          <ExclamationIcon className="h-8 w-8" />
          &nbsp; {error}
        </div>
      )}
      {!isLoading &&
        isSuccess &&
        data.map((post: PostType) => <Post post={post} key={post?._id} />)}
    </>
  );
};

export default Posts;
