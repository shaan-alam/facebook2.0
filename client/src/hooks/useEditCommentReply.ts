import { useMutation, useQueryClient } from "react-query";
import { editCommentReply } from "../api";
import { UseEditCommentReply, NewCommentReply } from "./types";

const useEditCommentReply: UseEditCommentReply = (onSuccess) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newCommentReply: NewCommentReply) => editCommentReply(newCommentReply),
    {
      onSuccess,
    }
  );

  return mutation;
};

export default useEditCommentReply;
