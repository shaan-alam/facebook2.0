import Post from "../Post";
import { PostType } from "../Post/types";
import { useQuery } from "react-query";
import { getPosts } from "../../api/index";
import Loader from "react-loader-spinner";
import { ExclamationIcon } from "@heroicons/react/solid";

const Posts = () => {
  const fetchPosts = async () => {
    const posts = await getPosts();

    return posts.data;
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery(
    "posts",
    fetchPosts
  );

  return (
    <>
      {isLoading && !data && (
        <div className="flex justify-center items-center h-40 w-full">
          <Loader type="Oval" height={50} width={50} color="#1877f2" />
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
