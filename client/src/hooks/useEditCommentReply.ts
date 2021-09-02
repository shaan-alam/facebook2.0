import { useMutation, useQueryClient } from "react-query";
import { editCommentReply } from "../api";
import { UseEditCommentReply, NewCommentReply } from "./types";

/**
 * @function useEditCommentReply
 * @description A custom hook to update comment replies
 * @param onSuccess This function will refetch comment-replies and set in the component state
 */
const useEditCommentReply: UseEditCommentReply = (onSuccess) => {
  const mutation = useMutation(
    (newCommentReply: NewCommentReply) => editCommentReply(newCommentReply),
    {
      onSuccess,
    }
  );

  return mutation;
};

export default useEditCommentReply;
