import { useState } from "react";
import { useQuery } from "react-query";
import { fetchComments } from "../api";
import { UseFetchComments } from "./types";

/**
 * @function useFetchComments
 * @description A custom hook to fetch the comments of a post. This hook will fetch 5 comments at a time, starting with 3 comments.
 * @param postId ID of the post for which comments are to be fetched
 * @param setComments To set the comments state in the component where it is used
 * @returns An Object containing refetch(), isLoading & isFetching
 */
const useFetchComments: UseFetchComments = (postId, setComments) => {
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(3);

  const fetchMoreComments = async () => {
    try {
      const { data } = await fetchComments(postId, offset);

      setOffset(offset + 5);

      setComments(data);
    } catch (err: any) {
      setError(err as string);
      console.log(err);
    }
  };

  const { refetch, isLoading, isFetching } = useQuery(
    ["comments", postId],
    fetchMoreComments,
    {
      refetchOnWindowFocus: false,
    }
  );

  return { refetch, isLoading, isFetching, error };
};

export default useFetchComments;
