import { AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { deleteComment } from "../api";

type UseDeleteComment = (
  commentId: string
) => UseMutationResult<AxiosResponse<any>, unknown, void, unknown>;

/**
 * @function useDeleteComment
 * @description A custom hook to delete Comment;
 * @param commentId ID of the comment which is to be deleted
 */
const useDeleteComment: UseDeleteComment = (commentId) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => deleteComment(commentId), {
    onSuccess: () => {
      queryClient.refetchQueries("comments");
    },
  });

  return mutation;
};

export default useDeleteComment;
