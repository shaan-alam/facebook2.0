import { AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { deleteComment } from "../api";

type UseDeleteComment = (
  commentId: string
) => UseMutationResult<AxiosResponse<any>, unknown, void, unknown>;

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
