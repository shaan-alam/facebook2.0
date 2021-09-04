import { useState } from "react";
import { useQuery } from "react-query";
import { fetchCommentReplies } from "../api";
import { UseFetchCommentReplies } from "./types";

/**
 * @function useFetchCommentReplies
 * @description A custom hook to fetch comment replies
 * @param commentId ID of the comment for which replies are to be fetched
 * @param setCommentReplies A function that will set comment replies state in the component
 */
const useFetchCommentReplies: UseFetchCommentReplies = (
  commentId,
  setCommentReplies
) => {
  const [offset, setOffset] = useState(2);
  const [error, setError] = useState("");

  const fetchMoreCommentReplies = async () => {
    try {
      const { data } = await fetchCommentReplies(commentId, offset);

      setOffset(offset + 5);

      setCommentReplies(data);
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
  };

  const { refetch, isLoading, isFetching } = useQuery(
    ["comment-replies", commentId],
    fetchMoreCommentReplies,
    {
      refetchOnWindowFocus: false,
    }
  );

  return { refetch, isLoading, isFetching, error };
};

export default useFetchCommentReplies;
