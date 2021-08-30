import { useMutation } from "react-query";
import { createComment } from "../api";
import { UseCreateComment } from "./types";

interface Comment {
  message: string;
  author: string;
}

/**
 * @description A custom hook to create a comment for a post.
 * @param postId ID of the post for which comment is to be created
 * @param comment An object containing the author ID and the message for the comment.
 * @param onSuccess A callback function to be executed after the comment is created
 */
const useCreateComment: UseCreateComment = (postId, onSuccess) => {
  const mutation = useMutation(
    "createComment",
    (comment: Comment) => createComment(postId, comment),
    {
      onSuccess,
    }
  );

  return mutation;
};

export default useCreateComment;
