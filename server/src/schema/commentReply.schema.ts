import * as yup from "yup";

export const createCommentReplySchema = yup.object({
  commentReply: yup.object({
    message: yup.string().trim().required("Comment reply should not be empty!"),
    author: yup.string().trim().required("User ID is required!"),
    commentId: yup.string().trim().required("Comment ID is required!"),
  }),
});
