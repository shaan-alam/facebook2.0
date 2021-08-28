import { useState } from "react";
import { Comment } from "../Post/types";
import Skeleton from "react-loading-skeleton";
import { Menu, Transition } from "@headlessui/react";
import User from "../../assets/svg/user.svg";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteComment, editComment, fetchCommentReplies } from "../../api";
import loader from "../../assets/svg/loader-dark.svg";
import useUser from "../../hooks/useUser";
import Button from "../Button";
import { useFormik } from "formik";
import * as yup from "yup";
import CommentReply from "./CommentReply";
import Form from "./CommentReply/Form";

interface CommentReplyInterface {
  _id: string;
  message: string;
  author: {
    _id: string;
    avatar: string;
    fullName: string;
  };
  date: string;
}

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

  const mutation = useMutation(() => deleteComment(comment._id), {
    onSuccess: () => {
      queryClient.refetchQueries("comments");
    },
  });

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
          <div className="edit-comment w-full flex items-center">
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="w-full rounded-full mt-3 bg-gray-100 flex justify-between">
                <input
                  type="text"
                  className="w-full p-2 rounded-full outline-none bg-gray-100"
                  placeholder="Comment..."
                  {...formik.getFieldProps("comment")}
                />
                <Button
                  type="submit"
                  text="POST"
                  isLoading={formik.isSubmitting}
                  className="py-2 px-3 rounded-full flex-shrink text-fb font-semibold hover:bg-gray-200"
                />
              </div>
              <a
                href="#!"
                onClick={() => setCommentForm(false)}
                className="text-fb underline block mt-2 text-sm"
              >
                Cancel
              </a>
            </form>
          </div>
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
                <Menu as="div" className="relative inline-block z-10">
                  <Menu.Button>
                    <DotsHorizontalIcon className="comment-options-button outline-none ml-3 h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer text-gray-500" />
                  </Menu.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-50 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform  scale-100 opacity-100"
                    leaveTo="transform scale-50 opacity-0"
                  >
                    <Menu.Items className="absolute right-1/2 z-10 bg-white rounded-lg shadow-2xl p-1 w-48 origin-left translate-x-1/2">
                      <div className="border-b p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`cursor-pointer flex justify-start items-center ${
                                active && "bg-gray-300 rounded-lg"
                              } p-1 ${
                                active ? "text-gray-700" : "text-gray-700 "
                              } hover:bg-gray-100 hover:text-gray-700`}
                              onClick={() => setCommentForm(true)}
                            >
                              <PencilIcon className="h-5 w-5" />
                              &nbsp;Edit Comment
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`cursor-pointer flex justify-start items-center ${
                                active && "bg-gray-300 rounded-lg"
                              } p-1 ${
                                active ? "text-gray-700" : "text-gray-700 "
                              } hover:bg-gray-100 hover:text-gray-700`}
                              onClick={() => mutation.mutate()}
                            >
                              <TrashIcon className="h-5 w-5" />
                              &nbsp; Delete Comment
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
      {commentReplyForm && <Form commentId={comment._id} setCommentReplies={setCommentReplies} />}
      {commentReplies.map((reply) => (
        <CommentReply commentReply={reply} key={reply._id} />
      ))}
    </>
  );
};

export default PostComment;
