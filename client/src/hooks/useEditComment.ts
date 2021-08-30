import { useMutation } from "react-query";
import { editComment } from "../api";
import { UseEditComment, NewComment } from "./types";

/**
 * @description A custom hook to edit comments
 * @param onSuccess A callback function to be called when the comment editing is successfull!
 */
const useEditComment: UseEditComment = (onSuccess) => {
  const mutation = useMutation(
    (newComment: NewComment) => editComment(newComment.id, newComment.message),
    {
      onSuccess,
    }
  );

  return mutation;
};

export default useEditComment;
