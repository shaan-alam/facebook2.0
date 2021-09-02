import { useMutation, useQueryClient } from "react-query";
import { deleteCommentReply } from "../api";

/**
 * @function useDeleteCommentReply
 * @description A custom hook to delete a comment reply
 * @param commentReplyId ID of the comment reply which is to be deleted 
 */
const useDeleteCommentReply = (commentReplyId: string) => {
  const queryClient = useQueryClient();

  const deleteReplyMutation = useMutation(
    () => deleteCommentReply(commentReplyId),
    {
      onSuccess: () => {
        queryClient.refetchQueries("comments");
        queryClient.refetchQueries("comment-replies");
      },
    }
  );

  return deleteReplyMutation;
};

export default useDeleteCommentReply;
