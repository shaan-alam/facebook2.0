import { useMutation } from "react-query";
import { createCommentReply } from "../api";
import { CommentReply, UseCreateCommentReply } from "./types";

/**
 * @function useCreateCommentReply
 * @description A custom hook to create a reply to a particular comment
 * @param onSuccess A callback function to set the comment replies state in the component.
 */
const useCreateCommentReply: UseCreateCommentReply = (onSuccess) => {
  const mutation = useMutation(
    (commentReply: CommentReply) => createCommentReply(commentReply),
    {
      onSuccess,
    }
  );

  return mutation;
};

export default useCreateCommentReply;
