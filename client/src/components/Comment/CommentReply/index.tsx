import { useState } from "react";
import loader from "../../../assets/svg/loader-dark.svg";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import Button from "../../Button";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { editCommentReply } from "../../../api";
import useUser from '../../../hooks/useUser'

export interface CommentReply {
  _id: string;
  message: string;
  author: {
    _id: string;
    avatar: string;
    fullName: string;
  };
  date: string;
}

const CommentReply = ({ commentReply }: { commentReply: CommentReply }) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const [isLoaded, setLoaded] = useState(false);
  const [commentForm, setCommentForm] = useState(false);
  const [menu, setMenu] = useState(false);

  const editCommentReplyMutation = useMutation(
    (newComment: { commentReplyId: string; message: string }) =>
      editCommentReply(newComment),
    {
      onSuccess: () => {
        queryClient.refetchQueries("comment-replies");
        setCommentForm(false);
        formik.setSubmitting(false);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      commentReply: commentReply.message,
    },
    onSubmit: async (values) => {
      try {
        const newReply = {
          message: values.commentReply,
          commentReplyId: commentReply._id,
        };
        await editCommentReplyMutation.mutateAsync(newReply);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <div className="my-4 ml-10 comment-box flex items-center">
        <img
          style={{ display: !isLoaded ? "none" : "block" }}
          src={commentReply.author.avatar}
          alt={commentReply.author?.fullName}
          className="h-7 w-7 rounded-full mr-4"
          onLoad={() => setLoaded(true)}
        />
        {commentForm && (
          <div className="edit-comment w-full flex items-center">
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="w-full rounded-full mt-3 bg-gray-100 flex justify-between">
                <input
                  type="text"
                  className="w-full p-2 rounded-full outline-none bg-gray-100"
                  placeholder="Comment..."
                  id="commentReply"
                  {...formik.getFieldProps("commentReply")}
                />
                <Button
                  type="submit"
                  text="Reply"
                  variant="default"
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
              <div className="py-3 px-5 rounded-2xl bg-gray-200">
                <h1 className="font-semibold">Shaan Alam</h1>
                {true && <p>{commentReply.message}</p>}
                {false && (
                  <span className="flex justify-center">
                    <img src={loader} />
                  </span>
                )}
              </div>
              {menu && user._id === commentReply.author._id && (
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
                    <Menu.Items className="absolute right-1/2 z-10 bg-white rounded-lg shadow-2xl p-1 w-60 origin-left translate-x-1/2">
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
                              &nbsp;Edit Comment Reply
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
                            >
                              <TrashIcon className="h-5 w-5" />
                              &nbsp; Delete Comment Reply
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentReply;
