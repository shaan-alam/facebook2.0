import { useState } from "react";
import { Comment } from "../Post/types";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteComment, editComment, fetchCommentReplies } from "../../api";
import loader from "../../assets/svg/loader-dark.svg";
import useUser from "../../hooks/useUser";
import { useFormik } from "formik";
import * as yup from "yup";
import CommentReply from "./CommentReply";
import Form from "./CommentReply/Form";
import Moment from "react-moment";
import CommentDropdown from "./CommentDropdown";
import { CommentReplyInterface } from "./types";
import CommentEditForm from "./CommentEditForm";
import useDeleteComment from "../../hooks/useDeleteComment";

const PostComment = ({ comment }: { comment: Comment }) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const [offset, setOffset] = useState(2);
  const [commentForm, setCommentForm] = useState(false);
  const [commentReplyForm, setCommentReplyForm] = useState(false);
  const [commentReplies, setCommentReplies] = useState<CommentReplyInterface[]>(
    []
  );
  const [isLoaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);

  const mutation = useDeleteComment(comment._id);

  // This function will be called once the component is mounted
  // and every time the "View more" button is clicked to fetch +5 more comments
  const fetchMoreCommentReplies = async () => {
    try {
      const { data } = await fetchCommentReplies(comment._id, offset);

      setOffset(offset + 5);

      setCommentReplies(data);
    } catch (err) {
      console.log(err);
    }
  };

  const { refetch, isLoading, isFetching } = useQuery(
    ["comment-replies", comment._id],
    fetchMoreCommentReplies,
    {
      refetchOnWindowFocus: false,
    }
  );

  const editCommentMutation = useMutation(
    (newComment: { id: string; message: string }) =>
      editComment(newComment.id, newComment.message),
    {
      onSuccess: () => {
        queryClient.refetchQueries("comments");
        formik.setSubmitting(false);
        setCommentForm(false);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      comment: comment.message,
    },
    validationSchema: yup.object({
      comment: yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);

      try {
        await editCommentMutation.mutateAsync({
          id: comment._id,
          message: values.comment,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <div className="comment flex items-start justify-start my-4">
        {!isLoaded && (
          <Skeleton style={{ borderRadius: "100%" }} height={30} width={30} />
        )}
        <img
          style={{ display: !isLoaded ? "none" : "block" }}
          src={comment.author.avatar}
          alt={comment.author.fullName}
          className="h-7 w-7 rounded-full mr-4"
          onLoad={() => setLoaded(true)}
        />
        {!isLoaded && <Skeleton count={1} />}
        {commentForm && (
          <CommentEditForm
            initialComment={comment.message}
            setCommentForm={setCommentForm}
            isReply={false}
            commentId={comment._id}
          />
        )}
        {isLoaded && !commentForm && (
          <div className="flex flex-col">
            <div
              className="comment-box flex items-center"
              onMouseOver={() => setMenu(true)}
              onMouseLeave={() => setMenu(false)}
            >
              <div className="w-full py-3 px-5 rounded-2xl bg-gray-200">
                <h1 className="font-semibold">{comment.author.fullName}</h1>
                {!mutation.isLoading && <p>{comment.message}</p>}
                {mutation.isLoading && (
                  <span className="flex justify-center">
                    <img src={loader} />
                  </span>
                )}
              </div>
              {menu && user._id === comment.author._id && (
                <CommentDropdown
                  onEditBtnClick={() => setCommentForm(true)}
                  onDelete={() => mutation.mutate()}
                  isCommentReply={false}
                />
              )}
            </div>
            {!mutation.isLoading && (
              <div className="flex">
                <span className="text-sm text-gray-600 cursor-pointer hover:underline ml-3 mt-2">
                  Like
                </span>
                <span
                  className="text-sm text-gray-600 cursor-pointer hover:underline ml-3 mt-2"
                  onClick={() => setCommentReplyForm(!commentReplyForm)}
                >
                  Reply
                </span>
                <span className="text-sm text-gray-600 cursor-pointer hover:underline ml-3 mt-2">
                  <Moment fromNow>{comment.date}</Moment>
                </span>
              </div>
            )}
            {comment.commentRepliesCount > commentReplies.length && (
              <span
                className="mt-2 mb-3 text-gray-600 cursor-pointer hover:underline flex items-center text-sm"
                onClick={() => refetch()}
              >
                View more replies&nbsp;
                {(isLoading || isFetching) && <img src={loader} />}
              </span>
            )}
          </div>
        )}
      </div>
      {commentReplyForm && (
        <Form commentId={comment._id} setCommentReplies={setCommentReplies} />
      )}
      {commentReplies.map((reply) => (
        <CommentReply commentReply={reply} key={reply._id} />
      ))}
    </>
  );
};

export default PostComment;
