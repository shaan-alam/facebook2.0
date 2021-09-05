import { useQuery } from "react-query";
import { getPosts } from "../api";
import { AxiosResponse } from "axios";
import { PostType } from "../components/Post/types";

const usePosts = () => {
  const fetchPosts = async () => {
    const result: AxiosResponse<PostType[]> = await getPosts();

    return result.data;
  };

  return useQuery("posts", fetchPosts);
};

export default usePosts;
