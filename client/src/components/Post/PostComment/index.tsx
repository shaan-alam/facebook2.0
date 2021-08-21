import { useState } from "react";
import { Comment } from "../types";
import Skeleton from "react-loading-skeleton";
import { Menu, Transition } from "@headlessui/react";
import User from "../../../assets/svg/user.svg";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "react-query";
import { deleteComment, editComment } from "../../../api";
import loader from "../../../assets/svg/loader-dark.svg";
import useUser from "../../../hooks/useUser";
import Button from "../../Button";
import { useFormik } from "formik";
import * as yup from "yup";

const PostComment = ({
  comment: { _id, message, author },
}: {
  comment: Comment;
}) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);

  const mutation = useMutation(() => deleteComment(_id), {
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
        setEditCommentForm(false);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      comment: message,
    },
    validationSchema: yup.object({
      comment: yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);

      try {
        await editCommentMutation.mutateAsync({
          id: _id,
          message: values.comment,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="comment flex items-center justify-start my-4">
      {!isLoaded && (
        <Skeleton style={{ borderRadius: "100%" }} height={30} width={30} />
      )}
      <img
        style={{ display: !isLoaded ? "none" : "block" }}
        src={author?.avatar ? author.avatar : User}
        alt={author?.fullName}
        className="h-7 w-7 rounded-full mr-4"
        onLoad={() => setLoaded(true)}
      />
      {!isLoaded && <Skeleton count={1} />}
      {editCommentForm && (
        <div className="add-comment w-full flex items-center">
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
              onClick={() => setEditCommentForm(false)}
              className="text-fb underline block mt-2 text-sm"
            >
              Cancel
            </a>
          </form>
        </div>
      )}
      {isLoaded && !editCommentForm && (
        <div
          className="comment-box flex items-center"
          onMouseOver={() => setMenu(true)}
          onMouseLeave={() => setMenu(false)}
        >
          <div className="w-full py-3 px-5 rounded-2xl bg-gray-200">
            <h1 className="font-semibold">{author?.fullName}</h1>
            {!mutation.isLoading && <p>{message}</p>}
            {mutation.isLoading && (
              <span className="flex justify-center">
                <img src={loader} />
              </span>
            )}
          </div>
          {menu && author._id === user._id && (
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
                          onClick={() => setEditCommentForm(true)}
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
      )}
    </div>
  );
};

export default PostComment;
